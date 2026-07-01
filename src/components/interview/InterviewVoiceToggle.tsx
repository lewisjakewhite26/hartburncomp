import { useState } from 'react';
import {
  isInterviewVoiceEnabled,
  setInterviewVoiceEnabled,
} from '../../lib/interviewVoice';

interface InterviewVoiceToggleProps {
  onChange?: () => void;
}

export default function InterviewVoiceToggle({ onChange }: InterviewVoiceToggleProps) {
  const [voiceOn, setVoiceOn] = useState(() => isInterviewVoiceEnabled());

  const toggle = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    setInterviewVoiceEnabled(next);
    onChange?.();
  };

  return (
    <div className="interview-voice-settings">
      <button
        type="button"
        className={`interview-voice-settings__toggle${voiceOn ? ' interview-voice-settings__toggle--on' : ''}`}
        onClick={toggle}
        aria-pressed={voiceOn}
      >
        Suspect voice {voiceOn ? 'on' : 'off'}
      </button>
    </div>
  );
}
