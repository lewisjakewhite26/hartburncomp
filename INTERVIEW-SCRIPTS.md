# Interview feature — question bank & reply scripts

Design notes for the teacher IWB interview runner. The class picks **two** names from the final five; you run up to **four questions each** (plus optional follow-ups).

**Final five on the board:** Mr Grant, Mrs Patel, Mrs Chen, Miss Frost, Jane Morrison.

**Likely picks after CSI + paper files:** Grant and Patel (both score high on the Ultra AI bars and match the footprint stack). Chen, Frost, and Morrison are worth interviewing if the class wants to rule them out properly.

---

## Hardcoded question buttons (always on screen)

These five buttons appear for every suspect. Wording on the button is fixed; the **spoken question** can be tailored per person (shown in each script block).

| # | Button label | What you're really asking | Pedagogy |
|---|--------------|---------------------------|----------|
| 1 | **Alibi** | Where were you between 11:00 and 11:30? | Establishes opportunity. Grant admits staff room; others should have tight alibis. |
| 2 | **Staff room** | Did you go in the staff room this morning? | Direct access to mug + sugar bowl. Only Grant and Patel should admit entry. |
| 3 | **Witness** | Who can confirm that? | Tests whether the alibi holds. Pupils listen for vague vs specific names. |
| 4 | **Forensics** | Our files match you to the scene — explain. | Confront them with what pupils already know (arch/loop, wave tread, size 6, under 5'11"). Reactions differ — Grant gets defensive, Morrison should laugh it off. |
| 5 | **Motive** *(optional)* | Anything you held against Mr White? | Red herring / drama. Grant cracks slightly (Sports Day). Others deflect. |

**Grant-only follow-up** (unlocks after **Alibi** or **Staff room** if they mention cones):

| Button | Question | Purpose |
|--------|----------|---------|
| **Follow-up: cupboard** | The PE cupboard was locked until break — but the staff room cupboard was open all morning, wasn't it? | The gotcha. He admits going in before break when he shouldn't have. Plants doubt before the sugar-bowl twist. |

**Post-twist button** (only after sugar-bowl evidence is released — optional for debrief, not mid-interview):

| Button | Question |
|--------|----------|
| **Sugar bowl** | Did you touch the shared sugar bowl on the staff room counter? |

---

## How answers should feel on the board

- **Innocent suspects:** Calm, specific, sometimes annoyed. They welcome witnesses.
- **Grant:** Starts confident, gets tighter when forensics or Sports Day come up. Follow-up is the slip — not a full confession.
- **Patel:** Warm but firm. Kitchen timeline should **contradict** staff-room access at 11:15 (she claims kitchen until 11:30).
- **Partial matches (Chen, Frost):** One clue fits, others don't — pupils should notice the mismatch.
- **Morrison:** Clearly wrong on size/tread — almost comic relief if interviewed.

Teacher tip: after each answer, pause and ask the class *"Does that match our files?"* before tapping the next question.

---

## Mr Grant — PE teacher *(guilty)*

**Forensic profile:** arch print · wave tread · UK 6 · 5'8" · staff room access · CSI 94%

### 1 · Alibi
**Ask:** *Can you walk us through your morning — especially before lunch?*

**Reply:**
> Sports hall setup all morning. Hurdles, cones, the lot. I grabbed spare cones from the staff room cupboard around **11:15** — quick trip, in and out.

*→ Unlocks **Follow-up: cupboard**.*

### 2 · Staff room
**Ask:** *You mentioned cones — did you enter the staff room?*

**Reply:**
> Yes — in and out for cones. Two minutes, maybe. The sugar jar is on the counter there. **I didn't touch it.** I didn't go near White's mug.

*→ Unlocks **Follow-up: cupboard**.*

### 3 · Witness
**Ask:** *Who saw you in the sports hall?*

**Reply:**
> Year 5 were on the field with Mr Okafor. No one in the hall until one o'clock club setup. Ask Okafor — he saw me with cones.

*Note for class: Okafor's statement backs Grant being **outside** with cones, not inside poisoning coffee — good alibi for 11:18 CCTV, but doesn't clear staff room access.*

### 4 · Forensics
**Ask:** *Wave tread, size six, arch print — that's your file. How do you explain the mat print and the mug?*

**Reply:**
> I **was** in the staff room for cones. My prints are on file for safeguarding — of course there's a partial match. That doesn't mean I poisoned anyone. Half the staff have arch loops.

### 5 · Motive
**Ask:** *Isn't it true you wanted to run Sports Day this year?*

**Reply:**
> Look — Mr White got Sports Day. I wasn't happy. **That doesn't mean I poisoned anyone.** We argue about rotas, not coffee.

### Follow-up · Cupboard *(Grant only)*
**Ask:** *The PE cupboard was locked until break — but the staff room cupboard was open all morning, wasn't it?*

**Reply:**
> It **should** have been locked. I went in before break for cones. I didn't think anyone would notice.

*Class takeaway: he had opportunity, motive, and full forensic match — and he just admitted being in the staff room when the PE store was locked.*

---

## Mrs Patel — dinner lady *(strong match on paper, innocent)*

**Forensic profile:** arch print · wave tread · UK 6 · 5'1" · CSI 89%

### 1 · Alibi
**Ask:** *Where were you in the hour before lunch?*

**Reply:**
> Kitchen prep since half eight — veg, gravy, all of it. **Chef Dave was with me** the whole time.

### 2 · Staff room
**Ask:** *Did you carry anything through the staff room?*

**Reply:**
> Cup collection at **twelve fifteen** — I walked past the counter on the way back from reception once. I did **not** touch the sugar bowl. Chef Dave had me back in the kitchen by **eleven thirty**.

*Class takeaway: if coffee was poisoned around 11:10–11:20, she's claiming kitchen until 11:30 — tight alibi. Mat print still matches her shoes though — that's why she stays on the board until interviews.*

### 3 · Witness
**Ask:** *Who can vouch for you in the kitchen?*

**Reply:**
> Chef Dave and the kitchen volunteer parent. Check the dinner order sheet — my name's on prep all morning.

### 4 · Forensics
**Ask:** *Your tread and shoe size match the mat. Explain.*

**Reply:**
> I wear size six work shoes — wave soles, same as half the kitchen team. I **walk through that corridor** every day. Being on the mat doesn't mean I poisoned a mug I never touched.

### 5 · Motive
**Ask:** *Did you have any reason to hurt Mr White?*

**Reply:**
> No. He always said hello at the hatch. I don't drink coffee on shift — too busy.

---

## Mrs Chen — Year 6 TA *(partial match — wave tread, size 5)*

**Forensic profile:** loop print · wave tread · UK 5 · 5'2" · CSI 47%

### 1 · Alibi
**Ask:** *Where were you between eleven and half past?*

**Reply:**
> Lower maths in **6B** while Mr White taught next door. At break I saw him come back with his blue mug — **he looked fine**.

### 2 · Staff room
**Ask:** *Did you use the staff room kettle?*

**Reply:**
> **No.** I made tea at ten fifteen in the **little kitchenette on our floor** — not the main staff room. I know where it is; I didn't go in today.

### 3 · Witness
**Ask:** *Who can confirm you were in 6B?*

**Reply:**
> The Year 6 children in my group — and Mr White's class next door. Ask any of them.

### 4 · Forensics
**Ask:** *Wave tread matches, but the mat print was size six. You're size five.*

**Reply:**
> The photo was **smudged** — your own evidence says that. I fit the tread pattern, not the size. You can't rule me in **or** out on one smudged print.

### 5 · Motive
**Ask:** *Any grudge against Mr White?*

**Reply:**
> He was my line manager. We got on. I'm helping his class while he's in hospital — why would I do that?

*Class takeaway: good partial-match debate — wave yes, size no, loop not arch. Reasonable to rule her out after interview.*

---

## Miss Frost — supply teacher *(wrong tread — stripe not wave)*

**Forensic profile:** loop print · **stripe** tread · UK 6 · 5'5" · CSI 31%

### 1 · Alibi
**Ask:** *Where were you teaching this morning?*

**Reply:**
> **Year 3, Room 8** all morning. Register at nine oh five, taught until break. Their teacher was off sick.

### 2 · Staff room
**Ask:** *Did you use the staff room kettle?*

**Reply:**
> **No** — I bring a flask as supply staff. Nobody even showed me where the staff room is.

### 3 · Witness
**Ask:** *Which class can confirm you were in Room 8?*

**Reply:**
> All of Year 3. Look at the board work — it's still up.

### 4 · Forensics
**Ask:** *Scene tread is wave. Your file says stripe.*

**Reply:**
> Then it's **not my shoe**. Size six fits lots of staff. Stripe and wave don't match — rule me out.

### 5 · Motive
**Ask:** *Anything between you and Mr White?*

**Reply:**
> I met him once at briefing. Supply — I'm in and out. No motive.

*Class takeaway: easiest "fail one clue" rule-out after Morrison.*

---

## Jane Morrison — office admin *(weakest match)*

**Forensic profile:** loop print · **dot** tread · UK **4** · 5'0" · CSI 14%

### 1 · Alibi
**Ask:** *Where were you between eleven and lunch?*

**Reply:**
> **Reception** from eight fifteen. Late children, parcels, phones. Sign-in book — my name's on every page.

### 2 · Staff room
**Ask:** *Did you go in the staff room?*

**Reply:**
> **Not until lunch** — it's down the hall. Photocopier at half ten, then back to desk.

### 3 · Witness
**Ask:** *Who saw you at reception?*

**Reply:**
> Parents, kids, Mr Blake's governors when they signed in. The desk camera if you don't believe me.

### 4 · Forensics
**Ask:** *Dot tread, size four. The mat was wave, size six.*

**Reply:**
> Then why am I still on your board? **It's not my foot.** Check your own files.

### 5 · Motive
**Ask:** *Reason to target Mr White?*

**Reply:**
> He borrowed my stapler last week and returned it. That's it.

*Class takeaway: should be ruled out before interviews if pupils stacked clues properly — interviewing her is optional "sanity check".*

---

## Suggested interview flow (for the cool UI)

1. **Pick two** on the interview stage (cards + CSI bars — already built).
2. **"Begin interview"** — suspect name large centre, mugshot/initials, role subtitle.
3. Five question buttons across the bottom; asked questions grey out.
4. Tap a question → typewriter **question card**, then **answer card** with suspect voice styling.
5. If answer contradicts paper evidence, flash a small **"Check your files"** pulse (teacher-only, not a spoiler label).
6. Grant: after Alibi or Staff room, **Follow-up: cupboard** button animates in (glow / stamp).
7. **Switch suspect** tab between the two chosen names.
8. **End interview** → return to live board or advance to sugar-bowl twist.

---

## Quick reference — who should pupils trust?

| Suspect | After interview, pupils should think… |
|---------|--------------------------------------|
| **Grant** | Had access, motive, full forensic match, shaky on cupboard timing |
| **Patel** | Matches forensics but kitchen alibi holds — wrong person, right shoes |
| **Chen** | Partial match only — probably innocent |
| **Frost** | Wrong tread — rule out |
| **Morrison** | Wrong tread and size — rule out |

**Debrief reveal:** Grant poisoned the coffee via the **staff room sugar bowl** (twist stage) — his interview answers set that up; the sugar-bowl question is the final nail if you use it after the twist.

---

## Implementation note

Current app data lives in `src/data/interviews.ts` but uses an older cast list (includes Mrs Sharpe and Jamie, omits Chen and Morrison). When building the UI, sync scripts to this document and the five names on the CSI picker.
