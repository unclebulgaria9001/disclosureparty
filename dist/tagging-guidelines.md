# UAP Chronology Tagging Guidelines & Recommendations

## Current Issues

1. **Ancient/Historical Events Missing Tags** - BCE/CE events (70+ entries) lack `#HistoricalPreModern` tags
2. **Inconsistent Tag Application** - Some events have 10+ tags, others have none
3. **Limited Filtering Capability** - Only 13 category filters, need more granular options
4. **No Geographic Tagging** - Can't filter by region/country
5. **No Source Type Tagging** - Can't distinguish between official docs, leaks, testimonies

## Recommended Enhanced Tag Taxonomy

### 1. Primary Categories (Current - Keep)
- `#LegislationPolicy` - Laws, acts, executive orders
- `#CongressionalHearings` - Testimonies, briefings
- `#LeaksDeclass` - FOIA releases, declassified documents
- `#WhistleblowerDisclosures` - Grusch, Elizondo, others
- `#MilitaryEncounters` - Navy, Air Force, radar contacts
- `#CivilianSightings` - Public observations
- `#AbductionCEIII` - Close encounters, abductions
- `#CrashRetrievals` - Recovery programs, artifacts
- `#UnderwaterUSO` - Submerged objects
- `#SpaceSatellite` - Orbital detections
- `#ScientificStudies` - AARO reports, NASA studies
- `#HistoricalPreModern` - Pre-1950 events
- `#ReligiousCultural` - Vatican, religious context

### 2. NEW: Time Period Tags
- `#Ancient` - BCE to 999 CE
- `#Medieval` - 1000-1499 CE
- `#EarlyModern` - 1500-1899
- `#20thCentury` - 1900-1999
- `#21stCentury` - 2000-present
- `#PostDisclosure` - 2017+ (Gimbal/GoFast era)
- `#ModernEra` - 2020+ (UAPTF/AARO era)

### 3. NEW: Geographic Tags
- `#USA` - United States
- `#Europe` - European countries
- `#Asia` - Asian countries
- `#LatinAmerica` - Central/South America
- `#MiddleEast` - Middle Eastern countries
- `#Africa` - African countries
- `#Oceania` - Australia, Pacific islands
- `#Global` - Multiple regions/worldwide
- `#NuclearSite` - Near nuclear facilities
- `#MilitaryBase` - Near military installations

### 4. NEW: Evidence Type Tags
- `#VideoEvidence` - Video footage
- `#PhotoEvidence` - Photographs
- `#RadarData` - Radar contacts
- `#SensorData` - Infrared, electromagnetic
- `#PhysicalTrace` - Ground traces, radiation
- `#MultipleWitness` - Multiple independent witnesses
- `#OfficialDocument` - Government documents
- `#Testimony` - Witness testimony
- `#BiologicalEvidence` - Alleged biological samples

### 5. NEW: Source Authority Tags
- `#OfficialRelease` - Government released
- `#FOIARelease` - FOIA obtained
- `#Leak` - Unauthorized release
- `#Whistleblower` - Whistleblower disclosure
- `#Media` - Media investigation
- `#Academic` - Academic research
- `#Classified` - Known classified info
- `#Unverified` - Unconfirmed claims
- `#Debunked` - Debunked or disputed

### 6. NEW: Phenomenon Type Tags
- `#Aerial` - Airborne objects
- `#Transmedium` - Air-water transition
- `#Underwater` - Submerged only
- `#Space` - Orbital/deep space
- `#GroundBased` - On ground
- `#HighSpeed` - Extreme velocity
- `#Hovering` - Stationary hover
- `#Formation` - Multiple objects
- `#LightPhenomena` - Light-based

### 7. NEW: Impact/Significance Tags
- `#NationalSecurity` - Security implications
- `#PublicSafety` - Safety concerns
- `#TechnologyImplications` - Tech advancement potential
- `#BiologicalContact` - Biological entity contact
- `#CommunicationAttempt` - Attempted communication
- `#EnvironmentalImpact` - Environmental effects
- `#HealthEffects` - Physical/mental health impacts
- `#MassSighting` - Large number of witnesses

## Recommended Tagging Rules

### Rule 1: Minimum Tags Per Event
Every event should have AT LEAST:
1. One Primary Category tag
2. One Time Period tag (if applicable)
3. One Geographic tag
4. One Evidence Type tag (if evidence exists)

