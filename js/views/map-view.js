// Map View - Simple message for now
(function() {
    async function init() {
        const container = document.getElementById('map-view');
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2 style="color: var(--accent); margin-bottom: 20px;">🗺️ Geographic Timeline</h2>
                <p style="color: var(--muted); margin-bottom: 20px;">
                    Interactive map with geotagged events coming soon.
                </p>
                <p style="color: var(--muted);">
                    For now, please use the <a href="timeline.html#map" style="color: var(--accent);">standalone map view</a>.
                </p>
            </div>
        `;
    }

    window.initMapView = init;
})();
