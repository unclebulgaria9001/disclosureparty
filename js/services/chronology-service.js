/**
 * Chronology Service - Handles loading and parsing chronology data
 * Shared across all features (chronology-viewer, timeline, etc.)
 */

export class ChronologyService {
    constructor() {
        this.allEntries = [];
        this.isLoaded = false;
        this.listeners = [];
    }

    /**
     * Load chronology data from decade-based markdown files
     */
    async loadChronology() {
        try {
            // Load index to get list of decade files
            const indexResponse = await fetch('dist/chronology/index.json');
            const index = await indexResponse.json();
            
            console.log(`Loading ${index.decades.length} decade files...`);
            
            // Load all decade files in parallel
            const decadePromises = index.decades.map(decade => 
                fetch(`dist/chronology/${decade}.md`)
                    .then(response => response.text())
                    .catch(error => {
                        console.warn(`Failed to load ${decade}.md:`, error);
                        return '';
                    })
            );
            
            const decadeTexts = await Promise.all(decadePromises);
            
            // Parse all decade files
            decadeTexts.forEach(text => {
                if (text) this.parseChronology(text);
            });
            
            // Sort entries by year (newest first)
            this.allEntries.sort((a, b) => b.year - a.year);
            
            this.isLoaded = true;
            this.notifyListeners();
            
            console.log(`✅ Loaded ${this.allEntries.length} total entries from ${index.decades.length} decades`);
            return this.allEntries;
        } catch (error) {
            console.error('Error loading chronology:', error);
            // Fallback to single file if decade files don't exist
            console.log('Attempting fallback to single chronology.md file...');
            try {
                const response = await fetch('dist/chronology.md');
                const text = await response.text();
                this.parseChronology(text);
                this.isLoaded = true;
                this.notifyListeners();
                return this.allEntries;
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                throw error;
            }
        }
    }

    /**
     * Parse chronology markdown into structured data
     * Note: This appends to allEntries, so it can be called multiple times for decade files
     */
    parseChronology(text) {
        const lines = text.split('\n');
        let currentEntry = null;
        let inChronology = true; // Start true for decade files that don't have "# Chronology" header

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line === 'Chronology' || line === '# Chronology') {
                inChronology = true;
                continue;
            }

            // Skip decade file headers like "# UAP/UFO Chronology - 2020s"
            if (line.startsWith('# UAP/UFO Chronology -')) {
                continue;
            }

            if (!inChronology) continue;

            const headerMatch = line.match(/^##\s+(\d{1,4}(?:\s+(?:BCE|CE))?(?:,\s+[A-Za-z]+(?:\s+\d{1,2})?)?)\s+-\s+(.+)/i);

            if (headerMatch) {
                if (currentEntry) this.allEntries.push(currentEntry);
                currentEntry = {
                    date: headerMatch[1],
                    title: headerMatch[2],
                    content: '',
                    links: [],
                    tags: [],
                    images: [],
                    year: this.extractYear(headerMatch[1])
                };
            } else if (currentEntry) {
                if (line.startsWith('http://') || line.startsWith('https://')) {
                    currentEntry.links.push(line);
                } else if (line.length > 0 && !line.startsWith('##')) {
                    currentEntry.content += (currentEntry.content ? '\n' : '') + line;
                }
            }

            if (currentEntry && line.includes('#')) {
                const tags = line.match(/#[A-Za-z0-9_]+/g);
                if (tags) currentEntry.tags.push(...tags);
            }
        }

        if (currentEntry) this.allEntries.push(currentEntry);
    }

    /**
     * Extract year from date string
     */
    extractYear(dateStr) {
        const match = dateStr.match(/^(\d{1,4})/);
        return match ? parseInt(match[1]) : 0;
    }

    /**
     * Get all entries
     */
    getAllEntries() {
        return this.allEntries;
    }

    /**
     * Get entries by year
     */
    getEntriesByYear(year) {
        return this.allEntries.filter(entry => entry.year === year);
    }

    /**
     * Get entries by tag
     */
    getEntriesByTag(tag) {
        const tagLower = tag.toLowerCase().replace('#', '');
        return this.allEntries.filter(entry => {
            const entryTags = entry.tags.map(t => t.toLowerCase().replace('#', ''));
            return entryTags.includes(tagLower);
        });
    }

    /**
     * Get year range
     */
    getYearRange() {
        if (this.allEntries.length === 0) return { min: 0, max: 0 };
        const years = this.allEntries.map(e => e.year).filter(y => y > 0);
        return {
            min: Math.min(...years),
            max: Math.max(...years)
        };
    }

    /**
     * Subscribe to data changes
     */
    subscribe(callback) {
        this.listeners.push(callback);
    }

    /**
     * Notify all listeners
     */
    notifyListeners() {
        this.listeners.forEach(cb => cb(this.allEntries));
    }
}

// Singleton instance
export const chronologyService = new ChronologyService();