### Rule 2: Ancient Events (BCE to 999 CE)
**MUST include:**
- `#HistoricalPreModern`
- `#Ancient`
- `#ReligiousCultural` (if religious context)
- Geographic tag

**Example:**
```markdown
## 1290 CE - Byland Abbey Silver Disc #HistoricalPreModern #Ancient #CivilianSightings #Medieval #Europe #MultipleWitness
```

### Rule 3: Modern Government Events
**MUST include:**
- Primary category
- `#21stCentury` or `#PostDisclosure` or `#ModernEra`
- `#USA` (or relevant country)
- Source authority tag
- Evidence type (if applicable)

**Example:**
```markdown
## 2024, March 7 - AARO Historical Record Report Volume 1 #ScientificStudies #AARO #OfficialReport #ModernEra #USA #OfficialRelease #OfficialDocument
```

### Rule 4: Contact Events
**MUST include:**
- `#outbound` OR `#inbound` OR `#contact-attempt`
- Time period tag
- Geographic tag
- `#CommunicationAttempt` (if applicable)

### Rule 5: Maximum Tags
- Maximum 15 tags per event
- Prioritize most relevant/specific tags

## Enhanced Timeline Filter Recommendations

### Current Filters (Keep)
- Event Type: All, Outbound, Inbound, Contact, Chronology
- Time Period: 2026, 2025, 2024... down to Ancient
- Category Tags: 13 primary categories

### NEW Filter Groups to Add

#### 1. Time Era Filter
```
☐ Ancient (BCE-999 CE)
☐ Medieval (1000-1499)
☐ Early Modern (1500-1899)
☐ 20th Century
☐ 21st Century
☐ Post-Disclosure (2017+)
☐ Modern Era (2020+)
```

#### 2. Geographic Filter
```
☐ USA
☐ Europe
☐ Asia
☐ Latin America
☐ Middle East
☐ Africa
☐ Oceania
☐ Global/Multiple
☐ Nuclear Sites
☐ Military Bases
```

#### 3. Evidence Type Filter
```
☐ Video
☐ Photo
☐ Radar
☐ Sensor Data
☐ Physical Trace
☐ Multiple Witnesses
☐ Official Documents
☐ Testimony
```

#### 4. Source Authority Filter
```
☐ Official Release
☐ FOIA
☐ Leak
☐ Whistleblower
☐ Media
☐ Academic
☐ Verified
☐ Unverified
```

#### 5. Phenomenon Type Filter
```
☐ Aerial
☐ Transmedium
☐ Underwater
☐ Space
☐ High Speed
☐ Hovering
☐ Formation
☐ Light Phenomena
```

## Implementation Priority

### Phase 1: Critical (Immediate)
1. ✅ Add `#HistoricalPreModern` to all BCE/CE events
2. ✅ Add `#Ancient` or `#Medieval` to pre-1500 events
3. ✅ Add geographic tags to all events

### Phase 2: High Priority (Next)
1. Add evidence type tags to events with evidence
2. Add source authority tags to all events
3. Update timeline.html with new filter groups

### Phase 3: Enhancement (Future)
1. Add phenomenon type tags
2. Add impact/significance tags
3. Create advanced search/filter UI
4. Add tag combination presets (e.g., "Verified Military Encounters")

## Search/Filter Use Cases

With enhanced tagging, users can filter for:

1. **Ancient European sightings with multiple witnesses**
   - `#Ancient` + `#Europe` + `#MultipleWitness`

2. **Modern verified military encounters with video**
   - `#MilitaryEncounters` + `#ModernEra` + `#VideoEvidence` + `#OfficialRelease`

3. **Nuclear site incidents with physical evidence**
   - `#NuclearSite` + `#PhysicalTrace` + `#USA`

4. **Whistleblower disclosures about crash retrievals**
   - `#WhistleblowerDisclosures` + `#CrashRetrievals` + `#Testimony`

5. **All FOIA-released documents from 2020+**
   - `#FOIARelease` + `#ModernEra` + `#OfficialDocument`

## Tag Maintenance

- Review tags quarterly for consistency
- Update tag taxonomy as new categories emerge
- Deprecate unused tags
- Document tag changes in changelog
- Maintain tag statistics dashboard

## Notes

- Tags are case-sensitive in code but displayed with proper casing
- Use kebab-case for multi-word tags: `#MultipleWitness` not `#Multiple-Witness`
- Avoid redundant tags (e.g., don't use both `#USA` and `#UnitedStates`)
- Geographic tags should be most specific applicable (country > region)
- When in doubt, err on the side of more specific tags
