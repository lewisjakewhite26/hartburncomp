# Forensics Mission Control: Lesson Flow

This document outlines the narrative flow and technical stages for the "Forensics Mission Control" exercise. The Teacher (Admin) controls these stages in real-time, automatically updating the UI for all connected Student (Client) operatives.

---

## Stage 0: Pending (Briefing)
**Admin Action:** *None (Default State)*
- **Narrative Context:** The mission is on standby. Operatives are waiting for the initial briefing and secure connection to the command center.
- **Student View:** 
  - Evidence Locker shows: "Awaiting Evidence - Stand by for command to release the first batch of encrypted data."
  - Inbox is empty.
- **Teacher View:** Slide deck displays mission briefing materials.

## Stage 1: Evidence 01
**Admin Action:** *Clicks `[01] Release Evidence 01`*
- **Narrative Context:** The first break in the case. Primary suspect communication logs have been successfully decrypted.
- **Student View:**
  - Secure Inbox receives a new message: *"New Intel: Comm Logs - Decrypted comms attached."*
  - Evidence Locker updates to active file mode for Evidence 01.
- **Teacher View:** Slide deck advances to the Evidence 01 review phase.

## Stage 2: Evidence 02
**Admin Action:** *Clicks `[02] Release Evidence 02`*
- **Narrative Context:** The cyber-forensics team detects network intrusion signatures.
- **Student View:**
  - Secure Inbox receives a new message: *"New Intel: PCAP Data - Network trace files ready for analysis."*
  - Evidence Locker updates to active file mode for Evidence 02.
- **Teacher View:** Slide deck advances to PCAP analysis and network intrusion signatures.

## Stage 3: The Twist
**Admin Action:** *Clicks `[!] Trigger Twist`*
- **Narrative Context:** A sudden development disrupts the current theory. The primary suspect's alibi is verified, forcing students to pivot their investigation and look for a new vector.
- **Student View:**
  - Secure Inbox receives a high-priority message: *"URGENT: Alibi Verified - Primary suspect cleared. Pivot investigation."*
  - Evidence Locker alerts the students to the narrative shift.
- **Teacher View:** Slide deck displays the new parameters of the investigation.

## Stage 4: Final Prosecution
**Admin Action:** *Clicks `[*] Final Prosecution`*
- **Narrative Context:** Time is up. Students must compile their findings, trace the correct attribution, and submit the final flag.
- **Student View:**
  - Operatives are prompted to use the Submission Terminal to enter their final puzzle flag (e.g., `flag{...}`).
- **Teacher View:** Slide deck displays the debriefing or the final correct timeline of events.

---

### Mechanics Notes
- **Countdown Timer:** The 60-minute countdown timer runs globally on the Teacher Dashboard to keep pacing strict.
- **Connectivity Grid:** The Teacher Dashboard features a 16-unit grid representing active student connections.
- **Submission:** Students use the bottom Submission Terminal to submit their flags. You can expand the backend logic in `StudentDashboard.tsx` to validate these flags against a known array of correct answers.
