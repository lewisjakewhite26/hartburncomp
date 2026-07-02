# SOURCE OF TRUTH — Poisoned Coffee / Forensics Computing

> **Last updated:** July 2026  
> **Purpose:** Single canonical document for what this product is, every piece of copy, every tool, how the lesson runs, and how the code implements it. If anything disagrees with this file, either the code or this file is wrong — fix the drift.

---

## Table of contents

1. [What this is](#1-what-this-is)
2. [Pedagogy and design intent](#2-pedagogy-and-design-intent)
3. [Cast and case facts](#3-cast-and-case-facts)
4. [Lesson flow — minute by minute](#4-lesson-flow--minute-by-minute)
5. [Mission control (teacher board)](#5-mission-control-teacher-board)
6. [Lesson stages (all 9)](#6-lesson-stages-all-9)
7. [Evidence documents (all 5)](#7-evidence-documents-all-5)
8. [Suspect roster (all 15)](#8-suspect-roster-all-15)
9. [Forensic logic — how clues eliminate people](#9-forensic-logic--how-clues-eliminate-people)
10. [Paper tasks and iPad codes](#10-paper-tasks-and-ipad-codes)
11. [Print pack (6 handouts)](#11-print-pack-6-handouts)
12. [Code entry terminal (`/code`)](#12-code-entry-terminal-code)
13. [Interview system](#13-interview-system)
14. [AI systems (Ultra AI + voice)](#14-ai-systems-ultra-ai--voice)
15. [Debrief and guilty reveal](#15-debrief-and-guilty-reveal)
16. [Routes and URLs](#16-routes-and-urls)
17. [UI copy inventory](#17-ui-copy-inventory)
18. [Technical architecture](#18-technical-architecture)
19. [Environment variables and scripts](#19-environment-variables-and-scripts)
20. [Tests and quality gates](#20-tests-and-quality-gates)
21. [Known gaps and legacy code](#21-known-gaps-and-legacy-code)
22. [Screenshots reference](#22-screenshots-reference)

---

## 1. What this is

**Poisoned Coffee** is a half-day **Year 5/6 classroom murder-mystery** set at **St Oakwood Primary** on **Monday 17 March 2026**. Mr James White (Year 6 teacher) is poisoned via his staff-room coffee at ~11:10. Fifteen staff are suspects. Pupils work in **eight pairs** with **paper suspect files**, cross names off as clues arrive, solve **English and maths tasks** for theatrical iPad codes, and — before lunch — **interview two suspects** on pair iPads.

The **guilty party is Mr Grant** (PE teacher). The twist: poison was in the **shared sugar bowl**, not the milk.

### Digital surfaces

| Surface | URL | User |
|---------|-----|------|
| Mission control | `/` | Teacher on IWB |
| Access terminal | `/code` | Pairs on iPad |
| Secure interviews | `/interview` | Pairs on iPad |
| Printables | `/print/*` | Teacher prints before/during lesson |

### Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion · deployed as Vercel SPA.

---

## 2. Pedagogy and design intent

### What pupils practise

- **Reading for detail** — suspect statements, evidence extracts, victim profile
- **SPAG** — counting capitals, spellings, adjectives, pronouns in a flawed statement
- **Algebra** — solving simple equations; mapping answers to a code order
- **Logic / deduction** — stacking multiple forensic filters (sign-in, fingerprint type, tread, shoe size, height)
- **Discussion** — pair talk → class consensus → teacher archive board
- **Interview skills** — choosing tone (gentle / plain / hard); comparing answers to paper files
- **Argument writing** — jury declaration with named evidence

### What the digital layer adds (and does not add)

| Does | Does not |
|------|----------|
| Cinematic “live release” theatre for the class | Replace paper worksheets |
| Ultra AI match bars as a **discussion prompt** | Call a real LLM at runtime |
| Scripted chat interviews with **pre-generated voice** | Generate interview answers live |
| Code entry **theatre** when pairs solve tasks | Unlock evidence automatically from codes |
| Teacher archive board for whole-class strike-off | Track individual pair progress |

**Teacher always advances the board manually.** iPad codes are optional theatre — pairs tell the teacher when “access granted,” then the teacher opens the physical envelope.

### Tone

Dark forensic HUD aesthetic (violet/magenta glow, monospace labels). Serious enough for Year 6, not graphic — Mr White **survives** and recovers in hospital.

---

## 3. Cast and case facts

### Victim

| Field | Value |
|-------|-------|
| Name | Mr James White |
| Role | Year 6 class teacher |
| Height | 5′11″ (71 inches) |
| Birthday | 26 July |
| Age on case file | 34 (as of 17 March 2026 → born **1991**) |
| Habits | Strong coffee, two sugars from staff room sugar bowl, blue desk mug |
| Incident | Filled mug in staff room ~11:10; two sips at desk; found slumped 3:58pm by Mr Thornton |

### Setting details

- Staff room: kettle, shared **sugar bowl** on counter, mugs, fridge
- Reception **sign-in ledger** logs arrivals
- HR holds heights (medicals), fingerprint types (safeguarding training), shoe sizes (Sports Day order form)
- CCTV at staff room door shows height markers (not faces) — figure under 5′11″ at 11:18am
- Wet footprint on staff room mat at 11:20am: **wave tread**, shoe read as **UK 6** (smudged)

### Guilty party

**Mr Grant** — PE teacher, 5′8″, arch fingerprint, shoe 6, wave tread, staff room access, motive: wanted to run Sports Day; Mr White got the role instead.

---

## 4. Lesson flow — minute by minute

### Before the lesson (teacher prep)

1. Print all six handouts in order (`/print/all` or individual routes).
2. Prepare physical **evidence envelopes** for: sign-in ledger, fingerprint report, footprint scene, sugar bowl photo.
3. Open **`/`** on the classroom display (mission control).
4. Open **`/code`** on pair iPads (optional bookmark).
5. Keep **`/interview`** ready — link appears on board when interviews start.

### Handout order

| # | Handout | When | iPad code |
|---|---------|------|-----------|
| 1 | Suspect bio sheet (15 cards) | After briefing (release 1) | — |
| 2 | Forensic reference cards | With bios | — |
| 3 | Task 1 — SPAG statement check | Before release 2 (sign-in) | **5374** |
| 4 | Task 2 — algebra | Before release 3 (fingerprint) | **7859** |
| 5 | Task 3 — victim profile | Before release 4 (footprint) | **1991** |
| 6 | Jury declaration | Debrief (release 8) | — |

### Stage releases (teacher taps **Release ▶**)

| Release # | Stage ID | What happens in the room |
|-----------|----------|--------------------------|
| 0 | `pending` | Standby HUD — “Waiting to start” |
| 1 | `briefing` | Read case aloud; distribute suspect packs |
| 2 | `evidence_signin` | SPAG task → code → ledger envelope → archive ~5 cleared by sign-in |
| 3 | `evidence_fingerprint` | Maths task → code → fingerprint envelope → rule out **whorls** (~3 more) |
| 4 | `evidence_footprint` | Victim task → code → footprint envelope → **stack all clues** → final five |
| 5 | `evidence_csi` | Ultra AI bars for final five — class picks two to interview |
| 6 | `interviews` | Pick two on board → **Start interviews ▶** → pairs open `/interview` link |
| 7 | `twist_sugar` | Sugar bowl envelope — poison in shared sugar |
| 8 | `debrief` | Collect jury forms → board reveals **Mr Grant** + evidence trail |

### Expected pupil journey

```
Read 15 bios → briefing on board
  → sign-in clears 5 → ~10 remain
  → whorl print clears ~3 → ~7 remain
  → footprint stack → final 5 (Grant, Patel, Frost, Chen, Morrison)
  → Ultra AI highlights Grant + Patel
  → interview Grant + Patel on iPads
  → sugar bowl twist → staff room access matters
  → jury declaration → debrief reveal Grant
```

---

## 5. Mission control (teacher board)

**Route:** `/` · **Component:** `ControlPage.tsx`

### Sidebar — “Mission control”

- **Title:** Poisoned coffee
- **Nav views:**
  - **Live release** — current stage panel (default)
  - **Evidence hub** — all released evidence documents (badge = count)
  - **Suspect archive** — tap cards to strike off after class discussion (badge = archived count)
- **Stage counter:** `Stage N of 9`
- **Up next:** preview of next stage title
- **Release ▶** — triggers full-screen cinematic, then commits stage
- **Teacher cue** — contextual instruction for current stage
- **Gear icon** — printables menu

### Release cinematic

Full-screen overlay (`ReleaseCinematic.tsx`):

1. Dim → envelope animation → **Tap to open**
2. Typewriter title / subtitle / body (tap anywhere to **skip**)
3. Special phases:
   - **Fingerprint scan** animation before fingerprint evidence body
   - **CSI bars** sequential Ultra AI reveal (tap to complete all bars → **Continue**)
   - **Interview pick** — choose 2 from final five → **Start interviews ▶**
4. **Continue** closes overlay and commits stage

### State (session only — resets on refresh)

| State | Purpose |
|-------|---------|
| `releasedIndex` | Current stage (0–8) |
| `archivedIds` | Teacher-struck suspects on archive board |
| `activeView` | `live` \| `evidence` \| `archive` |
| `pendingRelease` | Stage index shown in cinematic before commit |
| `interviewPickIds` | Two suspects chosen for interviews |
| `interviewsStarted` | Whether Start interviews was pressed |
| `csiDisplayOrder` | Shuffled order of final-five bars (set once at CSI release) |

Interview session also persists in **localStorage** (`forensics-interview-session`) for cross-tab sync to pair iPads.

---

## 6. Lesson stages (all 9)

Source: `src/data/lessonContent.ts`

### Stage 0 — `pending` — Stand by

- **Teacher cue:** *(empty)*
- **Display body:**
  ```
  Waiting to start.

  Eight groups on paper. Clues come from this board as the morning goes on.
  ```
- **UI:** `StandbyForensicHud` — animated forensic scanner, no case narrative

### Stage 1 — `briefing` — Briefing — poisoned coffee

- **Teacher cue:** Read aloud. Check everyone has the paper suspect list.
- **Display body:** *(full briefing — see [Briefing text](#briefing-text))*

### Stage 2 — `evidence_signin` — Evidence — sign-in ledger

- **Teacher cue:** SPAG task → iPad code 5374 → ledger envelope. Who was NOT on site? Archive ~5.
- **Evidence:** `signin_ledger` (code **5374**)

### Stage 3 — `evidence_fingerprint` — Evidence — fingerprint report

- **Teacher cue:** Algebra task → code 7859 → next envelope. NOT whorl only — archive ~3. Do not narrow to arch yet.
- **Evidence:** `fingerprint_report` (code **7859**)

### Stage 4 — `evidence_footprint` — Evidence — footprint and tread

- **Teacher cue:** Victim profile task → code 1991 → footprint evidence. Class stacks all clues on remaining names — archive to final five. Do not name who to interview.
- **Evidence:** `footprint_scene` (code **1991**)

### Stage 5 — `evidence_csi` — Evidence — Ultra AI stack report

- **Teacher cue:** Release CSI AI bars for the final five. Two near green — class picks two to interview. No code needed.
- **Evidence:** `csi_ai_stack` (code **AUTO**)

### Stage 6 — `interviews` — Interviews — pick two

- **Teacher cue:** Class picks two on the board, then tap Start interviews. Pairs open the /interview link shown on screen.
- **UI:** `InterviewStagePanel` — picker, live link, embedded chat after start

### Stage 7 — `twist_sugar` — New evidence

- **Teacher cue:** Play the alert. Sugar-bowl envelope. Archived names stay archived.
- **Evidence:** `sugar_bowl_photo` (code **SUGAR-BOWL** — physical only)
- **Flag:** `isTwist: true` — amber alert styling

### Stage 8 — `debrief` — Debrief and reveal

- **Teacher cue:** Collect accusations. Reveal Grant and the evidence trail. Case summary handout.
- **UI:** `DebriefReveal` — typewriter guilty reveal + 8-step evidence trail

#### Briefing text

```
CASE OPEN

Monday 17 March · St Oakwood Primary

It started like any other Monday. Year 6 were in, Sports Day kit was stacked in the hall, and the staff room kettle had been on since eight.

Mr White filled his blue mug in the staff room at about 11:10. He walked back to the Year 6 corridor, took two sips at his desk, and left the mug on the left corner. He never picked it up again.

By afternoon something was wrong. He missed registration. His class waited. At 3:58pm Mr Thornton found him slumped over his books and called the police.

Doctors say someone poisoned the coffee. Mr White is in hospital. He will recover, but he was unconscious for hours.

Police sealed the staff room. Forensics photographed the kettle, the mugs, and the shared sugar bowl on the counter. Hot drinks get made in there every day. Anyone with access could have reached that mug.

Reception logs who comes in. HR has heights from medicals, fingerprint types from safeguarding training, and shoe sizes from the Sports Day order form.

Fifteen staff were in or around the building this morning. You have their paper files. One of them put something in that mug.

Work in pairs. Rule people out as the clues arrive. Cross names off your copy. Talk it through with the class. Before lunch you will interview a few names and decide who you think did it.
```

---

## 7. Evidence documents (all 5)

Source: `src/data/lessonContent.ts`

### `signin_ledger` — Reception sign-in ledger (extract)

- **Summary:** Who entered before 12:00.
- **Code:** 5374
- **Content:**
  ```
  NOT ON SITE before 12:00:
  • Mrs Walsh — county training
  • Mr Khan — external course
  • Sophie Lane — sick call, 8am
  • Grace Okonkwo — shift starts 15:00
  • Tom Ellis — working remote until 12:00 (badge scan 12:04)

  Everyone else on the list signed in before 9:30.
  ```
- **Eliminates:** Walsh, Khan, Lane, Okonkwo, Ellis (`clearedBySignIn: true`)

### `fingerprint_report` — Fingerprint analysis — coffee mug

- **Summary:** Partial print on the handle.
- **Code:** 7859
- **Content:**
  ```
  Partial print on the mug handle.

  Ridge detail is smudged. Analysts ruled OUT a whorl — no spiral centre visible.

  Could still be arch or loop. Not enough to pick between them yet.

  Cross off anyone with a clear WHORL on your files.
  ```
- **Eliminates:** Sharpe, Thornton, Blake, Khan, Lane (all **whorl**)

### `footprint_scene` — Footprint — staff room mat

- **Summary:** Wet print, photographed 11:20am.
- **Code:** 1991
- **Content:**
  ```
  Staff room mat, 11:20am:
  • Sole tread: WAVE
  • Shoe size: smudged — forensic team read it as UK 6 (might be wrong)
  • CCTV still 11:18am: figure under 5'11" (5'11" exactly does not count)

  Stack this against your files. For each name still on the board, check:

  1. Were they on site before noon?
  2. Mug print — not a whorl?
  3. Mat print — wave tread?
  4. Shoe size — UK 6?
  5. Height — under 5'11"?

  Cross off anyone who fails a clue. Who is left when all five checks pass?
  ```
- **Final five after stacking:** Grant, Patel, Frost, Chen, Morrison

### `csi_ai_stack` — CSI — Ultra AI evidence stack

- **Summary:** Probabilistic match scores for the final five subjects.
- **Code:** AUTO (no iPad code)
- **Intro:** see [Ultra AI section](#ultra-ai-csi-stack-runtime)

### `sugar_bowl_photo` — Sugar bowl residue

- **Summary:** Green residue on the staff room spoon.
- **Code:** SUGAR-BOWL (physical envelope only)
- **Content:**
  ```
  Teaspoon in the staff room sugar bowl: bright green crystals. Same stuff as in Mr White's mug.

  Poison probably went in the shared sugar, not the milk.

  Who had staff room access this morning?
  ```
- **Points to:** staff room access + Grant’s staff room visit + sugar habit

---

## 8. Suspect roster (all 15)

Source: `src/data/suspects.ts`

| ID | Name | Role | Height | FP | Shoe | Tread | Final 5 | Notes |
|----|------|------|--------|-----|------|-------|---------|-------|
| grant | Mr Grant | PE Teacher | 5′8″ | arch | 6 | wave | ✓ | **Guilty** · interview standout · staff room |
| patel | Mrs Patel | Dinner Lady | 5′1″ | arch | 6 | wave | ✓ | interview standout · staff room |
| sharpe | Mrs Sharpe | Deputy Head | 5′6″ | whorl | 7 | stripe | | staff room |
| frost | Miss Frost | Supply Teacher | 5′5″ | loop | 6 | stripe | ✓ | no staff room |
| jamie | Jamie | Y6 Work Exp | 4′10″ | loop | 4 | dot | | |
| thornton | Mr Thornton | Caretaker | 6′0″ | whorl | 10 | block | | staff room · found victim |
| chen | Mrs Chen | Y6 TA | 5′2″ | loop | 5 | wave | ✓ | no staff room |
| okafor | Mr Okafor | Y5 Teacher | 6′1″ | loop | 9 | stripe | | Grant witness |
| blake | Mr Blake | Headteacher | 5′11″ | whorl | 8 | stripe | | staff room · height = CCTV cutoff |
| morrison | Jane Morrison | Office Admin | 5′0″ | loop | 4 | dot | ✓ | |
| walsh | Mrs Walsh | Y4 Teacher | 5′7″ | loop | 6 | wave | | **clearedBySignIn** |
| khan | Mr Khan | Maths Teacher | 5′9″ | whorl | 8 | block | | **clearedBySignIn** |
| lane | Sophie Lane | Nursery TA | 5′0″ | whorl | 5 | circle | | **clearedBySignIn** |
| okonkwo | Grace Okonkwo | Cleaner | 5′5″ | loop | 7 | block | | **clearedBySignIn** |
| ellis | Tom Ellis | IT Technician | 5′8″ | loop | 9 | stripe | | **clearedBySignIn** |

**Motive (Grant):** Wanted to run Sports Day. Mr White got it instead.

### Full police statements

**Mr Grant:** Sports hall all morning. Hurdles, cones, the lot. I nipped to the staff room once for spare cones from the cupboard. Two minutes, in and out. I did not touch White's mug. Year 5 saw me crossing the playground with a stack of cones around eleven.

**Mrs Patel:** Kitchen since half eight. Chef Dave was with me the whole time, prep for lunch. I went to reception once for a delivery. I did not go in the staff room. I do not drink coffee on shift.

**Mrs Sharpe:** Governors in the head's office from nine. Mrs Adebayo took minutes. We did not leave except Mr Blake took a phone call in the corridor. I was not near Year 6 and I was not in the staff room.

**Miss Frost:** Year 3, Room 8. Their teacher was off sick. Register at nine oh five, taught until break. I bring a flask. Nobody showed me where the staff room is.

**Jamie:** Library all morning with Mrs Hughes. Shelving, scanning, boring but I stayed put. Visitor badge from reception. I did not go upstairs. I heard about Mr White after three when everyone was talking in the corridor.

**Mr Thornton:** Found Mr White at 3:58 and rang 999. Before that, boiler room fixing a leak. Key fob says I went in at 9:12. I walked past the staff room door once for tools. Did not go in. I liked Mr White.

**Mrs Chen:** Lower maths in 6B while Mr White taught next door. At break I saw him come back with his blue mug. He looked fine. I made tea at ten fifteen in the little kitchenette on our floor, not the staff room.

**Mr Okafor:** Year 5 on the field till quarter to twelve. Cross-country for Sports Day. Thirty kids, two parents. I was outside. Grant grabbed cones from the storeroom while we were running. That is the only colleague I clocked.

**Mr Blake:** In my office with Mrs Sharpe and governors till lunch. Jane at reception logged the visitors. I stepped out once for a call, five minutes. No tea today because my PA was off sick.

**Jane Morrison:** Reception from 8:15. Late children, parcels, phones. I run the sign-in book the police copied. Photocopier at half ten. Staff room is down the hall but I only go at lunch.

**Mrs Walsh:** County training all morning. Register has my signature at nine and eleven at the training centre. I was not in the building. Tom Ellis emailed me slides at lunch because I missed briefing.

**Mr Khan:** Numeracy course off site. Authority booked it months ago. Back at 1:20, badge scan proves it. Annoyed to miss Sports Day planning but I was not here when the coffee went on his desk.

**Sophie Lane:** Rang in sick at eight oh two. Chest infection. In bed. Partner will tell you. Pharmacy receipt at twenty to twelve in town if you want it. Not on site since Friday.

**Grace Okonkwo:** Shift starts at three when the kids leave. Agency app shows 14:58 at the gate. I clean the staff room every evening so I know the layout, but I was at home at eleven having lunch.

**Tom Ellis:** Server migration from home till noon. Logged in 9:03 from my house, IT have the IP. Badge in at 12:04. Teams call with Mr White at 8:50 about passwords. He sounded normal.

---

## 9. Forensic logic — how clues eliminate people

Source: `src/lib/forensicMatch.ts`

| Rule | Threshold |
|------|-----------|
| CCTV height | **Strictly under** 71 inches (5′11″) — 5′11″ exactly **does not** count |
| Scene footprint tread | **wave** |
| Scene footprint shoe | **UK 6** (smudged — treat as best read) |
| Mug fingerprint | **Not whorl** (arch or loop still possible) |

### Deduction path to Grant

1. Sign-in → 5 cleared
2. Whorl → Sharpe, Thornton, Blake, Khan, Lane out (Khan/Lane already out)
3. Stack footprint → only Grant, Patel, Frost, Chen, Morrison pass all five checks
4. Ultra AI → Grant 94%, Patel 89% (highest)
5. Interviews → Grant admits staff room visit; cupboard lie; Patel has kitchen alibi
6. Sugar bowl → poison in shared sugar; Grant had staff room access at 11:15
7. Motive → Sports Day jealousy

Patel is the **red herring** — matches forensics but solid kitchen alibi and no motive.

---

## 10. Paper tasks and iPad codes

Source: `src/data/taskContent.ts`, `src/data/codes.ts`

Valid codes: **5374**, **7859**, **1991** · Wrong limit: **3** attempts · Lockout: **30 seconds**

### Task 1 — SPAG statement check (code **5374**)

**Suspect:** Mr Grant · **Route:** `/print/task/spag`

Read four paragraphs with deliberate errors. Count:

| Category | Answer | Code digit |
|----------|--------|------------|
| Missed capital letters | **5** | 1st |
| Misspelled words | **3** | 2nd |
| Adjectives | **7** | 3rd |
| Pronouns | **4** | 4th |

**Paragraphs (as printed):**

1. `i was in the sports hall all monday morning with year five. we set up hurdles and bright orange cones becuase sports day was soon.`
2. `at about eleven i nipped to the staff room for spare cones. The visit was a quick trip. chef dave saw me carring a stack from storage.`
3. `The statement to police: never touched Mr White's blue mug. The gym stayed full all morning.`
4. `Sports day organisation went to Mr White, not the PE department. Staff did not put somthing in the hot coffee.`

### Task 2 — Fingerprint counts / algebra (code **7859**)

**Route:** `/print/task/maths`

| Shape | Equation | Answer |
|-------|----------|--------|
| circle | a + 8 = 15 | **7** |
| triangle | 4b = 32 | **8** |
| square | 5c − 3 = 22 | **5** |
| star | 18 ÷ d = 2 | **9** |

Questions appear on sheet in order: **square, star, triangle, circle** (scrambled).  
Code digit order: **circle → triangle → square → star** → **7859**

### Task 3 — Victim profile (code **1991**)

**Route:** `/print/task/victim`

- Case dated **17 March 2026**
- Birthday **26 July** — not yet passed in March → age 34 means born **1991**
- Code = birth year **1991**

---

## 11. Print pack (6 handouts)

Source: `src/data/printables.ts`, `src/data/printCopy.ts`

### Cover narrative (`CASE_OPEN_NARRATIVE`)

Nine paragraphs — condensed case file for suspect pack cover (see `printCopy.ts` for full text). Key lines:

- PC-2026-03 · Monday 17 March · St Oakwood Primary
- Poisoned coffee · Mr White survives in hospital
- Fifteen suspects · work in pairs · cross off names · interview before lunch

### Pack instructions (`PACK_INSTRUCTIONS`)

**Heading:** Using this pack

**Intro:** Keep pages together. Write on your copy, not the whiteboard. When you and your partner agree someone is out, tick Ruled out and scribble why.

**Bullets:**

1. Read all fifteen before the first clue drops. Note who might have been in the staff room.
2. New envelope or board clue? Stop. Run it against everyone you have left.
3. Talk in your pair, then with the class. Your teacher strikes names off the shared board.
4. Two suspects with the same shoe size? Keep both until something splits them.
5. You can only interview a few people later. Pick the ones you actually need.
6. Final accusation: one name, at least two reasons from the evidence. Not just a guess.

### Forensic key (`FORENSIC_KEY`)

Explains boxes on each bio card:

- **Height** — from school medical; compare to CCTV clues
- **Fingerprint** — circle A (arch), L (loop), or W (whorl)
- **Shoe size** — UK size from Sports Day form
- **Sole tread** — circle W (wave), C (circles), S (stripes), B (blocks), D (dots)
- **Statement** — cross-check against timetables and later evidence

### Cover meta

- Case ref: **PC-2026-03**
- Document: Suspect profiles (15)
- Classification: **Class use only — do not take home**

### Jury declaration (`/print/jury`)

- **Title:** Jury declaration
- **Subtitle:** Poisoned coffee investigation · St Oakwood Primary
- **Intro:** Complete as a pair before debrief. Name one suspect + at least two evidence reasons.
- **Verdict line:** We, the Jury, have found ___ guilty of the crime of poisoning Mr White's coffee.
- **Evidence:** 5 blank lines
- **Fields:** Group number, accused name, Juror 1, Juror 2

---

## 12. Code entry terminal (`/code`)

**Component:** `CodeEntryPage.tsx`

### Copy

- **Heading:** Access terminal
- **Subheading:** Select your group, then enter the code from your task sheet
- **Group:** 8 buttons (Grp 1–8)
- **Code:** 4-digit keypad + **Authorise**
- **Success:** Access granted · Group N. Tell your teacher.
- **Failure:** Access denied · Check the paper and try again
- **Lockout:** Terminal locked — retry in Ns

### Behaviour

- Codes validate against `TASK_CODES` only
- **Does not** unlock teacher evidence or change board state
- Pure classroom theatre so pairs celebrate solving the worksheet

---

## 13. Interview system

### Who can be interviewed

**Live chat:** Mr Grant and Mrs Patel only (`src/data/interviewChat.ts`)

**Legacy unused data:** `src/data/interviews.ts` has scripts for Sharpe, Frost, Jamie — **not wired to UI**

### URLs

| Param | Meaning |
|-------|---------|
| `?live=1` | Bypass “waiting to start” gate |
| `?p=grant,patel` | Restrict suspect list |

Teacher link format: `/interview?live=1&p=grant,patel` (from `interviewLiveUrl()`)

### Flow

1. Teacher releases interview stage → picks 2 on board
2. **Start interviews ▶** → writes `forensics-interview-session` to localStorage + BroadcastChannel
3. Pairs open link (or wait for sync)
4. Pick Grant or Patel → chat UI
5. Each turn: **Ask gently** / **Ask plainly** / **Press hard** — tone changes question text only; **answer identical**
6. 1.8s typing delay before suspect reply
7. Optional voice MP3 plays with answer
8. All turns done → “Interview complete” → back to suspect list

### Tone labels

| Key | Button label |
|-----|--------------|
| soft | Ask gently |
| neutral | Ask plainly |
| accusatory | Press hard |

### Mr Grant — interview (6 turns)

**Character:** Arrogant, fast-talking, defensive. Treats this interview like a nuisance.

| Topic | Neutral question | Answer (all tones) |
|-------|------------------|-------------------|
| Alibi | Mr Grant, let's start with the basics. Where were you between 11:00 and 11:30 this morning? | Look, it's Sports Day week, okay? … I popped into the staff room for a shortcut to the cupboard. In and out. |
| Staff room | You were in the staff room at 11:15. Did you go anywhere near the coffee station? | I went to the cupboard. … I didn't stop for a brew … didn't hang around the sugar jar. |
| **The cupboard** | We checked the PE store cupboards. They were locked all morning. If you were getting cones, why were you in the staff room cupboard? | **I... well, the PE store key was sticking.** … I tried the staff room one. It wasn't locked. |
| Witness | Who can vouch for your location during that half-hour window? | Mr Okafor was out on the field with Year 5. |
| Forensics | We have a wave-tread print on a mat in the staff room, size six. That matches your shoes. Explain. | My shoes are standard issue … half the staff has these. |
| Motive | Mr White got the Sports Day organiser role, didn't he? How did that make you feel? | It's frustrating. I've got three years of seniority on him. … That's ridiculous. |

Full soft/accusatory prompt variants in `interviewChat.ts` and `GRANT-PATEL-INTERVIEWS.md`.

### Mrs Patel — interview (5 turns)

**Character:** Breathless, hardworking, juggling five things at once. Very matter-of-fact.

| Topic | Neutral question | Answer |
|-------|------------------|--------|
| Alibi | Mrs Patel, walk us through your morning. Where were you from 11:00 to 11:30? | Kitchen since half eight … Chef Dave … scrubbing the trays |
| Staff room | Did you enter the staff room at any point during that time? | Not until 12:15 … grab a clean tray … didn't touch the sugar bowl |
| Witness | Who saw you in the kitchen during that time? | Chef Dave … Sarah the kitchen volunteer |
| Forensics | We found a wave-tread print, size six, on the staff room mat. Your shoes match. | Size six work shoes … whole kitchen team … same soles |
| Motive | Did you and Mr White ever have any disagreements? | He was alright … always said please and thank you |

---

## 14. AI systems (Ultra AI + voice)

### Ultra AI CSI stack (runtime — **not a real LLM**)

**Branding:** “Ultra AI” / “CSI — Ultra AI evidence stack”  
**Data:** Hardcoded scores in `src/data/csiMatch.ts`

| Suspect | Score | Bar colour |
|---------|-------|------------|
| Mr Grant | 94% | Green (≥75) |
| Mrs Patel | 89% | Green |
| Mrs Chen | 47% | Yellow (≥50) |
| Miss Frost | 31% | Orange (≥30) |
| Jane Morrison | 14% | Red |

**Intro copy:**
```
CSI have run a brand-new Ultra AI tool across every clue so far — sign-in, mug print, mat print, CCTV height, and shoe data.

It does not name a guilty party. It scores how well each remaining subject fits the evidence stack.

Red = weak match · Green = strong match

Use this with your paper files. The AI can be wrong — but it shows who is worth interviewing.
```

**Behaviour:**

- Bars animate sequentially (2.2s each) in cinematic release
- Suspect order shuffled once per lesson when CSI stage releases
- Tap overlay to skip to full bars
- **No API calls at runtime**

### Interview voice (runtime — bundled MP3)

**Path:** `/audio/interviews/{suspectId}/{turnId}.mp3`

| File | Turn |
|------|------|
| grant/alibi.mp3 … grant/motive.mp3 | 6 clips |
| patel/alibi.mp3 … patel/motive.mp3 | 5 clips |

**Toggle:** localStorage key `forensics-interview-voice-enabled` (default on)  
**Components:** `useSuspectVoice`, `InterviewVoiceToggle`, `SuspectVoicePlayer`

### ElevenLabs TTS (build-time only)

**Script:** `npm run generate-interview-audio`  
**API:** `POST https://api.elevenlabs.io/v1/text-to-speech/{voiceId}`

| Suspect | Default voice ID | Settings |
|---------|------------------|----------|
| Grant | JBFqnCBsd6RMkjVDRZzb | stability 0.38, similarity 0.72, style 0.35 |
| Patel | EXAVITQu4vr4xnSDxMaL | stability 0.52, similarity 0.82, style 0.2 |

Model default: `eleven_turbo_v2_5`

---

## 15. Debrief and guilty reveal

**Component:** `DebriefReveal.tsx`

### Header

- Label: **Case closed**
- Title (typewriter): **Mr Grant**
- Subtitle: **PE Teacher — guilty**

### Evidence trail (8 steps)

1. Sign-in book: five cleared — not on site before noon
2. Mug print: whorl ruled out; arch or loop still possible
3. Mat print: wave tread, size 6, under 5′11″ — Grant and Patel both fit
4. Ultra AI stack: Grant and Patel scored highest on the evidence bars
5. Interviews: Patel had kitchen alibi before 11:30; Grant was in the staff room for cones
6. Sugar bowl: poison in shared sugar — staff room access matters
7. Grant: PE cupboard should have been locked; he went in before break
8. Motive: Grant wanted Sports Day — Mr White got it instead

### Aside panel

- **Motive:** Wanted to run Sports Day. Mr White got it instead.
- **Statement (excerpt):** Grant’s police statement in quotes

---

## 16. Routes and URLs

| Path | Component | Notes |
|------|-----------|-------|
| `/` | ControlPage | Default — teacher board |
| `/code` | CodeEntryPage | Pair iPad terminal |
| `/interview` | InterviewChatPage | Pair interviews |
| `/print/all` | AllPrintablesPage | Full bundle |
| `/print/suspects` | SuspectBioSheetPage | 15 bio cards + cover |
| `/print/forensics` | SuspectForensicSheetPage | FP + tread cards |
| `/print/task/spag` | SpagTaskPage | Task 1 |
| `/print/task/maths` | MathsTaskPage | Task 2 |
| `/print/task/victim` | VictimBioTaskPage | Task 3 |
| `/print/jury` | JuryDeclarationPage | Verdict form |

Routing: manual pathname match in `App.tsx` (no React Router). Vercel rewrites all paths to `index.html`.

---

## 17. UI copy inventory

### Mission control sidebar

- Mission control
- **Poisoned coffee**
- Live release / On screen now
- Evidence hub / Released documents
- Suspect archive / Strike off after discussion
- Stage N of 9
- Up next
- Release ▶ / All stages released
- Teacher cue

### Release cinematic

- Incoming transmission / ⚠ Priority intercept (twist)
- Tap to open
- Live release / New evidence
- Tap to skip
- Tap to complete all bars (CSI)
- Continue

### Interview chat

- Connected to {name}. {characterNote} Choose how to ask each question. Their answer stays the same.
- Choose how to ask
- Ask gently / Ask plainly / Press hard
- Question N of M · {topic}
- Listen to the reply…
- Interview with {name} complete. Discuss with your partner: does their story match your files?
- Back to suspect list
- Waiting: Your teacher will pick two suspects on the board and tap **Start interviews**.

### Print teacher footer

Each printable shows: **Handout N of 6** + timing instruction from `printHandoutGuide.ts`

---

## 18. Technical architecture

```
src/
├── App.tsx                 # Path-based routing
├── pages/
│   ├── ControlPage.tsx     # Teacher mission control
│   ├── CodeEntryPage.tsx   # iPad code terminal
│   ├── InterviewChatPage.tsx
│   └── print/              # 7 printable pages
├── components/
│   ├── control/            # Stage panel, cinematic, debrief, archive, CSI, interviews
│   ├── interview/          # Chat UI, voice toggle
│   └── print/              # Icons, teacher footer
├── data/                   # All lesson copy (canonical source in code)
├── hooks/                  # useTypewriter, useSuspectVoice, useFullscreen
├── lib/                    # interviewSession, interviewVoice, forensicMatch
└── types/investigation.ts
```

### State management

- **No Zustand in use** (listed in package.json but zero imports)
- Teacher board: React `useState` (session-only)
- Interview session: `localStorage` + `BroadcastChannel`

### Key dependencies

- `framer-motion` — cinematic animations, typewriter-adjacent motion
- `@playwright/test` — e2e tests
- Tailwind 4 via `@tailwindcss/vite`

---

## 19. Environment variables and scripts

### Runtime

**None required.** Voice uses bundled MP3s.

### Build-time (`.env.local` — never commit)

| Variable | Purpose |
|----------|---------|
| `VITE_ELEVENLABS_API_KEY` | Required for audio regeneration |
| `VITE_ELEVENLABS_VOICE_GRANT` | Optional voice override |
| `VITE_ELEVENLABS_VOICE_PATEL` | Optional voice override |
| `VITE_ELEVENLABS_MODEL` | Default `eleven_turbo_v2_5` |

### npm scripts

| Script | Command |
|--------|---------|
| dev | `vite --host` |
| build | `tsc -b && vite build` |
| preview | `vite preview` |
| test | `playwright test` |
| generate-interview-audio | ElevenLabs clip generation |
| print-pack | PDF print bundle (`scripts/generate-print-pack-pdf.mjs`) |

### Screenshot refresh

```bash
npm run build && npx vite preview --host 127.0.0.1 --port 4180
PREVIEW_URL=http://127.0.0.1:4180 node scripts/capture-screenshots.mjs
```

---

## 20. Tests and quality gates

**Framework:** Playwright · **Base URL:** `http://127.0.0.1:4173` (build + preview in config)

| Spec | Covers |
|------|--------|
| `smoke.spec.ts` | Home loads “Poisoned coffee”, Release button, standby HUD; print/all has content; interview waiting state |
| `code-entry.spec.ts` | Group gate; code 5374 granted; 0000 denied |
| `interview.spec.ts` | Live interview picker; Grant chat tones; Patel alibi MP3 HTTP 200 |
| `lesson-flow.spec.ts` | Full teacher flow through CSI + interview start; briefing cinematic skippable |

### Not yet tested

- Archive board interactions
- Sugar bowl / debrief stages
- Full interview completion (all turns)
- Code lockout after 3 failures
- Voice toggle persistence

---

## 21. Known gaps and legacy code

| Item | Status |
|------|--------|
| `src/data/interviews.ts` | Legacy scripts for 5 suspects — **unused** |
| `INTERVIEW-SCRIPTS.md` | Design doc for 5 final-five interviews — **partially implemented** (Grant/Patel chat only) |
| Zustand | In package.json — **never imported** |
| Code entry → evidence unlock | **Intentionally decoupled** — teacher drives board |
| Student role picker / inbox UI | **Removed** — old screenshots referenced `?role=student`; current app is teacher-first |

When extending interviews to Frost/Chen/Morrison, add turns to `interviewChat.ts`, regenerate audio, update tests.

---

## 22. Screenshots reference

Regenerated via `scripts/capture-screenshots.mjs` against production preview.

| File | Description |
|------|-------------|
| `01-control-standby.png` | Pending — forensic HUD |
| `02-control-briefing.png` | Briefing stage on live panel |
| `03-control-archive.png` | Archive with sign-in clears struck off |
| `04-control-evidence-hub.png` | Evidence hub mid-lesson |
| `05-control-csi-ultra-ai.png` | Ultra AI probabilistic bars |
| `06-control-interview-pick.png` | Interview picker — Grant + Patel selected |
| `07-interview-grant-gotcha.png` | Grant cupboard slip in chat |
| `08-code-entry.png` | Access terminal — group + keypad |
| `09-control-debrief.png` | Debrief guilty reveal |
| `10-print-suspect-pack.png` | Printable suspect pack cover |

---

## Canonical answer key (teacher eyes only)

| Question | Answer |
|----------|--------|
| Who poisoned Mr White? | **Mr Grant** |
| Where was the poison? | **Shared sugar bowl** (green crystals) |
| Final five | Grant, Patel, Frost, Chen, Morrison |
| Best interview pair | Grant + Patel (CSI scores + footprint match) |
| SPAG code | 5374 |
| Maths code | 7859 |
| Victim birth year code | 1991 |

---

*End of source of truth.*
