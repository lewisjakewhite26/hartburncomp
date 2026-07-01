import type { InterviewSuspectId } from '../data/interviewChat';

const STORAGE_KEY = 'forensics-elevenlabs-api-key';
const VOICE_ENABLED_KEY = 'forensics-elevenlabs-voice-enabled';
const VOICE_ID_KEYS: Record<InterviewSuspectId, string> = {
  grant: 'forensics-elevenlabs-voice-grant',
  patel: 'forensics-elevenlabs-voice-patel',
};

/** Premade ElevenLabs voices — swap in .env or settings for your own. */
const DEFAULT_VOICE_IDS: Record<InterviewSuspectId, string> = {
  grant: 'JBFqnCBsd6RMkjVDRZzb', // George
  patel: 'EXAVITQu4vr4xnSDxMaL', // Sarah
};

const DEFAULT_MODEL = 'eleven_turbo_v2_5';

const VOICE_SETTINGS: Record<
  InterviewSuspectId,
  { stability: number; similarity_boost: number; style?: number }
> = {
  grant: { stability: 0.38, similarity_boost: 0.72, style: 0.35 },
  patel: { stability: 0.52, similarity_boost: 0.82, style: 0.2 },
};

export function getElevenLabsApiKey(): string {
  return (
    import.meta.env.VITE_ELEVENLABS_API_KEY?.trim() ||
    localStorage.getItem(STORAGE_KEY)?.trim() ||
    ''
  );
}

export function setElevenLabsApiKey(key: string) {
  const trimmed = key.trim();
  if (trimmed) {
    localStorage.setItem(STORAGE_KEY, trimmed);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function isElevenLabsConfigured(): boolean {
  return getElevenLabsApiKey().length > 0;
}

export function isInterviewVoiceEnabled(): boolean {
  const stored = localStorage.getItem(VOICE_ENABLED_KEY);
  if (stored === null) return isElevenLabsConfigured();
  return stored === 'true';
}

export function setInterviewVoiceEnabled(enabled: boolean) {
  localStorage.setItem(VOICE_ENABLED_KEY, enabled ? 'true' : 'false');
}

export function getSuspectVoiceId(suspectId: InterviewSuspectId): string {
  const envKey =
    suspectId === 'grant'
      ? import.meta.env.VITE_ELEVENLABS_VOICE_GRANT
      : import.meta.env.VITE_ELEVENLABS_VOICE_PATEL;

  return (
    envKey?.trim() ||
    localStorage.getItem(VOICE_ID_KEYS[suspectId])?.trim() ||
    DEFAULT_VOICE_IDS[suspectId]
  );
}

export function setSuspectVoiceId(suspectId: InterviewSuspectId, voiceId: string) {
  const trimmed = voiceId.trim();
  if (trimmed) {
    localStorage.setItem(VOICE_ID_KEYS[suspectId], trimmed);
  } else {
    localStorage.removeItem(VOICE_ID_KEYS[suspectId]);
  }
}

function getModelId(): string {
  return import.meta.env.VITE_ELEVENLABS_MODEL?.trim() || DEFAULT_MODEL;
}

export async function synthesizeSuspectSpeech(
  text: string,
  suspectId: InterviewSuspectId,
): Promise<Blob> {
  const apiKey = getElevenLabsApiKey();
  if (!apiKey) {
    throw new Error('ElevenLabs API key not configured');
  }

  const voiceId = getSuspectVoiceId(suspectId);
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: getModelId(),
      voice_settings: VOICE_SETTINGS[suspectId],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `ElevenLabs error (${response.status})`);
  }

  return response.blob();
}

export class SuspectVoicePlayer {
  private audio: HTMLAudioElement | null = null;
  private objectUrl: string | null = null;

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  async speak(text: string, suspectId: InterviewSuspectId): Promise<void> {
    this.stop();
    const blob = await synthesizeSuspectSpeech(text, suspectId);
    this.objectUrl = URL.createObjectURL(blob);
    this.audio = new Audio(this.objectUrl);

    await new Promise<void>((resolve, reject) => {
      if (!this.audio) {
        reject(new Error('Audio failed to load'));
        return;
      }
      this.audio.onended = () => resolve();
      this.audio.onerror = () => reject(new Error('Audio playback failed'));
      void this.audio.play().catch(reject);
    });
  }
}
