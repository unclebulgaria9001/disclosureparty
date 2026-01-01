#!/usr/bin/env python3
"""
Sort the Chronology.md file by date in descending order (newest first).
Preserves the header section and sorts only the chronology entries.
"""

import re
from datetime import datetime

def parse_date(line):
    """Extract date from chronology entry line."""
    # Match patterns like "2025, September 9" or "1974, November 16" or "2025" or "1974-78"
    patterns = [
        r'^(\d{4}),\s+([A-Za-z]+)\s+(\d{1,2})',  # 2025, September 9
        r'^(\d{4}),\s+([A-Za-z]+)',              # 2025, September
        r'^(\d{4})-(\d{2,4})',                   # 1977-78
        r'^(\d{4})\s+-\s+',                      # 1974 -
        r'^(\d{4})\s+',                          # 1974 (space after)
    ]
    
    for pattern in patterns:
        match = re.match(pattern, line)
        if match:
            year = int(match.group(1))
            
            # Handle year ranges like 1977-78
            if '-' in match.group(0) and len(match.groups()) > 1:
                return (year, 12, 31)  # Use end of year for ranges
            
            # Handle month if present
            if len(match.groups()) >= 2 and match.group(2):
                try:
                    month_str = match.group(2)
                    month = datetime.strptime(month_str, '%B').month
                except:
                    month = 12  # Default to December if month parsing fails
            else:
                month = 12  # Default to December if no month
            
            # Handle day if present
            if len(match.groups()) >= 3 and match.group(3):
                try:
                    day = int(match.group(3))
                except:
                    day = 31
            else:
                day = 31  # Default to end of month
            
            return (year, month, day)
    
    return None

def sort_chronology(input_file, output_file):
    """Sort chronology file by date."""
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find where chronology entries start
    chronology_start = None
    for i, line in enumerate(lines):
        if line.strip() == 'Chronology':
            chronology_start = i + 1
            break
    
    if chronology_start is None:
        print("Could not find 'Chronology' header")
        return
    
    # Split into header and entries
    header = lines[:chronology_start]
    content = lines[chronology_start:]
    
    # Group entries (each entry starts with a date line)
    entries = []
    current_entry = []
    current_date = None
    
    for line in content:
        date_tuple = parse_date(line)
        
        if date_tuple:
            # Save previous entry
            if current_entry:
                entries.append((current_date, current_entry))
            
            # Start new entry
            current_entry = [line]
            current_date = date_tuple
        else:
            # Continue current entry
            if current_entry is not None:
                current_entry.append(line)
    
    # Don't forget the last entry
    if current_entry:
        entries.append((current_date, current_entry))
    
    # Filter out entries without dates and sort by date (descending - newest first)
    entries_with_dates = [(date, entry) for date, entry in entries if date is not None]
    entries_without_dates = [(date, entry) for date, entry in entries if date is None]
    
    entries_with_dates.sort(key=lambda x: x[0], reverse=True)
    
    # Combine: sorted entries first, then entries without dates
    entries = entries_with_dates + entries_without_dates
    
    # Write sorted content
    with open(output_file, 'w', encoding='utf-8', newline='\n') as f:
        # Write header
        f.writelines(header)
        
        # Write sorted entries
        for date_tuple, entry_lines in entries:
            f.writelines(entry_lines)
    
    print(f"Sorted {len(entries)} chronology entries")
    print(f"Date range: {entries[-1][0]} to {entries[0][0]}")

if __name__ == '__main__':
    input_file = 'dist/Chronology.md'
    output_file = 'dist/Chronology.md'
    
    print("Sorting Chronology.md...")
    sort_chronology(input_file, output_file)
    print("Done!")
