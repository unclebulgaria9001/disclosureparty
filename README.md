# 🛸 UAP/UFO/NHI Disclosure Database

**Comprehensive, interactive timeline and documentation of UAP/UFO sightings, NHI encounters, government disclosures, and Earth's communication attempts with non-human intelligence.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://unclebulgaria9001.github.io/disclosureparty/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/unclebulgaria9001/disclosureparty)
[![Contribute](https://img.shields.io/badge/Contribute-Welcome-green?style=for-the-badge)](CONTRIBUTING.md)

---

## 📊 Quick Start

- **[🌐 Interactive Timeline](https://unclebulgaria9001.github.io/disclosureparty/timeline.html)** - D3.js visualization with filters
- **[🗺️ GeoTimeline Map](https://unclebulgaria9001.github.io/disclosureparty/timeline.html)** - Interactive world map
- **[📋 Chronology List](https://unclebulgaria9001.github.io/disclosureparty/timeline.html)** - Detailed event viewer
- **[📡 NHI Contact Message](https://unclebulgaria9001.github.io/disclosureparty/viewer.html#contact)** - Public message to NHI

---

## ✨ Features

### 🎯 Three Visualization Modes

**Interactive Timeline Visualization**
- D3.js-powered vertical timeline showing 1000+ events chronologically
- Zoom, pan, and click events for detailed information
- Color-coded by event type (outbound, inbound, chronology)
- Smooth animations and transitions

**GeoTimeline Map View**
- Interactive Leaflet map with clustered markers
- Geotagged events displayed worldwide
- Click markers for detailed popups
- Filter by location and event type

**Chronology List View**
- Detailed list with full event descriptions
- Embedded images with lazy loading
- Clickable source links
- Tags and categorization visible

### 🔍 Advanced Filtering System

**Time Period Filters**
- Filter by individual years (2030-2010)
- Decade filters (2000s-1940s)
- Historical periods (pre-1947)
- Real-time event counts

**Category Tags (16 types)**
- Government: Legislation, Hearings, FOIA, Leaks
- Military: Encounters, Naval, Underwater, Space
- Civilian: Sightings, Abductions, Crash Retrievals
- Communication: Outbound, Inbound, Contact Attempts
- Other: Scientific Studies, Religious/Cultural, Historical

**Geographic Filters (12 regions)**
- USA, Canada, Mexico
- Europe, United Kingdom
- Latin America, Asia, Middle East
- Africa, Australia, International, Antarctica

**Unified Filter Panel**
- All three views controlled by same filters
- Live event counts (showing X of Y events)
- Select All / Deselect All buttons
- Filters persist across view switches

### 🌐 Multilingual Support

Available in 15+ languages:
- English, Chinese (Simplified), Spanish
- Arabic, Portuguese, Russian
- Japanese, Korean, French
- German, Italian, Hindi
- Turkish, Polish, Vietnamese

### 📱 Progressive Web App

- Install as standalone app on any device
- Offline support with service worker caching
- Responsive design for mobile and desktop
- Fast loading with optimized assets

### 🎨 Modern UI/UX

- Dark theme with GitHub-inspired design
- Collapsible sidebar for mobile
- Smooth animations and transitions
- Accessibility-friendly
- Touch-optimized controls

---

## 📚 Content Overview

### Database Statistics
- **1000+ Events** documented from ancient times to 2030
- **16 Category Tags** for precise filtering
- **12 Geographic Regions** covered worldwide
- **100+ Images** with historical photos and documents
- **500+ Source Links** to official documents and reports

### Event Categories

**Government & Policy**
- Congressional hearings and testimony
- Legislation and policy changes (NDAA, UAP Disclosure Act)
- FOIA releases and declassified documents
- Leaked documents and whistleblower disclosures

**Military & Official Encounters**
- Military observations and encounters
- Naval encounters (USS Nimitz, USS Roosevelt)
- Underwater USO events
- Space and satellite observations

**Civilian & Scientific**
- Mass civilian sightings
- Scientific studies and research
- Abduction and close encounter cases (CE-III)
- Crash retrieval allegations

**Communication Attempts**
- Outbound: Arecibo Message, Voyager Golden Records, Pioneer Plaques
- Inbound: Wow! Signal, Chilbolton formations, Crabwood formation
- Contact attempts and SETI efforts

**Historical & Cultural**
- Pre-1947 historical events
- Religious and cultural phenomena
- Ancient sightings and encounters

---

## 🛠️ Technical Stack

### Frontend
- **Vanilla JavaScript** - No frameworks, pure performance
- **HTML5 & CSS3** - Semantic markup, modern styling
- **D3.js v7** - Timeline visualization
- **Leaflet** - Interactive maps with clustering
- **Service Worker** - Offline support and caching

### Data Management
- **Markdown-based** - All events in structured markdown
- **Custom Parser** - Extracts dates, titles, tags, links, images
- **Git Version Control** - Full history and collaboration
- **GitHub Pages** - Free hosting and deployment

### Features
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Works without JavaScript
- **Accessibility** - ARIA labels, keyboard navigation
- **SEO Optimized** - Meta tags, structured data
- **i18n Ready** - Translation system built-in

---

## 📁 Repository Structure

```
disclosureparty/
├── dist/
│   ├── chronology.md          # Main event database
│   ├── contact-nhi.md          # NHI contact message
│   ├── tags.md                 # Tag definitions
│   └── images/                 # Event photos and documents
├── i18n/
│   ├── translations.js         # Translation strings
│   └── language-switcher.css  # Language UI styles
├── .github/
│   └── ISSUE_TEMPLATE/         # GitHub issue templates
│       ├── new-event.md        # New event submission
│       ├── correction.md       # Correction requests
│       └── feature-request.md  # Feature suggestions
├── timeline.html               # Main timeline viewer (3 views)
├── viewer.html                 # Terminal-style viewer
├── contact-viewer.html         # Contact message viewer
├── landing.html                # Feature documentation page
├── CONTRIBUTING.md             # Contribution guidelines
└── README.md                   # This file
```

---

## 🤝 Contributing

We welcome contributions! Help us document UAP/UFO/NHI disclosure history.

### Ways to Contribute

1. **Submit New Events** - [Use this template](https://github.com/unclebulgaria9001/disclosureparty/issues/new?template=new-event.md)
2. **Report Corrections** - [Use this template](https://github.com/unclebulgaria9001/disclosureparty/issues/new?template=correction.md)
3. **Suggest Features** - [Use this template](https://github.com/unclebulgaria9001/disclosureparty/issues/new?template=feature-request.md)
4. **Improve Code** - Submit pull requests
5. **Add Translations** - Help translate to new languages

### Submission Process

1. **Open a GitHub Issue** using the appropriate template
2. **Provide Details** - Date, description, sources, tags
3. **Community Review** - Discussion and verification
4. **Approval & Merge** - Added to chronology.md
5. **Automatic Deployment** - Live on GitHub Pages

**Read the full guidelines:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🚀 Local Development

### Setup

```bash
# Clone repository
git clone https://github.com/unclebulgaria9001/disclosureparty.git
cd disclosureparty

# Start local server
python -m http.server 8000
# or
npx http-server -p 8000

# Open in browser
http://localhost:8000/timeline.html
```

### Testing

Test all three views:
- Timeline visualization: `http://localhost:8000/timeline.html`
- GeoTimeline map: Click "🗺️ GEOTIMELINE" tab
- Chronology list: Click "📋 CHRONOLOGY" tab

Test filters:
- Select/deselect time periods
- Toggle category tags
- Toggle geographic regions
- Verify event counts update
- Check all three views respond to filters

---

## 📖 Usage Guide

### Timeline Visualization
1. Open [timeline.html](https://unclebulgaria9001.github.io/disclosureparty/timeline.html)
2. Use sidebar filters to narrow events
3. Click event nodes for details
4. Zoom and pan for navigation

### GeoTimeline Map
1. Click "🗺️ GEOTIMELINE" tab
2. Explore clustered markers
3. Click markers for event popups
4. Use filters to show specific events

### Chronology List
1. Click "📋 CHRONOLOGY" tab
2. Scroll through detailed entries
3. View images and click links
4. Use filters to find events

---

## ⚠️ NHI Direct Contact Message

This repository includes an urgent public message to Non-Human Intelligence requesting direct, transparent communication with humanity, bypassing government intermediaries.

**[Read the Full Message →](https://unclebulgaria9001.github.io/disclosureparty/viewer.html#contact)**

Available in 15+ languages with binary and Morse code encodings.

---

## 🔗 Links

- **Live Site:** https://unclebulgaria9001.github.io/disclosureparty/
- **GitHub:** https://github.com/unclebulgaria9001/disclosureparty
- **Issues:** https://github.com/unclebulgaria9001/disclosureparty/issues

---

## 📜 License

Public Domain (CC0 1.0 Universal) - Free to use, modify, and distribute.

---

## 🙏 Acknowledgments

This project is dedicated to transparency and public access to UAP/UFO/NHI information. Thank you to all contributors, researchers, and disclosure advocates who make this possible.

**Help us document history. [Contribute today →](CONTRIBUTING.md)**
