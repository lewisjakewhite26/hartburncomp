import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getInterviewSuspect,
  TONE_LABELS,
  type InterviewSuspectId,
  type InterviewTone,
} from '../../data/interviewChat';
import { useSuspectVoice } from '../../hooks/useSuspectVoice';
import './InterviewMessaging.css';

export interface ChatMessage {
  id: string;
  role: 'system' | 'detective' | 'suspect';
  text: string;
  tone?: InterviewTone;
}

interface InterviewMessagingProps {
  suspectId: InterviewSuspectId;
  onComplete?: () => void;
  onBack?: () => void;
}

export default function InterviewMessaging({ suspectId, onComplete, onBack }: InterviewMessagingProps) {
  const suspect = getInterviewSuspect(suspectId);
  const { speak, speaking, voiceEnabled, toggleVoice, voiceAvailable } = useSuspectVoice(suspectId);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'intro',
      role: 'system',
      text: `Connected to ${suspect.name}. ${suspect.characterNote} Choose how to ask each question. Their answer stays the same.`,
    },
  ]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [finished, setFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageId = useRef(0);

  const currentTurn = suspect.turns[turnIndex];
  const composerLocked = isTyping || speaking;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping, speaking, finished]);

  const askQuestion = (tone: InterviewTone) => {
    if (!currentTurn || composerLocked || finished) return;

    const prompt = currentTurn.prompts[tone];
    const answer = currentTurn.answer;
    const detectiveId = `d-${messageId.current++}`;

    setMessages((prev) => [
      ...prev,
      { id: detectiveId, role: 'detective', text: prompt, tone },
    ]);
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `s-${messageId.current++}`,
          role: 'suspect',
          text: answer,
        },
      ]);
      setIsTyping(false);
      void speak(answer);

      const nextIndex = turnIndex + 1;
      if (nextIndex >= suspect.turns.length) {
        setFinished(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `sys-${messageId.current++}`,
            role: 'system',
            text: `Interview with ${suspect.name} complete. Discuss with your partner: does their story match your files?`,
          },
        ]);
        onComplete?.();
      } else {
        setTurnIndex(nextIndex);
      }
    }, 1800);
  };

  return (
    <div className="interview-chat">
      <header className="interview-chat__header">
        <div className="interview-chat__header-main">
          {onBack && (
            <button type="button" className="interview-chat__back" onClick={onBack}>
              Back
            </button>
          )}
          <div className="interview-chat__avatar" aria-hidden>
            {suspect.initials}
          </div>
          <div>
            <h1 className="interview-chat__name">{suspect.name}</h1>
            <p className="interview-chat__meta">
              {suspect.role}
              <span className="interview-chat__online" aria-hidden />
              {speaking ? 'Speaking…' : suspect.onlineLabel}
            </p>
          </div>
          {voiceAvailable && (
            <button
              type="button"
              className={`interview-chat__voice-toggle${voiceEnabled ? ' interview-chat__voice-toggle--on' : ''}`}
              onClick={() => toggleVoice(!voiceEnabled)}
              aria-pressed={voiceEnabled}
            >
              {voiceEnabled ? 'Voice on' : 'Voice off'}
            </button>
          )}
        </div>
        <p className="interview-chat__progress">
          Question {Math.min(turnIndex + 1, suspect.turns.length)} of {suspect.turns.length}
          {!finished && currentTurn ? ` · ${currentTurn.topic}` : ''}
        </p>
      </header>

      <div ref={scrollRef} className="interview-chat__thread scrollbar-custom">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`interview-chat__row interview-chat__row--${message.role}`}
            >
              {message.role === 'suspect' && (
                <span className="interview-chat__bubble-avatar" aria-hidden>
                  {suspect.initials}
                </span>
              )}
              <div
                className={`interview-chat__bubble interview-chat__bubble--${message.role}${
                  message.tone ? ` interview-chat__bubble--tone-${message.tone}` : ''
                }`}
              >
                {message.role === 'detective' && message.tone && (
                  <span className={`interview-chat__tone-tag interview-chat__tone-tag--${message.tone}`}>
                    {TONE_LABELS[message.tone]}
                  </span>
                )}
                <p>{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="interview-chat__row interview-chat__row--suspect">
            <span className="interview-chat__bubble-avatar" aria-hidden>
              {suspect.initials}
            </span>
            <div className="interview-chat__bubble interview-chat__bubble--typing" aria-live="polite">
              <span className="interview-chat__typing-dot" />
              <span className="interview-chat__typing-dot" />
              <span className="interview-chat__typing-dot" />
            </div>
          </div>
        )}
      </div>

      {!finished && currentTurn && !composerLocked && (
        <footer className="interview-chat__composer">
          <p className="interview-chat__composer-label">Choose how to ask</p>
          <div className="interview-chat__tone-grid">
            {(['soft', 'neutral', 'accusatory'] as const).map((tone) => (
              <button
                key={tone}
                type="button"
                className={`interview-chat__tone-btn interview-chat__tone-btn--${tone}`}
                onClick={() => askQuestion(tone)}
              >
                <span className="interview-chat__tone-btn-label">{TONE_LABELS[tone]}</span>
                <span className="interview-chat__tone-btn-preview">{currentTurn.prompts[tone]}</span>
              </button>
            ))}
          </div>
        </footer>
      )}

      {!finished && composerLocked && !isTyping && speaking && (
        <footer className="interview-chat__composer interview-chat__composer--waiting">
          <p>Listen to the reply…</p>
        </footer>
      )}

      {finished && onBack && (
        <footer className="interview-chat__composer interview-chat__composer--done">
          <button type="button" className="interview-chat__done-btn" onClick={onBack}>
            Back to suspect list
          </button>
        </footer>
      )}
    </div>
  );
}
