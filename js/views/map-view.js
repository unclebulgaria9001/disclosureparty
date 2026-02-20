// Map View Implementation with Leaflet
(function() {
    let allEvents = [];
    let filteredEvents = [];
    let map;
    
    const PERIODS = ['ancient', '18', '19', '194', '195', '196', '197', '198', '199', '200', '201', '202'];
    const CATEGORIES = ['Outbound', 'Inbound', 'ContactAttempt', 'LegislationPolicy', 'CongressionalHearings', 'LeaksDeclass', 'WhistleblowerDisclosures', 'MilitaryEncounters', 'CivilianSightings', 'AbductionCEIII', 'CrashRetrievals', 'UnderwaterUSO', 'SpaceSatellite', 'ScientificStudies', 'HistoricalPreModern', 'ReligiousCultural'];
    const GEO_TAGS = ['USA', 'Canada', 'UnitedKingdom', 'Europe', 'Russia', 'MiddleEast', 'Asia', 'Africa', 'LatinAmerica', 'Oceania', 'International', 'Space'];
    
    async function init() {
        const container = document.getElementById('map-view');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; gap: 20px; padding: 20px; height: calc(100vh - 200px);">
                <div id="map-sidebar" style="width: 280px; background: rgba(17,24,39,0.6); border-radius: 8px; border: 1px solid var(--border); padding: 20px; overflow-y: auto;">
                    <h3 style="color: var(--accent); margin: 0 0 15px 0; font-size: 1.1em;">Filters</h3>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong style="color: var(--text); font-size: 0.9em;">Time Periods</strong>
                            <div style="display: flex; gap: 5px;">
                                <button onclick="window.selectAllMapPeriods()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">All</button>
                                <button onclick="window.deselectAllMapPeriods()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">None</button>
                            </div>
                        </div>
                        <div id="map-periods" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.85em;"></div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong style="color: var(--text); font-size: 0.9em;">Categories</strong>
                            <div style="display: flex; gap: 5px;">
                                <button onclick="window.selectAllMapCategories()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">All</button>
                                <button onclick="window.deselectAllMapCategories()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">None</button>
                            </div>
                        </div>
                        <div id="map-categories" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.85em;"></div>
                    </div>
                    
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong style="color: var(--text); font-size: 0.9em;">Geographic</strong>
                            <div style="display: flex; gap: 5px;">
                                <button onclick="window.selectAllMapGeo()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">All</button>
                                <button onclick="window.deselectAllMapGeo()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">None</button>
                            </div>
                        </div>
                        <div id="map-geo" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.85em;"></div>
                    </div>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <h2 style="color: var(--accent); margin: 0 0 20px 0; text-align: center;">🗺️ Geographic Timeline</h2>
                    <div id="map-container" style="flex: 1; background: rgba(17,24,39,0.6); border-radius: 8px; border: 1px solid var(--border);"></div>
                    <div style="margin-top: 15px; text-align: center; color: var(--muted); font-size: 0.9em;">
                        <span id="map-event-count">Loading events...</span>
                    </div>
                </div>
            </div>
        `;

        await loadMapData();
        populateMapFilters();
        initializeMap();
        applyMapFilters();
    }

    async function loadMapData() {
        try {
            const text = await window.chronologyLoader.loadChronologyMarkdown();
            allEvents = parseChronology(text);
            filteredEvents = allEvents;
            console.log(`Loaded ${allEvents.length} events for map`);
        } catch (error) {
            console.error('Error loading map data:', error);
        }
    }

    function parseChronology(text) {
        const entries = [];
        const lines = text.split('\n');
        let currentEntry = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('# UAP/UFO Chronology')) continue;
            
            const headerMatch = line.match(/^##\s+(\d{1,4}(?:\s+(?:BCE|CE))?(?:,\s+[A-Za-z]+(?:\s+\d{1,2})?)?)\s+-\s+(.+)/i);
            
            if (headerMatch) {
                if (currentEntry) entries.push(currentEntry);
                
                const titleWithTags = headerMatch[2];
                const titleTags = titleWithTags.match(/#[A-Za-z0-9_]+/g) || [];
                const titleWithoutTags = titleWithTags.replace(/#[A-Za-z0-9_]+/g, '').trim();
                
                currentEntry = {
                    date: headerMatch[1],
                    title: titleWithoutTags,
                    tags: titleTags,
                    year: extractYear(headerMatch[1])
                };
            }
        }
        
        if (currentEntry) entries.push(currentEntry);
        return entries;
    }

    function extractYear(dateStr) {
        const match = dateStr.match(/^(\d{1,4})/);
        return match ? parseInt(match[1]) : 0;
    }

    function populateMapFilters() {
        const counts = calculateCounts();
        
        document.getElementById('map-periods').innerHTML = PERIODS.map(period => {
            const label = period === 'ancient' ? 'Ancient' : period.length === 4 ? period : period.length === 3 ? period + '0s' : period + '00s';
            const count = counts.periods[period] || 0;
            return `
                <label style="display: inline-flex; align-items: center; gap: 6px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="map-period-filter" value="${period}" checked onchange="window.applyMapFilters()">
                    <span>${label} (${count})</span>
                </label>
            `;
        }).join('');
        
        document.getElementById('map-categories').innerHTML = CATEGORIES.map(cat => {
            const count = counts.categories[cat] || 0;
            const shortName = cat.replace('CongressionalHearings', 'Hearings').replace('LegislationPolicy', 'Legislation').replace('WhistleblowerDisclosures', 'Whistleblower').replace('MilitaryEncounters', 'Military').replace('CivilianSightings', 'Civilian').replace('ContactAttempt', 'Contact').replace('LeaksDeclass', 'Leaks').replace('AbductionCEIII', 'Abduction').replace('CrashRetrievals', 'Crash').replace('UnderwaterUSO', 'USO').replace('SpaceSatellite', 'Space').replace('ScientificStudies', 'Scientific').replace('HistoricalPreModern', 'Historical').replace('ReligiousCultural', 'Religious');
            return `
                <label style="display: inline-flex; align-items: center; gap: 4px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="map-category-filter" value="${cat}" checked onchange="window.applyMapFilters()">
                    <span>${shortName} (${count})</span>
                </label>
            `;
        }).join('');
        
        document.getElementById('map-geo').innerHTML = GEO_TAGS.map(geo => {
            const count = counts.geo[geo] || 0;
            return `
                <label style="display: inline-flex; align-items: center; gap: 4px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="map-geo-filter" value="${geo}" checked onchange="window.applyMapFilters()">
                    <span>${geo} (${count})</span>
                </label>
            `;
        }).join('');
    }

    function calculateCounts() {
        const counts = { periods: {}, categories: {}, geo: {} };
        
        for (const entry of allEvents) {
            for (const period of PERIODS) {
                if (period === 'ancient' && entry.year < 1800) {
                    counts.periods[period] = (counts.periods[period] || 0) + 1;
                } else if (period.length === 4 && entry.year === parseInt(period)) {
                    counts.periods[period] = (counts.periods[period] || 0) + 1;
                } else if (period.length === 3 && Math.floor(entry.year / 10) === parseInt(period)) {
                    counts.periods[period] = (counts.periods[period] || 0) + 1;
                } else if (period.length === 2 && Math.floor(entry.year / 100) === parseInt(period)) {
                    counts.periods[period] = (counts.periods[period] || 0) + 1;
                }
            }
            
            for (const tag of entry.tags) {
                const cleanTag = tag.replace('#', '');
                if (CATEGORIES.includes(cleanTag)) {
                    counts.categories[cleanTag] = (counts.categories[cleanTag] || 0) + 1;
                }
                if (GEO_TAGS.includes(cleanTag)) {
                    counts.geo[cleanTag] = (counts.geo[cleanTag] || 0) + 1;
                }
            }
        }
        
        return counts;
    }

    function applyMapFilters() {
        const selectedPeriods = Array.from(document.querySelectorAll('.map-period-filter:checked')).map(cb => cb.value);
        const selectedCategories = Array.from(document.querySelectorAll('.map-category-filter:checked')).map(cb => cb.value);
        const selectedGeo = Array.from(document.querySelectorAll('.map-geo-filter:checked')).map(cb => cb.value);
        
        filteredEvents = allEvents.filter(entry => {
            const year = entry.year;
            let periodMatch = false;
            
            for (const period of selectedPeriods) {
                if (period === 'ancient' && year < 1800) {
                    periodMatch = true;
                    break;
                } else if (period.length === 4) {
                    if (year === parseInt(period)) {
                        periodMatch = true;
                        break;
                    }
                } else if (period.length === 3) {
                    const decade = parseInt(period);
                    if (Math.floor(year / 10) === decade) {
                        periodMatch = true;
                        break;
                    }
                } else if (period.length === 2) {
                    const century = parseInt(period);
                    if (Math.floor(year / 100) === century) {
                        periodMatch = true;
                        break;
                    }
                }
            }
            
            if (!periodMatch) return false;
            
            const entryTags = entry.tags.map(t => t.replace('#', ''));
            const entryCategoryTags = entryTags.filter(tag => CATEGORIES.includes(tag));
            const entryGeoTags = entryTags.filter(tag => GEO_TAGS.includes(tag));
            
            const allCategoriesSelected = selectedCategories.length === CATEGORIES.length;
            const allGeoSelected = selectedGeo.length === GEO_TAGS.length;
            
            if (allCategoriesSelected && allGeoSelected) {
                return true;
            }
            
            if (selectedCategories.length === 0 && entryCategoryTags.length > 0) {
                return false;
            }
            
            if (selectedGeo.length === 0 && entryGeoTags.length > 0) {
                return false;
            }
            
            const categoryMatch = entryCategoryTags.length === 0 || 
                                 entryCategoryTags.some(tag => selectedCategories.includes(tag));
            
            const geoMatch = entryGeoTags.length === 0 || 
                            entryGeoTags.some(tag => selectedGeo.includes(tag));
            
            return categoryMatch && geoMatch;
        });
        
        updateMapDisplay();
    }

    function initializeMap() {
        // Initialize Leaflet map
        map = L.map('map-container', {
            center: [20, 0],
            zoom: 2,
            zoomControl: true
        });
        
        // Add dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        
        updateMapDisplay();
    }

    function updateMapDisplay() {
        // Geographic tag to coordinate mapping
        const geoCoordinates = {
            'USA': [39.8283, -98.5795],
            'Canada': [56.1304, -106.3468],
            'UnitedKingdom': [55.3781, -3.4360],
            'Europe': [54.5260, 15.2551],
            'Russia': [61.5240, 105.3188],
            'MiddleEast': [29.2985, 42.5510],
            'Asia': [34.0479, 100.6197],
            'Africa': [8.7832, 34.5085],
            'LatinAmerica': [-8.7832, -55.4915],
            'Oceania': [-22.7359, 140.0188],
            'International': [0, 0],
            'Space': [0, 0]
        };
        
        // Clear existing markers
        if (window.mapMarkers) {
            window.mapMarkers.forEach(marker => map.removeLayer(marker));
        }
        window.mapMarkers = [];
        
        // Count events by location
        const locationCounts = {};
        
        filteredEvents.forEach(event => {
            event.tags.forEach(tag => {
                const cleanTag = tag.replace('#', '');
                if (geoCoordinates[cleanTag]) {
                    if (!locationCounts[cleanTag]) {
                        locationCounts[cleanTag] = {
                            count: 0,
                            coords: geoCoordinates[cleanTag],
                            events: []
                        };
                    }
                    locationCounts[cleanTag].count++;
                    locationCounts[cleanTag].events.push(event);
                }
            });
        });
        
        // Add markers for each location
        Object.entries(locationCounts).forEach(([location, data]) => {
            if (location === 'International' || location === 'Space') return; // Skip these
            
            const marker = L.circleMarker(data.coords, {
                radius: Math.min(5 + Math.sqrt(data.count) * 2, 20),
                fillColor: '#58a6ff',
                color: '#1f6feb',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6
            }).addTo(map);
            
            // Create popup content
            const popupContent = `
                <div style="color: #c9d1d9; font-family: system-ui;">
                    <strong style="color: #58a6ff; font-size: 1.1em;">${location}</strong><br>
                    <span style="color: #8b949e;">${data.count} events</span><br>
                    <div style="max-height: 200px; overflow-y: auto; margin-top: 8px;">
                        ${data.events.slice(0, 10).map(e => 
                            `<div style="margin: 4px 0; padding: 4px; background: rgba(0,0,0,0.3); border-radius: 3px;">
                                <div style="font-size: 0.85em; color: #8b949e;">${e.date || e.year}</div>
                                <div style="font-size: 0.9em;">${e.title}</div>
                            </div>`
                        ).join('')}
                        ${data.count > 10 ? `<div style="color: #8b949e; font-size: 0.85em; margin-top: 4px;">...and ${data.count - 10} more</div>` : ''}
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup'
            });
            
            window.mapMarkers.push(marker);
        });
        
        const totalGeoEvents = Object.values(locationCounts).reduce((sum, loc) => sum + loc.count, 0);
        document.getElementById('map-event-count').textContent = 
            `Map view: ${totalGeoEvents} events plotted across ${Object.keys(locationCounts).length} locations (${filteredEvents.length} filtered, ${allEvents.length} total)`;
    }

    window.applyMapFilters = applyMapFilters;
    
    window.selectAllMapPeriods = function() {
        document.querySelectorAll('.map-period-filter').forEach(cb => cb.checked = true);
        applyMapFilters();
    };

    window.deselectAllMapPeriods = function() {
        document.querySelectorAll('.map-period-filter').forEach(cb => cb.checked = false);
        applyMapFilters();
    };

    window.selectAllMapCategories = function() {
        document.querySelectorAll('.map-category-filter').forEach(cb => cb.checked = true);
        applyMapFilters();
    };

    window.deselectAllMapCategories = function() {
        document.querySelectorAll('.map-category-filter').forEach(cb => cb.checked = false);
        applyMapFilters();
    };

    window.selectAllMapGeo = function() {
        document.querySelectorAll('.map-geo-filter').forEach(cb => cb.checked = true);
        applyMapFilters();
    };

    window.deselectAllMapGeo = function() {
        document.querySelectorAll('.map-geo-filter').forEach(cb => cb.checked = false);
        applyMapFilters();
    };

    window.initMapView = init;
})();
