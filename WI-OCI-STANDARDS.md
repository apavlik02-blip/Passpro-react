# Wisconsin OCI Standards for Insurance Licensing Prep

Research snapshot: July 2026. Primary sources — Wis. Admin. Code ch. Ins 26
(prelicensing education), OCI Prelicensing & Exam Requirements pages, the OCI/PSI
Candidate Information Bulletin (rev. Dec 10, 2025), and the official PSI exam
content outlines (Series 22-01 Life, Series 22-03 Accident & Health), copies of
which live in this folder as `wi-life-outline.txt` and `wi-ah-outline.txt`.
**All PassPro question-bank and lesson content must trace back to these outlines.**

## 1. The regulatory landscape

- Regulator: Wisconsin **Office of the Commissioner of Insurance (OCI)**.
- Exam vendor: **PSI** (not Pearson VUE). Registration at test-takers.psiexams.com/wiins, $75/exam, fee non-refundable.
- Each exam: **100 scored questions + 5–10 unscored experimental, 2-hour limit, 70% to pass.**
- Candidates must bring a prelicensing **Certificate of Course Completion** to the test center (paper or electronic) or they cannot test.

## 2. Prelicensing education requirements (Wis. Admin. Code ch. Ins 26)

Every resident applicant for a life or accident & health license must complete
**at least 20 hours** of commissioner-approved prelicensing education **no more
than one year before testing** (Ins 26.04). The 20 hours break down per the
Ins 26 appendices (Appendix 3 = life, Appendix 4 = A&H):

| Section | Topic | Hours |
|---|---|---|
| A-I | Principles of insurance | 1 |
| A-II | General Wisconsin insurance laws | 4 |
| A-III | Ethics | 3 |
| B-IV | Line-specific (life OR accident & health) | 9 |
| B-V | Wisconsin law specific to the line | 3 |
| | **Total** | **20** |

Section A (8 hours) need not be repeated for a second line within 12 months.

Key provider rules (relevant if PassPro pursues OCI approval as an education provider):

- **Credit hour = 50 minutes of instruction, or 4,500 words** for self-study /
  online / correspondence formats. A full 20-hour self-study course therefore
  needs roughly **90,000 words** of instructional content.
- Course outlines submitted for approval must show specific hour allocations
  matching the appendices; commissioner decides within 60 days.
- Self-study students must pass a **proctored final exam** administered by an
  impartial, disinterested third party (remote proctoring allowed); a proctor
  affidavit goes to the provider before the student may sit the state exam.
- Providers issue Certificates of Prelicensing Education (hard copy or
  electronic) and keep attendance/transcript evidence.
- Exemptions: CLU/ChFC (life), CPCU, certain insurance degrees.

## 3. Official exam content outlines and weights

### Life (Series 22-01) — 100 questions

| Outline section | Weight | App domain(s) |
|---|---|---|
| 1.0 Insurance Regulation (1.1–1.3 licensing/state/federal) | 35% total | `insurance_regulation` (20) |
| 1.4 Wisconsin statutes for life & annuities | (part of 35%) | `wisconsin_regulation` (15) |
| 2.0 General Insurance | 10% | `general_insurance` |
| 3.0 Life Insurance Basics | 10% | `life_basics` |
| 4.0 Life Insurance Policies | 12% | `life_types` |
| 5.0 Policy Provisions, Options and Riders | 14% | `policy_provisions` |
| 6.0 Annuities | 10% | `annuities` |
| 7.0 Federal Tax Considerations | 5% | `taxation` |
| 8.0 Qualified Plans | 4% | `qualified_plans` |

### Accident & Health (Series 22-03) — 100 questions

| Outline section | Weight | App domain(s) |
|---|---|---|
| 1.0 Insurance Regulation (1.1–1.3) | 35% total | `insurance_regulation` (18) |
| 1.4 Wisconsin statutes for A&H | (part of 35%) | `wisconsin_health_regulation` (12) |
| 2.0 General Insurance | 10% | `general_insurance` (8) |
| 3.0 A&H Insurance Basics | 8% | `health_basics` + `health_plan_types` |
| 4.0 Disability Income | 8% | `disability_income` |
| 5.0 Medical Plans | 8% | `medical_plans` |
| 6.0 Group A&H | 8% | `group_health` |
| 7.0 Dental | 4% | `dental` |
| 8.0 Medicare (incl. Medicaid contrast) | 8% | `medicare`, `medicaid` |
| 9.0 Long-Term Care | 8% | `ltc` |
| 10.0 Federal Tax Considerations | 3% | `aca_hipaa` (also covers 5.5/5.7) |

`src/lib/examBlueprints.js` already encodes these weights; content volume is the gap.

### High-yield Wisconsin-specific topics (outline §1.4)

Life: required policy provisions, contestability, beneficiary designation,
replacement rules + disclosure, unfair marketing practices (twisting, churning,
rebating), policy summary/proposal requirements, annuity suitability,
life illustrations, interstate product compact, life settlements / STOLI
(s. 632.69).

