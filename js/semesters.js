const semestersdata = [
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
            `BE-Environmental Humanities`,
            `BE-Operation Research`,
            `BE-Econometric Analysis`,
            `BE-Statistical Inference`,
            `BE-Stochastic Processes and Applications`
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
            `DE-Machine Learning`,
            `BE-Linear Algebra for AI and ML`
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
            `DE-Deep Learning`,
            `DE-Information Retrieval`
        ]
    },
    {
        name: `Semester 07 (Aut 2023)`,
        id: `sem07`,
        courses: [
            `DE-Object Oriented Systems`,
            `DE-Theory and Applications of Blockchain`,
            `BE-Artificial Intelligence for Economics`,
            `BE-Intercultural Communication`,
            `BE-Frugal Engineering`,
            // `BTP01 PPD5`
        ]
    },
]

// Semesters HTML
let semesterDiv = document.getElementById(`semesters`);
semesterDiv.innerHTML = ``;
semestersdata.forEach((semester, index) => {
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
    semesterDiv.innerHTML +=
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