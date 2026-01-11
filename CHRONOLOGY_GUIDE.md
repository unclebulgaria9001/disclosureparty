# Chronology Entry Guide

## Quick Reference

This guide explains how to add new events to `dist/chronology.md` with proper formatting, required tags, and structure.

---

## Entry Format

```markdown
## YYYY, Month DD - Event Title #CategoryTag1 #CategoryTag2 #GeoTag

Event description goes here. Include key facts, witnesses, official statements, 
and context. Be factual and objective. Multiple paragraphs are allowed.

**Links:**

[Source Title](https://source-url.com)
[Another Source](https://another-url.com)

**Photos:**

![Image description](images/yyyy-event-name-1.jpg)
![Another image](images/yyyy-event-name-2.jpg)

**Details:**

Additional detailed information, analysis, or extended context can go here.
This section is optional but useful for longer explanations.

\
```

---

## Date Format Options

**Full Date (Preferred):**
```markdown
## 2023, July 26 - Event Title
```

**Month and Year:**
```markdown
## 2023, July - Event Title
```

**Year Only:**
```markdown
## 2023 - Event Title
```

**Historical Dates (BCE/CE):**
```markdown
## 1561 CE - Event Title
## 329 BCE - Event Title
```

---

## Required Components

### 1. Header Line
- Must start with `##` (markdown H2)
- Date in format: `YYYY, Month DD` or variations
- Dash separator: ` - `
- Event title (clear, descriptive)
- **At least ONE category tag** (starts with `#`)
- **At least ONE geographic tag** (starts with `#`)

### 2. Description
- First paragraph after header
- Factual, objective language
- Include who, what, when, where, why
- Cite key facts and sources
- Multiple paragraphs allowed

### 3. Links Section (Optional but Recommended)
```markdown
**Links:**

[Link Text](https://url.com)
```

### 4. Photos Section (Optional)
```markdown
**Photos:**

![Alt text description](images/filename.jpg)
```
- Images must be in `dist/images/` directory
- Use format: `yyyy-event-name-number.jpg`
- Alt text should describe the image

### 5. Details Section (Optional)
```markdown
**Details:**

Extended information here.
```

### 6. Enhanced Metadata Fields (Recommended for Major Events)

For significant events, include enhanced metadata to support correlation analysis:

```markdown
**Event Type**: Primary_Classification, Secondary_Classification
**Credibility**: X/5 (Justification)
**Primary Actors**: Names and roles
**Agencies**: Government agencies involved
**Sensor Type**: Detection methods (if applicable)
**Related Events**:
- RELATIONSHIP → Event ID/Date (evidence: brief explanation)
**Causal Chain**: Chain_Name
**Immediate Outcomes**: Direct results
**Policy Impact**: Legislative/regulatory changes
**Evidence Strength**: Strong/Moderate/Weak (X/5) - Justification
```

---

## Credibility Scoring System

Rate each event's credibility on a 1-5 scale:

### 5/5 - Highest Credibility
- Official government documents (DoD, ODNI, congressional records)
- IG-verified testimony under oath
- Multiple independent primary sources
- Authenticated sensor data with chain of custody
- Peer-reviewed scientific studies
- Official press releases from government agencies

**Examples:**
- ODNI Preliminary Assessment (official IC report)
- Congressional hearing testimony (sworn, on record)
- DoD video authentication statements

### 4/5 - High Credibility
- Named official sources (not under oath)
- Single authoritative government document
- Credible investigative journalism with verification
- Military/intelligence personnel on record
- Academic research with methodology disclosed

**Examples:**
- Navy spokesperson statements
- Investigative journalist reports with named sources
- Military incident reports

### 3/5 - Moderate Credibility
- Anonymous official sources (credible outlet)
- Unverified single-source claims
- Credible witness testimony (not sworn)
- FOIA documents with heavy redactions
- Secondary source reporting

**Examples:**
- Anonymous whistleblower accounts
- Heavily redacted documents
- Single witness reports

