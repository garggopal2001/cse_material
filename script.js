/**
 * @file Main JavaScript file for the CSE 2020 academic resources website.
 * @description This script, architected as a self-contained module, handles all
 * dynamic functionality of this single-page application (SPA). It follows
 * modern clean code principles for maintainability and clarity.
 * @author garggopal2001 (Refactored by Professional Developer)
 * Date: September 7, 2025
 */

/**
 * @module resourceApp
 * @description The main application module, encapsulated in an IIFE (Immediately
 * Invoked Function Expression) to prevent polluting the global namespace.
 */
const resourceApp = (() => {
    // --- CONFIGURATION ---
    // Centralized constants to avoid "magic strings" and for easy tweaking.
    const config = {
        views: {
            HOME: 'homeView',
            DETAILS: 'courseDetailsView',
            SEARCH: 'searchResultsView',
        },
        debounceTime: 300, // ms to wait after user stops typing to search
    };

    // --- STATE MANAGEMENT ---
    // A simple object to track the application's state.
    const state = {
        currentView: config.views.HOME,
        previousView: null,
        lastViewedSemesterId: null,
    };

    // --- DOM ELEMENT CACHING ---
    // Caching elements on startup avoids costly, repetitive DOM queries.
    const DOM = {
        views: document.querySelectorAll('.view'),
        linksGrid: document.getElementById('linksGrid'),
        semestersContainer: document.getElementById('semestersContainer'),
        courseDetailsContent: document.getElementById('courseDetailsContent'),
        searchResultsList: document.getElementById('searchResultsList'),
        searchResultsTitle: document.getElementById('searchResultsTitle'),
        noSearchResults: document.getElementById('noSearchResults'),
        searchInput: document.getElementById('searchInput'),
        scrollTopBtn: document.getElementById('scrollTopBtn'),
    };

    // --- TEMPLATE GENERATION (HTML FACTORIES) ---
    // Pure functions that take data objects and return HTML strings.

    /** Uses destructuring for cleaner access to link properties. */
    const createLinkCardHTML = ({ link, title, icon, name }) => `
        <a href="${link}" target="_blank" class="link-card" title="${title}">
            <i class="fas ${icon}"></i>
            <span>${name}</span>
        </a>`;

    /** Uses destructuring for cleaner access to course properties. */
    const createCourseCardHTML = ({ id, name, code }) => `
        <button class="course-card" data-action="show-details" data-course-id="${id}" aria-label="View details for ${name}">
            <span class="course-name">${name}</span>
            <span class="course-code">${code}</span>
        </button>`;

    /** Uses destructuring for cleaner access to resource properties. */
    const createResourceLinkHTML = ({ link, icon, name }) => `
        <a href="${link}" target="_blank" class="resource-link">
            <i class="${icon || 'fas fa-link'}"></i> ${name}
        </a>`;

    const createResourceSectionHTML = (title, icon, items) => {
        if (!items || items.length === 0) return '';
        return `
            <div class="resource-section">
                <h4><i class="fas ${icon}"></i> ${title}</h4>
                <div class="resource-links">${items.map(createResourceLinkHTML).join('')}</div>
            </div>`;
    };

    // --- RENDER FUNCTIONS ---
    // These functions are responsible for updating the DOM.

    const renderImportantLinks = () => {
        DOM.linksGrid.innerHTML = importantLinksData.map(createLinkCardHTML).join('');
    };

    const renderHomepageCourses = () => {
        const semesterGroups = coursesData.reduce((acc, course) => {
            (acc[course.semester] = acc[course.semester] || []).push(course);
            return acc;
        }, {});

        const allSemestersHTML = Object.entries(semesterGroups)
            .sort(([semA], [semB]) => semA - semB) // Sort to ensure semesters are in order
            .map(([semNum, courses]) => `
                <div id="semester-section-${semNum}" class="semester-section">
                    <h3 class="semester-title">${getSemesterTitle(semNum)}</h3>
                    <div class="course-buttons-grid">${courses.map(createCourseCardHTML).join('')}</div>
                </div>`
            ).join('');
        
        DOM.semestersContainer.innerHTML = allSemestersHTML;
    };

    const renderCourseDetails = (courseId) => {
        const course = coursesData.find(c => c.id === courseId);
        if (!course) return showView(config.views.HOME);

        state.lastViewedSemesterId = `semester-section-${course.semester}`;
        
        const { name, code, semester, prof_b, vid_b, web_b, not_b, tut_b, oth_b, mat_b } = course;

        // More declarative way to build sections, making it easier to reorder or add new ones.
        const resourceSections = [
            { title: 'Professor(s)', icon: 'fa-user-tie', items: prof_b },
            { title: 'Videos', icon: 'fa-video', items: vid_b },
            { title: 'Webpages', icon: 'fa-globe', items: web_b },
            { title: 'Notes', icon: 'fa-book', items: not_b },
            { title: 'Tutorials', icon: 'fa-chalkboard-teacher', items: tut_b },
            { title: 'Other Resources', icon: 'fa-archive', items: oth_b },
        ];

        let detailsHTML = `
            <div class="course-header">
                <h3>${name}</h3>
                <p><strong>Course Code:</strong> ${code} | <strong>Semester:</strong> ${getSemesterTitle(semester)}</p>
            </div>
            ${resourceSections.map(section => createResourceSectionHTML(section.title, section.icon, section.items)).join('')}`;

        if (mat_b) {
            detailsHTML += `
                <div class="resource-section">
                    <h4><i class="fas fa-folder"></i> Course Materials (OneDrive)</h4>
                    <div class="resource-links">
                        <a href="${mat_b}" target="_blank" class="resource-link"><i class="fab fa-microsoft"></i> OneDrive Material</a>
                    </div>
                </div>`;
        }

        DOM.courseDetailsContent.innerHTML = detailsHTML;
        showView(config.views.DETAILS, true);
    };

    const renderSearchResults = (query) => {
        if (!query) {
            if (state.currentView === config.views.SEARCH) showView(config.views.HOME);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const results = coursesData.filter(c =>
            c.name.toLowerCase().includes(lowerCaseQuery) ||
            c.code.toLowerCase().includes(lowerCaseQuery)
        );

        const hasResults = results.length > 0;
        DOM.searchResultsTitle.textContent = hasResults ? `Found ${results.length} result(s) for "${query}"` : 'Search Results';
        DOM.searchResultsList.innerHTML = hasResults ? results.map(course => `
            <div class="search-result-item" data-action="show-details" data-course-id="${course.id}">
                <span class="course-name">${course.name}</span>
                <span class="course-code">${course.code} - ${getSemesterTitle(course.semester)}</span>
            </div>`).join('') : '';
        DOM.noSearchResults.classList.toggle('hidden', hasResults);

        showView(config.views.SEARCH, true);
    };

    // --- VIEW & NAVIGATION MANAGEMENT ---

    const showView = (viewId, forceTop = false) => {
        state.previousView = state.currentView;
        state.currentView = viewId;

        DOM.views.forEach(view => view.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
        
        if (forceTop) {
            window.scrollTo({ top: 0, behavior: 'auto' });
        } else if (viewId === config.views.HOME && state.lastViewedSemesterId) {
            document.getElementById(state.lastViewedSemesterId)?.scrollIntoView({ behavior: 'smooth' });
            state.lastViewedSemesterId = null;
        }
    };
    
    // --- EVENT HANDLERS ---

    /**
     * @description A single, delegated event listener for all click actions.
     * This is more performant than attaching listeners to each button.
     * It reads the `data-action` attribute to decide which function to run.
     */
    const handleClick = (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const { action, courseId } = target.dataset;

        const actions = {
            'show-home': () => {
                showView(config.views.HOME, true);
                DOM.searchInput.value = '';
            },
            'go-back': () => {
                const targetView = state.previousView === config.views.SEARCH ? config.views.SEARCH : config.views.HOME;
                showView(targetView, false);
            },
            'show-details': () => courseId && renderCourseDetails(courseId),
            'scroll-top': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        };

        actions[action]?.(); // Safely call the action if it exists
    };

    /**
     * @description A debounced search handler to prevent firing search on every keystroke.
     */
    const handleSearch = (() => {
        let timeout;
        return (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => renderSearchResults(e.target.value.trim()), config.debounceTime);
        };
    })();

    const handleScroll = () => {
        DOM.scrollTopBtn.classList.toggle('hidden', window.scrollY <= 300);
    };

    // --- UTILITY FUNCTIONS ---

    const getSemesterTitle = (semNum) => {
        const titles = { 11: "Depth Elective", 12: "Breadth Elective" };
        return titles[semNum] || `Semester ${semNum}`;
    };

    // --- INITIALIZATION ---
    
    const bindEventListeners = () => {
        document.addEventListener('click', handleClick);
        DOM.searchInput.addEventListener('input', handleSearch);
        window.addEventListener('scroll', handleScroll);
    };

    const init = () => {
        renderImportantLinks();
        renderHomepageCourses();
        bindEventListeners();
        showView(config.views.HOME, true);
        console.log("CSE 2020 Resource App Initialized.");
    };

    return { init }; // Expose only the init function to the public scope.
})();

// ==================================================================
// --- DATA STORE ---
// All application data is stored here, separate from the logic.
// To update the website, you only need to edit the arrays below.
// ==================================================================
const coursesData = [
 // SEM01 M1
    {
        name: `Advanced Calculus`,
        id: `sem01Modal1`,
        semester: 1,
        code: `MA11003`,
        prof_b: [
            {
                name: `Chandal Nahak`,
                link: `http://www.iitkgp.ac.in/department/MA/faculty/ma-cnahak`
            }
        ],
        vid_b: [
            {
                name: `NPTEL Lec (Prof. JK)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLbRMhDVUMngeVrxtbBz-n8HvP8KAWBpI5`,
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/15x-fSeU2o0l2o3McMIfTBOGD2WKZjhgn/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EuV9MHz3lVBCgZNfzcjX_K4BaOkaDAZjkgeJOhaTo6BwtA?e=GhKHJ9`
    },
    // SEM01 M2
    {
        name: `DIY Project`,
        id: `sem01Modal2`,
        semester: 1,
        code: `DY17003`,
        prof_b: [
            {
                name: `Vikranth Racherla`,
                link: `http://www.iitkgp.ac.in/department/ME/faculty/me-vikranth.racherla`
            },
            {
                name: `Sandeep Kumar Reddy`,
                link: `http://www.iitkgp.ac.in/department/CD/faculty/cd-skreddy`
            },
            {
                name: `Budhaditya Mukherjee`,
                link: `http://www.smst.iitkgp.ac.in/Smst/facultydetails/smst-bmukherjee`
            },
            {
                name: `Sreeraj Puravankara`,
                link: `http://www.iitkgp.ac.in/department/ES/faculty/es-sreeraj`
            }
        ],
        vid_b: [
            {
                name: `Channel`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/channel/UCeWJRb61WvPzRTFN2UsScgg`,
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EnjwKZxbaQ9IglZ2TVI7EiIBhIVqdgqMf2SlxXeYP_tBpA?e=9aKJKp`
    },
    // SEM01 M3
    {
        name: `Physics of Waves`,
        id: `sem01Modal3`,
        semester: 1,
        code: `PH11003`,
        prof_b: [
            {
                name: `Amar Nath Gupta`,
                link: `http://www.iitkgp.ac.in/department/PH/faculty/ph-ang`
            }
        ],
        vid_b: [
            {
                name: `NPTEL Lec (Prof. SB)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLoRUNeJAicqa1GgkIsUOKP-VN93rUTqbZ`,
            },
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiPvHpaoWOgL-OxMd-f5ccK`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ek0WmhQyOy9LsJXTMNff8S0BlCxYmDqpgsri7p5Oyss8EQ?e=TrvlUJ`
    },
    // SEM01 M4
    {
        name: `Physics Laboratory`,
        id: `sem01Modal4`,
        semester: 1,
        code: `PH19003`,
        prof_b: [
            {
                name: `Somnath Bharadwaj`,
                link: `http://www.iitkgp.ac.in/department/PH/faculty/ph-somnath`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EtZITSiJ6M9Km23WHr-moDkBD5Kjl_7DHF0dlnzdbQMLtQ?e=sXUhAR`
    },
    // SEM01 M5
    {
        name: `Electrical Technology`,
        id: `sem01Modal5`,
        semester: 1,
        code: `EE11003`,
        prof_b: [
            {
                name: `Alok Kanti Deb`,
                link: `http://www.iitkgp.ac.in/department/EE/faculty/ee-alokkanti`
            }
        ],
        vid_b: [
            {
                name: `NPTEL Lec (Prof. DD)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLbRMhDVUMngfdEXVcdf_ijj2Eub-UHs_y`,
            },
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiZwuD6FC3YHQc24fHoP5zb`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EixYbXCSLa9BpObN84j2qWIBFTYMiZ-ZmtqgGnEbuYKEeg?e=CmcjIN`
    },
    // SEM01 M6
    {
        name: `Basic Engineering Mechanics`,
        id: `sem01Modal6`,
        semester: 1,
        code: `ME11003`,
        prof_b: [
            {
                name: `Atul Jain`,
                link: `http://www.iitkgp.ac.in/department/ME/faculty/me-atuljain`
            }
        ],
        vid_b: [
            {
                name: `Discussion Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fj5SurMs5l1UQsieLawe9FB`
            },
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgrOr4_VlC3M3B8fBcD33im`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EjkAfcTz1sZKkS8LltObqZABV-mtwu4sQ5xnRgpks9j0LA?e=xtb8pB`
    },
    // SEM01 M7
    {
        name: `Engineering Laboratory`,
        id: `sem01Modal7`,
        semester: 1,
        code: `EN19003`,
        prof_b: [
            {
                name: `Partha Saha`,
                link: `http://www.iitkgp.ac.in/department/ME/faculty/me-psaha`
            },
            {
                name: `Saurav Pramanik`,
                link: `http://www.iitkgp.ac.in/department/EE/faculty/ee-saurav.pramanik`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiVJIuHrRIJHcUbG7jh7G2I`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EoeYi2dxKHJCktwfSyDc6GsBqtq-A4Isj8jxg8r8LBaaDQ?e=9fAj99`
    },
    // SEM01 M8
    {
        name: `Environmental Science`,
        id: `sem01Modal8`,
        semester: 1,
        code: `EV10003`,
        prof_b: [
            {
                name: `Brajesh Kumar Dubey`,
                link: `http://www.iitkgp.ac.in/department/CE/faculty/ce-bkdubey`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLZ_PdYd5FtzsDkiEKV7GQHocPYdAUNVeO`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EkYGebyh-zZHjonIb5Sn55gBKnlaqjcDUXLEfgMG5lhSUA?e=4Ry3ir`
    },
    // SEM02 M1
    {
        name: `Linear Algebra, Numerical and Complex Analysis`,
        id: `sem02Modal1`,
        semester: 2,
        code: `MA11004`,
        prof_b: [
            {
                name: `Jitendra Kumar`,
                link: `http://www.facweb.iitkgp.ac.in/~jkumar/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21 (Prof. JK)`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fihmbX75Vlo1BKhC0arr850`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/drive/folders/1ZRHJHFK7DUqfoALEPJzXzC2p56sA_dMD`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EulMt0T8VulBhrvRRQgmQ3cBKn4RgdO_vmgHiZHGSWWi4Q?e=HYnbOD`
    },
    // SEM02 M2
    {
        name: `Engineering Drawing and Computer Graphics`,
        id: `sem02Modal2`,
        semester: 2,
        code: `CE13003`,
        prof_b: [
            {
                name: `Debarghya Chakraborty`,
                link: `http://www.facweb.iitkgp.ac.in/~debarghya/`
            },
            {
                name: `Sujit Kumar Dash`,
                link: `http://www.iitkgp.ac.in/department/CE/faculty/ce-sujit`
            }
        ],
        vid_b: [
            {
                name: `Tikle’s Academy`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/c/TIKLESACADEMY`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ep03FrB5dSZDnUdx76lqf80BGveUxCpV3YAcygSwCoVvDQ?e=jdo3g1`
    },
    // SEM02 M3
    {
        name: `Programming and Data Structures`,
        id: `sem02Modal3`,
        semester: 2,
        code: `CS10003`,
        prof_b: [
            {
                name: `Abhijit Das`,
                link: `http://cse.iitkgp.ac.in/~abhij/`
            }
        ],
        vid_b: [
            {
                name: `CodeWithHarry`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR`
            },
            {
                name: `Jenny's lectures`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S`
            },
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fhIRayMsGmZsN_vrWCN_7xP`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~aritrah/course/theory/PDS/Autumn20/`
            },
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/pds/semester/2021s/`
            }
        ],
        tut_b: [
            {
                name: `w3schools`,
                icon: `fa-solid fa-newspaper`,
                link: `https://www.w3schools.in/c-tutorial/`
            },
            {
                name: `geeksforgeeks`,
                icon: `fa-solid fa-newspaper`,
                link: `https://www.geeksforgeeks.org/c-programming-language/`
            },
            
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/El8ruPqg7XJOv-x_Km2LPhUBPn5zVQVcI30Dll2NjFwYwQ?e=fmaYWi`
    },
    // SEM02 M4
    {
        name: `Programming and Data Structures Laboratory`,
        id: `sem02Modal4`,
        semester: 2,
        code: `CS19003`,
        prof_b: [
            {
                name: `Pallab Dasgupta`,
                link: `https://cse.iitkgp.ac.in/~pallab/`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_21_10`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~aritrah/course/lab/PDS/Spring2021/`
            },
            {
                name: `Web_Spr_21_01`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pallab/course/2021/Spring%202021/PDS_LAB/index.html`
            },
        ],
        oth_b: [
            {
                name: `VS Code`,
                icon: `fa-solid fa-laptop-code`,
                link: `https://code.visualstudio.com/download`
            },
            {
                name: `mingw`,
                icon: `fa-solid fa-code`,
                link: `https://nuwen.net/mingw.html`
            },
            {
                name: `CodeBlocks`,
                icon: `fa-solid fa-laptop-code`,
                link: `https://www.fosshub.com/Code-Blocks.html?dwl=codeblocks-20.03mingw-setup.exe`
            },
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EnzJ-_qI4j1BqZgWS9yDIYcB5d1DpbZdOSfUBYXWH5aP8A?e=0aFgy4`
    },
    // SEM02 M5
    {
        name: `Chemistry`,
        id: `sem02Modal5`,
        semester: 2,
        code: `CY11003`,
        prof_b: [
            {
                name: `Sanjoy Bandyopadhyay`,
                link: `http://www.chemistry.iitkgp.ac.in/professor/sanjoy`
            },
            {
                name: `C Retna Raj`,
                link: `http://www.chemistry.iitkgp.ac.in/fac/CRR/index.php`
            },
            {
                name: `Narayan Dhuleep Pradeep Singh`,
                link: `http://www.chemistry.iitkgp.ac.in/~ndpradeep/ndps.html`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fhNqDk-Khp3GHWzo4vYCdk5`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EiHPhqMntR9JujbgJhQeZncBzLiql25jog7CWVzUklfEoQ?e=CzPT1q`
    },
    // SEM02 M6
    {
        name: `Chemistry Laboratory`,
        id: `sem02Modal6`,
        semester: 2,
        code: `CY19003`,
        prof_b: [
            {
                name: `Anoop Ayyappan`,
                link: `http://www.chemistry.iitkgp.ac.in/~anoop/`
            },
            {
                name: `C Retna Raj`,
                link: `http://www.chemistry.iitkgp.ac.in/fac/CRR/index.php`
            },
            {
                name: `Narayan Dhuleep Pradeep Singh`,
                link: `http://www.chemistry.iitkgp.ac.in/~ndpradeep/ndps.html`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fh8d2LQc3U6wXtiSrtXUcI_`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eo_8p6eiLEVKlnYADz9d2VABngvAR8O8puetpFtEgMv5kg?e=6tFa7E`
    },
    // SEM02 M7
    {
        name: `English for Communication`,
        id: `sem02Modal7`,
        semester: 2,
        code: `HS13003`,
        prof_b: [
            {
                name: `Priyadarshi Patnaik`,
                link: `https://sohiitkgp.wixsite.com/happiness/priyadarshi`
            },
            {
                name: `Somdatta Bhattacharya`,
                link: `http://www.iitkgp.ac.in/department/HS/faculty/hs-somdatta`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EngZC4BAaLBIuQ8GdsYoe3kBWWY7wJtQz4f825sQ0w560w?e=eYmju6`
    },
    // SEM02 M8
    {
        name: `Science of Living Systems`,
        id: `sem02Modal8`,
        semester: 2,
        code: `BS10003`,
        prof_b: [
            {
                name: `Dibyendu Samanta`,
                link: `https://iitkgpbioscience.weebly.com/dibyendu-samanta.html`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-firFNvR4F93IublKZGJvvUV`
            },
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eh0lX36NXZNCs5wiBekGudwBehSeqV6aqakzE2kdOKBeyg?e=yfLOoq`
    },
    // SEM03 M1
    {
        name: `Probability and Statistics`,
        id: `sem03Modal1`,
        semester: 3,
        code: `MA20205`,
        prof_b: [
            {
                name: `Swanand Ravindra Khare`,
                link: `https://sites.google.com/site/swanandkhare/`
            },
            {
                name: `Buddhananda Banerjee`,
                link: `https://buddhanandabanerje.wixsite.com/website`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21 (Prof. SK)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fjaNs9EL3nYZUHNFBFb213o`
            },
            {
                name: `Lec_Aut_21 (Prof. SRK)`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgh8A2-3mSwEcOTfh10HjoB`
            },
            {
                name: `Lec_Aut_21 (Prof. BB)`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fixcX3G2kxpE20zkkqr5lGd`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1c7U4gX2qjUX-h3TNnFIhAOUJYTFZ-yEa/view?usp=drivesdk`
            }
        ],
        oth_b: [
            {
                name: `Formula PDFs`,
                icon: `fa-solid fa-bars-staggered`,
                link: `https://drive.google.com/drive/folders/1veQlwVt8BFaIU5LFLatA8DjtYe2Gb2MP`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EvZ8zbzlED9GhPzVL5kVaLsBkfB61kOIdz3Qp-KVBQJGuA?e=6bG2Ms`
    },
    // SEM03 M2
    {
        name: `Discrete Structures`,
        id: `sem03Modal2`,
        semester: 3,
        code: `CS21201`,
        prof_b: [
            {
                name: `Abhijit Das`,
                link: `http://cse.iitkgp.ac.in/~abhij/`
            },
            {
                name: `Aritra Hazra`,
                link: `https://cse.iitkgp.ac.in/~aritrah/`
            }
        ],
        vid_b: [
            {
                name: `Discussion Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgxYnvoadbfGF9EM2HlmCnm`
            },
            {
                name: `Lec_Aut_21_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjfaJWNZG5jFXxNH-UVpQwM`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~abhij/course/theory/DS/Autumn20/`
            },
            {
                name: `Web_Aut_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~abhij/course/theory/DS/Autumn21/`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EqVJiHMGShpBq8cwvozDHQYBGjlO8bqw2WnzLQ831ZNFFg?e=jPIeUk`
    },
    // SEM03 M3
    {
        name: `Algorithms-I`,
        id: `sem03Modal3`,
        semester: 3,
        code: `CS21203`,
        prof_b: [
            {
                name: `Animesh Mukherjee`,
                link: `http://cse.iitkgp.ac.in/~animeshm/`
            },
            {
                name: `Pawan Goyal`,
                link: `https://cse.iitkgp.ac.in/~pawang/`
            }
        ],
        vid_b: [
            {
                name: `CodeWithHarry`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi`
            },
            {
                name: `Jenny's lectures`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU`
            },
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fiT97ajDdwl6ClgtgId9xy8`
            },
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiulSmpgyp0qD-olJ89AvGR`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pawang/courses/ALGO20.html`
            },
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~palash/Courses/2021Algorithms1-Theory/algo1-2021.html`
            },
            {
                name: `Web_Aut_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pawang/courses/ALGO21.html`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1VlvCDu0v7TMaF7NZi5YU_QEq8mbuAU-e/view?usp=drivesdk`
            }
        ],
        tut_b: [
            {
                name: `tutorialspoint`,
                icon: `fa-solid fa-newspaper`,
                link: `https://www.tutorialspoint.com/data_structures_algorithms/index.htm`
            },
            {
                name: `javatpoint`,
                icon: `fa-solid fa-newspaper`,
                link: `https://www.javatpoint.com/data-structure-tutorial`
            },
            {
                name: `programiz`,
                icon: `fa-solid fa-newspaper`,
                link: `https://www.programiz.com/dsa`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Epci9L8j_zxCugoa0igbZAMBTSnOHw08yZbyoHUH2rQnhg?e=9eEbBt`
    },
    // SEM03 M4
    {
        name: `Algorithms Laboratory`,
        id: `sem03Modal4`,
        semester: 3,
        code: `CS29203`,
        prof_b: [
            {
                name: `Animesh Mukherjee`,
                link: `http://cse.iitkgp.ac.in/~animeshm/`
            },
            {
                name: `Pawan Goyal`,
                link: `https://cse.iitkgp.ac.in/~pawang/`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pawang/courses/ALGO20.html`
            },
            {
                name: `Web_Aut_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pawang/courses/ALGO21.html`
            }
        ],
        oth_b: [
            {
                name: `Assignments Code`,
                icon: `fa-solid fa-code`,
                link: `https://drive.google.com/drive/folders/1yjlCBNpvn3I65LMNe6GAT6G64zu1G4kx`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Evalh07-H9dLkJYUdQijAFgB9JE0xADtyK_KJXAyXqaBDQ?e=Uqg35F`
    },
    // SEM03 M5
    {
        name: `Basic Electronics`,
        id: `sem03Modal5`,
        semester: 3,
        code: `EC21201`,
        prof_b: [
            {
                name: `Gourab Dutta`,
                link: `https://gduttaengg.wixsite.com/mysite`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjBJFyIaKOpvVkJtV0ZsOQn`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1uQZOcF6m-vhYWuGheyD1lfxquThff-_N/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EhHZJcfpID1Hq-p8ivXFrqcBnvvpug5S1JWa62EP6rpnNg?e=YVBblb`
    },
    // SEM03 M6
    {
        name: `Basic Electronics Laboratory`,
        id: `sem03Modal6`,
        semester: 3,
        code: `EC29201`,
        prof_b: [
            {
                name: `Saumik Bhattacharya`,
                link: `https://saumikb.github.io/`
            },
            {
                name: `Debashis Sen`,
                link: `https://sites.google.com/site/dseniitkharagpur`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiJFw4BuTKpvqsVGctQS2Tt`
            }
        ],
        oth_b: [
            {
                name: `Virtual Labs`,
                icon: `fa-solid fa-flask`,
                link: `http://vlabs.iitkgp.ernet.in/be/`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ert4r83qbaBMr6Bo4SaxhfMBO1uIQJPYJrxuNvAA7X8S4g?e=mWCRJB`
    },
    // SEM03 M7
    {
        name: `Signals and Systems`,
        id: `sem03Modal7`,
        semester: 3,
        code: `EE21201`,
        prof_b: [
            {
                name: `Pranab Kumar Dutta`,
                link: `http://www.facweb.iitkgp.ac.in/~pkd/f_pkd.html`
            },
            {
                name: `Sanand Dilip Amita Athalye`,
                link: `http://www.facweb.iitkgp.ac.in/~sanand/f_sanand.html`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fi2iFl9AdoNRfaoL7KJLFnP`
            }
        ],
        web_b: [
            {
                name: `S&N Web_Aut_18`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~avishek/Signals&Networks2018.html`
            },
            {
                name: `S&N Web_Aut_19`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~avishek/Signals&Networks2019.html`
            },
            {
                name: `S&N Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~avishek/Signals&Networks2020.html`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1oM94A2YSjmjX22MCvZhrd5CFvn05DAVn/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EqMj4RHQWf1Hjwz5q98w0ykBEYp3wo5Di5mxVsMbdlehKg?e=HQgFGZ`
    },
    // SEM04 M1
    {
        name: `Formal Language and Automata Theory`,
        id: `sem04Modal1`,
        semester: 4,
        code: `CS21204`,
        prof_b: [
            {
                name: `Abhijit Das`,
                link: `http://cse.iitkgp.ac.in/~abhij/`
            },
            {
                name: `Sudeshna Kolay`,
                link: `http://cse.iitkgp.ac.in/~skolay/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMnUJop1EeMSrr6rMYgfXzO`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fh0oTxzcq3ufHqhLLTJrIge`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/theory/FLAT/Spring21/`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~abhij/course/theory/FLAT/Spring22/`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1JQCPTS5th3AS8Nw1SKJIQqcje5KT2CYX/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ehujtv1CDXtKtdTG6VBi2YUBbYFdDCai3MD6uic4dTReCg?e=pqiOs2`
    },
    // SEM04 M2
    {
        name: `Systems Programming Laboratory`,
        id: `sem04Modal2`,
        semester: 4,
        code: `CS29206`,
        prof_b: [
            {
                name: `Abhijit Das`,
                link: `http://cse.iitkgp.ac.in/~abhij/`
            },
            {
                name: `Arobinda Gupta`,
                link: `http://cse.iitkgp.ac.in/~agupta/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fi55A_aRtxlqtxzoHu_7Jg7`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/lab/SPL/Spring22/`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EuA8mFTDmp9DgKeo5cXczzEBwHKYHwp7r63cpt9XgMEvJg?e=1KViuc`
    },
    // SEM04 M3
    {
        name: `Software Engineering`,
        id: `sem04Modal3`,
        semester: 4,
        code: `CS20202`,
        prof_b: [
            {
                name: `Partha Pratim Das`,
                link: `http://www.see.iitkgp.ac.in/team-view/partha-pratim-das/`
            },
            {
                name: `Sourangshu Bhattacharya`,
                link: `http://cse.iitkgp.ac.in/~sourangshu/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fggOnaSG_5yhykema2cWLQ7`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjMmCzzPwAwT6VU-EuzhC-C`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~sourangshu/coursefiles/cs20202_2022s.html`
            },
        ],
        not_b: [
            {
                name: `PPD Sir Slides`,
                icon: `fa-brands fa-google-drive`,
                link: `https://drive.google.com/drive/folders/1UACEQlnKq_92fLfkvunpknb5iiRUPpyu`
            },
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1ZwN3MZTgOloQWAJjvkQ2rLYsfPKjziUk/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ehxbu3GkB-BLgAxVG4U7t0UBFB8Fd8qTYIYm9CfZGVrztQ?e=idq2nG`
    },
    // SEM04 M4
    {
        name: `Software Engineering Laboratory`,
        id: `sem04Modal4`,
        semester: 4,
        code: `CS29202`,
        prof_b: [
            {
                name: `Abir Das`,
                link: `http://cse.iitkgp.ac.in/~adas/`
            },
            {
                name: `Sourangshu Bhattacharya`,
                link: `http://cse.iitkgp.ac.in/~sourangshu/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fi4ixsxIxpQTm5mAcNGB6dM`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~sourangshu/coursefiles/cs20202_2022s.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EvMujdfpXXJCrHxMK1LA78gBBxFuhp44ZQnYSwuhz5Q_og?e=fr5CAj`
    },
    // SEM04 M5
    {
        name: `Switching Circuits and Logic Design`,
        id: `sem04Modal5`,
        semester: 4,
        code: `CS21202`,
        prof_b: [
            {
                name: `Pabitra Mitra`,
                link: `http://cse.iitkgp.ac.in/~pabitra/`
            },
            {
                name: `Chittaranjan Mandal`,
                link: `http://www.iitkgp.ac.in/department/CS/faculty/cs-chitta`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fi9SuywjNvh9HwUOgPScILx`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgalHopzsQ34982Braj0s0X`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs21002&year=2021&sem=s`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs21002&year=2022&sem=s`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1GTlNAtDcum7B4xeuX07XmYbw5fWgi3Zf/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/ElrCeii0EuNPjuj-6gXKcHgBleivwyk3HpXO2R9CD40VBg?e=ZmbpV2`
    },
    // SEM04 M6
    {
        name: `Switching Circuits Laboratory`,
        id: `sem04Modal6`,
        semester: 4,
        code: `CS29204`,
        prof_b: [
            {
                name: `Pabitra Mitra`,
                link: `http://cse.iitkgp.ac.in/~pabitra/`
            },
            {
                name: `Chittaranjan Mandal`,
                link: `http://www.iitkgp.ac.in/department/CS/faculty/cs-chitta`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fhH5t4-67f3mCRLwKiBlXNb`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_20`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs29002&year=2020&sem=s`
            },
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs29002&year=2021&sem=s`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs29002&year=2022&sem=s`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EqMGUm98YztHn4AmOdseaIkBTCpRj5rPKxxbvvm3-1MyDw?e=6ec5XW`
    },
    // SEM04 M7
    {
        name: `Environmental Humanities`,
        id: `sem04Modal7`,
        semester: 4,
        code: `HS20016`,
        prof_b: [
            {
                name: `Jenia Mukherjee`,
                link: `http://www.iitkgp.ac.in/department/HS/faculty/hs-jenia`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgygkU-H0tR3o63oYaUA2oG`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EjxG5LtLq8lEgm1JcRcRcTkBqS0mknFlwkR5U2YkOLUKnA?e=iOWZGq`
    },
    // SEM04 M8
    {
        name: `Operation Research`,
        id: `sem04Modal8`,
        semester: 4,
        code: `MA30014`,
        prof_b: [
            {
                name: `Mahendra Prasad Biswal`,
                link: `https://scholar.google.co.in/citations?user=z70VTx8AAAAJ&hl=en`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgG9alFQ-fQE39bLMkpzMIu`
            },
            {
                name: `Extra Videos`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fhTTknZ1W5sHO8kkr97l2MK`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1KNt2WODJt86u9jTszZUiHbC-lQHHsjQp/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EsPWJbnCe2xHmbLkMqdwZ8IBNzmJAveCtA0_3SIxDkDWkA?e=UJrypn`
    },
    // SEM05 M1
    {
        name: `Algorithms-II`,
        id: `sem05Modal1`,
        semester: 5,
        code: `CS31005`,
        prof_b: [
            {
                name: `Abhijit Das`,
                link: `http://cse.iitkgp.ac.in/~abhij/`
            },
            {
                name: `Arobinda Gupta`,
                link: `http://cse.iitkgp.ac.in/~agupta/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMCvIrMguydfHjJnGkRkcum`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/theory/Algo2/Autumn20/`
            },
            {
                name: `Web_Aut_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/theory/Algo2/Autumn21/`
            },
            {
                name: `Web_Aut_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/theory/Algo2/Autumn22/`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1muzCWY3CtE8LGw35EjvayLJ3wuMi0LGo/view?usp=share_link`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eu6U34xZlRpHuquQ0pSAMiABoeqvzE9aNfh5uD-9n5onlA?e=EHlbhJ`
    },
    // SEM05 M2
    {
        name: `Compilers`,
        id: `sem05Modal2`,
        semester: 5,
        code: `CS31003`,
        prof_b: [
            {
                name: `Pralay Mitra`,
                link: `https://cse.iitkgp.ac.in/~pralay/`
            },
            {
                name: `Bivas Mitra`,
                link: `https://cse.iitkgp.ac.in/~bivasm/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgf1C_7kwiRO4uqRi79h8h5&si=LaytclFFw7mAuEVR`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~bivasm/compiler2022.html`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1rRsy-nOBLHjmX7QssksY5y0kXdMETvBg/view?usp=share_link`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EpPC5CMfRFREmZDkWE9eLdEBtTu_A84Ar1V5fPw0SNHHgg?e=RhQqoJ`
    },
    // SEM05 M3
    {
        name: `Compilers Laboratory`,
        id: `sem05Modal3`,
        semester: 5,
        code: `CS39003`,
        prof_b: [
            {
                name: `Pralay Mitra`,
                link: `https://cse.iitkgp.ac.in/~pralay/`
            },
            {
                name: `Bivas Mitra`,
                link: `https://cse.iitkgp.ac.in/~bivasm/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fj56VQmFnPvB3E5ERRVQO_n`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~bivasm/compiler2022.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EudJxKk-tq5FtIWpYQeKC4oBk_nt5Wz3eVWRBHU85WfJPQ?e=wqq7j3`
    },
    // SEM05 M4
    {
        name: `Computer Organization and Architecture`,
        id: `sem05Modal4`,
        semester: 5,
        code: `CS31007`,
        prof_b: [
            {
                name: `Shamik Sural`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/`
            },
            {
                name: `Chittaranjan Mandal`,
                link: `http://www.iitkgp.ac.in/department/CS/faculty/cs-chitta`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fhVE6ilnKuazTseZmxqj7HI`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_22_PreMid`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/autumn2022/coa/coa2022.html`
            },
            {
                name: `Web_Aut_22_PostMid`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs31007&year=2022&sem=a`
            }
        ],
        not_b: [
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1cW5znT6tDnoka3f4f4kvdiZXTLhIFbdt/view?usp=share_link`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/ErxvM5BlQvFKpEW71LW0YOwBOpceICgcrU5bkahx6jZZ0A?e=ZyslBC`
    },
    // SEM05 M5
    {
        name: `Computer Organization Laboratory`,
        id: `sem05Modal5`,
        semester: 5,
        code: `CS39001`,
        prof_b: [
            {
                name: `Soumyajit Dey`,
                link: `http://cse.iitkgp.ac.in/~soumya/`
            },
            {
                name: `Debdeep Mukhopadhyay`,
                link: `http://www.iitkgp.ac.in/department/CS/faculty/cs-debdeep`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fi7Mt3kTm9xBs5v17b3QuiV`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EgBT9goo9mBDkRuveYzUulIBuLalKcUlCQxnxQu68PgEdQ`
    },
    // SEM05 M6
    {
        name: `Machine Learning`,
        id: `sem05Modal6`,
        semester: 5,
        code: `CS60050`,
        prof_b: [
            {
                name: `Jayanta Mukhopadhyay`,
                link: `http://www.facweb.iitkgp.ac.in/~jay/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiJKjMY84vi6NxKInqvEHBE`
            },
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fiYd_7uxBB6sGaR4oR_FoA4`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~aritrah/course/theory/ML/Spring2021/`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EmvrLciIupVDrTheREsxelwBpi2n9qa9gAcHe6mswfjhuQ?e=CX8VcP`
    },
    // SEM05 M7
    {
        name: `Linear Algebra for AI and ML`,
        id: `sem05Modal7`,
        semester: 5,
        code: `AI61003`,
        prof_b: [
            {
                name: `Swanand Ravindra Khare`,
                link: `https://sites.google.com/site/swanandkhare/`
            },
            {
                name: `Jiaul Hoque Paik`,
                link: `https://jiaul.github.io/`
            },
            {
                name: `Ayantika Chatterjee`,
                link: `http://www.iitkgp.ac.in/department/AT/faculty/at-ayantika`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjLqO55XPRRptyuMBbE5Bza&si=jBFaTMFzZ47pBUfK`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Et8PlEh-kN1DmKrsV6l73-kBN4iSCSUeZa6Kt7GZqLc31w?e=q8WcFZ`
    },
    // SEM06 M1
    {
        name: `Operating Systems`,
        id: `sem06Modal1`,
        semester: 6,
        code: `CS31202`,
        prof_b: [
            {
                name: `Mainack Mondal`,
                link: `https://cse.iitkgp.ac.in/~mainack/`
            },
            {
                name: `Saptarshi Ghosh`,
                link: `https://sites.google.com/site/saptarshighosh/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fgx_aCcyV6CLFFLNipxY3Ho`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fgnE7wutVJdF_U8vP33pzFs`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2020-spring/OS-course/index.html`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2021-spring/OS-course/index.html`
            },
            {
                name: `Web_Spr_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2022-spring/OS-course/index.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ej-Nu3UWAXRHguqrCtAcCtsBaQgPtj3-E7muDAjpxyn4LQ?e=1CRWmO`
    },
    // SEM06 M2
    {
        name: `Operating Systems Laboratory`,
        id: `sem06Modal2`,
        semester: 6,
        code: `CS39002`,
        prof_b: [
            {
                name: `Mainack Mondal`,
                link: `https://cse.iitkgp.ac.in/~mainack/`
            },
            {
                name: `Saptarshi Ghosh`,
                link: `https://sites.google.com/site/saptarshighosh/`
            }
        ],
        vid_b: [
            {
                name: `Lab Sessions`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiBufnqvcTo6OxPoAaDC9v7`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2020-spring/OS-course/index.html`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2021-spring/OS-course/index.html`
            },
            {
                name: `Web_Spr_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2022-spring/OS-course/index.html`
            },
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/ElvT69xXHJxGv_dpBslwxjoBH6sTWmODk-3A8L5RgkvV-g?e=hwsJ2p`
    },
    // SEM06 M3
    {
        name: `Database Management Systems`,
        id: `sem06Modal3`,
        semester: 6,
        code: `CS30202`,
        prof_b: [
            {
                name: `KS Rao`,
                link: `https://cse.iitkgp.ac.in/~ksrao/`
            },
            {
                name: `Pabitra Mitra`,
                link: `http://cse.iitkgp.ac.in/~pabitra/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fh7SsHUBLlnRuqRDkeuH1Gg`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/spring2021/dbms/dbms2021.html`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/spring2022/dbms/dbms2022.html`
            },
            {
                name: `Web_Spr_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pabitra/course/dbms/dbms_new.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EhyvCtEOYoxJlbhlVfeEuS8B03PrWF-z1M7CUrNhtpRhsg?e=YKM6jH`
    },
    // SEM06 M4
    {
        name: `Database Management Systems Laboratory`,
        id: `sem06Modal4`,
        semester: 6,
        code: `CS39202`,
        prof_b: [
            {
                name: `KS Rao`,
                link: `https://cse.iitkgp.ac.in/~ksrao/`
            },
            {
                name: `Pabitra Mitra`,
                link: `http://cse.iitkgp.ac.in/~pabitra/`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/spring2021/dbms/dbms2021.html`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/spring2022/dbms/dbms2022.html`
            },
            {
                name: `Web_Spr_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pabitra/course/dbms/dbms_new.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eo2AmIsb3AJBppvpZqck8rsBwBa0ehLp_6oA0No2aH9bkA?e=kc3t4c`
    },
    // SEM06 M5
    {
        name: `Computer Networks`,
        id: `sem06Modal5`,
        semester: 6,
        code: `CS31204`,
        prof_b: [
            {
                name: `Arobinda Gupta`,
                link: `http://cse.iitkgp.ac.in/~agupta/`
            },
            {
                name: `Sudip Misra`,
                link: `https://cse.iitkgp.ac.in/~smisra/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjF5W7Aq1-v-mWYV1pUkDKy`
            },
            {
                name: `Lec_Spr_22 Prof. AG`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiA9Jovdcziep21nNWuyurg&si=JaX3ZNcsgfTvfJfy`
            },
            {
                name: `Lec_Spr_22 Prof. SM`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjBZdt_klFyZR-zZv1D3_23&si=-dg-f0Y7jtb8aYCq`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_22 Prof. SM`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~smisra/course/cn.html`
            },
            {
                name: `Web_Spr_23 Prof. AG`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~agupta/networks/`
            },
            {
                name: `Web_Spr_23 Prof. SM`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~smisra/course/cn_aut23.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EiEX7c7uA6dIqLOZ4Yh80hMBVS-x4bnNFq5LKB9uAT6kBA?e=xEbHj4`
    },
    // SEM06 M6
    {
        name: `Networks Laboratory`,
        id: `sem06Modal6`,
        semester: 6,
        code: `CS39006`,
        prof_b: [
            {
                name: `Arobinda Gupta`,
                link: `http://cse.iitkgp.ac.in/~agupta/`
            },
            {
                name: `Sudip Misra`,
                link: `https://cse.iitkgp.ac.in/~smisra/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22 Prof. AG`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiN2o7E2UInGz8Bo0vo_qoa&si=hziqjE32j31N06eC`
            },
            {
                name: `Lec_Spr_22 Prof. SM`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fj6UbUVFr-iw8Jzv3eNItBv&si=CqO0_7f5mdKW9xHU`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_22 Prof. SM`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~smisra/course/cnlabs.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eiwlcs7SBCNJrNNAlZ90zjABTR63GaId-W5Xlm1wdAnOAw?e=2X0pQp`
    },
    // SEM06 M7
    {
        name: `Deep Learning`,
        id: `sem06Modal7`,
        semester: 6,
        code: `CS60010`,
        prof_b: [
            {
                name: `Sudeshna Sarkar`,
                link: `http://cse.iitkgp.ac.in/~sudeshna/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fi-aQIwXHKA2212OlcuskKj&si=X_QcbkYtPVrE5Cij`
            },
            {
                name: `Online Sessions`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjajhvgA7GCUgRJadjBQ3ZD`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EliLzsMysgdAjJnQ0th2UxIBLnBJrmojqFa_-dLPnSllJQ?e=QRUTtw`
    },
    // SEM07 M1
    {
        name: `Object Oriented Systems`,
        id: `sem07Modal1`,
        semester: 7,
        code: `CS60059`,
        prof_b: [
            {
                name: `Rajib Mall`,
                link: `https://www.iitkgp.ac.in/department/CS/faculty/cs-rajib`
            }
        ],
        vid_b: [
            {
                name: `NPTEL Lec (Prof. RM)`,
                icon: `fa-brands fa-youtube`,
                link: `https://nptel.ac.in/courses/106105224`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eh2puwNr1nZEiNRqLzepEYYBKLO4lvZItKA8pK7IIfRRow?e=49UNay`
    },
    // SEM07 M2
    {
        name: `Theory and Applications of Blockchain`,
        id: `sem07Modal2`,
        semester: 7,
        code: `CS61065`,
        prof_b: [
            {
                name: `Sandip Chakraborty`,
                link: `https://cse.iitkgp.ac.in/~sandipc/`
            }
        ],
        vid_b: [
            {
                name: `Nptel Lec (Prof. SC & Prof. SS)`,
                icon: `fa-brands fa-youtube`,
                link: `https://nptel.ac.in/courses/106105235`
            },
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PL_qVBOSlZLkKP_Ql4cIlllb74di0w7pVf`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~sandipc/courses/cs61065/cs61065.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EteVw2aM2xJHpN6Ifw6qXtUB5Tpqt2fOPOLA60mdzQvTtA?e=kILnOo`
    },
    // SEM07 M3
    {
        name: `Artificial Intelligence for Economics`,
        id: `sem07Modal3`,
        semester: 7,
        code: `AI60003`,
        prof_b: [
            {
                name: `Dripto Bakshi`,
                link: `https://www.iitkgp.ac.in/department/HS/faculty/hs-dripto`
            },
            {
                name: `Adway Mitra`,
                link: `https://www.iitkgp.ac.in/department/AI/faculty/ai-adway`
            },
            {
                name: `Palash Dey`,
                link: `https://cse.iitkgp.ac.in/~palash/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjN5HfLzH6dHw8SlVWYRPiA&si=ffYakGux8cQ2nf2m`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eofka2T7tGRHrvjclaRHRYUBNf8gjZ9i1PiyMREr9VABDg?e=AxjsMx`
    },
    // SEM07 M4
    {
        name: `Intercultural Communication`,
        id: `sem07Modal4`,
        semester: 7,
        code: `HS30036`,
        prof_b: [
            {
                name: `Vijai Nath Giri`,
                link: `https://www.iitkgp.ac.in/department/HS/faculty/hs-vng`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ejak_y42k_ZBmP7fM232pJgBvjiE8ISg6hyP71M27PY0YQ?e=IDRdV3`
    },
    // SEM07 M5
    {
        name: `Frugal Engineering`,
        id: `sem07Modal5`,
        semester: 7,
        code: `EP60044`,
        prof_b: [
            {
                name: `Pranab K Dan`,
                link: `http://www.see.iitkgp.ac.in/team-view/p-k-dan-2/`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EuMqTv-3YOJBveDQ4R0_UBABJjZT5VC9E3YgiBdgeb0Fsw?e=617Ab0`
    },
    // SEM08 M1
    {
        name: `High Performance in Computer Architecture`,
        id: `sem08Modal1`,
        semester: 8,
        code: `CS60003`,
        prof_b: [
            {
                name: `Rajat Subhra Chakraborty`,
                link: `https://www.iitkgp.ac.in/department/CS/faculty/cs-rschakraborty`
            },
            {
                name: `Rajib Mall`,
                link: `https://www.iitkgp.ac.in/department/CS/faculty/cs-rajib`
            }
        ],
        vid_b: [
            {
                name: `NPTEL Lec (Prof. AP)`,
                icon: `fa-brands fa-youtube`,
                link: `https://nptel.ac.in/courses/106105033`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EpqSvCGMuQZLvoMRg9gfyzMBmVsh6Q3w8OErhLyFIVo53A?e=vrKeod`
    },
    // SEM08 M2
    {
        name: `Big Data Processing`,
        id: `sem08Modal2`,
        semester: 8,
        code: `AI60004`,
        prof_b: [
            {
                name: `Jiaul Hoque Paik`,
                link: `https://jiaul.github.io/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMxvFLBba-NyFRF1fsX4O0f`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Er66oy0LPPJChhCpLOW9HRwBtSzY-bs4iaI1hM-87BhjxQ?e=U9GZPF`
    },
    // SEM08 M3
    {
        name: `Computational Biophysics: Algorithms to Applications`,
        id: `sem08Modal3`,
        semester: 8,
        code: `CS61060`,
        prof_b: [
            {
                name: `Pralay Mitra`,
                link: `https://cse.iitkgp.ac.in/~pralay/`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EhvL17r6S2dFodl1w8W36zkBLquwNQoiQXNFE651cZDd9w?e=FalMIl`
    },
    // SEM08 M4
    {
        name: `Hardware Security`,
        id: `sem08Modal4`,
        semester: 8,
        code: `CS60004`,
        prof_b: [
            {
                name: `Sarani Bhattacharya`,
                link: `https://sites.google.com/view/drsaranibhattacharya/bio`
            }
        ],
        vid_b: [
            {
                name: `NPTEL Lec (Prof. DM)`,
                icon: `fa-brands fa-youtube`,
                link: `https://nptel.ac.in/courses/106105194`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EpCUJnG-SWtHrs16zNRdsHkB1-bxVAUC1C9rGvmpy1x-_w?e=8jewCl`
    },
    // SEM08 M5
    {
        name: `Engineering Design Process`,
        id: `sem08Modal5`,
        semester: 8,
        code: `EP60042`,
        prof_b: [
            {
                name: `Pranab K Dan`,
                link: `http://www.see.iitkgp.ac.in/team-view/p-k-dan-2/`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EqqnUyTTOOZFv84_1KmqrAUB8kvVQb0ZXOLRcHJQDK8T5g?e=i5t0L4`
    },
    // SEM09 M1
    {
        name: `Social Computing`,
        id: `sem09Modal1`,
        semester: 9,
        code: `CS60017`,
        prof_b: [
            {
                name: `Saptarshi Ghosh`,
                link: `https://sites.google.com/site/saptarshighosh/`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://sites.google.com/view/cs60017/home`
            },
            {
                name: `Web_Aut_24`,
                icon: `fa-solid fa-file-lines`,
                link: `https://sites.google.com/view/cs60017-2024/home`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EqxW7KjbYxFGrGmiAFBXzVEBvSZQEGVe17joWyxAuMHkYA?e=GcGgy0`
    },
    // SEM09 M2
    {
        name: `Scalable Data Mining`,
        id: `sem09Modal2`,
        semester: 9,
        code: `CS60021`,
        prof_b: [
            {
                name: `Sourangshu Bhattacharya`,
                link: `https://cse.iitkgp.ac.in/~sourangshu/`
            },
            {
                name: `Pabitra Mitra`,
                link: `http://cse.iitkgp.ac.in/~pabitra/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLpYI44uZJi6foLXu5JDBI6XMEWHJyIgJN&si=gmCTPv-1n8tIkOw3`
            },
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLjSFIV2WJbpxID1KiQkbvwauXBEgB7hTa&si=jhHVDX_IUvvRpDLp`
            },
        ],
        web_b: [
            {
                name: `Web_Aut_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://panuragreddy.github.io/SDM_2023/`
            },
            {
                name: `Web_Aut_24`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~sourangshu/coursefiles/cs60021_2024a.html`
            },
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eg9hKsRUmdBBt9CiVhOr3s8B80vt_xWBtdm1TtRW3tmopg?e=AKWhNV`
    },
    // SEM09 M3
    {
        name: `Data Analytics`,
        id: `sem09Modal3`,
        semester: 9,
        code: `CS610161`,
        prof_b: [
            {
                name: `Abhijnan Chakraborty`,
                link: `https://cse.iitkgp.ac.in/~abhijnan/`
            }
        ],
        web_b: [
            {
                name: `Web_Aut_24`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~abhijnan/data-analytics-2024.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EtwU56zZyFVMlYuByU37P_cBZ7E4pBw149MibpTY2dj_CA?e=4HXM1Q`
    },
    // SEM10 M1
    {
        name: `Natural Language Processing`,
        id: `sem10Modal1`,
        semester: 10,
        code: `CS60075`,
        prof_b: [
            {
                name: `Saptarshi Ghosh`,
                link: `https://sites.google.com/site/saptarshighosh/`
            }
        ],
        vid_b: [
            {
                name: `NPTEL Lec (Prof. PG)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLJJzI13YAXCHxbVgiFaSI88hj-mRSoMtI`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_24`,
                icon: `fa-solid fa-file-lines`,
                link: `https://sites.google.com/view/nlp-cs60075/home`
            },
            {
                name: `Web_Spr_25`,
                icon: `fa-solid fa-file-lines`,
                link: `https://sites.google.com/view/nlp25cs60075/`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/En3mJuuvyq1NhTt3Zg-21acB1XEFJJ9hr-YkBcC0zkkKhw?e=MOLhlh`
    },
    // SEM10 M2
    {
        name: `Advanced Topics in Speech Processing`,
        id: `sem10Modal2`,
        semester: 10,
        code: `CS60116`,
        prof_b: [
            {
                name: `KS Rao`,
                link: `https://cse.iitkgp.ac.in/~ksrao/`
            }
        ],
        vid_b: [
            {
                name: `Lectures (Prof. KS Rao)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLUfABYNel-fhZSLM4_aKbDh-eyJHNOTW6`
            }
        ],
        web_b: [
            {
                name: `Web_Spr_25`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~ksrao/cou-atsp-2025.html`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EghDQao1utBHoTK4X7V01VEBdM_FuE2KuEriaG3LgiqooA?e=v8w8LD`
    },
    // DE M1
    {
        name: `Information Retrieval`,
        id: `sem11Modal1`,
        semester: 11,
        code: `CS60092`,
        prof_b: [
            {
                name: `Somak Aditya`,
                link: `https://adityasomak.github.io/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtP8YyzC9JaEQWE7BrK6fju4`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EnzA6HuELoVDhQGKBUE-F5EBujIZrqhA7_thl7NHC_xsrA?e=5UrfA1`
    },
    // BE M1
    {
        name: `Econometric Analysis`,
        id: `sem12Modal1`,
        semester: 12,
        code: `HS30033`,
        prof_b: [
            {
                name: `Anubhab Pattanayak`,
                link: `http://www.iitkgp.ac.in/department/HS/faculty/hs-anubhab`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EuzL0ctGynRJqpRbWE54uDgBdsoYlpQ0ensyD_W7S7MD5A?e=jBL1AB`
    },
    // BE M2
    {
        name: `Statistical Inference`,
        id: `sem12Modal2`,
        semester: 12,
        code: `MA20008`,
        prof_b: [
            {
                name: `Somesh Kumar`,
                link: `http://www.facweb.iitkgp.ac.in/~smsh/`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fieHlDkjpwVir36tjIaOkMm`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/ErZtV97zxvxGmfxQ6PHTcbwBHTSLOM2YN_ZzmoBGbmq02w?e=KOWezt`
    },
    // BE M3
    {
        name: `Stochastic Processes and Applications`,
        id: `sem12Modal3`,
        semester: 12,
        code: `MA20208`,
        prof_b: [
            {
                name: `Nitin Gupta`,
                link: `http://www.iitkgp.ac.in/department/MA/faculty/ma-nitin.gupta`
            }
        ],
        vid_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgTWQ7LGeY8_6--wgXyL0d1`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EnJBGiHKmfJOvhzkDMraqncBuEd3QMD6fQzYJXC-aue4ww?e=Il7NSr`
    }
];

const importantLinksData = [
    { name: 'ERP', link: 'https://erp.iitkgp.ac.in/SSOAdministration/login.htm?sessionToken=14ADC44B03533E3B1C22E5BD4DB428A5.worker1&requestedUrl=https://erp.iitkgp.ac.in/IIT_ERP3/', title: 'Official Site for Admin work', icon: 'fa-user-cog' },
    { name: 'CSE Moodle', link: 'https://moodlecse.iitkgp.ac.in/moodle/login/index.php', title: 'Moodle of CSE Department', icon: 'fa-chalkboard-teacher' },
    { name: 'WBCM', link: 'https://cse.iitkgp.ac.in/~wbcm/', title: 'Web Based Course Material', icon: 'fa-globe' },
    { name: 'KGP Moodle', link: 'http://kgpmoodlenew.iitkgp.ac.in/moodle/login/index.php', title: 'Moodle for Non-CSE Courses', icon: 'fa-chalkboard' },
    { name: 'Question Papers', link: 'https://qp.metakgp.org/', title: 'Instant Search through Previous Years\' Question Papers', icon: 'fa-file-alt' },
    { name: 'Professor Search', link: 'https://metakgp.github.io/mcmp/', title: 'Search for Faculty by Area of Interest', icon: 'fa-search-location' },
    { name: 'Meta KGP', link: 'https://wiki.metakgp.org/', title: 'The community wiki for IIT Kharagpur', icon: 'fab fa-wikipedia-w' },
    { name: 'Kronos', link: 'https://share.streamlit.io/spookbite/kronos2.0/main/app.py', title: 'Grade Distribution of Courses', icon: 'fa-chart-bar' },
    { name: 'Library Books', link: 'https://library.iitkgp.ac.in/pages/eSearch2.1/', title: 'Ebooks by Central Library', icon: 'fa-book-open' },
    { name: 'Clubs & Societies', link: 'https://thescholarsavenue.github.io/societytable/', title: 'Society Table by The Scholar\'s Avenue', icon: 'fa-users' },
    { name: 'CP Calendar', link: 'https://clist.by/', title: 'Competitive Programming Calendar', icon: 'fa-calendar-alt' },
    { name: 'C++ STL Guide', link: 'https://www.topcoder.com/thrive/articles/Power%20up%20C++%20with%20the%20Standard%20Template%20Library%20Part%20One', title: 'C++ STL Tutorial by TopCoder', icon: 'fa-code' },
    { name: 'Abhijit Das Courses', link: 'http://cse.iitkgp.ac.in/~abhij/course/', title: 'Index of Prof. Abhijit Das Courses', icon: 'fa-folder-open' },
    { name: 'Anubhav Jain Notes', link: 'https://drive.google.com/folderview?id=0Bx7x8HmM7p_zM3VDMURfWWdvY28&resourcekey=0-4H4yE_Kxs1Dr61KH_3fxFw', title: 'CSE Notes by Anubhav Jain', icon: 'fa-pen-alt' },
    { name: 'CP/DSA Playlist', link: 'https://www.youtube.com/playlist?list=PLauivoElc3ggagradg8MfOZreCMmXMmJ-', title: 'CP/DSA Playlist by Luv', icon: 'fab fa-youtube' },
    { name: 'CSES Problem Set', link: 'https://cses.fi/problemset/', title: 'CSES Problem Set', icon: 'fa-tasks' }
];

// --- APPLICATION START ---
// The script waits for the DOM to be fully loaded before initializing the app.
document.addEventListener('DOMContentLoaded', resourceApp.init);