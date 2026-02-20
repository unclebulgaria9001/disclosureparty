// Map View Implementation with Leaflet
(function() {
    let allEvents = [];
    let map;
    
    async function init() {
        const container = document.getElementById('map-view');
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 20px;">
                <h2 style="color: var(--accent); margin-bottom: 20px; text-align: center;">🗺️ Geographic Timeline</h2>
                <div id="map-container" style="width: 100%; height: 600px; background: rgba(17,24,39,0.6); border-radius: 8px; border: 1px solid var(--border);"></div>
                <div style="margin-top: 20px; text-align: center; color: var(--muted); font-size: 0.9em;">
                    <span id="map-event-count">Loading events...</span>
                </div>
            </div>
        `;

        await loadMapData();
        initializeMap();
    }

    async function loadMapData() {
        try {
            const text = await window.chronologyLoader.loadChronologyMarkdown();
            allEvents = parseChronology(text);
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
            
            const headerMatch = line.match(/^##\s+(\d{1,4}(?:\s+(?:BCE|CE))?(?:,\s+[A-Za-z]+(?:\s+\d{1,2})?)?)\ s+-\s+(.+)/i);
            
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
        
        // Count events with geo tags
        const geoEvents = allEvents.filter(e => {
            const geoTags = e.tags.filter(t => 
                ['#USA', '#Europe', '#Asia', '#Africa', '#LatinAmerica', '#MiddleEast', '#Oceania', '#Canada', '#UnitedKingdom'].includes(t)
            );
            return geoTags.length > 0;
        });
        
        document.getElementById('map-event-count').textContent = 
            `Map view: ${geoEvents.length} events with geographic tags out of ${allEvents.length} total events`;
        
        // Note: Full map implementation with markers would require coordinate data
        // For now, showing the map interface with event count
    }

    window.initMapView = init;
})();
