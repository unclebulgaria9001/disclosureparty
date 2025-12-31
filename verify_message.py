#!/usr/bin/env python3
"""
NHI Contact Message Verification Tool
Verifies message integrity using multiple cryptographic methods
"""

import hashlib
import sys
import os
from pathlib import Path

class MessageVerifier:
    """Verify NHI contact message integrity"""
    
    def __init__(self, message_file):
        self.message_file = Path(message_file)
        if not self.message_file.exists():
            raise FileNotFoundError(f"Message file not found: {message_file}")
        
        with open(self.message_file, 'rb') as f:
            self.message_data = f.read()
    
    def calculate_sha256(self):
        """Calculate SHA-256 hash"""
        return hashlib.sha256(self.message_data).hexdigest()
    
    def calculate_sha512(self):
        """Calculate SHA-512 hash"""
        return hashlib.sha512(self.message_data).hexdigest()
    
    def calculate_sha3_256(self):
        """Calculate SHA3-256 hash"""
        return hashlib.sha3_256(self.message_data).hexdigest()
    
    def calculate_md5(self):
        """Calculate MD5 hash (legacy compatibility)"""
        return hashlib.md5(self.message_data).hexdigest()
    
    def calculate_crc32(self):
        """Calculate CRC32 checksum"""
        import zlib
        return format(zlib.crc32(self.message_data) & 0xFFFFFFFF, '08x')
    
    def verify_against_known_hash(self, known_hash, hash_type='sha256'):
        """Verify message against known hash"""
        if hash_type == 'sha256':
            calculated = self.calculate_sha256()
        elif hash_type == 'sha512':
            calculated = self.calculate_sha512()
        elif hash_type == 'sha3-256':
            calculated = self.calculate_sha3_256()
        elif hash_type == 'md5':
            calculated = self.calculate_md5()
        elif hash_type == 'crc32':
            calculated = self.calculate_crc32()
        else:
            raise ValueError(f"Unknown hash type: {hash_type}")
        
        return calculated.lower() == known_hash.lower()
    
    def generate_all_hashes(self):
        """Generate all hash types"""
        return {
            'sha256': self.calculate_sha256(),
            'sha512': self.calculate_sha512(),
            'sha3-256': self.calculate_sha3_256(),
            'md5': self.calculate_md5(),
            'crc32': self.calculate_crc32()
        }
    
    def print_verification_report(self):
        """Print comprehensive verification report"""
        print("=" * 80)
        print("NHI CONTACT MESSAGE VERIFICATION REPORT")
        print("=" * 80)
        print(f"\nFile: {self.message_file}")
        print(f"Size: {len(self.message_data):,} bytes")
        print("\nCRYPTOGRAPHIC HASHES:")
        print("-" * 80)
        
        hashes = self.generate_all_hashes()
        for hash_type, hash_value in hashes.items():
            print(f"{hash_type.upper():12}: {hash_value}")
        
        print("\n" + "=" * 80)
        print("VERIFICATION INSTRUCTIONS:")
        print("=" * 80)
        print("1. Compare the above hashes with official values at:")
        print("   https://nhicontact.org/verification")
        print("   https://github.com/humanity/nhi-contact/blob/main/verification/checksums.txt")
        print("\n2. Verify blockchain timestamps:")
        print("   Bitcoin: [TX ID to be added]")
        print("   Ethereum: [TX hash to be added]")
        print("\n3. Check IPFS hash:")
        print("   IPFS: [Hash to be added]")
        print("\n4. Verify PGP signature:")
        print("   gpg --verify ENHANCED_MESSAGE.txt.asc")
        print("\n" + "=" * 80)
        print("If all hashes match, the message has NOT been altered.")
        print("=" * 80)


def main():
    """Main verification function"""
    if len(sys.argv) < 2:
        print("Usage: python verify_message.py <message_file>")
        print("\nExample:")
        print("  python verify_message.py ENHANCED_MESSAGE.txt")
        sys.exit(1)
    
    message_file = sys.argv[1]
    
    try:
        verifier = MessageVerifier(message_file)
        verifier.print_verification_report()
        
        # If known hash provided, verify
        if len(sys.argv) >= 3:
            known_hash = sys.argv[2]
            hash_type = sys.argv[3] if len(sys.argv) >= 4 else 'sha256'
            
            if verifier.verify_against_known_hash(known_hash, hash_type):
                print(f"\n✓ SUCCESS: Message verified! Hash matches known {hash_type.upper()} hash.")
            else:
                print(f"\n✗ FAILURE: Message does NOT match known {hash_type.upper()} hash!")
                print(f"   Expected: {known_hash}")
                print(f"   Got:      {verifier.generate_all_hashes()[hash_type]}")
                sys.exit(1)
    
    except FileNotFoundError as e:
        print(f"Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
