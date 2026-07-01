import { useCallback, useEffect, useRef, useState } from 'react';
import type { InterviewSuspectId } from '../data/interviewChat';
import {
  isInterviewVoiceAvailable,
  isInterviewVoiceEnabled,
  setInterviewVoiceEnabled,
  SuspectVoicePlayer,
} from '../lib/interviewVoice';

export function useSuspectVoice(suspectId: InterviewSuspectId) {
  const playerRef = useRef<SuspectVoicePlayer | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(
    () => isInterviewVoiceEnabled() && isInterviewVoiceAvailable(),
  );

  if (!playerRef.current) {
    playerRef.current = new SuspectVoicePlayer();
  }

  useEffect(() => {
    return () => {
      playerRef.current?.stop();
    };
  }, []);

  const speak = useCallback(
    async (text: string, turnId: string) => {
      if (!voiceEnabled || !isInterviewVoiceAvailable()) return;
      setSpeaking(true);
      try {
        await playerRef.current?.speak(text, suspectId, turnId);
      } catch {
        // Text reply still visible if voice fails.
      } finally {
        setSpeaking(false);
      }
    },
    [suspectId, voiceEnabled],
  );

  const stop = useCallback(() => {
    playerRef.current?.stop();
    setSpeaking(false);
  }, []);

  const toggleVoice = useCallback((enabled: boolean) => {
    setInterviewVoiceEnabled(enabled);
    setVoiceEnabled(enabled);
    if (!enabled) stop();
  }, [stop]);

  return {
    speak,
    stop,
    speaking,
    voiceEnabled,
    toggleVoice,
    voiceAvailable: isInterviewVoiceAvailable(),
  };
}
