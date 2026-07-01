import { useState } from 'react';
import {
  getElevenLabsApiKey,
  getSuspectVoiceId,
  isElevenLabsConfigured,
  isInterviewVoiceEnabled,
  setElevenLabsApiKey,
  setInterviewVoiceEnabled,
  setSuspectVoiceId,
  synthesizeSuspectSpeech,
} from '../../lib/elevenLabs';

interface InterviewVoiceSettingsProps {
  onChange?: () => void;
}

export default function InterviewVoiceSettings({ onChange }: InterviewVoiceSettingsProps) {
  const [open, setOpen] = useState(!isElevenLabsConfigured());
  const [apiKey, setApiKey] = useState(() => getElevenLabsApiKey());
  const [voiceGrant, setVoiceGrant] = useState(() => getSuspectVoiceId('grant'));
  const [voicePatel, setVoicePatel] = useState(() => getSuspectVoiceId('patel'));
  const [voiceOn, setVoiceOn] = useState(() => isInterviewVoiceEnabled());
  const [status, setStatus] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const save = () => {
    setElevenLabsApiKey(apiKey);
    setSuspectVoiceId('grant', voiceGrant);
    setSuspectVoiceId('patel', voicePatel);
    setInterviewVoiceEnabled(voiceOn);
    setStatus(isElevenLabsConfigured() ? 'Saved. Suspect replies will use voice.' : 'Saved without API key.');
    onChange?.();
  };

  const testVoice = async () => {
    setTesting(true);
    setStatus(null);
    try {
      setElevenLabsApiKey(apiKey);
      const blob = await synthesizeSuspectSpeech(
        'This is a test line from the interview channel.',
        'grant',
      );
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      await audio.play();
      audio.onended = () => URL.revokeObjectURL(url);
      setStatus('Test playback started for Mr Grant voice.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Voice test failed.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <section className="interview-voice-settings">
      <button
        type="button"
        className="interview-voice-settings__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        ElevenLabs voice {isElevenLabsConfigured() ? '(connected)' : '(not set up)'}
      </button>

      {open && (
        <div className="interview-voice-settings__panel">
          <p className="interview-voice-settings__hint">
            Add your API key once on this iPad. Keys stay in the browser only, not on GitHub. Pick
            voice IDs from your ElevenLabs voice library.
          </p>

          <label className="interview-voice-settings__field">
            <span>API key</span>
            <input
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="sk_..."
              autoComplete="off"
            />
          </label>

          <label className="interview-voice-settings__field">
            <span>Mr Grant voice ID</span>
            <input
              type="text"
              value={voiceGrant}
              onChange={(event) => setVoiceGrant(event.target.value)}
              placeholder="ElevenLabs voice ID"
            />
          </label>

          <label className="interview-voice-settings__field">
            <span>Mrs Patel voice ID</span>
            <input
              type="text"
              value={voicePatel}
              onChange={(event) => setVoicePatel(event.target.value)}
              placeholder="ElevenLabs voice ID"
            />
          </label>

          <label className="interview-voice-settings__checkbox">
            <input
              type="checkbox"
              checked={voiceOn}
              onChange={(event) => setVoiceOn(event.target.checked)}
            />
            <span>Speak suspect replies aloud</span>
          </label>

          <div className="interview-voice-settings__actions">
            <button type="button" onClick={save}>
              Save
            </button>
            <button type="button" onClick={testVoice} disabled={testing || !apiKey.trim()}>
              {testing ? 'Testing…' : 'Test Grant voice'}
            </button>
          </div>

          {status && <p className="interview-voice-settings__status">{status}</p>}
        </div>
      )}
    </section>
  );
}
