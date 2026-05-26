/**
 * =============================================================================
 * GG GALLERY - CORE APPLICATION CONTROLLER
 * =============================================================================
 * Handles Routing, UI Rendering, State Management, and Media Playback.
 * Built using modern ES6+ Classes.
 * =============================================================================
 */

'use strict';

// --- CONSTANTS & UTILITIES ---

const EMPTY_ROOT = { id: 'root', name: 'Home', type: 'folder', children: [] };

/**
 * Debounce helper to limit the rate of function execution (e.g., search input).
 */
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Intersection Observer for efficiently lazy-loading images and videos.
 */
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            if (el.tagName === 'IMG' || el.tagName === 'VIDEO') {
                el.src = el.dataset.src;
                if (el.tagName === 'IMG') {
                    el.onload = () => el.classList.remove('lazy-load');
                } else {
                    el.load();
                }
                observer.unobserve(el);
            }
        }
    });
}, { rootMargin: '200px' });

// --- MEDIA VIEWER COMPONENT ---

/**
 * Class representing the fullscreen Media Viewer overlay.
 * Handles media playback, slideshow pacing, and zooming.
 */
class MediaViewer {
    /**
     * @param {GalleryApp} appInstance - Reference to the main application controller.
     */
    constructor(appInstance) {
        this.app = appInstance;
        this.isActive = false;
        this.playlist = [];
        this.currentIndex = 0;
        this.zoomLevel = 1;
        this.slideshowInterval = null;

        // Cache DOM elements
        this.elements = {
            viewer: document.getElementById('mediaViewer'),
            title: document.getElementById('viewerTitle'),
            counter: document.getElementById('viewerCounter'),
            content: document.getElementById('viewerContent'),
            loader: document.getElementById('viewerLoader'),
            btnFavorite: document.getElementById('btnFavorite'),
            btnPlay: document.getElementById('btnSlideshow'),
            speedSelect: document.getElementById('viewerSpeedSelect')
        };

        this.bindEvents();
    }

    /**
     * Binds DOM event listeners for the viewer controls.
     */
    bindEvents() {
        document.getElementById('btnCloseViewer')?.addEventListener('click', () => this.close());
        document.getElementById('btnNextMedia')?.addEventListener('click', () => this.next());
        document.getElementById('btnPrevMedia')?.addEventListener('click', () => this.prev());
        document.getElementById('btnZoomIn')?.addEventListener('click', () => this.zoom('in'));
        document.getElementById('btnZoomOut')?.addEventListener('click', () => this.zoom('out'));
        document.getElementById('btnSlideshow')?.addEventListener('click', () => this.toggleSlideshow());
        document.getElementById('btnFullscreenMedia')?.addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('btnShare')?.addEventListener('click', () => this.share());
        document.getElementById('btnDownload')?.addEventListener('click', () => this.download());

        if (this.elements.speedSelect) {
            this.elements.speedSelect.addEventListener('change', (e) => {
                const newSpeed = parseInt(e.target.value, 10);
                this.app.state.slideshowSpeed = newSpeed;
                localStorage.setItem('gg_slideshow_speed', newSpeed.toString());
                
                // Sync the global settings modal if it exists
                const prefSelect = document.getElementById('prefSlideshowSpeed');
                if (prefSelect) prefSelect.value = newSpeed.toString();

                if (this.slideshowInterval && typeof this.slideshowInterval !== 'string') {
                    this.startSlideshowTimer();
                }
            });
        }

        this.elements.btnFavorite?.addEventListener('click', (e) => {
            const item = this.playlist[this.currentIndex];
            if (item) this.app.toggleFavorite(item, e, this.elements.btnFavorite);
        });

        this.elements.content?.addEventListener('wheel', (e) => {
            if (e.deltaY < 0) this.zoom('in');
            else this.zoom('out');
        }, { passive: true });

        // Idle Auto-hide logic for viewer toolbar
        this.elements.viewer.addEventListener('mousemove', () => this.resetIdleTimer());
        this.elements.viewer.addEventListener('click', () => this.resetIdleTimer());
        this.elements.viewer.addEventListener('touchstart', () => this.resetIdleTimer(), { passive: true });
    }

    /**
     * Resets the inactivity timer to reveal the toolbar overlay.
     */
    resetIdleTimer() {
        this.elements.viewer.classList.remove('idle');
        clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(() => {
            if (this.elements.viewer.classList.contains('active') && !this.slideshowInterval) {
                this.elements.viewer.classList.add('idle');
            }
        }, 3000); // 3 seconds of inactivity
    }

