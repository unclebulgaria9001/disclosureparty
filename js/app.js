// Single Page App Router and View Manager
(function() {
    const views = {
        home: 'home-view',
        chronology: 'chronology-view',
        timeline: 'timeline-view',
        map: 'map-view',
        network: 'network-view'
    };

    let currentView = 'home';

    // Initialize app
    function init() {
        setupNavigation();
        handleRoute();
        window.addEventListener('hashchange', handleRoute);
    }

    // Setup navigation click handlers
    function setupNavigation() {
        document.querySelectorAll('[data-view]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const view = el.getAttribute('data-view');
                navigateTo(view);
            });
        });
    }

    // Navigate to a view
    function navigateTo(view) {
        window.location.hash = view;
    }

    // Handle route changes
    function handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        showView(hash);
    }

    // Show specific view
    function showView(viewName) {
        // Hide all views
        Object.values(views).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        // Show requested view
        const viewId = views[viewName] || views.home;
        const viewEl = document.getElementById(viewId);
        if (viewEl) {
            viewEl.style.display = 'block';
            currentView = viewName;
            
            // Update active tab
            updateActiveTab(viewName);
            
            // Initialize view if needed
            initializeView(viewName);
        }
    }

    // Update active tab styling
    function updateActiveTab(viewName) {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-view') === viewName) {
                tab.classList.add('active');
            }
        });
    }

    // Initialize view-specific functionality
    function initializeView(viewName) {
        switch(viewName) {
            case 'chronology':
                if (window.initChronologyView) window.initChronologyView();
                break;
            case 'timeline':
                if (window.initTimelineView) window.initTimelineView();
                break;
            case 'map':
                if (window.initMapView) window.initMapView();
                break;
            case 'network':
                if (window.initNetworkView) window.initNetworkView();
                break;
        }
    }

    // Export for global access
    window.app = {
        init,
        navigateTo,
        getCurrentView: () => currentView
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
