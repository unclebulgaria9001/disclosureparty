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
