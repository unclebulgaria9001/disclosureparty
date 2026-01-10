# Contributing to UAP/UFO/NHI Disclosure Database

Thank you for your interest in contributing to the UAP/UFO/NHI Disclosure Database! This project relies on community contributions to maintain accuracy and comprehensiveness.

## 🎯 Ways to Contribute

### 1. Submit New Events
Have information about a UAP/UFO/NHI event that's not in our database? We'd love to hear about it!

**[Submit a New Event →](https://github.com/unclebulgaria9001/disclosureparty/issues/new?template=new-event.md)**

### 2. Report Corrections
Found an error or have additional information about an existing event?

**[Submit a Correction →](https://github.com/unclebulgaria9001/disclosureparty/issues/new?template=correction.md)**

### 3. Suggest Features
Have ideas for improving the database or visualization tools?

**[Request a Feature →](https://github.com/unclebulgaria9001/disclosureparty/issues/new?template=feature-request.md)**

## 📋 Submission Guidelines

### Event Criteria

Events should meet at least one of these criteria:
- **Official Documentation**: Government documents, FOIA releases, official statements
- **Congressional/Legislative**: Hearings, legislation, policy changes
- **Military/Official Encounters**: Documented military or official observations
- **Whistleblower Disclosures**: Credible testimony from officials or insiders
- **Scientific Studies**: Peer-reviewed research or official scientific investigations
- **Mass Sightings**: Multiple independent witnesses with corroborating evidence
- **Historical Significance**: Well-documented historical events with lasting impact
- **Communication Attempts**: Earth's outbound messages or potential inbound signals

### Quality Standards

**Required Information:**
- **Accurate Date**: Year at minimum; month and day if known
- **Descriptive Title**: Clear, factual description of the event
- **Detailed Description**: What happened, who was involved, key facts
- **Reliable Sources**: At least one credible source (official documents, news, research)
- **Appropriate Tags**: Category and geographic tags for filtering

**Best Practices:**
- ✅ Use factual, objective language
- ✅ Cite primary sources when possible
- ✅ Include official statements or documents
- ✅ Provide context and significance
- ✅ Link to images/videos when available
- ❌ Avoid speculation or unverified claims
- ❌ Don't editorialize or inject personal opinions
- ❌ Don't submit duplicate events

## 🏷️ Tagging System

### Category Tags (Select all that apply)

**Government & Policy:**
- `#WhistleblowerDisclosures` - Testimony from officials, insiders
- `#FOIARelease` - Freedom of Information Act releases
- `#LegislationPolicy` - Laws, policies, regulations
- `#CongressionalHearings` - Congressional testimony and hearings
- `#LeaksDeclass` - Leaked or declassified documents

**Military & Encounters:**
- `#MilitaryEncounters` - Military observations and encounters
- `#UnderwaterUSO` - Underwater/USO events
- `#SpaceSatellite` - Space-based observations
- `#CrashRetrievals` - Alleged crash and retrieval events

**Civilian & Scientific:**
- `#CivilianSightings` - Civilian observations
- `#ScientificStudies` - Scientific research and analysis
- `#AbductionCEIII` - Close encounters of the third kind

**Communication:**
- `#Outbound` - Earth's messages to space
- `#Inbound` - Potential NHI communications
- `#ContactAttempt` - Deliberate contact attempts

**Other:**
- `#ReligiousCultural` - Religious or cultural phenomena
- `#HistoricalPreModern` - Events before 1947

### Geographic Tags (Select all that apply)

- `#USA` - United States
- `#Canada` - Canada
- `#Mexico` - Mexico
- `#Europe` - European countries
- `#UnitedKingdom` - United Kingdom
- `#LatinAmerica` - Latin American countries
- `#Asia` - Asian countries
- `#MiddleEast` - Middle Eastern countries
- `#Africa` - African countries
- `#Australia` - Australia/Oceania
- `#International` - Multiple countries or global
- `#Antarctica` - Antarctic region

## 📝 Markdown Format

Events are stored in `dist/chronology.md` using this format:

```markdown
## YYYY, Month DD - Event Title #CategoryTag1 #CategoryTag2 #GeoTag

Event description goes here. Include key facts, witnesses, official statements, 
and context. Be factual and objective.

**Links:**

[Source Title](https://source-url.com)
[Another Source](https://another-url.com)

**Photos:**

![Image description](images/yyyy-event-name-1.jpg)
![Another image](images/yyyy-event-name-2.jpg)

**Details:**

Additional detailed information, analysis, or extended context can go here.

\
```

## 🔍 Review Process

1. **Submission**: Submit via GitHub Issues using the appropriate template
2. **Initial Review**: Maintainers review for completeness and quality
3. **Verification**: Sources are checked and facts verified
4. **Discussion**: Community feedback and additional sources may be requested
5. **Approval**: Event is added to chronology.md with proper formatting
6. **Publication**: Changes are committed and deployed to GitHub Pages

## 🤝 Code Contributions

### Development Setup

```bash
# Clone the repository
git clone https://github.com/unclebulgaria9001/disclosureparty.git
cd disclosureparty

# Start local server
python -m http.server 8000
# or
npx http-server -p 8000

# Open in browser
http://localhost:8000/timeline.html
```

### Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Visualization**: D3.js v7 (timeline), Leaflet (maps)
- **Data Format**: Markdown with custom parsing
- **Styling**: CSS Grid, Flexbox, responsive design
- **PWA**: Service Worker, Web App Manifest
- **i18n**: Custom translation system

### Code Style

- Use semantic HTML5 elements
- Follow existing code formatting and naming conventions
- Comment complex logic
- Test on multiple browsers and devices
- Ensure mobile responsiveness
- Maintain accessibility standards

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test thoroughly (timeline, map, list views)
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request with description of changes

## 📸 Adding Images

Images should be:
- **Format**: JPG, PNG, or WebP
- **Size**: Optimized for web (< 500KB preferred)
- **Naming**: `yyyy-event-name-number.jpg` (e.g., `2023-uap-hearing-1.jpg`)
- **Location**: `dist/images/` directory
- **Attribution**: Include source in commit message

## 🌐 Translations

We welcome translations! Current languages:
- English, Chinese (Simplified), Spanish, Arabic, Portuguese, Russian, Japanese, Korean, French, German, Italian, Hindi, Turkish, Polish, Vietnamese

To add a new language:
1. Edit `i18n/translations.js`
2. Add language code and translations
3. Test all pages with new language
4. Submit PR with screenshots

## ❓ Questions?

- **General Questions**: Open a [Discussion](https://github.com/unclebulgaria9001/disclosureparty/discussions)
- **Bug Reports**: Open an [Issue](https://github.com/unclebulgaria9001/disclosureparty/issues)
- **Feature Ideas**: Use the [Feature Request template](https://github.com/unclebulgaria9001/disclosureparty/issues/new?template=feature-request.md)

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Recognition

All contributors are valued! Significant contributions will be recognized in the project documentation.

---

**Thank you for helping document UAP/UFO/NHI disclosure history!**
