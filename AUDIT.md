# Forensics Mission Control — Full Audit

**Date:** July 1, 2026  
**Project:** ForensicsComputing  
**Stack:** React 19 + TypeScript + Vite 8 + Zustand + Tailwind CSS 4 + Framer Motion

---

## Executive Summary

| Area | Status | Notes |
|------|--------|-------|
| Build (`tsc -b && vite build`) | ✅ Pass | 327 KB JS bundle |
| Lint (`oxlint`) | ✅ Pass | Basic React rules only |
| Spec alignment (`lesson_flow.md`) | ⚠️ Partial / broken | Dashboards exist but are not wired in |
| Real-time teacher → student sync | ❌ Missing | Local Zustand only; no backend/WebSocket |
| Flag submission | ❌ Non-functional | UI only, no handler or validation |
| Security (client passwords) | ⚠️ Expected for demo, weak for production | Passwords in source |
| Tests / CI / Git | ❌ None | No repo, no test suite |

**Verdict:** Solid UI prototype for a single-user briefing/evidence viewer. The multi-user "Mission Control" classroom flow described in `lesson_flow.md` is roughly half-built and not reachable from the running app.

---

## 1. Architecture & Spec Alignment

### What actually runs

`App.tsx` renders only `Sidebar` + `ContentView` — a static single-user experience with three tabs (Briefing Slides, Secure Inbox, Evidence Locker):

```tsx
function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 font-sans text-zinc-100 flex">
      <Sidebar />
      <ContentView />
    </div>
  );
}
```

### What exists but is unused

These components are **never imported**:

- `src/components/Admin/TeacherDashboard.tsx` — stage triggers, countdown, fake student grid
- `src/components/Client/StudentDashboard.tsx` — stage-reactive inbox, evidence locker, submission terminal
- `src/store/useCaseStore.ts` — mission stage state (`pending` → `final_prosecution`)

`lesson_flow.md` describes teacher-controlled stages that update all student UIs in real time. That requires:

1. Routing or role selection (teacher vs student)
2. Shared state across clients (WebSocket, SSE, or polling backend)
3. Wiring stage changes into student-visible content

**None of that is implemented.** Teacher and student would each have isolated in-memory Zustand even if both dashboards were mounted.

### Two parallel UX designs

| Feature | `ContentView` (live) | `StudentDashboard` (orphaned) |
|---------|---------------------|-------------------------------|
| Inbox | Static HQ message + password-gated intercept | Dynamic messages on stage change |
| Evidence | Password-gated files (`admin`, `cypher`, etc.) | Placeholder "Active File" by stage |
| Slides | Static "Slide 01 / 05", buttons dead | N/A (teacher has slide deck viewer) |
| Stage sync | Not connected to `useCaseStore` | Reacts to `caseStage` |

These look like two iterations that were never merged.

---

## 2. Functional Gaps vs. `lesson_flow.md`

| Requirement | Implemented? |
|-------------|--------------|
| Stage 0–4 narrative flow | Partially in `useCaseStore` + dashboards only |
| Teacher releases evidence → students see it | ❌ No (no sync, dashboards unused) |
| 60-minute countdown | ✅ Yes in `TeacherDashboard`, not shown anywhere live |
| 16-unit connectivity grid | ⚠️ Decorative only — all 16 always "online" |
| Flag submission + validation | ❌ Submit button has **no `onClick`** |
| Stage-enforced evidence unlock | ❌ No — `ContentView` evidence always visible behind passwords |
| Real-time broadcast | ❌ No |

---

## 3. Bugs & Code Quality Issues

### Critical / functional

**1. Submit button does nothing** (`StudentDashboard.tsx`):

```tsx
<button className="px-8 py-3 bg-zinc-950 border border-neon-lime ...">
  Submit
</button>
```

No handler, no validation, no feedback.

**2. Slide navigation is dead** (`ContentView.tsx`):

PREV/NEXT buttons have no state or handlers; content is hardcoded as "SLIDE 01 / 05".

