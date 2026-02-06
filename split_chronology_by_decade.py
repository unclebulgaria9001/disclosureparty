#!/usr/bin/env python3
"""
Split chronology.md into decade-based files for better performance and maintainability.
"""

import re
import os
from pathlib import Path
from collections import defaultdict

def extract_year_from_entry(line):
    """Extract year from entry header like '## 2026, January 1 - Title'"""
    match = re.match(r'^##\s+(\d{4})', line)
    if match:
        return int(match.group(1))
    return None

def get_decade(year):
    """Get decade label for a year (e.g., 2026 -> '2020s')"""
    if year >= 2020:
        return f"{(year // 10) * 10}s"
    elif year >= 2010:
        return "2010s"
    elif year >= 2000:
        return "2000s"
    elif year >= 1990:
        return "1990s"
    elif year >= 1980:
        return "1980s"
    elif year >= 1970:
        return "1970s"
    elif year >= 1960:
        return "1960s"
    elif year >= 1950:
        return "1950s"
    elif year >= 1940:
        return "1940s"
    else:
        return "pre-1940"

def split_chronology():
    """Split chronology.md into decade-based files"""
    
    input_file = Path('dist/chronology.md')
    output_dir = Path('dist/chronology')
    
    # Create output directory
    output_dir.mkdir(exist_ok=True)
    
    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split into header and chronology sections
    parts = content.split('# Chronology', 1)
    if len(parts) != 2:
        print("ERROR: Could not find '# Chronology' section")
        return
    
    header = parts[0] + '# Chronology\n\n'
    chronology_content = parts[1]
    
    # Split entries by ## headers
    entries = re.split(r'\n(?=## \d{4})', chronology_content)
    
    # Group entries by decade
    decades = defaultdict(list)
    current_decade = None
    
    for entry in entries:
        entry = entry.strip()
        if not entry:
            continue
            
        # Check if this is an entry header
        first_line = entry.split('\n')[0]
        year = extract_year_from_entry(first_line)
        
        if year:
            current_decade = get_decade(year)
            decades[current_decade].append(entry)
        elif current_decade:
            # Continuation of previous entry
            if decades[current_decade]:
                decades[current_decade][-1] += '\n\n' + entry
    
    # Write decade files
    decade_files = {}
    for decade in sorted(decades.keys(), reverse=True):
        filename = f"{decade}.md"
        filepath = output_dir / filename
        
        print(f"Writing {filepath} ({len(decades[decade])} entries)...")
        
        with open(filepath, 'w', encoding='utf-8') as f:
            # Write header for each decade file
            f.write(f"# UAP/UFO Chronology - {decade}\n\n")
            
            # Write entries
            for entry in decades[decade]:
                f.write(entry)
                f.write('\n\n')
        
        decade_files[decade] = {
            'filename': filename,
            'entries': len(decades[decade])
        }
    
    # Create index.json
    import json
    index_file = output_dir / 'index.json'
    print(f"Writing {index_file}...")
    
    index_data = {
        'decades': sorted(decades.keys(), reverse=True),
        'files': decade_files,
        'total_entries': sum(len(entries) for entries in decades.values()),
        'generated': 'February 5, 2026'
    }
    
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(index_data, f, indent=2)
    
    # Create README
    readme_file = output_dir / 'README.md'
    print(f"Writing {readme_file}...")
    
    with open(readme_file, 'w', encoding='utf-8') as f:
        f.write("# Chronology Files by Decade\n\n")
        f.write("The chronology has been split into decade-based files for better performance.\n\n")
        f.write("## Files\n\n")
        
        for decade in sorted(decades.keys(), reverse=True):
            info = decade_files[decade]
            f.write(f"- **{info['filename']}** - {info['entries']} entries\n")
        
        f.write(f"\n**Total entries:** {index_data['total_entries']}\n")
        f.write(f"\n**Generated:** {index_data['generated']}\n")
    
    print(f"\n✅ Successfully split chronology into {len(decades)} decade files")
    print(f"📁 Output directory: {output_dir}")
    print(f"📊 Total entries: {index_data['total_entries']}")
    print(f"\nDecade breakdown:")
    for decade in sorted(decades.keys(), reverse=True):
        print(f"  - {decade}: {len(decades[decade])} entries")

if __name__ == '__main__':
    split_chronology()
