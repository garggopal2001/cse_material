const sem_data = [
    {
        name: `Links`,
        id: `links`,
        courses: [``]
    },
    {
        name: `Semester 01_Phy (Aut 2020)`,
        id: `sem01`,
        courses: [
            `Advanced Calculus`,
            `DIY Project`,
            `Physics of Waves`,
            `Physics Laboratory`,
            `Electrical Technology`,
            `Basic Engineering Mechanics`,
            `Engineering Laboratory`,
            `Environmental Science`
        ]
    },
    {
        name: `Semester 02_Chem (Spr 2021)`,
        id: `sem02`,
        courses: [
            `Linear Algebra, Numerical and Complex Analysis`,
            `Engineering Drawing and Computer Graphics`,
            `Programming and Data Structures`,
            `Programming and Data Structures Laboratory`,
            `Chemistry`,
            `Chemistry Laboratory`,
            `English for Communication`,
            `Science of Living Systems`
        ]
    },
    {
        name: `Semester 03 (Aut 2021)`,
        id: `sem03`,
        courses: [
            `Probability and Statistics`,
            `Discrete Structures`,
            `Algorithms-I`,
            `Algorithms Laboratory`,
            `Basic Electronics`,
            `Basic Electronics Laboratory`,
            `Signal and Systems`
        ]
    },
    {
        name: `Semester 04 (Spr 2022)`,
        id: `sem04`,
        courses: [
            `Formal Language and Automata Theory`,
            `Systems Programming Laboratory`,
            `Software Engineering`,
            `Software Engineering Laboratory`,
            `Switching Circuits and Logic Design`,
            `Switching Circuits Laboratory`,
            `Environmental Humanities (BE)`,
            `Operation Research (BE)`
        ]
    },
    {
        name: `Semester 05 (Aut 2022)`,
        id: `sem05`,
        courses: [
            `Algorithms-II`,
            `Compilers`,
            `Compilers Laboratory`,
            `Computer Organization and Architecture`,
            `Computer Organization Laboratory`,
            `Machine Learning (DE)`,
            `Linear Algebra for AI and ML (BE)`
        ]
    },
    {
        name: `Semester 06 (Spr 2023)`,
        id: `sem06`,
        courses: [
            `Operating Systems`,
            `Operating Systems Laboratory`,
            `Database Management Systems`,
            `Database Management Systems Laboratory`,
            `Computer Networks`,
            `Networks Laboratory`,
            `Deep Learning (DE)`
        ]
    },
    {
        name: `Semester 07 (Aut 2023)`,
        id: `sem07`,
        courses: [
            `Object Oriented Systems (DE)`,
            `Theory and Applications of Blockchain (DE)`,
            `Artificial Intelligence for Economics (DE)`,
            `Intercultural Communication (BE)`,
            `Frugal Engineering (BE)`
        ]
    },
    {
        name: `Semester 08 (Spr 2024)`,
        id: `sem08`,
        courses: [
            `High Performance in Computer Architecture`,
            `Big Data Processing (DE)`,
            `Computational Biophysics: Algorithms to Applications (DE)`,
            `Hardware Security (DE)`,
            `Engineering Design Process (BE)`
        ]
    },
    {
        name: 'Semester 09 (Aut 2024)',
        id: `sem09`,
        courses: [
            `Social Computing (DE)`,
            `Scalable Data Mining (DE)`,
            `Data Analytics (DE)`
        ]
    },
    {
        name: 'Semester 10 (Spr 2025)',
        id: `sem10`,
        courses: [
            `Natrual Language Processing (DE)`,
            `Advanced Topics in Speech Processing (DE)`,
        ]
    },
    {
        name: `Other Depth Electives`,
        id: `sem11`,
        courses: [
            `Information Retrieval`,
        ]
    },
    {
        name: `Other Breadth Electives`,
        id: `sem12`,
        courses: [
            `Econometric Analysis`,
            `Statistical Inference`,
            `Stochastic Processes and Applications`
        ]
    }
]

// Semesters HTML
let sem_html = document.getElementById(`semesters`);
sem_html.innerHTML = ``;
sem_data.forEach((semester, index) => {
    let courses = ``;
    // Semester Items
    semester.courses.forEach((course, index) => {
        courses +=
            `<div class="col-md-6 col-lg-2 mb-4">
                <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#${semester.id}Modal${index + 1}">
                    <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                        <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <!-- Course Image -->
                    <img class="img-fluid sem_img_f" src="assets/img/${semester.id}/${index + 1}.png" alt="..." />
                </div>
                <!-- Course Name -->
                <div class="text-center sub_name"><span>${course}</span></div>
            </div>`;
    })
    sem_html.innerHTML +=
    // Semester
    `${index == 0 ? `` : `<hr>`}
    <section class="page-section py-5 portfolio" id=${semester.id}>
        <div class="container">
            <h1 class="text-center text-secondary mb-0">${semester.name}</h1>
            <!-- Icon Divider-->
            <div class="divider-custom">
                <div class="divider-custom-line"></div>
                <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                <div class="divider-custom-line"></div>
            </div>
            <!-- Sem03 Grid Items-->
            <div class="row justify-content-center">
                ${courses}
            </div>
        </div>
    </section>`;
});