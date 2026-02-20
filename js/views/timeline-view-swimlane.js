// Timeline View with Swim-Lane Visualization
(function() {
    let allEvents = [];
    let filteredEvents = [];
    
    const PERIODS = ['ancient', '18', '19', '194', '195', '196', '197', '198', '199', '200', '201', '202'];
    const CATEGORIES = ['Outbound', 'Inbound', 'ContactAttempt', 'LegislationPolicy', 'CongressionalHearings', 'LeaksDeclass', 'WhistleblowerDisclosures', 'MilitaryEncounters', 'CivilianSightings', 'AbductionCEIII', 'CrashRetrievals', 'UnderwaterUSO', 'SpaceSatellite', 'ScientificStudies', 'HistoricalPreModern', 'ReligiousCultural'];
    const GEO_TAGS = ['USA', 'Canada', 'UnitedKingdom', 'Europe', 'Russia', 'MiddleEast', 'Asia', 'Africa', 'LatinAmerica', 'Oceania', 'International', 'Space'];
    
    const categoryLabels = {
        'Outbound': 'OUTBOUND',
        'Inbound': 'INBOUND',
        'ContactAttempt': 'CONTACT',
        'LegislationPolicy': 'LEGISLATION',
        'CongressionalHearings': 'HEARINGS',
        'LeaksDeclass': 'LEAKS/FOIA',
        'WhistleblowerDisclosures': 'WHISTLEBLOWER',
        'MilitaryEncounters': 'MILITARY',
        'CivilianSightings': 'CIVILIAN',
        'AbductionCEIII': 'ABDUCTION',
        'CrashRetrievals': 'CRASH',
        'UnderwaterUSO': 'USO',
        'SpaceSatellite': 'SPACE',
        'ScientificStudies': 'SCIENTIFIC',
        'HistoricalPreModern': 'HISTORICAL',
        'ReligiousCultural': 'RELIGIOUS'
    };
    
    async function init() {
        const container = document.getElementById('timeline-view');
        if (!container) return;

        container.innerHTML = `
            <style>
                .timeline-track { stroke: #21262d; stroke-width: 1; fill: none; }
                .event-node { cursor: pointer; transition: all 0.2s; }
                .event-node.chronology { fill: #8b949e; stroke: #6e7681; stroke-width: 1.5; }
                .event-node:hover { filter: brightness(1.3); stroke-width: 3; }
                .event-label { font-size: 9px; fill: #8b949e; pointer-events: none; }
                .timeline-tooltip { position: absolute; background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 12px; pointer-events: none; opacity: 0; transition: opacity 0.2s; max-width: 300px; z-index: 1000; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5); }
                .timeline-tooltip.visible { opacity: 1; }
                .timeline-tooltip-title { color: #58a6ff; font-weight: 600; margin-bottom: 5px; }
                .timeline-tooltip-date { color: #8b949e; font-size: 0.85em; margin-bottom: 8px; }
                .timeline-tooltip-description { color: #c9d1d9; font-size: 0.85em; line-height: 1.4; }
            </style>
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
                    <h2 style="color: var(--accent); margin: 0 0 20px 0; text-align: center;">📊 Timeline Swim Lanes</h2>
                    <div id="timeline-chart" style="flex: 1; background: rgba(17,24,39,0.6); border-radius: 8px; border: 1px solid var(--border); overflow-x: auto; overflow-y: auto;"></div>
                    <div style="margin-top: 15px; text-align: center; color: var(--muted); font-size: 0.9em;">
                        <span id="timeline-event-count">Loading events...</span>
                    </div>
                </div>
            </div>
            <div id="timeline-tooltip" class="timeline-tooltip">
                <div class="timeline-tooltip-title"></div>
                <div class="timeline-tooltip-date"></div>
                <div class="timeline-tooltip-description"></div>
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
        let currentContent = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('# UAP/UFO Chronology')) continue;
            
            const headerMatch = line.match(/^##\s+(\d{1,4}(?:\s+(?:BCE|CE))?(?:,\s+[A-Za-z]+(?:\s+\d{1,2})?)?)\s+-\s+(.+)/i);
            
            if (headerMatch) {
                if (currentEntry) {
                    currentEntry.description = currentContent.trim();
                    entries.push(currentEntry);
                }
                
                const titleWithTags = headerMatch[2];
                const titleTags = titleWithTags.match(/#[A-Za-z0-9_]+/g) || [];
                const titleWithoutTags = titleWithTags.replace(/#[A-Za-z0-9_]+/g, '').trim();
                
                currentEntry = {
                    date: parseDateString(headerMatch[1]),
                    originalDateStr: headerMatch[1],
                    title: titleWithoutTags,
                    tags: titleTags.map(t => t.substring(1)),
                    year: extractYear(headerMatch[1]),
                    type: 'chronology'
                };
                currentContent = '';
            } else if (currentEntry && line.length > 0 && !line.startsWith('http')) {
                currentContent += (currentContent ? ' ' : '') + line;
            }
        }
        
        if (currentEntry) {
            currentEntry.description = currentContent.trim();
            entries.push(currentEntry);
        }
        return entries.filter(e => e.year > 0 && e.date);
    }

    function parseDateString(dateStr) {
        const modernMatch = dateStr.match(/^(\d{4})(?:,\s+([A-Za-z]+)(?:\s+(\d{1,2}))?)?/);
        if (modernMatch) {
            const year = parseInt(modernMatch[1]);
            const monthName = modernMatch[2];
            const day = modernMatch[3] ? parseInt(modernMatch[3]) : 1;
            
            if (monthName) {
                const months = {
                    'january': 0, 'february': 1, 'march': 2, 'april': 3,
                    'may': 4, 'june': 5, 'july': 6, 'august': 7,
                    'september': 8, 'october': 9, 'november': 10, 'december': 11
                };
                const month = months[monthName.toLowerCase()];
                if (month !== undefined) {
                    return new Date(year, month, day);
                }
            }
            
            return new Date(year, 0, 1);
        }
        
        return null;
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
                if (CATEGORIES.includes(tag)) {
                    counts.categories[tag] = (counts.categories[tag] || 0) + 1;
                }
                if (GEO_TAGS.includes(tag)) {
                    counts.geo[tag] = (counts.geo[tag] || 0) + 1;
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
            
            const entryCategoryTags = entry.tags.filter(tag => CATEGORIES.includes(tag));
            const entryGeoTags = entry.tags.filter(tag => GEO_TAGS.includes(tag));
            
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
        
        drawSwimLaneTimeline();
    }

    function getMatchingTags(event) {
        const matchedTags = [];
        
        for (const tag of event.tags) {
            if (CATEGORIES.includes(tag) && !matchedTags.includes(tag)) {
                matchedTags.push(tag);
            }
        }
        
        return matchedTags.length > 0 ? matchedTags : ['HistoricalPreModern'];
    }

    function drawSwimLaneTimeline() {
        const container = document.getElementById('timeline-chart');
        if (!container || filteredEvents.length === 0) return;
        
        const margin = {top: 60, right: 200, bottom: 40, left: 60};
        const width = Math.max(container.clientWidth - margin.left - margin.right, 1600);
        const height = 800;
        
        d3.select('#timeline-chart').selectAll('*').remove();
        
        const svg = d3.select('#timeline-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        const dates = filteredEvents.map(d => d.date);
        const minDate = d3.min(dates);
        const maxDate = d3.max(dates);
        
        const dateRange = maxDate - minDate;
        const paddedMin = new Date(minDate.getTime() - dateRange * 0.05);
        const paddedMax = new Date(maxDate.getTime() + dateRange * 0.05);
        
        const yScale = d3.scaleTime()
            .domain([paddedMin, paddedMax])
            .range([0, height]);
        
        const laneSpacing = width / (CATEGORIES.length + 1);
        const lanePositions = {};
        CATEGORIES.forEach((tag, i) => {
            lanePositions[tag] = laneSpacing * (i + 1);
        });
        
        const yAxis = d3.axisLeft(yScale)
            .ticks(20)
            .tickFormat(d => d.getFullYear().toString());
        
        svg.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)
            .selectAll('text')
            .style('fill', '#8b949e')
            .style('font-family', 'Share Tech Mono');
        
        svg.selectAll('.y-axis path, .y-axis line')
            .style('stroke', '#30363d');
        
        CATEGORIES.forEach(tag => {
            const x = lanePositions[tag];
            svg.append('line')
                .attr('class', 'timeline-track')
                .attr('x1', x)
                .attr('y1', 0)
                .attr('x2', x)
                .attr('y2', height);
        });
        
        CATEGORIES.forEach(tag => {
            const x = lanePositions[tag];
            const label = categoryLabels[tag];
            
            let color = '#8b949e';
            if (tag === 'Outbound') color = '#58a6ff';
            else if (tag === 'Inbound') color = '#f85149';
            else if (tag === 'ContactAttempt') color = '#a371f7';
            
            svg.append('text')
                .attr('x', x)
                .attr('y', -15)
                .attr('text-anchor', 'middle')
                .style('fill', color)
                .style('font-size', '9px')
                .style('font-weight', '600')
                .text(label);
        });
        
        const tooltip = d3.select('#timeline-tooltip');
        
        const eventInstances = [];
        filteredEvents.forEach(event => {
            const matchingTags = getMatchingTags(event);
            matchingTags.forEach(tag => {
                eventInstances.push({
                    ...event,
                    swimLaneTag: tag
                });
            });
        });
        
        const eventGroups = svg.selectAll('.event-group')
            .data(eventInstances)
            .enter()
            .append('g')
            .attr('class', 'event-group')
            .attr('transform', d => {
                const y = yScale(d.date);
                const x = lanePositions[d.swimLaneTag] || lanePositions['HistoricalPreModern'];
                return `translate(${x},${y})`;
            });
        
        eventGroups.append('circle')
            .attr('class', 'event-node chronology')
            .attr('r', 5)
            .on('mouseover', function(event, d) {
                tooltip.select('.timeline-tooltip-title').text(d.title);
                tooltip.select('.timeline-tooltip-date').text(d.originalDateStr);
                tooltip.select('.timeline-tooltip-description').text(d.description || '');
                tooltip.classed('visible', true);
            })
            .on('mousemove', function(event) {
                tooltip
                    .style('left', (event.pageX + 15) + 'px')
                    .style('top', (event.pageY - 15) + 'px');
            })
            .on('mouseout', function() {
                tooltip.classed('visible', false);
            })
            .style('cursor', 'pointer');
        
        document.getElementById('timeline-event-count').textContent = 
            `Showing ${filteredEvents.length} events (${eventInstances.length} instances across swim lanes)`;
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