    /**
     * Opens the media viewer with a given playlist context.
     * @param {Array<Object>} playlist - The array of media items.
     * @param {Object} currentItem - The item to display initially.
     */
    open(playlist, currentItem) {
        if (!playlist || !playlist.length) return;
        this.playlist = playlist;
        this.currentIndex = playlist.findIndex(i => i.id === currentItem.id);
        if (this.currentIndex === -1) this.currentIndex = 0;
        
        this.isActive = true;
        this.elements.viewer.classList.add('active');
        this.elements.viewer.classList.remove('idle');
        
        if (this.elements.speedSelect) {
            this.elements.speedSelect.value = this.app.state.slideshowSpeed || 3000;
        }

        this.elements.viewer.focus();
        
        this.render();
        this.bindKeyboard();
        this.resetIdleTimer();
    }

    /**
     * Closes the media viewer, halts slideshows, and restores global shortcuts.
     */
    close() {
        this.stopSlideshow();
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        
        this.isActive = false;
        this.elements.viewer.classList.remove('active');
        
        // Reset state & DOM
        this.elements.content.innerHTML = '';
        this.elements.content.appendChild(this.elements.loader);
        this.elements.loader.style.display = 'none';
        
        this.zoomLevel = 1;
        document.onkeydown = null;
        this.app.bindGlobalKeyboard();
    }

    /**
     * Renders the current media item to the DOM.
     * Handles DOM recycling, preloading, and video element generation.
     */
    render() {
        const item = this.playlist[this.currentIndex];
        if (!item) return;

        this.elements.title.textContent = item.name;
        this.elements.counter.textContent = `${this.currentIndex + 1} / ${this.playlist.length}`;
        
        this.elements.loader.style.display = 'block';

        // Clear existing media, preserving the loader
        Array.from(this.elements.content.children).forEach(child => {
            if (child !== this.elements.loader) child.remove();
        });

        this.zoomLevel = 1;

        if (item.type === 'video') {
            const vid = document.createElement('video');
            vid.className = 'media-video';
            vid.src = item.src;
            vid.controls = true;
            vid.autoplay = true;
            vid.oncanplay = () => { this.elements.loader.style.display = 'none'; };
            this.elements.content.appendChild(vid);
        } else {
            const img = new Image();
            img.src = item.src;
            img.className = 'media-item';
            img.onload = () => { this.elements.loader.style.display = 'none'; };
            img.onerror = () => {
                this.elements.loader.style.display = 'none';
                this.elements.content.insertAdjacentHTML('beforeend', `<div class="error-msg">Image Failed to Load</div>`);
            };
            
            const zoomWrap = document.createElement('div');
            zoomWrap.className = 'zoom-container';
            zoomWrap.appendChild(img);
            this.elements.content.appendChild(zoomWrap);
        }
        
        this.updateFavoriteState();
        if (this.slideshowInterval) this.startSlideshowTimer(); // Reset timer on navigation
    }

    /**
     * Updates the UI state of the favorite button based on current context.
     */
    updateFavoriteState() {
        const item = this.playlist[this.currentIndex];
        if (!item || !this.elements.btnFavorite) return;
        
        const isFav = this.app.state.favorites.includes(item.id);
        this.elements.btnFavorite.classList.toggle('active', isFav);
        if (window.lucide) window.lucide.createIcons({ root: this.elements.btnFavorite.parentElement });
    }

    /**
     * Advances to the next item in the playlist.
     */
    next() {
        if (!this.playlist.length) return;
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.render();
    }

    /**
     * Reverts to the previous item in the playlist.
     */
    prev() {
        if (!this.playlist.length) return;
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.render();
    }

