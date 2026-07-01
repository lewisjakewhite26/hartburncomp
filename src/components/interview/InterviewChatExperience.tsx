import { useState, useEffect, useMemo } from 'react';
import InterviewMessaging from './InterviewMessaging';
import InterviewVoiceToggle from './InterviewVoiceToggle';
import {
  INTERVIEW_SUSPECTS,
  type InterviewSuspectId,
} from '../../data/interviewChat';
import {
  getInterviewSession,
  isInterviewLiveFromUrl,
  pickedIdsFromUrl,
  subscribeInterviewSession,
} from '../../lib/interviewSession';
import './InterviewMessaging.css';

interface InterviewChatExperienceProps {
  /** When set, only suspects in this list (with chat scripts) are shown. */
  allowedSuspectIds?: string[];
  /** Pair iPads wait until teacher starts; teacher board passes false. */
  requireSession?: boolean;
  embedded?: boolean;
}

function chatSuspectsForPicks(pickedIds: string[]): typeof INTERVIEW_SUSPECTS {
  if (pickedIds.length === 0) return INTERVIEW_SUSPECTS;
  const filtered = INTERVIEW_SUSPECTS.filter((s) => pickedIds.includes(s.id));
  return filtered.length > 0 ? filtered : INTERVIEW_SUSPECTS;
}

export default function InterviewChatExperience({
  allowedSuspectIds,
  requireSession = true,
  embedded = false,
}: InterviewChatExperienceProps) {
  const [activeSuspect, setActiveSuspect] = useState<InterviewSuspectId | null>(null);
  const [voiceConfigVersion, setVoiceConfigVersion] = useState(0);
  const [completed, setCompleted] = useState<Record<InterviewSuspectId, boolean>>({
    grant: false,
    patel: false,
  });
  const [sessionLive, setSessionLive] = useState(() => {
    if (!requireSession) return true;
    return isInterviewLiveFromUrl() || Boolean(getInterviewSession()?.started);
  });
  const [sessionPickedIds, setSessionPickedIds] = useState<string[]>(() => {
    const fromUrl = pickedIdsFromUrl();
    if (fromUrl.length > 0) return fromUrl;
    return getInterviewSession()?.pickedIds ?? [];
  });

  useEffect(() => {
    if (!requireSession) return;
    return subscribeInterviewSession((session) => {
      setSessionLive(Boolean(session?.started) || isInterviewLiveFromUrl());
      if (session?.pickedIds.length) {
        setSessionPickedIds(session.pickedIds);
      }
    });
  }, [requireSession]);

  const effectivePickedIds = allowedSuspectIds ?? sessionPickedIds;
  const suspects = useMemo(
    () => chatSuspectsForPicks(effectivePickedIds),
    [effectivePickedIds],
  );

  const markComplete = (id: InterviewSuspectId) => {
    setCompleted((prev) => ({ ...prev, [id]: true }));
  };

  if (requireSession && !sessionLive) {
    return (
      <div className={`interview-page${embedded ? ' interview-page--embedded' : ''}`}>
        <div className="interview-page__shell">
          <div className="interview-page__picker hud-panel hud-panel-active interview-page__waiting">
            <p className="font-mono-label text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
              Secure interview channel
            </p>
            <h1>Waiting to start</h1>
            <p>
              Your teacher will pick two suspects on the board and tap <strong>Start interviews</strong>.
              Then open the link they show on screen — it starts with{' '}
              <strong>/interview?live=1</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (activeSuspect) {
    return (
      <div className={`interview-page${embedded ? ' interview-page--embedded' : ''}`}>
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
    <div className={`interview-page${embedded ? ' interview-page--embedded' : ''}`}>
      <div className="interview-page__shell">
        <div className="interview-page__picker hud-panel hud-panel-active">
          {!embedded && (
            <div className="interview-page__picker-header">
              <p className="font-mono-label text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                Secure interview channel
              </p>
              <h1>Interview a suspect</h1>
              <p>
                Your class picked two names. Work through each interview on this device. Every question
                can be asked gently, plainly, or firmly. The suspect answers the same either way.
              </p>
            </div>
          )}

          {!embedded && (
            <InterviewVoiceToggle onChange={() => setVoiceConfigVersion((value) => value + 1)} />
          )}

          <div className="interview-page__suspect-grid">
            {suspects.map((suspect) => {
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

          {!embedded && (
            <p className="interview-page__footer-note">
              Tip for pairs: after each reply, check height, tread, shoe size, and fingerprint on your
              paper files before the next question.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
