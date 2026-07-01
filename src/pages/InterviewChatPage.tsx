import { useState } from 'react';
import InterviewMessaging from '../components/interview/InterviewMessaging';
import InterviewVoiceSettings from '../components/interview/InterviewVoiceSettings';
import {
  INTERVIEW_SUSPECTS,
  type InterviewSuspectId,
} from '../data/interviewChat';
import '../components/interview/InterviewMessaging.css';

export default function InterviewChatPage() {
  const [activeSuspect, setActiveSuspect] = useState<InterviewSuspectId | null>(null);
  const [voiceConfigVersion, setVoiceConfigVersion] = useState(0);
  const [completed, setCompleted] = useState<Record<InterviewSuspectId, boolean>>({
    grant: false,
    patel: false,
  });

  const markComplete = (id: InterviewSuspectId) => {
    setCompleted((prev) => ({ ...prev, [id]: true }));
  };

  if (activeSuspect) {
    return (
      <div className="interview-page">
        <div className="interview-page__shell">
          <InterviewMessaging
            key={`${activeSuspect}-${voiceConfigVersion}`}
            suspectId={activeSuspect}
            onComplete={() => markComplete(activeSuspect)}
            onBack={() => setActiveSuspect(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="interview-page">
      <div className="interview-page__shell">
        <div className="interview-page__picker hud-panel hud-panel-active">
          <div className="interview-page__picker-header">
            <p className="font-mono-label text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
              Secure interview channel
            </p>
            <h1>Interview a suspect</h1>
            <p>
              Your class picked two names. Work through each interview on this device. Every
              question can be asked gently, plainly, or firmly. The suspect answers the same either
              way.
            </p>
          </div>

          <InterviewVoiceSettings onChange={() => setVoiceConfigVersion((value) => value + 1)} />

          <div className="interview-page__suspect-grid">
            {INTERVIEW_SUSPECTS.map((suspect) => {
              const done = completed[suspect.id];
              return (
                <button
                  key={suspect.id}
                  type="button"
                  className={`interview-page__suspect-card${done ? ' interview-page__suspect-card--done' : ''}`}
                  onClick={() => setActiveSuspect(suspect.id)}
                >
                  <div className="interview-page__suspect-card-top">
                    <span className="interview-page__suspect-name">{suspect.name}</span>
                    {done && <span className="interview-page__done-badge">Done</span>}
                  </div>
                  <span className="interview-page__suspect-role">{suspect.role}</span>
                  <span className="interview-page__suspect-action">
                    {done ? 'Interview again' : 'Open secure chat'}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="interview-page__footer-note">
            Tip for pairs: after each reply, check height, tread, shoe size, and fingerprint on your
            paper files before the next question.
          </p>
        </div>
      </div>
    </div>
  );
}