### 2/5 - Low Credibility
- Unverified leaks
- Anonymous sources (questionable outlet)
- Single witness with no corroboration
- Rumor from semi-credible sources

**Examples:**
- Unverified social media leaks
- Anonymous forum posts with some details
- Uncorroborated single-source claims

### 1/5 - Minimal Credibility
- Unsubstantiated rumors
- No verifiable sources
- Contradicted by evidence
- Known disinformation

**Examples:**
- Internet rumors with no sources
- Claims contradicted by official records
- Debunked stories

---

## Causal Relationship Types

When documenting **Related Events**, use these relationship types:

### CAUSES →
Direct causal relationship with documentary evidence
- Example: "2017 NYT article CAUSES → 2018 congressional inquiries (evidence: hearing transcripts cite article)"

### ENABLES →
Creates conditions that allow subsequent event
- Example: "UAPTF establishment ENABLES → ODNI assessment (evidence: UAPTF conducted analysis)"

### RESPONDS_TO →
Direct response to prior event
- Example: "Navy guidelines RESPONDS_TO → NYT disclosure (evidence: Navy statement references increased attention)"

### CORRELATES_WITH →
Temporal correlation, plausible connection, no direct evidence
- Example: "TTSA activities CORRELATES_WITH → Navy guidelines (evidence: similar timeframe)"

### CONTRADICTS →
Conflicts with or disputes prior event/claim
- Example: "2022 NRO emails CONTRADICTS → 2015 NRO FOIA response (evidence: emails show UAP coordination)"

### DOCUMENTS →
Provides evidence or documentation of event
- Example: "Corbell video DOCUMENTS → USS Omaha incident (evidence: video shows actual incident)"

---

## Evidence Strength Assessment

Rate the strength of causal links:

### Strong (5/5)
- Direct documentary evidence (memos, emails, meeting minutes)
- Explicit statements in congressional record
- Timeline with <30 day gap and clear mechanism
- Multiple independent confirmations

### Moderate (3/5)
- Circumstantial documentation
- Temporal correlation with plausible mechanism
- Single authoritative source
- 30-90 day gap with logical connection

### Weak (1/5)
- Temporal correlation only
- >90 day gap
- Speculative mechanism
- No direct documentation

---

## Major Causal Chains

Tag events with these established causal chains:

1. **Media_Political_Legislative_Chain_1**: Media disclosure → Congressional pressure → Legislation → Oversight
2. **Whistleblower_Investigation_Chain_2**: Whistleblower → IG investigation → Congressional inquiry → FOIA releases
3. **Incidents_Security_Policy_Chain_3**: UAP incidents → Threat assessment → Policy changes → Enhanced capabilities
4. **Scientific_Legitimization_Chain_4**: Official studies → Academic interest → Civilian research → Data sharing
5. **International_Coordination_Chain_5**: Bilateral discussions → Five Eyes coordination → Standardized protocols

---

## Enhanced Entry Example