    /**
     * Handles hardware-accelerated image zooming.
     * @param {'in'|'out'} direction - The direction to zoom.
     */
    zoom(direction) {
        const img = this.elements.content.querySelector('.media-item');
        if (!img) return; // Only applies to images
        
        this.zoomLevel += (direction === 'in' ? 0.2 : -0.2);
        this.zoomLevel = Math.max(0.2, Math.min(this.zoomLevel, 5));
        img.style.transform = `scale(${this.zoomLevel})`;
        img.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    /**
     * Triggers a browser download for the active media item.
     */
    download() {
        const item = this.playlist[this.currentIndex];
        if (!item) return;
        const a = document.createElement('a');
        a.href = item.src;
        a.download = item.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    /**
     * Invokes the native Web Share API for the active media item.
     */
    async share() {
        const item = this.playlist[this.currentIndex];
        if (!item || !navigator.share) return;
        
        try {
            const url = item.src.startsWith('http') ? item.src : window.location.origin + '/' + item.src;
            await navigator.share({
                title: item.name,
                text: 'Check out this media from GG Gallery',
                url: url
            });
        } catch (err) {
            console.log('Share action cancelled or unsupported.');
        }
    }

    /**
     * Toggles the automated slideshow playback state.
     */
    toggleSlideshow() {
        if (this.slideshowInterval) {
            this.stopSlideshow();
        } else {
            this.startSlideshowTimer();
            if (this.elements.btnPlay) {
                this.elements.btnPlay.innerHTML = '<i data-lucide="pause"></i>';
                if (window.lucide) window.lucide.createIcons({ root: this.elements.btnPlay.parentElement });
            }
            this.elements.viewer.classList.add('idle'); // Hide toolbar
        }
    }

    /**
     * Initializes the slideshow loop timer.
     * Integrates tightly with HTML5 Video 'onended' events to wait for video completion.
     */
    startSlideshowTimer() {
        if (this.slideshowInterval && typeof this.slideshowInterval !== 'string') {
            clearTimeout(this.slideshowInterval);
        }
        
        const speed = this.app.state.slideshowSpeed || 3000;
        const currentItem = this.playlist[this.currentIndex];
        
        if (currentItem && currentItem.type === 'video') {
            const vid = this.elements.content.querySelector('video');
            if (vid) {
                vid.onended = () => {
                    this.next();
                };
                this.slideshowInterval = 'video_playing';
                return;
            }
        }
        
        this.slideshowInterval = setTimeout(() => {
            this.next();
        }, speed);
    }

    /**
     * Halts all slideshow operations and clears timeouts.
     */
    stopSlideshow() {
        if (this.slideshowInterval && typeof this.slideshowInterval !== 'string') {
            clearTimeout(this.slideshowInterval);
        }
        const vid = this.elements.content.querySelector('video');
        if (vid) vid.onended = null;

        this.slideshowInterval = null;
        this.resetIdleTimer();

        if (this.elements.btnPlay) {
            this.elements.btnPlay.innerHTML = '<i data-lucide="play"></i>';
            if (window.lucide) window.lucide.createIcons({ root: this.elements.btnPlay?.parentElement });
        }
    }

    /**
     * Requests fullscreen exclusively for the media wrapper.
     */
    toggleFullscreen() {
        const viewer = this.elements.viewer;
        if (!document.fullscreenElement) {
            viewer.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    /**
     * Binds keyboard shortcuts specifically for the viewer overlay.
     */
    bindKeyboard() {
        document.onkeydown = (e) => {
            if (!this.isActive) return;
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'Escape') this.close();
            if (e.key === ' ') { 
                e.preventDefault(); 
                const vid = this.elements.content.querySelector('video');
                if (vid) vid.paused ? vid.play() : vid.pause();
            }
        };
    }
}

// --- MAIN APPLICATION CLASS ---

class GalleryApp {
    constructor() {
        this.state = {
            pathStack: [],
            activeFolder: null,
            theme: localStorage.getItem('gg_theme') || 'dark',
            favorites: JSON.parse(localStorage.getItem('gg_favorites') || '[]'),
            slideshowSpeed: parseInt(localStorage.getItem('gg_slideshow_speed') || '3000', 10),
            rootData: null
        };

        // Cache core UI elements
        this.elements = {
            sidebar: document.getElementById('sidebar'),
            navTree: document.getElementById('navTree'),
            breadcrumbs: document.getElementById('breadcrumbs'),
            grid: document.getElementById('galleryGrid'),
            pageTitle: document.getElementById('pageTitle'),
            pageMeta: document.getElementById('pageMeta'),
            searchInput: document.getElementById('searchInput'),
            mainContent: document.querySelector('.main-content'),
            btnBackToTop: document.getElementById('btnBackToTop')
        };

        this.viewer = new MediaViewer(this);
    }

    /**
     * Bootstraps the application data and events.
     */
    /**
     * Initializes the core application.
     */
    init() {
        try {
            const data = (typeof generatedFileSystem !== 'undefined') ? generatedFileSystem : EMPTY_ROOT;
            if (data === EMPTY_ROOT) console.warn("GG Gallery: Data file missing. Falling back to empty state.");
            this.state.rootData = data;

            this.applyTheme();
            this.bindCoreEvents();
            this.renderSidebar(data);
            this.navigateTo([data]); 
            this.bindGlobalKeyboard();
            
            if (window.lucide) window.lucide.createIcons();
        } catch (err) {
            console.error("Application initialization failed:", err);
        }
    }

    /**
     * Binds core global event listeners to the document layout.
     */
    bindCoreEvents() {
        document.getElementById('btnToggleSidebar')?.addEventListener('click', () => this.toggleSidebar());
        document.getElementById('btnHome')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateHome();
        });
        document.getElementById('btnThemeToggle')?.addEventListener('click', () => this.toggleTheme());
        document.getElementById('btnFullscreenApp')?.addEventListener('click', () => this.toggleAppFullscreen());

        // Settings Modal Events
        const settingsModal = document.getElementById('settingsModal');
        document.getElementById('btnSettings')?.addEventListener('click', () => {
            document.getElementById('prefSlideshowSpeed').value = this.state.slideshowSpeed;
            settingsModal.classList.add('active');
        });
        document.getElementById('btnCloseSettings')?.addEventListener('click', () => {
            settingsModal.classList.remove('active');
        });
        document.getElementById('prefSlideshowSpeed')?.addEventListener('change', (e) => {
            const newSpeed = parseInt(e.target.value, 10);
            this.state.slideshowSpeed = newSpeed;
            localStorage.setItem('gg_slideshow_speed', newSpeed.toString());
            
            // Runtime update if slideshow is active
            if (this.viewer.slideshowInterval && typeof this.viewer.slideshowInterval !== 'string') {
                this.viewer.startSlideshowTimer();
            }
        });

        // Setup debounced search listener
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', debounce((e) => {
                const query = e.target.value.toLowerCase().trim();
                if (!query) {
                    this.renderGrid(this.state.activeFolder);
                } else {
                    const matches = this.recursiveSearch(this.state.rootData, query);
                    this.renderSearchResults(matches, query);
                }
            }, 300));
        }

        // Delegate sidebar clicks efficiently
        if (this.elements.navTree) {
            this.elements.navTree.addEventListener('click', (e) => {
                // Folder expansion chevron
                const toggle = e.target.closest('.nav-toggle-btn');
                if (toggle) {
                    e.stopPropagation();
                    const item = toggle.closest('.nav-tree-item');
                    const isExpanded = item.classList.toggle('expanded');
                    const icon = toggle.querySelector('svg') || toggle.querySelector('i');
                    if (icon) icon.style.transform = isExpanded ? 'rotate(90deg)' : 'rotate(0deg)';
                    return;
                }

                // General item row click
                const row = e.target.closest('.nav-item-row');
                if (row) {
                    this.handleSidebarNavigation(row.dataset.id);
                }
            });
        }

        // Back to top logic
        if (this.elements.mainContent && this.elements.btnBackToTop) {
            this.elements.mainContent.addEventListener('scroll', () => {
                if (this.elements.mainContent.scrollTop > 300) {
                    this.elements.btnBackToTop.classList.add('visible');
                } else {
                    this.elements.btnBackToTop.classList.remove('visible');
                }
            });

            this.elements.btnBackToTop.addEventListener('click', () => {
                this.elements.mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // --- NAVIGATION CONTROLLER ---

    navigateTo(pathArray) {
        if (!pathArray || !pathArray.length) return;

        this.state.pathStack = pathArray;
        this.state.activeFolder = pathArray[pathArray.length - 1];

        this.renderBreadcrumbs();
        this.renderGrid(this.state.activeFolder);
        this.highlightSidebarItem();

        // Reset scroll position to top on navigation
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.scrollTop = 0;
    }

    openFolder(folderId) {
        if (!this.state.activeFolder?.children) return;
        const target = this.state.activeFolder.children.find(c => c.id === folderId);
        if (target) this.navigateTo([...this.state.pathStack, target]);
    }

    navigateUp(index) {
        if (index >= 0 && index < this.state.pathStack.length) {
            this.navigateTo(this.state.pathStack.slice(0, index + 1));
        }
    }

    navigateHome() {
        if (this.elements.searchInput) this.elements.searchInput.value = '';
        if (this.state.rootData) this.navigateTo([this.state.rootData]);
    }

    handleSidebarNavigation(targetId) {
        // Auto-close sidebar on mobile
        if (window.innerWidth < 1024) this.elements.sidebar?.classList.remove('active');

        if (targetId === 'favorites-folder') {
            this.renderFavorites();
            this.highlightSidebarItem('favorites-folder');
            return;
        }

        // Recursive DFS to construct the path breadcrumbs based on a target node ID
        const findPath = (node, id, stack) => {
            if (node.id === id) return [...stack, node];
            if (!node.children) return null;
            
            for (const child of node.children) {
                if (child.type === 'folder') {
                    const path = findPath(child, id, [...stack, node]);
                    if (path) return path;
                }
            }
            return null;
        };

        const path = findPath(this.state.rootData, targetId, []);
        if (path) {
            this.navigateTo(path);
            this.expandSidebarToItem(targetId);
        }
    }

    // --- GLOBAL UI CONTROLLERS ---

    toggleSidebar() {
        const isDesktop = window.innerWidth >= 1024;
        this.elements.sidebar?.classList.toggle(isDesktop ? 'collapsed' : 'active');
    }

    toggleTheme() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('gg_theme', this.state.theme);
        this.applyTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.setAttribute('data-lucide', this.state.theme === 'dark' ? 'sun' : 'moon');
            if (window.lucide) window.lucide.createIcons({ root: icon.parentElement });
        }
    }

    toggleAppFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    }

    // --- SEARCH ---

    /**
     * Recursively searches the data tree for matching file/folder names.
     * @param {Object} node - The directory node to search within.
     * @param {string} query - The lowercase query string.
     * @returns {Array<Object>} List of matched items.
     */
    recursiveSearch(node, query) {
        let matches = [];
        if (!node.children) return matches;

        for (const child of node.children) {
            if (child.name.toLowerCase().includes(query)) matches.push(child);
            if (child.type === 'folder') {
                matches = matches.concat(this.recursiveSearch(child, query));
            }
        }
        return matches;
    }

    // --- FAVORITES ARCHITECTURE ---

    renderFavorites() {
        const favItems = this.state.favorites
            .map(favId => this.findItemById(this.state.rootData, favId))
            .filter(Boolean); // Clean up stale IDs

        // Construct a virtual root directory
        const virtualFolder = { 
            id: 'favorites-folder', 
            name: 'Favorites', 
            type: 'folder', 
            children: favItems 
        };

        this.state.pathStack = [virtualFolder];
        this.state.activeFolder = virtualFolder;
        
        this.renderBreadcrumbs();
        this.renderGrid(this.state.activeFolder);
    }

    findItemById(node, id) {
        if (node.id === id) return node;
        if (!node.children) return null;
        for (const child of node.children) {
            const found = this.findItemById(child, id);
            if (found) return found;
        }
        return null;
    }

    /**
     * Toggles favorite state of an item and dynamically updates runtime elements.
     * @param {Object} item - The media item to favorite/unfavorite.
     * @param {Event} event - The DOM click event.
     * @param {HTMLElement} buttonElement - The specific button element clicked.
     */
    toggleFavorite(item, event, buttonElement) {
        if (event) event.stopPropagation(); // prevent opening media
        
        const index = this.state.favorites.indexOf(item.id);
        const isNowActive = index === -1;
        
        // Mutate array
        if (isNowActive) {
            this.state.favorites.unshift(item.id);
        } else {
            this.state.favorites.splice(index, 1);
        }
        
        // Persist
        localStorage.setItem('gg_favorites', JSON.stringify(this.state.favorites));
        
        // Update DOM element directly without re-rendering everything
        const cardBtn = document.querySelector(`.card[data-id="${item.id}"] .card-favorite`);
        if (cardBtn) {
            cardBtn.classList.toggle('active', isNowActive);
            if (window.lucide) window.lucide.createIcons({ root: cardBtn.parentElement });
        }
        
        if (buttonElement && window.lucide) window.lucide.createIcons({ root: buttonElement.parentElement });

        // If currently in favorites folder, gracefully remove the element
        if (this.state.activeFolder?.id === 'favorites-folder' && !isNowActive) {
            const card = document.querySelector(`.card[data-id="${item.id}"]`);
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                
                // Update virtual folder children and counter immediately
                this.state.activeFolder.children = this.state.activeFolder.children.filter(c => c.id !== item.id);
                this.updatePageMeta(this.state.activeFolder);
                
                setTimeout(() => {
                    card.remove();
                    if (this.state.favorites.length === 0) this.renderGrid(this.state.activeFolder); // Show empty state
                }, 300);
            }
        }
        
        // Synchronize viewer state if currently viewing the item
        if (this.viewer.isActive && this.viewer.playlist[this.viewer.currentIndex]?.id === item.id) {
             this.viewer.updateFavoriteState();
        }
    }

    // --- GRID RENDERING LOGIC ---

    renderBreadcrumbs() {
        if (!this.elements.breadcrumbs) return;

        this.elements.breadcrumbs.innerHTML = this.state.pathStack.map((folder, index) => {
            const isLast = index === this.state.pathStack.length - 1;
            return isLast 
                ? `<div class="breadcrumb-item active" aria-current="page">${folder.name}</div>`
                : `<div class="breadcrumb-item" onclick="app.navigateUp(${index})" role="button" tabindex="0">${folder.name}<i data-lucide="chevron-right" style="width:14px;"></i></div>`;
        }).join('');
        
        if (window.lucide) window.lucide.createIcons({ root: this.elements.breadcrumbs });
    }

    /**
     * Generates exact file/folder counts for the active directory and injects them into the header.
     * @param {Object} folder - The current directory object.
     */
    updatePageMeta(folder) {
        let imageCount = 0;
        let videoCount = 0;
        let folderCount = 0;

        if (folder && folder.children) {
            folder.children.forEach(c => {
                if (c.type === 'folder') folderCount++;
                else if (c.type === 'video') videoCount++;
                else if (c.type === 'image') imageCount++;
            });
        }

        const metaParts = [];
        if (folderCount > 0) metaParts.push(`${folderCount} Folder${folderCount !== 1 ? 's' : ''}`);
        if (imageCount > 0) metaParts.push(`${imageCount} Image${imageCount !== 1 ? 's' : ''}`);
        if (videoCount > 0) metaParts.push(`${videoCount} Video${videoCount !== 1 ? 's' : ''}`);

        this.elements.pageMeta.textContent = metaParts.length > 0 ? metaParts.join(' • ') : 'Empty Directory';
    }

    /**
     * Renders the primary media grid interface.
     * @param {Object} folder - The directory object containing children to render.
     */
    renderGrid(folder) {
        if (!this.elements.grid) return;
        const grid = this.elements.grid;

        this.elements.pageTitle.textContent = folder.name;
        this.updatePageMeta(folder);
        grid.innerHTML = ''; // Clear container

        if (!folder?.children || !folder.children.length) {
            if (folder.id === 'favorites-folder') {
                grid.innerHTML = `
                    <div class="empty-state">
                        <i data-lucide="heart" style="width: 64px; height: 64px; opacity: 0.3; margin-bottom: 1.5rem; stroke-width: 1.5;"></i>
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight: 500;">No Favorites Yet</h3>
                        <p style="color: var(--text-secondary); max-width: 400px; line-height: 1.6;">Click the heart icon on any image or video to save it to your favorites. They will instantly appear right here.</p>
                    </div>`;
            } else {
                grid.innerHTML = `
                    <div class="empty-state">
                        <i data-lucide="folder-open" style="width: 64px; height: 64px; opacity: 0.3; margin-bottom: 1.5rem; stroke-width: 1.5;"></i>
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight: 500;">Empty Directory</h3>
                        <p style="color: var(--text-secondary); max-width: 400px; line-height: 1.6;">There are no images or videos in this folder.</p>
                    </div>`;
            }
            if (window.lucide) window.lucide.createIcons({ root: grid });
            return;
        }

        // Default stable sort: Folders first, then files. Alphabetical assumed from backend.
        const items = [...folder.children].sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return 0; 
        });

        // Inflate DOM cards
        items.forEach((item, index) => this.createCard(item, index, grid, items));
        
        // Initialize intersection observers for performance
        grid.querySelectorAll('.lazy-load, .lazy-load-video').forEach(el => lazyLoadObserver.observe(el));
        if (window.lucide) window.lucide.createIcons({ root: grid });
    }

    renderSearchResults(results, query) {
        const grid = this.elements.grid;
        if (!grid) return;

        this.elements.pageTitle.textContent = `Search: "${query}"`;
        this.elements.pageMeta.textContent = `${results.length} found`;
        grid.innerHTML = results.length ? '' : `<div class="empty-state">No results found</div>`;

        results.forEach((item, index) => this.createCard(item, index, grid, results, true));
        
        grid.querySelectorAll('.lazy-load, .lazy-load-video').forEach(el => lazyLoadObserver.observe(el));
        if (window.lucide) window.lucide.createIcons({ root: grid });
    }

    createCard(item, index, container, contextList, isSearch = false) {
        const card = document.createElement('div');
        card.className = 'card fade-in-up';
        card.style.animationDelay = `${(index % 20) * 40}ms`; // Staggered entrance
        card.tabIndex = 0;
        card.dataset.id = item.id;

        const wrapper = document.createElement('div');
        wrapper.className = 'card-media-wrapper';

        if (item.type === 'folder') {
            const thumb = this.findFolderThumbnail(item);
            let imgCount = 0; let vidCount = 0; let folCount = 0;
            if (item.children) {
                item.children.forEach(c => {
                    if (c.type === 'folder') folCount++;
                    else if (c.type === 'video') vidCount++;
                    else if (c.type === 'image') imgCount++;
                });
            }
            const parts = [];
            if (folCount > 0) parts.push(`${folCount} Folders`);
            if (imgCount > 0) parts.push(`${imgCount} Images`);
            if (vidCount > 0) parts.push(`${vidCount} Videos`);
            const metaText = parts.length > 0 ? parts.join(' • ') : 'Empty';

            wrapper.innerHTML = thumb 
                ? `<img data-src="${thumb}" class="card-img-bg lazy-load" alt="" role="presentation">
                   <img data-src="${thumb}" class="card-img-main lazy-load" alt="${item.name}">`
                : `<div class="card-placeholder"><i data-lucide="folder" class="placeholder-icon"></i></div>`;

            wrapper.innerHTML += `
                <div class="folder-overlay">
                    <div class="folder-name">${item.name}</div>
                    <div class="folder-count">${metaText}</div>
                </div>`;
            
            card.addEventListener('click', () => isSearch ? this.handleSidebarNavigation(item.id) : this.openFolder(item.id));

        } else {
            const playlist = contextList.filter(i => i.type !== 'folder');
            card.addEventListener('click', () => this.viewer.open(playlist, item));

            // Favorite Button Injection
            const isFav = this.state.favorites.includes(item.id);
            const favBtn = document.createElement('button');
            favBtn.className = `card-favorite ${isFav ? 'active' : ''}`;
            favBtn.dataset.id = item.id;
            favBtn.setAttribute('aria-label', 'Toggle Favorite');
            favBtn.innerHTML = `<i data-lucide="heart"></i>`;
            favBtn.addEventListener('click', (e) => this.toggleFavorite(item, e, favBtn));
            card.appendChild(favBtn);

            // Media Preview Injection
            if (item.type === 'video') {
                const vid = document.createElement('video');
                vid.className = 'card-video-main lazy-load-video';
                vid.dataset.src = `${item.src}#t=0.1`; // Preload strictly 1st frame to save bandwidth
                vid.muted = true;
                vid.preload = 'none';
                vid.addEventListener('mouseenter', () => vid.play().catch(() => {}));
                vid.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0.1; });
                
                wrapper.appendChild(vid);
                wrapper.insertAdjacentHTML('beforeend', `<div class="video-indicator"><i data-lucide="play"></i></div>`);
            } else {
                const img = document.createElement('img');
                img.className = 'card-img-main lazy-load';
                img.dataset.src = item.thumbnail;
                img.alt = item.name;
                img.onerror = () => {
                    wrapper.innerHTML = `<div class="card-placeholder"><i data-lucide="image-off"></i><small>Error</small></div>`;
                    if (window.lucide) window.lucide.createIcons({ root: wrapper });
                };
                
                const bg = document.createElement('img');
                bg.className = 'card-img-bg lazy-load';
                bg.dataset.src = item.thumbnail;
                bg.alt = '';
                
                wrapper.appendChild(bg);
                wrapper.appendChild(img);
            }
        }

        // Accessibility binding
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter') card.click(); });
        card.appendChild(wrapper);
        container.appendChild(card);
    }

    /**
     * Recursively traverses folders to find a valid image to use as a cover thumbnail.
     */
    findFolderThumbnail(folder) {
        if (!folder.children) return null;
        
        const img = folder.children.find(c => c.type === 'image');
        if (img) return img.thumbnail;

        for (const child of folder.children) {
            if (child.type === 'folder') {
                const found = this.findFolderThumbnail(child);
                if (found) return found;
            }
        }
        return null;
    }

    // --- SIDEBAR RENDERING ---

    renderSidebar(rootData) {
        if (!this.elements.navTree) return;

        const favHTML = `
            <div class="nav-tree-item" id="tree-item-favorites-folder">
                <div class="nav-item-row" data-id="favorites-folder" style="padding-left: 0.5rem" tabindex="0" role="treeitem">
                    <div class="nav-toggle-btn" style="opacity:0; pointer-events:none;" aria-hidden="true"><i data-lucide="chevron-right" style="width:16px;"></i></div>
                    <i data-lucide="heart" class="nav-folder-icon" style="color: #ef4444;"></i>
                    <span class="nav-item-text">Favorites</span>
                </div>
            </div>`;

        this.elements.navTree.innerHTML = favHTML + this.buildSidebarHTML(rootData, 0);
    }

    buildSidebarHTML(folder, depth) {
        const subfolders = folder.children?.filter(c => c.type === 'folder') || [];
        const hasSubs = subfolders.length > 0;
        const padding = 0.5 + (depth * 1);
        
        const childrenHTML = hasSubs 
            ? `<div class="nav-children" role="group"><div class="nav-children-inner">${subfolders.map(s => this.buildSidebarHTML(s, depth + 1)).join('')}</div></div>`
            : '';

        const arrowStyle = hasSubs ? '' : 'opacity:0; pointer-events:none;';
        const iconName = depth === 0 ? 'home' : 'folder';

        return `
            <div class="nav-tree-item" id="tree-item-${folder.id}">
                <div class="nav-item-row" data-id="${folder.id}" style="padding-left: ${padding}rem" tabindex="0" role="treeitem" aria-expanded="false">
                    <div class="nav-toggle-btn" role="button" aria-label="Toggle Folder">
                        <i data-lucide="chevron-right" style="width:16px; ${arrowStyle}"></i>
                    </div>
                    <i data-lucide="${iconName}" class="nav-folder-icon"></i>
                    <span class="nav-item-text">${folder.name}</span>
                </div>
                ${childrenHTML}
            </div>`;
    }

    expandSidebarToItem(id) {
        const el = document.querySelector(`.nav-item-row[data-id="${id}"]`);
        if (!el) return;

        let parent = el.closest('.nav-children');
        while (parent) {
            parent.parentElement.classList.add('expanded');
            const row = parent.parentElement.querySelector('.nav-item-row');
            if (row) row.setAttribute('aria-expanded', 'true');
            
            const icon = parent.parentElement.querySelector('.nav-toggle-btn svg');
            if (icon) icon.style.transform = 'rotate(90deg)';
            
            parent = parent.parentElement.parentElement.closest('.nav-children');
        }
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    highlightSidebarItem(id = this.state.activeFolder?.id) {
        if (!id) return;
        document.querySelectorAll('.nav-item-row').forEach(el => {
            el.classList.remove('active');
            el.setAttribute('aria-selected', 'false');
        });
        const active = document.querySelector(`.nav-item-row[data-id="${id}"]`);
        if (active) {
            active.classList.add('active');
            active.setAttribute('aria-selected', 'true');
            this.expandSidebarToItem(id);
        }
    }

    bindGlobalKeyboard() {
        document.onkeydown = (e) => {
            // Disable if viewer is open or no folder is active
            if (this.viewer.isActive || !this.state.activeFolder) return;
            
            const activeId = this.state.activeFolder.id;
            const currentEl = document.querySelector(`.nav-item-row[data-id="${activeId}"]`);
            if (!currentEl) return;

            const rows = Array.from(document.querySelectorAll('.nav-item-row:not([style*="display: none"])'));
            const idx = rows.indexOf(currentEl);

            if (e.key === 'ArrowDown' && idx < rows.length - 1) {
                e.preventDefault();
                this.handleSidebarNavigation(rows[idx + 1].dataset.id);
            } else if (e.key === 'ArrowUp' && idx > 0) {
                e.preventDefault();
                this.handleSidebarNavigation(rows[idx - 1].dataset.id);
            }
        };
    }
}

// --- BOOTSTRAP ---

let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new GalleryApp();
    app.init();
});