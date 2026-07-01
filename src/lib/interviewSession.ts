const SESSION_KEY = 'forensics-interview-session';
const CHANNEL_NAME = 'forensics-interview-session';

export interface InterviewSession {
  started: boolean;
  pickedIds: string[];
  startedAt: number;
}

function readSession(): InterviewSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as InterviewSession;
    if (!parsed.started || !Array.isArray(parsed.pickedIds)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session: InterviewSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage(session);
    channel.close();
  }
}

export function getInterviewSession(): InterviewSession | null {
  return readSession();
}

export function startInterviewSession(pickedIds: string[]) {
  const session: InterviewSession = {
    started: true,
    pickedIds: [...pickedIds],
    startedAt: Date.now(),
  };
  writeSession(session);
  return session;
}

export function clearInterviewSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isInterviewLiveFromUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('live') === '1';
}

export function pickedIdsFromUrl(): string[] {
  if (typeof window === 'undefined') return [];
  const raw = new URLSearchParams(window.location.search).get('p')?.trim();
  if (!raw) return [];
  return raw.split(',').map((id) => id.trim()).filter(Boolean);
}

export function interviewLiveUrl(pickedIds: string[]): string {
  const params = new URLSearchParams({ live: '1', p: pickedIds.join(',') });
  return `/interview?${params.toString()}`;
}

export function subscribeInterviewSession(onChange: (session: InterviewSession | null) => void) {
  const sync = () => onChange(readSession());

  sync();
  window.addEventListener('storage', sync);

  let channel: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== 'undefined') {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event) => {
      const session = event.data as InterviewSession;
      if (session?.started) {
        onChange(session);
      } else {
        sync();
      }
    };
  }

  return () => {
    window.removeEventListener('storage', sync);
    channel?.close();
  };
}

export function isInterviewSessionLive(session: InterviewSession | null): boolean {
  return Boolean(session?.started);
}
