# Internationalization (i18n) Implementation Guide

## Overview
This site supports 5 languages based on internet user population:
1. **English (en)** - Default
2. **Chinese Simplified (zh)** - 中文
3. **Spanish (es)** - Español
4. **Arabic (ar)** - العربية (RTL support)
5. **Portuguese (pt)** - Português

## Quick Integration

### 1. Add to HTML `<head>`:
```html
<link rel="stylesheet" href="i18n/language-switcher.css">
<script src="i18n/translations.js"></script>
```

### 2. Add Language Switcher to Page:
```html
<!-- Add this after the toggle-sidebar button -->
<div id="languageSwitcherContainer"></div>

<script>
    // Initialize language switcher
    document.getElementById('languageSwitcherContainer').innerHTML = createLanguageSwitcher();
    updatePageLanguage();
</script>
```

### 3. Mark Translatable Text:
Add `data-i18n` attribute to any element that needs translation:
```html
<h1 data-i18n="siteTitle">UAP/UFO/NHI DISCLOSURE DATABASE</h1>
<button data-i18n="filters">FILTERS</button>
```

For placeholders:
```html
<input data-i18n-placeholder="searchPlaceholder" placeholder="🔍 Search...">
```

### 4. Dynamic Content:
Use the `t()` function in JavaScript:
```javascript
element.textContent = t('allEvents');
```

## Translation Keys

All translation keys are defined in `translations.js`. Common keys include:

- **Navigation**: `index`, `chronology`, `requestContact`, `outbound`, `inbound`
- **Filters**: `filters`, `search`, `allEvents`, `resetZoom`
- **Timeline**: `earthToSpace`, `spaceToEarth`, `inPersonContact`
- **Stats**: `showing`, `of`, `entries`, `events`
- **Loading**: `loading`, `loadingChronology`, `loadingEvents`

## RTL Support

Arabic automatically switches to RTL (right-to-left) layout. The CSS handles:
- Text alignment
- Sidebar positioning
- Button positioning

## Language Persistence

Selected language is saved to `localStorage` and persists across sessions.

## Browser Detection

If no language is saved, the system detects the browser's language and uses it if available, otherwise defaults to English.

## Adding New Translations

To add a new language:

1. Add language code to `translations` object in `translations.js`
2. Add language name to `languageNames` object
3. Translate all keys from English version
4. Test RTL if applicable

## Implementation Status

### Completed:
- ✅ Translation system created
- ✅ 5 languages fully translated
- ✅ Language switcher component
- ✅ RTL support for Arabic
- ✅ localStorage persistence
- ✅ Browser language detection

### To Implement:
- [ ] Add to timeline.html
- [ ] Add to viewer.html
- [ ] Add to chronology-viewer.html
- [ ] Add to contact-viewer.html
- [ ] Add to index.html
- [ ] Test all pages
- [ ] Update manifest.json with language support

## Notes

- Content (chronology entries, documents) remains in English
- UI elements and navigation are fully translated
- Date formats remain consistent across languages
- External links and references remain in original language
