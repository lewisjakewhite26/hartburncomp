import type { InterviewSuspectId } from '../data/interviewChat';

const VOICE_ENABLED_KEY = 'forensics-interview-voice-enabled';

export function isInterviewVoiceEnabled(): boolean {
  const stored = localStorage.getItem(VOICE_ENABLED_KEY);
  if (stored === null) return true;
  return stored === 'true';
}

export function setInterviewVoiceEnabled(enabled: boolean) {
  localStorage.setItem(VOICE_ENABLED_KEY, enabled ? 'true' : 'false');
}

/** Bundled MP3 clips in public/audio/interviews/ — always available at runtime. */
export function isInterviewVoiceAvailable(): boolean {
  return true;
}

export function interviewAudioUrl(suspectId: InterviewSuspectId, turnId: string): string {
  return `/audio/interviews/${suspectId}/${turnId}.mp3`;
}

export class SuspectVoicePlayer {
  private audio: HTMLAudioElement | null = null;

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }

  private playSrc(src: string): Promise<void> {
    this.stop();
    this.audio = new Audio(src);

    return new Promise<void>((resolve, reject) => {
      if (!this.audio) {
        reject(new Error('Audio failed to load'));
        return;
      }
      this.audio.onended = () => resolve();
      this.audio.onerror = () => reject(new Error('Audio playback failed'));
      void this.audio.play().catch(reject);
    });
  }

  async speak(_text: string, suspectId: InterviewSuspectId, turnId: string): Promise<void> {
    await this.playSrc(interviewAudioUrl(suspectId, turnId));
  }
}