A&H: right-to-return, insurer's right to contest, preexisting conditions, grace
period, continuation privileges, independent review & grievance, **the s. 632.895
mandated benefits list** (newborns, adopted children & grandchildren, handicapped
children, mammograms, colorectal/lead screening, diabetes, kidney disease, TMJ,
autism spectrum, breast reconstruction, child immunizations & hearing aids,
alcohol/drug/mental health (s. 632.89), chiropractic (s. 632.87), home care,
skilled nursing, maternity for dependents, contraceptives, emergency services,
cancer clinical trials, oral chemo parity, eye drop refills), step-therapy
protocols, advertising/suitability, outline of coverage.

## 4. Verified Wisconsin fact sheet (for content accuracy)

These recur constantly on the exam; content must use these values:

- Life insurance grace period: **31 days**.
- Individual life free look: **10 days**; replacement policies: **20–30 days**.
- Incontestability: **2 years from issue** (life); insurer's right to contest A&H similar 2-year structure.
- Wisconsin Insurance Security Fund: ch. 646 — insolvency backstop of last resort.
- Unfair marketing practices (s. 628.34): twisting (misrepresentation to induce replacement), churning (replacements to generate commissions), rebating (unlawful inducements), defamation, false advertising.
- Producer licensing: ch. 628; CE required for renewal; fiduciary/trust duties, no commingling, prompt premium remittance.
- Commissioner powers: s. 601.41–.42 (duties, examinations), s. 601.64–.65 (penalties, enforcement); hearings under ch. 227.
- Prelicensing: 20 hrs within 1 year before testing (Ins 26.04).

Anything cited to a statute section in the PSI outlines (`docs/wi-*-outline.txt`)
may be used as ground truth; **do not invent dollar limits or day counts not in
this doc or the outlines — flag them for human verification instead.**

## 5. What this means for PassPro content targets

- Question bank: to support ~3 non-repeating practice exams per line, hold
  roughly **3× the blueprint weight per domain** (e.g., 60 insurance_regulation,
  45 wisconsin_regulation, 42 policy_provisions …), ~550–600 questions total.
- Regulation is 35% of BOTH exams — the bank's weakest area today is its
  highest-weight section.
- Lessons: every outline subtopic in 22-01/22-03 should be covered by at least
  one lesson section; the s. 632.895 mandate list needs its own treatment.
- If/when PassPro seeks OCI provider approval: 4,500 words per credit hour,
  proctored final, certificates, and hour-allocated course outline per
  Appendix 3/4 become hard requirements (see Passpro vault compliance docs).

## 6. Property & Casualty lines (added September 2026)

Sources: PSI content outlines Series 22-05 Property, 22-07 Casualty, 22-09
Personal Lines (all effective July 15, 2022; 100 questions, 2 hours); OCI
Prelicensing and Exam Requirements pages; OCI PI-057 auto guide; DWD WKC-7317
employer facts; s. 631.36; s. 619.01; wisinsplan.com FAQ.

| Exam | Outline (items) | App blueprint (`src/lib/examBlueprints.js`) |
|---|---|---|
| Property 22-05 | Reg 35, General 8, Property basics 13, Dwelling 4, Homeowners 18, CPP 9, BOP 9, Other 4 | `PROPERTY_EXAM` |
| Casualty 22-07 | Reg 35, General 8, Casualty basics 13, Auto 14, CPP 10, BOP 10, WC 5, Other 5 | `CASUALTY_EXAM` |
| Personal Lines 22-09 | Reg 35, General 5, Property basics 20, Dwelling 10, Homeowners 10, Auto 10, Other 10 | `PERSONAL_LINES_EXAM` |

P&C question domains: `pc_regulation`, `wi_pc_statutes`, `wi_property_regulation`,
`wi_auto_regulation`, `pc_general_insurance`, `property_basics`, `casualty_basics`,
`dwelling`, `homeowners`, `commercial_property`, `businessowners_property`,
`personal_auto`, `commercial_auto`, `commercial_liability`,
`businessowners_liability`, `workers_comp`, `personal_other`, `umbrella`,
`casualty_other`. Source questions: `supabase/content/pc-questions/*.json`
(correct answer listed first); build the migration with
`node supabase/content/build-pc-migration.mjs`.

Verified Wisconsin P&C facts used in content:

- Prelicensing: 20 hours (8 general + 12 per line), valid 1 year; limited lines exempt.
- Auto: liability 25/50/10; UM required 25/50 (BI only); UIM optional but must be
  offered, 50/100 minimum if bought; med pay optional, $1,000 minimum; accident
  report to DMV within 10 days (injury, death, or PD over $1,000); WAIP = auto residual market.
- s. 631.36: policies in force under 60 days exempt from midterm-cancellation limits;
  midterm cancellation only for listed grounds, 10 days' notice; nonrenewal 60 days;
  less favorable renewal terms 60 days (45 days for personal lines P&C).
- WIP (property residual market): dwelling, homeowners, commercial; ACV only; max
  $350,000 dwelling/HO, $500,000 commercial; excludes vacant, farm, manufacturing.
- Worker's comp: insure with 3+ employees, or $500+ wages in a calendar quarter
  (by the 10th of the next quarter's first month); farms 6+ workers on any 20 days;
  WCRB assigns rejected employers; Uninsured Employers Fund; competitive state.

Flag for human review: minors' sponsor liability wording, standard fire policy
specifics (intentionally not tested), and the lender anti-tying phrasing.
