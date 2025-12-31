#!/usr/bin/env python3
"""
NHI Contact QR Code Generator
Generates QR codes for message distribution
"""

import qrcode
from pathlib import Path
import hashlib

def generate_website_qr():
    """Generate QR code for main website"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data('https://nhicontact.org')
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save('qr_website.png')
    print("✓ Generated: qr_website.png (Website URL)")

def generate_github_qr():
    """Generate QR code for GitHub repository"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data('https://github.com/humanity/nhi-contact')
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save('qr_github.png')
    print("✓ Generated: qr_github.png (GitHub Repository)")

def generate_verification_qr(message_file):
    """Generate QR code with message hash for verification"""
    with open(message_file, 'rb') as f:
        message_data = f.read()
    
    sha256_hash = hashlib.sha256(message_data).hexdigest()
    
    qr = qrcode.QRCode(
        version=3,  # Larger version for hash
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(f'SHA256:{sha256_hash}')
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save('qr_verification.png')
    print(f"✓ Generated: qr_verification.png (SHA-256: {sha256_hash[:16]}...)")

def generate_message_qr(message_file, max_length=500):
    """Generate QR code with short message excerpt"""
    with open(message_file, 'r', encoding='utf-8') as f:
        message_text = f.read()
    
    # Extract core message (first max_length characters)
    short_message = message_text[:max_length] + "... [Full message: nhicontact.org]"
    
    qr = qrcode.QRCode(
        version=10,  # Large version for text
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(short_message)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save('qr_message_excerpt.png')
    print(f"✓ Generated: qr_message_excerpt.png (Message excerpt)")

def generate_ipfs_qr(ipfs_hash):
    """Generate QR code for IPFS gateway link"""
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(f'https://ipfs.io/ipfs/{ipfs_hash}')
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save('qr_ipfs.png')
    print(f"✓ Generated: qr_ipfs.png (IPFS: {ipfs_hash[:16]}...)")

def generate_all_qr_codes(message_file='ENHANCED_MESSAGE.txt', ipfs_hash=None):
    """Generate all QR codes"""
    print("=" * 60)
    print("NHI CONTACT QR CODE GENERATOR")
    print("=" * 60)
    print("\nGenerating QR codes...\n")
    
    # Generate standard QR codes
    generate_website_qr()
    generate_github_qr()
    
    # Generate message-specific QR codes
    if Path(message_file).exists():
        generate_verification_qr(message_file)
        generate_message_qr(message_file)
    else:
        print(f"⚠ Warning: Message file '{message_file}' not found. Skipping message QR codes.")
    
    # Generate IPFS QR code if hash provided
    if ipfs_hash:
        generate_ipfs_qr(ipfs_hash)
    else:
        print("⚠ Warning: No IPFS hash provided. Skipping IPFS QR code.")
    
    print("\n" + "=" * 60)
    print("QR CODE GENERATION COMPLETE")
    print("=" * 60)
    print("\nUSAGE:")
    print("  - Print these QR codes on flyers, posters, business cards")
    print("  - Place in strategic locations (universities, libraries, etc.)")
    print("  - Share on social media")
    print("  - Include in physical distributions")
    print("\n" + "=" * 60)

if __name__ == "__main__":
    import sys
    
    message_file = sys.argv[1] if len(sys.argv) > 1 else 'ENHANCED_MESSAGE.txt'
    ipfs_hash = sys.argv[2] if len(sys.argv) > 2 else None
    
    generate_all_qr_codes(message_file, ipfs_hash)