```markdown
## 2021, June 25 - ODNI Preliminary Assessment on UAP Released to Congress #OfficialReport #CongressionalMandated #144Observations #PolicyDriver #USA

The Office of the Director of National Intelligence (ODNI) released the "Preliminary Assessment: Unidentified Aerial Phenomena" report to Congress, mandated by the FY2021 Intelligence Authorization Act. The unclassified report analyzed 144 UAP observations by U.S. Armed Forces personnel from November 2004 to March 2021.

**Event Type**: Official_Report, Congressional_Mandate, Intelligence_Assessment
**Credibility**: 5/5 (Official ODNI report to Congress, mandated by law, multi-agency coordination)
**Primary Actors**: Avril Haines (DNI), ODNI, UAPTF, Navy, FBI, multiple IC agencies
**Agencies**: ODNI, UAPTF, Navy, Air Force, FBI, DIA, NGA, NRO
**Sensor Type**: Multiple sensors (radar, FLIR, EO, visual), 80 incidents with multi-sensor data
**Related Events**:
- RESPONDS_TO → 2020-2021 NDAA UAP reporting requirements (evidence: congressionally mandated report)
- ENABLED_BY → 2019-04-24 Navy reporting guidelines (evidence: increased reporting fed 144-observation dataset)
- CAUSES → 2022-07-20 AARO establishment (evidence: report's recommendations drove broader mandate)
**Causal Chain**: Media_Political_Legislative_Chain_1, Incidents_Security_Policy_Chain_3
**Immediate Outcomes**: Legitimized UAP as national security concern; identified data gaps; drove legislative action
**Policy Impact**: Expanded NDAA requirements; AARO creation with enhanced authorities; increased IC coordination
**Evidence Strength**: Strong (5/5) - Official IC product, clear causal links to downstream legislation

**Links:**

[ODNI Preliminary Assessment PDF](https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf)
[Congressional Mandate - FY2021 IAA](https://www.congress.gov/116/plaws/publ260/PLAW-116publ260.pdf)

\
```

### 6. Separator
- End each entry with `\` on its own line
- Followed by blank line

---

## Category Tags (Select ALL that apply)

### Government & Policy
- `#WhistleblowerDisclosures` - Testimony from officials, insiders
- `#FOIARelease` - Freedom of Information Act releases
- `#LegislationPolicy` - Laws, policies, regulations
- `#CongressionalHearings` - Congressional testimony and hearings
- `#LeaksDeclass` - Leaked or declassified documents

### Military & Encounters
- `#MilitaryEncounters` - Military observations and encounters
- `#UnderwaterUSO` - Underwater/USO events
- `#SpaceSatellite` - Space-based observations
- `#CrashRetrievals` - Alleged crash and retrieval events

### Civilian & Scientific
- `#CivilianSightings` - Civilian observations
- `#ScientificStudies` - Scientific research and analysis
- `#AbductionCEIII` - Close encounters of the third kind

### Communication
- `#Outbound` - Earth's messages to space (Arecibo, Voyager, etc.)
- `#Inbound` - Potential NHI communications (Wow! Signal, etc.)
- `#ContactAttempt` - Deliberate contact attempts

### Other
- `#ReligiousCultural` - Religious or cultural phenomena
- `#HistoricalPreModern` - Events before 1947

---

## Geographic Tags (Select ALL that apply)

**Required: At least ONE geographic tag per entry**

- `#USA` - United States
- `#Canada` - Canada
- `#Mexico` - Mexico
- `#Europe` - European countries (general)
- `#UnitedKingdom` - United Kingdom specifically
- `#LatinAmerica` - Latin American countries
- `#Asia` - Asian countries
- `#MiddleEast` - Middle Eastern countries
- `#Africa` - African countries
- `#Australia` - Australia/Oceania
- `#International` - Multiple countries or global events
- `#Antarctica` - Antarctic region

---

## Complete Example

```markdown
## 1947, February - Operation Highjump Concludes Early #MilitaryEncounters #HistoricalPreModern #Antarctica #USA

Operation Highjump, officially designated as the United States Navy Antarctic Developments Program, was a large-scale Antarctic expedition led by Admiral Richard E. Byrd. The operation involved 4,700 personnel, 13 ships, and 33 aircraft, making it the largest Antarctic expedition to date. The mission was scheduled to last 6-8 months but was abruptly terminated after only 8 weeks. Official explanations cited weather conditions and equipment failures, but rumors persisted about encounters with unknown aircraft and advanced technology. Admiral Byrd's alleged diary entries and post-expedition statements about "enemy aircraft" that "can fly from pole to pole at incredible speeds" have fueled decades of speculation about what was actually discovered during the operation.

**Links:**

[Naval History and Heritage Command - Operation Highjump](https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/o/operation-highjump.html)
[National Science Foundation - Antarctic History](https://www.nsf.gov/geo/opp/antarct/history.jsp)

**Details:**

The expedition included three task forces: Central Group (led by Admiral Byrd), Western Group, and Eastern Group. The operation established Little America IV base and conducted extensive aerial photography and mapping. Several aircraft were lost during the operation, officially attributed to harsh weather conditions. The expedition's early termination and subsequent secrecy surrounding certain aspects of the mission have made it a subject of ongoing interest in UAP research communities.

\
```

