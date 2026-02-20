// Timeline View - Simple message for now
(function() {
    async function init() {
        const container = document.getElementById('timeline-view');
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2 style="color: var(--accent); margin-bottom: 20px;">📊 Timeline Visualization</h2>
                <p style="color: var(--muted); margin-bottom: 20px;">
                    Interactive D3 timeline visualization coming soon.
                </p>
                <p style="color: var(--muted);">
                    For now, please use the <a href="timeline.html" style="color: var(--accent);">standalone timeline page</a>.
                </p>
            </div>
        `;
    }

    window.initTimelineView = init;
})();
