"""
================================================================================
GG GALLERY - STATIC DATA GENERATOR
================================================================================
Description: Recursively scans the 'img' directory to generate a JSON 
             representation of the file system.
Usage:       python generate_gallery.py
Output:      gallery_data.js
================================================================================
"""

import os
import json
import urllib.parse
import hashlib
from pathlib import Path
from typing import Dict, Any

# --- CONFIGURATION ---
IMAGE_ROOT = Path('img')
OUTPUT_FILE = Path('gallery_data.js')

# Valid file extensions for processing
IMG_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'}
VID_EXTENSIONS = {'.mp4', '.mov', '.webm', '.ogg', '.mkv'}

def scan_directory(current_path: Path) -> Dict[str, Any]:
    """
    Recursively scans a directory to build the JSON data tree.
    
    Args:
        current_path (Path): The current directory path being scanned.
        
    Returns:
        Dict: A dictionary representing the folder and its children.
    """
    folder_name = current_path.name if current_path.name else "Home"
    
    # Generate a unique ID for the folder based on its path
    folder_path_str = str(current_path).replace('\\', '/')
    unique_folder_id = hashlib.md5(folder_path_str.encode('utf-8')).hexdigest()
    
    node: Dict[str, Any] = {
        "id": f"folder_{unique_folder_id}",
        "name": folder_name,
        "type": "folder",
        "children": []
    }

    if not current_path.exists() or not current_path.is_dir():
        print(f"Warning: Directory '{current_path}' not found or is invalid.")
        return node

    try:
        # Sort items alphabetically by name
        items = sorted(current_path.iterdir(), key=lambda x: x.name.lower())
    except PermissionError:
        print(f"Warning: Permission denied for '{current_path}'.")
        return node

    for item in items:
        # Skip hidden files and directories
        if item.name.startswith('.'):
            continue  

        if item.is_dir():
            child_node = scan_directory(item)
            if child_node: # Only add if valid
                node["children"].append(child_node)
            
        elif item.is_file():
            ext = item.suffix.lower()
            if ext in IMG_EXTENSIONS or ext in VID_EXTENSIONS:
                
                # Normalize path for web consumption (force forward slashes)
                normalized_path = str(item).replace('\\', '/')
                
                # URL encode the path to safely handle spaces and special characters
                web_path = urllib.parse.quote(normalized_path, safe='/')
                
                # Generate a globally unique ID using MD5 hash of the normalized path
                unique_id = hashlib.md5(normalized_path.encode('utf-8')).hexdigest()
                
                node["children"].append({
                    "id": f"media_{unique_id}",
                    "name": item.name,
                    "type": 'video' if ext in VID_EXTENSIONS else 'image',
                    "src": web_path,
                    "thumbnail": web_path,
                    "date": "" # Placeholder for future EXIF/metadata extraction
                })

    return node

def generate() -> None:
    """Main execution function to bootstrap the data generation process."""
    print(f"--- GG Gallery Generator ---")
    print(f"Scanning directory: '{IMAGE_ROOT}'...")
    
    if not IMAGE_ROOT.exists():
        print(f"CRITICAL ERROR: Root directory '{IMAGE_ROOT}' does not exist.")
        # Generate an empty root structure to prevent the UI from crashing
        root_node = {"children": []}
    else:
        root_node = scan_directory(IMAGE_ROOT)
    
    # Wrap the tree in a consistent root node expected by the frontend
    payload = {
        "id": "root",
        "name": "Home",
        "type": "folder",
        "children": root_node.get("children", [])
    }

    # Format as a JavaScript constant to avoid CORS issues with fetching local JSON
    js_content = f"const generatedFileSystem = {json.dumps(payload, indent=4)};\n"
    
    try:
        OUTPUT_FILE.write_text(js_content, encoding='utf-8')
        print(f"Success! Data structure saved to '{OUTPUT_FILE}'.")
        print(f"Total top-level items in root: {len(payload['children'])}")
    except IOError as e:
        print(f"Error writing file: {e}")

if __name__ == "__main__":
    generate()