**3. Teacher countdown timer is fragile** (`TeacherDashboard.tsx`):

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setCountdown(countdown > 0 ? countdown - 1 : 0);
  }, 1000);
  return () => clearInterval(timer);
}, [countdown, setCountdown]);
```

The effect re-runs every second because `countdown` is in the dependency array. It works, but recreates the interval each tick. Prefer a functional update: `setCountdown(c => c > 0 ? c - 1 : 0)` with `[]` deps.

**4. Inbox `useEffect` dependency smell** (`StudentDashboard.tsx`):

```tsx
useEffect(() => {
  if (caseStage === 'evidence_01' && !inbox.find(i => i.id === 'e1')) {
    setInbox(prev => [{id: 'e1', ...}, ...prev]);
  }
  // ...
}, [caseStage, inbox]);
```

Including `inbox` causes extra effect runs; use functional updates and depend only on `caseStage`, or derive inbox from stage.

### Moderate

- **No stage ordering** — teacher can jump to any stage or go backward; no guardrails.
- **`tsconfig.app.json` lacks `"strict": true`** — weaker type safety than typical production TS.
- **README is still the default Vite template** — no project-specific setup or architecture docs.
- **No git repository** — no version history or collaboration baseline.

### Minor / cleanup

- `src/App.css` — unused Vite boilerplate
- `src/assets/vite.svg`, `src/assets/react.svg` — unreferenced
- `public/icons.svg` — Vite template social icons, unused
- Page title remains generic: `forensicscomputing`

---

## 4. Security Review

For a classroom CTF-style exercise, some of this is acceptable; for anything beyond local demo, it is not.

| Issue | Severity | Detail |
|-------|----------|--------|
| Client-side passwords | High (if treated as real security) | `root`, `admin`, `cypher` in `ContentView.tsx` |
| Unlock state in memory only | Low | Resets on refresh; trivially bypassed via devtools |
| No auth / roles | High | Anyone opening the app gets full access |
| No input sanitization on flag field | Low | No submission path yet |
| Password fields use `type="text"` | Info | Likely intentional for puzzle UX |

---

## 5. UX & Accessibility

### Strengths

- Cohesive dark "mission control" visual system (`index.css` glass panels, neon accents)
- Framer Motion transitions
- Focus rings on several interactive elements
- Responsive grid layouts (`md:` breakpoints)

### Gaps

- No role entry, loading states, or error boundaries
- Sidebar nav buttons lack `aria-current`
- No keyboard-accessible slide deck
- Teacher "Student Units" grid misleads — implies live connections
- `ContentView` and orphaned dashboards duplicate concepts without a single source of truth

---

## 6. Dependencies & Tooling

```
react: ^19.2.7
vite: ^8.1.1
typescript: ~6.0.2
zustand: ^5.0.14
framer-motion: ^12.42.2
tailwindcss: ^4.3.2
```

- Modern stack; no test runner, no router, no backend SDK
- Oxlint with basic React rules — no type-aware linting (`oxlint-tsgolint` not configured)
- `dist/` builds successfully (~104 KB gzip JS)

---

## 7. Recommended Priorities

### P0 — Make the app match the spec

1. Add routing: `/teacher` → `TeacherDashboard`, `/student` → `StudentDashboard` (or a role picker).
2. Add real-time sync (e.g. WebSocket + small Node server, or Firebase/Supabase realtime).
3. Wire `caseStage` into student-visible content (inbox, evidence unlock, final submission prompt).
4. Implement flag submission with validation and teacher-visible results.

### P1 — Fix broken UX in current code

1. Wire Submit handler + success/failure feedback.
2. Either remove `ContentView` or merge it with `StudentDashboard` to avoid duplicate designs.
3. Fix countdown interval pattern.
4. Replace fake connectivity grid with real presence or remove it until implemented.

### P2 — Hardening & hygiene

1. Replace README with project docs (roles, run instructions, lesson flow).
2. Enable `strict` TypeScript.
3. Remove dead assets (`App.css`, unused SVGs).
4. Initialize git; add basic CI (build + lint).
5. For classroom use, document that passwords are puzzle mechanics, not security controls.

---

## Architecture (current vs intended)

```
┌─────────────────────────────────────────────────────────┐
│  CURRENT (shipped)                                      │
│  App → Sidebar + ContentView → PasswordGate             │
│  useStore (tabs, unlocks)                               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  BUILT BUT UNWIRED                                      │
│  TeacherDashboard ─┐                                    │
│  StudentDashboard ─┼→ useCaseStore (local only)         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  MISSING                                                │
│  Role routing · Backend/WebSocket · Real-time sync      │
└─────────────────────────────────────────────────────────┘
         ↑
   lesson_flow.md spec
```

---

## Bottom Line

The project is a **working UI shell** with clean build/lint, but it is **not yet a functioning Forensics Mission Control classroom system**. The teacher/student dashboards and stage store are the right direction for `lesson_flow.md`, yet they are disconnected from the entry point and from any multi-client infrastructure. Flag submission, slide navigation, and student connectivity are placeholders.

The highest-impact next step is wiring roles + real-time sync and choosing whether `ContentView` or `StudentDashboard` becomes the canonical student experience.