---

## Best Practices

### DO:
✅ Use factual, objective language
✅ Cite primary sources when possible
✅ Include official statements or documents
✅ Provide context and significance
✅ Link to images/videos when available
✅ Use multiple category tags if applicable
✅ Always include at least one geographic tag
✅ End with `\` separator

### DON'T:
❌ Use speculation or unverified claims
❌ Editorialize or inject personal opinions
❌ Submit duplicate events
❌ Forget geographic tags
❌ Use vague or unclear titles
❌ Skip the description section
❌ Forget the `\` separator at the end

---

## Tag Selection Guidelines

### Multiple Category Tags
If an event involves multiple aspects, use all relevant tags:
```markdown
## 2023, July 26 - Congressional UAP Hearing #CongressionalHearings #WhistleblowerDisclosures #MilitaryEncounters #USA
```

### Geographic Tags for Multi-Location Events
- Use `#International` for truly global events
- Use multiple country tags if event spans specific countries
- Use `#USA` + other tags for international collaborations

### Historical Events
- Always include `#HistoricalPreModern` for pre-1947 events
- Still include other relevant category tags

---

## Image Guidelines

### File Naming
```
yyyy-event-name-number.extension
```
Examples:
- `1947-operation-highjump-1.jpg`
- `2023-congressional-hearing-2.png`

### Image Format
- **Preferred**: JPG, PNG
- **Size**: Optimized for web (< 500KB preferred)
- **Location**: `dist/images/` directory

### Alt Text
Write descriptive alt text:
```markdown
![Admiral Byrd with expedition crew in Antarctica](images/1947-operation-highjump-1.jpg)
```

---

## Verification Checklist

Before submitting, verify:

- [ ] Date is accurate and properly formatted
- [ ] Title is clear and descriptive
- [ ] At least ONE category tag included
- [ ] At least ONE geographic tag included
- [ ] Description is factual and objective
- [ ] At least one reliable source linked
- [ ] Images are properly formatted (if included)
- [ ] Entry ends with `\` separator
- [ ] No duplicate of existing event
- [ ] Proper markdown formatting throughout

---

## Common Mistakes to Avoid

### Missing Geographic Tag
```markdown
❌ ## 2023, July - Event #CongressionalHearings
✅ ## 2023, July - Event #CongressionalHearings #USA
```

### Wrong Date Format
```markdown
❌ ## 07/26/2023 - Event
✅ ## 2023, July 26 - Event
```

### Missing Separator
```markdown
❌ ## 2023 - Event
   Description here.
   
   ## 2024 - Next Event

✅ ## 2023 - Event
   Description here.
   
   \
   
   ## 2024 - Next Event
```

### No Category Tags
```markdown
❌ ## 2023, July - Event #USA
✅ ## 2023, July - Event #CongressionalHearings #USA
```

---

## Submission Process

1. **Research**: Verify facts and gather reliable sources
2. **Format**: Use the template above
3. **Review**: Check against verification checklist
4. **Submit**: 
   - Via GitHub Issues: [New Event Template](https://github.com/unclebulgaria9001/disclosureparty/issues/new?template=new-event.md)
   - Via Pull Request: Edit `dist/chronology.md` directly
5. **Discussion**: Community review and verification
6. **Approval**: Maintainers add to chronology
7. **Publication**: Automatically deployed to GitHub Pages

---

## Questions?

- **GitHub Issues**: https://github.com/unclebulgaria9001/disclosureparty/issues
- **Contributing Guide**: See `CONTRIBUTING.md`
- **Full Documentation**: See `README.md`

---

**Last Updated**: January 2026
