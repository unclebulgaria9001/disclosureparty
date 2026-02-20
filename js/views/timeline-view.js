// Timeline View Implementation with D3
(function() {
    let allEvents = [];
    let filteredEvents = [];
    let svg, xScale, yScale;
    
    async function init() {
        const container = document.getElementById('timeline-view');
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 20px;">
                <h2 style="color: var(--accent); margin-bottom: 20px; text-align: center;">📊 Timeline Visualization</h2>
                <div id="timeline-chart" style="width: 100%; height: 600px; background: rgba(17,24,39,0.6); border-radius: 8px; border: 1px solid var(--border);"></div>
                <div style="margin-top: 20px; text-align: center; color: var(--muted); font-size: 0.9em;">
                    <span id="timeline-event-count">Loading events...</span>
                </div>
            </div>
        `;

        await loadTimelineData();
        initializeTimeline();
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

    window.initTimelineView = init;
})();
