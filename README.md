# 📸 GG Gallery 

> A high-performance, responsive, and visually stunning media management Single Page Application (SPA) built with Vanilla JavaScript (ES6+), CSS3, and Python.

**GG Gallery** is an enterprise-grade static gallery solution engineered to handle extensive media collections nested within complex directory structures. Designed with zero backend dependencies, it utilizes a Python-based generator to cryptographically index local directories into a static JSON tree, resulting in blazing-fast frontend rendering and a completely serverless experience.

---

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [🚀 Installation & Setup](#-installation--setup)
- [📂 How to Add Media](#-how-to-add-media)
- [🎯 Future Roadmap](#-future-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## <a id="features"></a>✨ Features

### 🎨 User Interface & Experience
- **Responsive & Minimalist Design:** Hardware-accelerated CSS animations (`cubic-bezier` timing curves) and a modular, BEM-inspired design system.
- **Dynamic Theming:** Seamless Dark and Light mode toggles with persistent `localStorage` synchronization.
- **Smart Accessibility:** WCAG-compliant semantic HTML5 (`<aside>`, `<nav>`, `role="tree"`) ensuring full keyboard navigability and screen-reader support.

### ⚡ Performance & State Management
- **Video-Aware Slideshow Engine:** A custom-built media player that intelligently pauses slideshow timers while playing HTML5 videos, utilizing the `onended` DOM event to seamlessly advance playback.
- **Intersection Observer Lazy-Loading:** Drastically reduces initial load times and bandwidth consumption by exclusively loading media visible in the viewport.
- **Virtual Favorites Directory:** Users can "Heart" media elements, dynamically injecting them into a virtual runtime folder and persisting data locally via JSON. 
- **DOM Recycling & Syncing:** Removing items from the active view utilizes graceful CSS transitions and raw DOM mutations to prevent expensive full-page re-renders.

### 🔍 Advanced Logic
- **Recursive Tree Searching:** Real-time, debounced fuzzy-search algorithm traversing deeply nested folder trees.
- **MD5 Cryptographic Indexing:** To prevent namespace collisions for files sharing identical names across different directories, the Python backend secures unique DOM-safe IDs by hashing the normalized absolute paths via `hashlib`.

---

## <a id="architecture"></a>🛠️ Tech Stack & Architecture

This project was intentionally built **without** bloated frontend frameworks (like React or Vue) to showcase mastery over raw DOM manipulation, ES6+ Object-Oriented Programming, and software architecture patterns.

*   **Frontend (Logic):** Vanilla JavaScript (ES6+) encapsulated into strictly typed `GalleryApp` and `MediaViewer` classes.
*   **Frontend (Styling):** Vanilla CSS3 utilizing CSS Custom Properties (`:root`), Flexbox, CSS Grid, and GPU-accelerated transforms.
*   **Backend Generator:** Python 3.x using `Pathlib` and `Hashlib` to recursively serialize file systems.
*   **Icons:** [Lucide Icons](https://lucide.dev/) embedded dynamically via CDN.

---

## <a id="setup"></a>🚀 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/gg-gallery.git
   cd gg-gallery
   ```

2. **Prerequisites**
   - Any modern Web Browser.
   - **Python 3.x** (Required only for updating the file structure data).

3. **Run a Local Web Server**
   Due to browser CORS security policies preventing local `file://` protocols from dynamically injecting module data, you must run a simple HTTP server:
   ```bash
   # Execute in the root directory
   python -m http.server 8000
   ```
   *Visit `http://localhost:8000` in your browser.*

---

## <a id="how-to-add-media"></a>📂 How to Add Media

Adding content requires zero coding. 

### 1. Organize Your Files
Navigate to the `img/` directory and structure your media natively using folders:

```text
img/
├── Vacations/
│   ├── Paris 2023/
│   │   ├── eiffel_tower.jpg
│   │   └── vlog_intro.mp4
│   └── Tokyo 2024/
├── Events/
│   └── Birthday.png
└── random_cat.jpg
```

*   **Supported Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`
*   **Supported Videos**: `.mp4`, `.mov`, `.webm`, `.ogg`, `.mkv`

### 2. Generate the Database
Whenever you add, delete, or rename files within the `img/` directory, simply run the Python indexer to sync the UI:
```bash
python generate_gallery.py
```
This generates an optimized `gallery_data.js` file consumed instantly by the frontend.

---

## <a id="future-roadmap"></a>🎯 Future Roadmap
- [ ] Implement an EXIF data extractor in the Python script to display Camera models, shutter speeds, and geolocations in the UI.
- [ ] Implement HTML5 Drag-and-Drop file uploading directly through the browser.
- [ ] Add password protection protocols for sensitive directories.

---

## <a id="contributing"></a>🤝 Contributing
Contributions, issues, and feature requests are always welcome! Feel free to check the [issues page](https://github.com/yourusername/gg-gallery/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## <a id="license"></a>📄 License
Distributed under the MIT License. See `LICENSE` for more information.