// Network View - Simple message for now
(function() {
    async function init() {
        const container = document.getElementById('network-view');
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2 style="color: var(--accent); margin-bottom: 20px;">🕸️ Network Graph</h2>
                <p style="color: var(--muted); margin-bottom: 20px;">
                    Interactive network graph showing event relationships coming soon.
                </p>
                <p style="color: var(--muted);">
                    For now, please use the <a href="network-graph.html" style="color: var(--accent);">standalone network graph page</a>.
                </p>
            </div>
        `;
    }

    window.initNetworkView = init;
})();
