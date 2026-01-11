# UAP Disclosure Database - Architecture Overview

## Data Source (Single Source of Truth)

All visualization pages use the same data source:
- **File**: `dist/chronology.md`
- **Format**: Markdown with structured metadata
- **Size**: 3,300+ lines, 1,000+ events

## Visualization Pages (All Use Same Data)

### 1. Chronology Viewer (`viewer.html`)
- **Data Source**: `dist/chronology.md`
- **View Type**: Scrollable list with markdown rendering
- **Features**: Search, filters, detailed event display
- **Parsing**: Extracts full markdown content per event

### 2. Timeline Visualization (`timeline.html`)
- **Data Source**: `dist/chronology.md`
- **View Type**: D3.js interactive timeline
- **Features**: Zoom, pan, time period filters, category filters
- **Parsing**: Extracts date, title, tags, photos

### 3. Network Graph (`network-graph.html`)
- **Data Source**: `dist/chronology.md`
- **View Type**: vis.js directed graph
- **Features**: Relationship visualization, causal chains, centrality
- **Parsing**: Extracts date, title, credibility, **Related Events** section

### 4. GeoTimeline Map (`timeline.html#map`)
- **Data Source**: `dist/chronology.md`
- **View Type**: Leaflet.js world map with markers
- **Features**: Geographic clustering, location-based filtering
- **Parsing**: Extracts location tags, coordinates, dates

## Navigation Menu (Unified Across All Pages)

All pages include the same navigation:
```
📡 NHI MESSAGE → viewer.html#contact
📋 CHRONOLOGY → viewer.html
📊 TIMELINE VIZ → timeline.html
🕸️ NETWORK GRAPH → network-graph.html
🗺️ GEOTIMELINE → timeline.html#map
ℹ️ ABOUT → about.html
```

## Data Parsing Strategy

Each view parses `dist/chronology.md` differently based on needs:

### Chronology Viewer
```javascript
const docs = {
    chronology: 'dist/chronology.md'
};
// Parses full markdown with marked.js
```

### Timeline Viz
```javascript
async function loadChronology() {
    const response = await fetch('dist/chronology.md');
    const text = await response.text();
    parseChronologyEvents(text);
}
// Extracts: date, title, tags, photos
```

### Network Graph
```javascript
async function loadChronologyData() {
    const response = await fetch('dist/chronology.md');
    const text = await response.text();
    return parseChronology(text);
}
// Extracts: date, title, credibility, eventType, agencies, relationships
```

### GeoTimeline
```javascript
async function loadChronologyForMap() {
    const response = await fetch('dist/chronology.md');
    const text = await response.text();
    chronologyData = parseChronologyData(text);
}
// Extracts: location tags, coordinates, dates
```

## Metadata Structure in chronology.md

Each event in `chronology.md` contains:

```markdown
## YYYY, Month DD - Event Title #Tags #Location

Event description...

**Event Type**: Category1, Category2
**Credibility**: X/5 (rating and justification)
**Primary Actors**: Person/Organization names
**Agencies**: Government agencies involved
**FOIA Targets**: Specific document IDs, case numbers
**Related Events**:
- RELATIONSHIP_TYPE → Target event (evidence: justification)
- ANOTHER_TYPE → Another event (evidence: justification)
**Causal Chain**: Chain_Name_1, Chain_Name_2
**Immediate Outcomes**: What happened next
**Policy Impact**: Legislative/policy effects
**Evidence Strength**: Strong/Moderate/Weak (X/5)

**Links:**
[Link text](URL)

**Photos:**
![Description](path/to/image.jpg)
```

## Filter Consistency

All views use the same category tags:
- Outbound, Inbound, ContactAttempt
- LegislationPolicy, CongressionalHearings
- LeaksDeclass, WhistleblowerDisclosures
- MilitaryEncounters, CivilianSightings
- AbductionCEIII, ScientificStudies
- International, ReligiousCultural
- HistoricalPreModern, etc.

## Relationship Types (Network Graph)

The network graph visualizes these relationship types from **Related Events**:
- `CAUSES →` Direct causation (red)
- `ENABLES →` Creates conditions (blue)
- `SUPPORTS →` Corroborates (green)
- `CORRELATES_WITH →` Temporal correlation (orange)
- `CONTRADICTS →` Conflicts (purple)
- `DOCUMENTS →` Provides evidence (gray)
- Plus: RESPONDS_TO, PRECEDES, FOLLOWS, INCLUDES, CITES, REFERENCES, etc.

## Technology Stack

### Frontend
- Vanilla JavaScript (no framework)
- HTML5, CSS3
- Progressive Web App (PWA)

### Visualization Libraries
- **D3.js** - Timeline visualization
- **Leaflet.js** - Map/geotimeline
- **vis.js** - Network graph
- **marked.js** - Markdown rendering

### Data Format
- **Markdown** - Human-readable, version-controllable
- **Structured metadata** - Parseable by JavaScript
- **No database** - Static site, GitHub Pages hosting

## Deployment

- **Hosting**: GitHub Pages
- **Repository**: github.com/unclebulgaria9001/disclosureparty
- **URL**: unclebulgaria9001.github.io/disclosureparty
- **Updates**: Push to main branch → auto-deploy

## Data Flow

```
dist/chronology.md (Single Source)
        ↓
    fetch() by each page
        ↓
    Parse based on view needs
        ↓
    ┌─────────┬─────────┬─────────┬─────────┐
    │         │         │         │         │
Chronology Timeline  Network   GeoMap
  Viewer     Viz      Graph   Timeline
    │         │         │         │
  List     D3.js    vis.js   Leaflet
  View    Timeline   Graph      Map
```

## Benefits of Single Data Source

1. **Consistency**: All views show same events
2. **Maintainability**: Update one file, all views update
3. **Version Control**: Git tracks all changes
4. **No Sync Issues**: No database synchronization needed
5. **Offline Capable**: PWA caches single markdown file
6. **Human Readable**: Markdown is editable by anyone
7. **Verifiable**: Source links in markdown for fact-checking

## Adding New Events

To add a new event that appears in all views:

1. Edit `dist/chronology.md`
2. Add event with proper markdown structure
3. Include metadata fields (Event Type, Credibility, etc.)
4. Add **Related Events** for network graph
5. Add location tags for map
6. Add category tags for filters
7. Commit and push to GitHub

All four views will automatically parse and display the new event.

---

**Last Updated**: January 11, 2026
**Architecture Status**: ✅ All views using same data source
**Navigation Status**: ✅ Network graph menu on all pages
