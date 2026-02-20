// Chronology View Implementation
(function() {
    let allEntries = [];
    let filteredEntries = [];
    
    const PERIODS = ['2030', '2029', '2028', '2027', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '200', '199', '198', '197', '196', '195', '194', '18', 'ancient'];
    const CATEGORIES = ['Outbound', 'Inbound', 'ContactAttempt', 'LegislationPolicy', 'CongressionalHearings', 'LeaksDeclass', 'WhistleblowerDisclosures', 'MilitaryEncounters', 'CivilianSightings', 'AbductionCEIII', 'CrashRetrievals', 'UnderwaterUSO', 'SpaceSatellite', 'ScientificStudies', 'HistoricalPreModern', 'ReligiousCultural'];
    const GEO_TAGS = ['USA', 'Canada', 'Mexico', 'Europe', 'UnitedKingdom', 'LatinAmerica', 'Asia', 'MiddleEast', 'Africa', 'Oceania', 'International', 'Space'];

    async function init() {
        const container = document.getElementById('chronology-view');
        if (!container) return;

        container.innerHTML = `
            <button class="toggle-sidebar" id="chronology-toggle" onclick="toggleChronologySidebar()">☰ FILTERS</button>
            
            <div class="main-layout">
                <div class="sidebar" id="chronology-sidebar">
                    <div class="sidebar-content">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <div style="color: #a0a0a0; font-size: 0.85em;">
                                <span id="chronology-count">Loading...</span>
                            </div>
                        </div>
                        
                        <div class="filter-section">
                            <div class="filter-section-title">SEARCH</div>
                            <input type="text" id="chronology-search" class="search-box" placeholder="Search events..." style="width: 100%; padding: 8px; background: rgba(17,24,39,.6); border: 1px solid var(--border); color: var(--text); border-radius: 8px;">
                        </div>
                        
                        <div class="filter-section">
                            <div class="filter-section-title">TIME PERIODS</div>
                            <div id="chronology-periods" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85em;"></div>
                            <div style="display: flex; gap: 8px; margin-top: 12px;">
                                <button class="filter-btn" style="flex: 1;" onclick="selectAllChronologyPeriods()">ALL</button>
                                <button class="filter-btn" style="flex: 1;" onclick="deselectAllChronologyPeriods()">NONE</button>
                            </div>
                        </div>
                        
                        <div class="filter-section">
                            <div class="filter-section-title">CATEGORIES</div>
                            <div id="chronology-categories" style="display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.85em;"></div>
                            <div style="display: flex; gap: 8px; margin-top: 12px;">
                                <button class="filter-btn" style="flex: 1;" onclick="selectAllChronologyCategories()">ALL</button>
                                <button class="filter-btn" style="flex: 1;" onclick="deselectAllChronologyCategories()">NONE</button>
                            </div>
                        </div>
                        
                        <div class="filter-section">
                            <div class="filter-section-title">GEOGRAPHIC</div>
                            <div id="chronology-geo" style="display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.85em;"></div>
                            <div style="display: flex; gap: 8px; margin-top: 12px;">
                                <button class="filter-btn" style="flex: 1;" onclick="selectAllChronologyGeo()">ALL</button>
                                <button class="filter-btn" style="flex: 1;" onclick="deselectAllChronologyGeo()">NONE</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="content-container">
                    <div class="results-header">
                        <div class="result-count" id="chronology-result-count">Loading...</div>
                        <div class="sort-options">
                            <label>Sort:</label>
                            <select id="chronology-sort" onchange="renderChronologyEntries()">
                                <option value="date-desc">Newest First</option>
                                <option value="date-asc">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="timeline" id="chronology-timeline">
                        <div class="loading">Loading chronology data...</div>
                    </div>
                </div>
            </div>
        `;

        // Load data
        await loadChronologyData();
        populateChronologyFilters();
        applyChronologyFilters();
        
        // Setup event listeners
        document.getElementById('chronology-search').addEventListener('input', applyChronologyFilters);
    }

    async function loadChronologyData() {
        try {
            const text = await window.chronologyLoader.loadChronologyMarkdown();
            allEntries = parseChronology(text);
            console.log(`Loaded ${allEntries.length} chronology entries`);
        } catch (error) {
            console.error('Error loading chronology:', error);
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
                currentEntry = {
                    date: headerMatch[1],
                    title: headerMatch[2],
                    content: '',
                    links: [],
                    tags: [],
                    year: extractYear(headerMatch[1])
                };
            } else if (currentEntry) {
                if (line.startsWith('http://') || line.startsWith('https://')) {
                    currentEntry.links.push(line);
                } else if (line.length > 0 && !line.startsWith('##')) {
                    currentEntry.content += (currentEntry.content ? '\n' : '') + line;
                }
                
                const tags = line.match(/#[A-Za-z0-9_]+/g);
                if (tags) currentEntry.tags.push(...tags);
            }
        }
        
        if (currentEntry) entries.push(currentEntry);
        return entries;
    }

    function extractYear(dateStr) {
        const match = dateStr.match(/^(\d{1,4})/);
        return match ? parseInt(match[1]) : 0;
    }

    function populateChronologyFilters() {
        const counts = calculateCounts();
        
        // Periods
        document.getElementById('chronology-periods').innerHTML = PERIODS.map(period => {
            const label = period === 'ancient' ? 'Ancient' : period.length === 4 ? period : period.length === 3 ? period + '0s' : period + '00s';
            const count = counts.periods[period] || 0;
            return `
                <label style="display: inline-flex; align-items: center; gap: 6px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="chronology-period-filter" value="${period}" checked onchange="window.applyChronologyFilters()">
                    <span>${label} (${count})</span>
                </label>
            `;
        }).join('');
        
        // Categories
        document.getElementById('chronology-categories').innerHTML = CATEGORIES.map(cat => {
            const count = counts.categories[cat] || 0;
            const shortName = cat.replace('CongressionalHearings', 'Hearings').replace('LegislationPolicy', 'Legislation').replace('WhistleblowerDisclosures', 'Whistleblower').replace('MilitaryEncounters', 'Military').replace('CivilianSightings', 'Civilian').replace('ContactAttempt', 'Contact').replace('LeaksDeclass', 'Leaks').replace('AbductionCEIII', 'Abduction').replace('CrashRetrievals', 'Crash').replace('UnderwaterUSO', 'USO').replace('SpaceSatellite', 'Space').replace('ScientificStudies', 'Scientific').replace('HistoricalPreModern', 'Historical').replace('ReligiousCultural', 'Religious');
            return `
                <label style="display: inline-flex; align-items: center; gap: 4px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="chronology-category-filter" value="${cat}" checked onchange="window.applyChronologyFilters()">
                    <span>${shortName} (${count})</span>
                </label>
            `;
        }).join('');
        
        // Geo
        document.getElementById('chronology-geo').innerHTML = GEO_TAGS.map(geo => {
            const count = counts.geo[geo] || 0;
            return `
                <label style="display: inline-flex; align-items: center; gap: 4px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="chronology-geo-filter" value="${geo}" checked onchange="window.applyChronologyFilters()">
                    <span>${geo} (${count})</span>
                </label>
            `;
        }).join('');
    }

    function calculateCounts() {
        const counts = { periods: {}, categories: {}, geo: {} };
        
        for (const entry of allEntries) {
            const year = entry.year;
            if (year) {
                counts.periods[String(year)] = (counts.periods[String(year)] || 0) + 1;
                counts.periods[String(Math.floor(year / 10))] = (counts.periods[String(Math.floor(year / 10))] || 0) + 1;
                counts.periods[String(Math.floor(year / 100))] = (counts.periods[String(Math.floor(year / 100))] || 0) + 1;
                if (year < 1800) counts.periods.ancient = (counts.periods.ancient || 0) + 1;
            }
            
            for (const tag of entry.tags) {
                const cleanTag = tag.replace('#', '');
                // Count for categories if it's in the category list
                if (CATEGORIES.includes(cleanTag)) {
                    counts.categories[cleanTag] = (counts.categories[cleanTag] || 0) + 1;
                }
                // Count for geo if it's in the geo list
                if (GEO_TAGS.includes(cleanTag)) {
                    counts.geo[cleanTag] = (counts.geo[cleanTag] || 0) + 1;
                }
            }
        }
        
        return counts;
    }

    function applyChronologyFilters() {
        const searchTerm = document.getElementById('chronology-search')?.value.toLowerCase() || '';
        const selectedPeriods = Array.from(document.querySelectorAll('.chronology-period-filter:checked')).map(cb => cb.value);
        const selectedCategories = Array.from(document.querySelectorAll('.chronology-category-filter:checked')).map(cb => cb.value);
        const selectedGeo = Array.from(document.querySelectorAll('.chronology-geo-filter:checked')).map(cb => cb.value);
        
        filteredEntries = allEntries.filter(entry => {
            // Search filter
            if (searchTerm && !entry.title.toLowerCase().includes(searchTerm) && !entry.content.toLowerCase().includes(searchTerm)) {
                return false;
            }
            
            // Period filter
            const year = entry.year;
            let periodMatch = false;
            
            for (const period of selectedPeriods) {
                if (period === 'ancient' && year < 1800) {
                    periodMatch = true;
                    break;
                } else if (period.length === 4) {
                    // Exact year match (e.g., 2024)
                    if (year === parseInt(period)) {
                        periodMatch = true;
                        break;
                    }
                } else if (period.length === 3) {
                    // Decade match (e.g., 202 matches 2020-2029)
                    const decade = parseInt(period);
                    if (Math.floor(year / 10) === decade) {
                        periodMatch = true;
                        break;
                    }
                } else if (period.length === 2) {
                    // Century match (e.g., 18 matches 1800-1899)
                    const century = parseInt(period);
                    if (Math.floor(year / 100) === century) {
                        periodMatch = true;
                        break;
                    }
                }
            }
            
            if (!periodMatch) return false;
            
            // Category/Geo filter
            const entryTags = entry.tags.map(t => t.replace('#', ''));
            
            // Check if entry has any category or geo tags from our filter lists
            const entryCategoryTags = entryTags.filter(tag => CATEGORIES.includes(tag));
            const entryGeoTags = entryTags.filter(tag => GEO_TAGS.includes(tag));
            
            // If ALL filters are selected (default state), show all entries
            const allCategoriesSelected = selectedCategories.length === CATEGORIES.length;
            const allGeoSelected = selectedGeo.length === GEO_TAGS.length;
            
            if (allCategoriesSelected && allGeoSelected) {
                return true; // Show everything when all filters are on
            }
            
            // Otherwise, filter based on selected tags
            // If NO categories are selected, hide all entries with category tags
            if (selectedCategories.length === 0 && entryCategoryTags.length > 0) {
                return false;
            }
            
            // If NO geo tags are selected, hide all entries with geo tags
            if (selectedGeo.length === 0 && entryGeoTags.length > 0) {
                return false;
            }
            
            // If entry has category tags, at least one must be selected
            const categoryMatch = entryCategoryTags.length === 0 || 
                                 entryCategoryTags.some(tag => selectedCategories.includes(tag));
            
            // If entry has geo tags, at least one must be selected  
            const geoMatch = entryGeoTags.length === 0 || 
                            entryGeoTags.some(tag => selectedGeo.includes(tag));
            
            return categoryMatch && geoMatch;
        });
        
        renderChronologyEntries();
    }

    function renderChronologyEntries() {
        const sortBy = document.getElementById('chronology-sort')?.value || 'date-desc';
        const sorted = [...filteredEntries].sort((a, b) => {
            return sortBy === 'date-desc' ? b.year - a.year : a.year - b.year;
        });
        
        document.getElementById('chronology-count').textContent = `${filteredEntries.length} of ${allEntries.length} events`;
        document.getElementById('chronology-result-count').textContent = `${filteredEntries.length} Events`;
        
        const timeline = document.getElementById('chronology-timeline');
        timeline.innerHTML = sorted.map(entry => `
            <div class="entry">
                <div class="entry-date">${entry.date}</div>
                <div class="entry-title">${escapeHtml(entry.title)}</div>
                <div class="entry-content">${escapeHtml(entry.content)}</div>
                ${entry.links.length > 0 ? `
                    <div class="entry-links">
                        ${entry.links.map(link => `<a href="${link}" target="_blank">🔗 ${link.substring(0, 50)}...</a>`).join('')}
                    </div>
                ` : ''}
                ${entry.tags.length > 0 ? `
                    <div style="margin-top: 8px;">
                        ${entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Global functions for filter buttons
    window.applyChronologyFilters = applyChronologyFilters;
    
    window.toggleChronologySidebar = function() {
        document.getElementById('chronology-sidebar').classList.toggle('collapsed');
        document.getElementById('chronology-toggle').classList.toggle('collapsed');
    };

    window.selectAllChronologyPeriods = function() {
        document.querySelectorAll('.chronology-period-filter').forEach(cb => cb.checked = true);
        applyChronologyFilters();
    };

    window.deselectAllChronologyPeriods = function() {
        document.querySelectorAll('.chronology-period-filter').forEach(cb => cb.checked = false);
        applyChronologyFilters();
    };

    window.selectAllChronologyCategories = function() {
        document.querySelectorAll('.chronology-category-filter').forEach(cb => cb.checked = true);
        applyChronologyFilters();
    };

    window.deselectAllChronologyCategories = function() {
        document.querySelectorAll('.chronology-category-filter').forEach(cb => cb.checked = false);
        applyChronologyFilters();
    };

    window.selectAllChronologyGeo = function() {
        document.querySelectorAll('.chronology-geo-filter').forEach(cb => cb.checked = true);
        applyChronologyFilters();
    };

    window.deselectAllChronologyGeo = function() {
        document.querySelectorAll('.chronology-geo-filter').forEach(cb => cb.checked = false);
        applyChronologyFilters();
    };

    window.initChronologyView = init;
})();
