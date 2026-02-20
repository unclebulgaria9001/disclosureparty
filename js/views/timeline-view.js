// Timeline View with Swim-Lane Visualization
(function() {
    let allEvents = [];
    let filteredEvents = [];
    
    const PERIODS = ['ancient', '18', '19', '194', '195', '196', '197', '198', '199', '200', '201', '202'];
    const CATEGORIES = ['Outbound', 'Inbound', 'ContactAttempt', 'LegislationPolicy', 'CongressionalHearings', 'LeaksDeclass', 'WhistleblowerDisclosures', 'MilitaryEncounters', 'CivilianSightings', 'AbductionCEIII', 'CrashRetrievals', 'UnderwaterUSO', 'SpaceSatellite', 'ScientificStudies', 'HistoricalPreModern', 'ReligiousCultural'];
    const GEO_TAGS = ['USA', 'Canada', 'UnitedKingdom', 'Europe', 'Russia', 'MiddleEast', 'Asia', 'Africa', 'LatinAmerica', 'Oceania', 'International', 'Space'];
    
    async function init() {
        const container = document.getElementById('timeline-view');
        if (!container) return;

        container.innerHTML = `
            <div style="display: flex; gap: 20px; padding: 20px; height: calc(100vh - 200px);">
                <div id="timeline-sidebar" style="width: 280px; background: rgba(17,24,39,0.6); border-radius: 8px; border: 1px solid var(--border); padding: 20px; overflow-y: auto;">
                    <h3 style="color: var(--accent); margin: 0 0 15px 0; font-size: 1.1em;">Filters</h3>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong style="color: var(--text); font-size: 0.9em;">Time Periods</strong>
                            <div style="display: flex; gap: 5px;">
                                <button onclick="window.selectAllTimelinePeriods()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">All</button>
                                <button onclick="window.deselectAllTimelinePeriods()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">None</button>
                            </div>
                        </div>
                        <div id="timeline-periods" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.85em;"></div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong style="color: var(--text); font-size: 0.9em;">Categories</strong>
                            <div style="display: flex; gap: 5px;">
                                <button onclick="window.selectAllTimelineCategories()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">All</button>
                                <button onclick="window.deselectAllTimelineCategories()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">None</button>
                            </div>
                        </div>
                        <div id="timeline-categories" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.85em;"></div>
                    </div>
                    
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong style="color: var(--text); font-size: 0.9em;">Geographic</strong>
                            <div style="display: flex; gap: 5px;">
                                <button onclick="window.selectAllTimelineGeo()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">All</button>
                                <button onclick="window.deselectAllTimelineGeo()" style="font-size: 0.7em; padding: 2px 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--muted); cursor: pointer; border-radius: 3px;">None</button>
                            </div>
                        </div>
                        <div id="timeline-geo" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.85em;"></div>
                    </div>
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <h2 style="color: var(--accent); margin: 0 0 20px 0; text-align: center;">📊 Timeline Visualization</h2>
                    <div id="timeline-chart" style="flex: 1; background: rgba(17,24,39,0.6); border-radius: 8px; border: 1px solid var(--border);"></div>
                    <div style="margin-top: 15px; text-align: center; color: var(--muted); font-size: 0.9em;">
                        <span id="timeline-event-count">Loading events...</span>
                    </div>
                </div>
            </div>
        `;

        await loadTimelineData();
        populateTimelineFilters();
        applyTimelineFilters();
    }

    async function loadTimelineData() {
        try {
            const text = await window.chronologyLoader.loadChronologyMarkdown();
            allEvents = parseChronology(text);
            filteredEvents = allEvents;
            console.log(`Loaded ${allEvents.length} events for timeline`);
        } catch (error) {
            console.error('Error loading timeline data:', error);
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
        return entries.filter(e => e.year > 0);
    }

    function extractYear(dateStr) {
        const match = dateStr.match(/^(\d{1,4})/);
        return match ? parseInt(match[1]) : 0;
    }

    function populateTimelineFilters() {
        const counts = calculateCounts();
        
        document.getElementById('timeline-periods').innerHTML = PERIODS.map(period => {
            const label = period === 'ancient' ? 'Ancient' : period.length === 4 ? period : period.length === 3 ? period + '0s' : period + '00s';
            const count = counts.periods[period] || 0;
            return `
                <label style="display: inline-flex; align-items: center; gap: 6px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="timeline-period-filter" value="${period}" checked onchange="window.applyTimelineFilters()">
                    <span>${label} (${count})</span>
                </label>
            `;
        }).join('');
        
        document.getElementById('timeline-categories').innerHTML = CATEGORIES.map(cat => {
            const count = counts.categories[cat] || 0;
            const shortName = cat.replace('CongressionalHearings', 'Hearings').replace('LegislationPolicy', 'Legislation').replace('WhistleblowerDisclosures', 'Whistleblower').replace('MilitaryEncounters', 'Military').replace('CivilianSightings', 'Civilian').replace('ContactAttempt', 'Contact').replace('LeaksDeclass', 'Leaks').replace('AbductionCEIII', 'Abduction').replace('CrashRetrievals', 'Crash').replace('UnderwaterUSO', 'USO').replace('SpaceSatellite', 'Space').replace('ScientificStudies', 'Scientific').replace('HistoricalPreModern', 'Historical').replace('ReligiousCultural', 'Religious');
            return `
                <label style="display: inline-flex; align-items: center; gap: 4px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="timeline-category-filter" value="${cat}" checked onchange="window.applyTimelineFilters()">
                    <span>${shortName} (${count})</span>
                </label>
            `;
        }).join('');
        
        document.getElementById('timeline-geo').innerHTML = GEO_TAGS.map(geo => {
            const count = counts.geo[geo] || 0;
            return `
                <label style="display: inline-flex; align-items: center; gap: 4px; color: #e0e0e0; cursor: pointer;">
                    <input type="checkbox" class="timeline-geo-filter" value="${geo}" checked onchange="window.applyTimelineFilters()">
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

    function applyTimelineFilters() {
        const selectedPeriods = Array.from(document.querySelectorAll('.timeline-period-filter:checked')).map(cb => cb.value);
        const selectedCategories = Array.from(document.querySelectorAll('.timeline-category-filter:checked')).map(cb => cb.value);
        const selectedGeo = Array.from(document.querySelectorAll('.timeline-geo-filter:checked')).map(cb => cb.value);
        
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
        
        initializeTimeline();
    }

    function initializeTimeline() {
        if (filteredEvents.length === 0) return;
        
        const container = document.getElementById('timeline-chart');
        if (!container) return;
        
        const margin = {top: 40, right: 40, bottom: 60, left: 60};
        const width = container.clientWidth - margin.left - margin.right;
        const height = container.clientHeight - margin.top - margin.bottom;
        
        // Clear existing
        d3.select('#timeline-chart').selectAll('*').remove();
        
        // Create SVG
        svg = d3.select('#timeline-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        // Group events by year
        const eventsByYear = d3.rollup(filteredEvents, v => v.length, d => d.year);
        const yearData = Array.from(eventsByYear, ([year, count]) => ({year, count})).sort((a, b) => a.year - b.year);
        
        // Scales
        xScale = d3.scaleLinear()
            .domain([d3.min(yearData, d => d.year), d3.max(yearData, d => d.year)])
            .range([0, width]);
        
        yScale = d3.scaleLinear()
            .domain([0, d3.max(yearData, d => d.count)])
            .range([height, 0]);
        
        // Axes
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
            .style('color', '#8b949e');
        
        svg.append('g')
            .call(d3.axisLeft(yScale))
            .style('color', '#8b949e');
        
        // Bars
        svg.selectAll('.bar')
            .data(yearData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.year))
            .attr('y', d => yScale(d.count))
            .attr('width', Math.max(2, width / yearData.length - 1))
            .attr('height', d => height - yScale(d.count))
            .attr('fill', '#58a6ff')
            .attr('opacity', 0.7)
            .on('mouseover', function(event, d) {
                d3.select(this).attr('opacity', 1);
            })
            .on('mouseout', function(event, d) {
                d3.select(this).attr('opacity', 0.7);
            });
        
        // Labels
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style('fill', '#c9d1d9')
            .style('font-size', '14px')
            .text('UAP/UFO Events Over Time');
        
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + 40)
            .attr('text-anchor', 'middle')
            .style('fill', '#8b949e')
            .style('font-size', '12px')
            .text('Year');
        
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -40)
            .attr('text-anchor', 'middle')
            .style('fill', '#8b949e')
            .style('font-size', '12px')
            .text('Number of Events');
        
        // Update count
        document.getElementById('timeline-event-count').textContent = 
            `Showing ${filteredEvents.length} events from ${d3.min(yearData, d => d.year)} to ${d3.max(yearData, d => d.year)}`;
    }

    window.applyTimelineFilters = applyTimelineFilters;
    
    window.selectAllTimelinePeriods = function() {
        document.querySelectorAll('.timeline-period-filter').forEach(cb => cb.checked = true);
        applyTimelineFilters();
    };

    window.deselectAllTimelinePeriods = function() {
        document.querySelectorAll('.timeline-period-filter').forEach(cb => cb.checked = false);
        applyTimelineFilters();
    };

    window.selectAllTimelineCategories = function() {
        document.querySelectorAll('.timeline-category-filter').forEach(cb => cb.checked = true);
        applyTimelineFilters();
    };

    window.deselectAllTimelineCategories = function() {
        document.querySelectorAll('.timeline-category-filter').forEach(cb => cb.checked = false);
        applyTimelineFilters();
    };

    window.selectAllTimelineGeo = function() {
        document.querySelectorAll('.timeline-geo-filter').forEach(cb => cb.checked = true);
        applyTimelineFilters();
    };

    window.deselectAllTimelineGeo = function() {
        document.querySelectorAll('.timeline-geo-filter').forEach(cb => cb.checked = false);
        applyTimelineFilters();
    };

    window.initTimelineView = init;
})();
