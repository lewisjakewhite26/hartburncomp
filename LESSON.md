# Lesson: Poisoned Coffee — Mr White

**Audience:** Year 6, 8 pairs (16 students), mixed ability  
**Timing:** 9:00–12:00 with a break (~3 hours; 10800s countdown on teacher dashboard)  
**Tools:** In-browser only  
**Accusation:** Paper case file — not submitted on site

---

## Core loop

1. **Investigate** — inbox, suspect files, evidence locker  
2. **Complete task** — cross-curricular activity on paper / in-browser mini-task  
3. **Earn code** — enter on site (`Enter code` tab)  
4. **Unlock evidence** — auto-tags suspect files for/against  
5. **Discuss** — whole class; teacher **archives** suspects on shared board  
6. **Interviews** — max 3 suspects per pair, prescripted  
7. **Twist** — sugar bowl photo (teacher stage)  
8. **Debrief** — paper hand-in; teacher reveals Mr Grant

---

## Suspects (15)

| Name | Role | Height | Print | Shoe / tread | Notes |
|------|------|--------|-------|--------------|-------|
| **Mr Grant** | PE Teacher | 5'8" medium | **arch** | 6 / wave | **Guilty** — motive: Sports Day snub |
| Mrs Patel | Dinner lady | 5'1" short | loop | 5 / circle | Final 5 |
| Mrs Sharpe | Deputy head | 5'6" medium | whorl | 7 / stripe | Final 5 |
| Miss Frost | Supply teacher | 5'5" medium | loop | 6 / stripe | Final 5 (size-6 red herring — stripe tread, not wave) |
| Jamie | Y6 work experience | 4'10" short | loop | 4 / dot | Final 5 |
| Mr Thornton | Caretaker | 6'0" tall | whorl | 10 / block | Found body 3:58pm |
| Mrs Chen | Year 6 TA | 5'2" short | loop | 5 / circle | |
| Mr Okafor | Year 5 teacher | 6'1" tall | loop | 9 / stripe | |
| Mr Blake | Headteacher | 5'11" tall | whorl | 8 / stripe | |
| Jane Morrison | Office admin | 5'0" short | loop | 4 / dot | Sign-in ledger |
| Mrs Walsh | Year 4 teacher | 5'7" | loop | 6 / wave | **Sign-in: off site** |
| Mr Khan | Maths teacher | 5'9" | whorl | 8 / block | **Sign-in: off site** |
| Sophie Lane | Nursery TA | 5'0" | whorl | 5 / circle | **Sign-in: sick** |
| Grace Okonkwo | Cleaner | 5'5" | loop | 7 / block | **Sign-in: pm shift** |
| Tom Ellis | IT technician | 5'8" | loop | 9 / stripe | **Sign-in: remote until 12** |

### Elimination order (pedagogical)

1. **Sign-in** (`LEDGER-5`) — ~5 archived: Walsh, Khan, Lane, Okonkwo, Ellis  
2. **Fingerprint** (`PRINT-ARCH`) — ~4 more: discuss whorl/tall mismatches among remainder  
3. **Footprint** (`TREAD-WAVE`) — ~1 more → **final five** on board after discussion  

Whittling on **paper** first; teacher **archive board** is official after each checkpoint.

---

## Evidence & codes

| Code | Evidence | Stage |
|------|----------|-------|
| `LEDGER-5` | Reception sign-in extract | evidence_signin |
| `PRINT-ARCH` | Mug fingerprint (ARCH) | evidence_fingerprint |
| `TREAD-WAVE` | Staff room mat footprint + tread | evidence_footprint |
| *(auto)* | Sugar bowl residue photo | twist_sugar (no code) |

CCTV height (**strictly under 5'11"** — 5'11" exactly ruled out) — deliver on footprint slide or verbally at footprint checkpoint.

### Forensic filter rules (code)

- **TREAD-WAVE:** full match = `wave` tread **and** shoe size **6** → only Mr Grant
- **CCTV height:** `heightInches < 71` (5'11" = 71″ is excluded; Blake out, Grant in)
- Partial matches (e.g. Frost: size 6, stripe tread) tagged neutral — discuss in class, not filter survivors

---

## Stages (teacher release order)

0. **pending** — Stand by  
1. **briefing** — Case opens  
2. **evidence_signin** — Ledger task  
3. **evidence_fingerprint** — Print task  
4. **evidence_footprint** — Footprint task  
5. **interviews** — Interview room opens (final 5)  
6. **twist_sugar** — NEW EVIDENCE banner + sugar bowl  
7. **debrief** — Paper accusation + reveal Grant  

---

## Interviews

- **Prescripted** — button questions, no free text  
- **Max 3 suspects per pair** (not all 5)  
- **Final five only:** Grant, Patel, Sharpe, Frost, Jamie  
- **Red herring question:** sports cupboard keys (evasive)  
- **Grant gotcha:** follow-up after cones/staffroom answer — cupboard should have been locked  

Interview notes append to suspect files automatically.

---

## Twist

- Teacher releases **twist_sugar** stage  
- **NEW EVIDENCE** banner for all students  
- Green residue on spoon in staff room sugar bowl  
- Confirms poison method; stresses staffroom access  
- Does **not** reopen archived suspects mechanically  

---

## Final accusation

- Students complete **printed** case file / accusation form  
- Site debrief stage instructs hand-in only  
- Teacher reveals: **Mr Grant** — arch print, wave tread size 6, staffroom access, Sports Day motive, interview contradiction  

---

## URLs

- `/` or no query — role picker  
- `?role=teacher` — Mission Control + archive board  
- `?role=student` — Investigation hub  

Session state syncs via `localStorage` events (works across tabs on **same browser profile**). For 8 separate devices in production, add a small sync backend later.

---

## Still open (non-blocking)

- Exact wording of shared interview question bank variants  
- Precise timetable mapping (which clock time = which stage)  
- In-browser mini-task UIs for maths / English / puzzle (codes can be handed out on paper until built)
