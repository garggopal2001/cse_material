const modal_data = [
    // SEM01 M1
    {
        name: `Advanced Calculus`,
        id: `sem01Modal1`,
        img: `01/1`,
        code: `MA11003`,
        prof_b: [
            {
                name: `Chandal Nahak`,
                link: `http://www.iitkgp.ac.in/department/MA/faculty/ma-cnahak`
            }
        ],
        yel_b: [
            {
                name: `NPTEL Lec (Prof. JK)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLbRMhDVUMngeVrxtbBz-n8HvP8KAWBpI5`,
            }
        ],
        blu_b: [
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
        img: `01/2`,
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
        yel_b: [
            {
                name: `Channel`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/channel/UCeWJRb61WvPzRTFN2UsScgg`,
            }
        ],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EnjwKZxbaQ9IglZ2TVI7EiIBhIVqdgqMf2SlxXeYP_tBpA?e=9aKJKp`
    },
    // SEM01 M3
    {
        name: `Physics of Waves`,
        id: `sem01Modal3`,
        img: `01/3`,
        code: `PH11003`,
        prof_b: [
            {
                name: `Amar Nath Gupta`,
                link: `http://www.iitkgp.ac.in/department/PH/faculty/ph-ang`
            }
        ],
        yel_b: [
            {
                name: `NPTEL Lec (Prof. SB)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLoRUNeJAicqa1GgkIsUOKP-VN93rUTqbZ`,
            }
        ],
        blu_b: [
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
        img: `01/4`,
        code: `PH19003`,
        prof_b: [
            {
                name: `Somnath Bharadwaj`,
                link: `http://www.iitkgp.ac.in/department/PH/faculty/ph-somnath`
            }
        ],
        yel_b: [],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EtZITSiJ6M9Km23WHr-moDkBD5Kjl_7DHF0dlnzdbQMLtQ?e=sXUhAR`
    },
    // SEM01 M5
    {
        name: `Electrical Technology`,
        id: `sem01Modal5`,
        img: `01/5`,
        code: `EE11003`,
        prof_b: [
            {
                name: `Alok Kanti Deb`,
                link: `http://www.iitkgp.ac.in/department/EE/faculty/ee-alokkanti`
            }
        ],
        yel_b: [
            {
                name: `NPTEL Lec (Prof. DD)`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLbRMhDVUMngfdEXVcdf_ijj2Eub-UHs_y`,
            }
        ],
        blu_b: [
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
        img: `01/6`,
        code: `ME11003`,
        prof_b: [
            {
                name: `Atul Jain`,
                link: `http://www.iitkgp.ac.in/department/ME/faculty/me-atuljain`
            }
        ],
        yel_b: [],
        blu_b: [
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
        img: `01/7`,
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
        yel_b: [],
        blu_b: [
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
        img: `01/8`,
        code: `EV10003`,
        prof_b: [
            {
                name: `Brajesh Kumar Dubey`,
                link: `http://www.iitkgp.ac.in/department/CE/faculty/ce-bkdubey`
            }
        ],
        yel_b: [],
        blu_b: [
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
        img: `02/1`,
        code: `MA11004`,
        prof_b: [
            {
                name: `Jitendra Kumar`,
                link: `http://www.facweb.iitkgp.ac.in/~jkumar/`
            }
        ],
        yel_b: [],
        blu_b: [
            {
                name: `Lec_Spr_21 (Prof. JK)`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fihmbX75Vlo1BKhC0arr850`
            },
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
        img: `02/2`,
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
        yel_b: [
            {
                name: `Tikle’s Academy`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/c/TIKLESACADEMY`
            }
        ],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ep03FrB5dSZDnUdx76lqf80BGveUxCpV3YAcygSwCoVvDQ?e=jdo3g1`
    },
    // SEM02 M3
    {
        name: `Programming and Data Structures`,
        id: `sem02Modal3`,
        img: `02/3`,
        code: `CS10003`,
        prof_b: [
            {
                name: `Abhijit Das`,
                link: `http://cse.iitkgp.ac.in/~abhij/`
            }
        ],
        yel_b: [
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
                name: `w3schools`,
                icon: `fa-solid fa-newspaper`,
                link: `https://www.w3schools.in/c-tutorial/`
            },
            {
                name: `geeksforgeeks`,
                icon: `fa-solid fa-newspaper`,
                link: `https://www.geeksforgeeks.org/c-programming-language/`
            },
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~aritrah/course/theory/PDS/Autumn2020/`
            }
        ],
        blu_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/pds/semester/2021s/`
            },
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fhIRayMsGmZsN_vrWCN_7xP`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/El8ruPqg7XJOv-x_Km2LPhUBPn5zVQVcI30Dll2NjFwYwQ?e=fmaYWi`
    },
    // SEM02 M4
    {
        name: `Programming and Data Structures Laboratory`,
        id: `sem02Modal4`,
        img: `02/4`,
        code: `CS19003`,
        prof_b: [
            {
                name: `Pallab Dasgupta`,
                link: `https://cse.iitkgp.ac.in/~pallab/`
            }
        ],
        yel_b: [
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
            {
                name: `Web_Spr_21_10`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~aritrah/course/lab/PDS/Spring2021/`
            }
        ],
        blu_b: [
            {
                name: `Web_Spr_21_01`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pallab/course/2021/Spring%202021/PDS_LAB/index.html`
            },
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EnzJ-_qI4j1BqZgWS9yDIYcB5d1DpbZdOSfUBYXWH5aP8A?e=0aFgy4`
    },
    // SEM02 M5
    {
        name: `Chemistry`,
        id: `sem02Modal5`,
        img: `02/5`,
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
        yel_b: [],
        blu_b: [
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
        img: `02/6`,
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
        yel_b: [],
        blu_b: [
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
        img: `02/7`,
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
        yel_b: [],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EngZC4BAaLBIuQ8GdsYoe3kBWWY7wJtQz4f825sQ0w560w?e=eYmju6`
    },
    // SEM02 M8
    {
        name: `Science of Living Systems`,
        id: `sem02Modal8`,
        img: `02/8`,
        code: `BS10003`,
        prof_b: [
            {
                name: `Dibyendu Samanta`,
                link: `https://iitkgpbioscience.weebly.com/dibyendu-samanta.html`
            }
        ],
        yel_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtN03ygBklEJucko5EDDRhM2`
            }
        ],
        blu_b: [
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
        img: `03/1`,
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
        yel_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtOzeZ1hh8wEDDikK2M2U90b`
            },
            {
                name: `Formula PDFs`,
                icon: `fa-solid fa-bars-staggered`,
                link: `https://drive.google.com/drive/folders/1veQlwVt8BFaIU5LFLatA8DjtYe2Gb2MP`
            }
        ],
        blu_b: [
            {
                name: `Lec_Aut_21 (Prof. BB)`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fixcX3G2kxpE20zkkqr5lGd`
            },
            {
                name: `Lec_Aut_21 (Prof. SRK)`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgh8A2-3mSwEcOTfh10HjoB`
            },
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1c7U4gX2qjUX-h3TNnFIhAOUJYTFZ-yEa/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EvZ8zbzlED9GhPzVL5kVaLsBkfB61kOIdz3Qp-KVBQJGuA?e=6bG2Ms`
    },
    // SEM03 M2
    {
        name: `Discrete Structures`,
        id: `sem03Modal2`,
        img: `03/2`,
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
        yel_b: [
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~abhij/course/theory/DS/Autumn20/`
            },
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtM7GIfInDNPpCcorL8m7tpk`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~abhij/course/theory/DS/Autumn21/`
            },
            {
                name: `Discussion Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgxYnvoadbfGF9EM2HlmCnm`
            },
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjfaJWNZG5jFXxNH-UVpQwM`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=415`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EqVJiHMGShpBq8cwvozDHQYBGjlO8bqw2WnzLQ831ZNFFg?e=jPIeUk`
    },
    // SEM03 M3
    {
        name: `Algorithms-I`,
        id: `sem03Modal3`,
        img: `03/3`,
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
        yel_b: [
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
                name: `tutorialspoint`,
                icon: `fa-soild fa-newspaper`,
                link: `https://www.tutorialspoint.com/data_structures_algorithms/index.htm`
            },
            {
                name: `javatpoint`,
                icon: `fa-soild fa-newspaper`,
                link: `https://www.javatpoint.com/data-structure-tutorial`
            },
            {
                name: `programiz`,
                icon: `fa-soild fa-newspaper`,
                link: `https://www.programiz.com/dsa`
            },
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pawang/courses/ALGO20.html`
            },
            {
                name: `Lec_Aut_20`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMMJ5LduRv3TMo3DmuShUaT`
            },
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~palash/Courses/2021Algorithms1-Theory/algo1-2021.html`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pawang/courses/ALGO21.html`
            },
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiulSmpgyp0qD-olJ89AvGR`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=411`
            },
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1VlvCDu0v7TMaF7NZi5YU_QEq8mbuAU-e/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Epci9L8j_zxCugoa0igbZAMBTSnOHw08yZbyoHUH2rQnhg?e=9eEbBt`
    },
    // SEM03 M4
    {
        name: `Algorithms Laboratory`,
        id: `sem03Modal4`,
        img: `03/4`,
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
        yel_b: [
            {
                name: `Web_Aut_20`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pawang/courses/ALGO20.html`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pawang/courses/ALGO21.html`
            },
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
        img: `03/5`,
        code: `EC21201`,
        prof_b: [
            {
                name: `Gourab Dutta`,
                link: `https://gduttaengg.wixsite.com/mysite`
            }
        ],
        yel_b: [],
        blu_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjBJFyIaKOpvVkJtV0ZsOQn`
            },
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
        img: `03/6`,
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
        yel_b: [
            {
                name: `Virtual Labs`,
                icon: `fa-solid fa-flask`,
                link: `http://vlabs.iitkgp.ernet.in/be/`
            }
        ],
        blu_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiJFw4BuTKpvqsVGctQS2Tt`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ert4r83qbaBMr6Bo4SaxhfMBO1uIQJPYJrxuNvAA7X8S4g?e=mWCRJB`
    },
    // SEM03 M7
    {
        name: `Signals and Systems`,
        id: `sem03Modal7`,
        img: `03/7`,
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
        yel_b: [
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
        blu_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fi2iFl9AdoNRfaoL7KJLFnP`
            },
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
        img: `04/1`,
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
        yel_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/theory/FLAT/Spring21/`
            },
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMnUJop1EeMSrr6rMYgfXzO`
            },
        ],
        blu_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/theory/FLAT/Spring22/`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fh0oTxzcq3ufHqhLLTJrIge`
            },
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
        img: `04/2`,
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
        yel_b: [],
        blu_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/lab/SPL/Spring22/`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fi55A_aRtxlqtxzoHu_7Jg7`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=449`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EuA8mFTDmp9DgKeo5cXczzEBwHKYHwp7r63cpt9XgMEvJg?e=1KViuc`
    },
    // SEM04 M3
    {
        name: `Software Engineering`,
        id: `sem04Modal3`,
        img: `04/3`,
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
        yel_b: [
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtPwlY4S79FhvO6ZRE6uc8F0`
            },
            {
                name: `PPD Sir Slides`,
                icon: `fa-brands fa-google-drive`,
                link: `https://drive.google.com/drive/folders/1UACEQlnKq_92fLfkvunpknb5iiRUPpyu`
            },
        ],
        blu_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-soild fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~sourangshu/coursefiles/cs20202_2022s.html`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjMmCzzPwAwT6VU-EuzhC-C`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=454`
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
        img: `04/4`,
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
        yel_b: [],
        blu_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-soild fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~sourangshu/coursefiles/cs20202_2022s.html`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fi4ixsxIxpQTm5mAcNGB6dM`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=455`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EvMujdfpXXJCrHxMK1LA78gBBxFuhp44ZQnYSwuhz5Q_og?e=fr5CAj`
    },
    // SEM04 M5
    {
        name: `Switching Circuits and Logic Design`,
        id: `sem04Modal5`,
        img: `04/5`,
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
        yel_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-soild fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs21002&year=2021&sem=s`
            },
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMWTHBbKX0NAF-oTJcO50SE`
            },
        ],
        blu_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-soild fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs21002&year=2022&sem=s`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgalHopzsQ34982Braj0s0X`
            },
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
        img: `04/6`,
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
        yel_b: [
            {
                name: `Web_Spr_20`,
                icon: `fa-soild fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs29002&year=2020&sem=s`
            },
            {
                name: `Web_Spr_21`,
                icon: `fa-soild fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs29002&year=2021&sem=s`
            }
        ],
        blu_b: [
            {
                name: `Web_Spr_22`,
                icon: `fa-soild fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs29002&year=2022&sem=s`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fhH5t4-67f3mCRLwKiBlXNb`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EqMGUm98YztHn4AmOdseaIkBTCpRj5rPKxxbvvm3-1MyDw?e=6ec5XW`
    },
    // SEM04 M7
    {
        name: `Environmental Humanities`,
        id: `sem04Modal7`,
        img: `04/7`,
        code: `HS20016`,
        prof_b: [
            {
                name: `Jenia Mukherjee`,
                link: `http://www.iitkgp.ac.in/department/HS/faculty/hs-jenia`
            }
        ],
        yel_b: [],
        blu_b: [
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
        img: `04/8`,
        code: `MA30014`,
        prof_b: [
            {
                name: `Mahendra Prasad Biswal`,
                link: `http://www.iitkgp.ac.in/department/MA/faculty/ma-mpbiswal`
            }
        ],
        yel_b: [
            {
                name: `Extra Videos`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fhTTknZ1W5sHO8kkr97l2MK`
            }
        ],
        blu_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgG9alFQ-fQE39bLMkpzMIu`
            },
            {
                name: `Anubhav Notes`,
                icon: `fa-solid fa-pen-to-square`,
                link: `https://drive.google.com/file/d/1KNt2WODJt86u9jTszZUiHbC-lQHHsjQp/view?usp=drivesdk`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EsPWJbnCe2xHmbLkMqdwZ8IBNzmJAveCtA0_3SIxDkDWkA?e=UJrypn`
    },
    // SEM04 M9
    {
        name: `Econometric Analysis`,
        id: `sem04Modal9`,
        img: `04/9`,
        code: `HS30033`,
        prof_b: [
            {
                name: `Anubhab Pattanayak`,
                link: `http://www.iitkgp.ac.in/department/HS/faculty/hs-anubhab`
            }
        ],
        yel_b: [],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EuzL0ctGynRJqpRbWE54uDgBdsoYlpQ0ensyD_W7S7MD5A?e=jBL1AB`
    },
    // SEM04 M10
    {
        name: `Statistical Inference`,
        id: `sem04Modal10`,
        img: `04/10`,
        code: `MA20008`,
        prof_b: [
            {
                name: `Somesh Kumar`,
                link: `http://www.facweb.iitkgp.ac.in/~smsh/`
            }
        ],
        yel_b: [],
        blu_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fieHlDkjpwVir36tjIaOkMm`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/ErZtV97zxvxGmfxQ6PHTcbwBHTSLOM2YN_ZzmoBGbmq02w?e=KOWezt`
    },
    // SEM04 M11
    {
        name: `Stochastic Processes and Applications`,
        id: `sem04Modal11`,
        img: `04/11`,
        code: `MA20208`,
        prof_b: [
            {
                name: `Nitin Gupta`,
                link: `http://www.iitkgp.ac.in/department/MA/faculty/ma-nitin.gupta`
            }
        ],
        yel_b: [],
        blu_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fgTWQ7LGeY8_6--wgXyL0d1`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EnJBGiHKmfJOvhzkDMraqncBuEd3QMD6fQzYJXC-aue4ww?e=Il7NSr`
    },
    // SEM05 M1
    {
        name: `Algorithms-II`,
        id: `sem05Modal1`,
        img: `05/1`,
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
        yel_b: [
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
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMCvIrMguydfHjJnGkRkcum`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~abhij/course/theory/Algo2/Autumn22/`
            },
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
        img: `05/2`,
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
        yel_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtP5nseM6Sqc0g0M6DvD9LEk`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~bivasm/compiler2022.html`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=485`
            },
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
        img: `05/3`,
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
        yel_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtPH00XyivKmOWvDziVM51xy`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~bivasm/compiler2022.html`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=484`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EudJxKk-tq5FtIWpYQeKC4oBk_nt5Wz3eVWRBHU85WfJPQ?e=wqq7j3`
    },
    // SEM05 M4
    {
        name: `Computer Organization and Architecture`,
        id: `sem05Modal4`,
        img: `05/4`,
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
        yel_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtNaWFleQo2vv86Sr45NS2dD`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_22_PreMid`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/autumn2022/coa/coa2022.html`
            },
            {
                name: `Web_Aut_22_PostMid`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~wbcm/cgi-bin/wbcm/common/course/home.cgi?ccode=cs31007&year=2022&sem=a`
            },
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
        img: `05/5`,
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
        yel_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtNNy0LWKIzZcUnjk_hW8lvJ`
            }
        ],
        blu_b: [
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=490`
            }

        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EgBT9goo9mBDkRuveYzUulIBuLalKcUlCQxnxQu68PgEdQ`
    },
    // SEM05 M6
    {
        name: `Machine Learning`,
        id: `sem05Modal6`,
        img: `05/6`,
        code: `CS60050`,
        prof_b: [
            {
                name: `Jayanta Mukhopadhyay`,
                link: `http://www.facweb.iitkgp.ac.in/~jay/`
            }
        ],
        yel_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://cse.iitkgp.ac.in/~aritrah/course/theory/ML/Spring2021/`
            },
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtOlC0QUteMgYRl3hvrkgfuc`
            },
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtNG0TaFG7hbcug3GEb5qWJr`
            }
        ],
        blu_b: [
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=489`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EmvrLciIupVDrTheREsxelwBpi2n9qa9gAcHe6mswfjhuQ?e=CX8VcP`
    },
    // SEM05 M7
    {
        name: `Linear Algebra for AI and ML`,
        id: `sem05Modal7`,
        img: `05/7`,
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
        yel_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtPyJqf9yxiD7C9Q7ugoXlxV`
            }
        ],
        blu_b: [
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `http://kgpmoodlenew.iitkgp.ac.in/moodle/course/view.php?id=521`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Et8PlEh-kN1DmKrsV6l73-kBN4iSCSUeZa6Kt7GZqLc31w?e=q8WcFZ`
    },
    // SEM06 M1
    {
        name: `Operating Systems`,
        id: `sem06Modal1`,
        img: `06/1`,
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
        yel_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2020-spring/OS-course/index.html`
            },
            {
                name: `Lec_Spr_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLjSFIV2WJbpyz756lW-vKWjzi9VXgSTT1`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2021-spring/OS-course/index.html`
            },
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtNMv72nvIy1sHnyIHgnN1cx`
            }
        ],
        blu_b: [
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
        img: `06/2`,
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
        yel_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2020-spring/OS-course/index.html`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2021-spring/OS-course/index.html`
            }
        ],
        blu_b: [
            {
                name: `Web_Spr_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~mainack/courses/2022-spring/OS-course/index.html`
            },
            {
                name: `Lab Sessions`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fiBufnqvcTo6OxPoAaDC9v7`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=521`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/ElvT69xXHJxGv_dpBslwxjoBH6sTWmODk-3A8L5RgkvV-g?e=hwsJ2p`
    },
    // SEM06 M3
    {
        name: `Database Management Systems`,
        id: `sem06Modal3`,
        img: `06/3`,
        code: `CS30202`,
        prof_b: [
            {
                name: `Krothapalli Sreenivasa Rao`,
                link: `https://cse.iitkgp.ac.in/~ksrao/`
            },
            {
                name: `Pabitra Mitra`,
                link: `http://cse.iitkgp.ac.in/~pabitra/`
            }
        ],
        yel_b: [
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
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtN6vg7nkn_HZrVLVIbn6GfD`
            }
        ],
        blu_b: [
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
        img: `06/4`,
        code: `CS39202`,
        prof_b: [
            {
                name: `Krothapalli Sreenivasa Rao`,
                link: `https://cse.iitkgp.ac.in/~ksrao/`
            },
            {
                name: `Pabitra Mitra`,
                link: `http://cse.iitkgp.ac.in/~pabitra/`
            }
        ],
        yel_b: [
            {
                name: `Web_Spr_21`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/spring2021/dbms/dbms2021.html`
            },
            {
                name: `Web_Spr_22`,
                icon: `fa-solid fa-file-lines`,
                link: `http://www.facweb.iitkgp.ac.in/~shamik/spring2022/dbms/dbms2022.html`
            }
        ],
        blu_b: [
            {
                name: `Web_Spr_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~pabitra/course/dbms/dbms_new.html`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=520`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eo2AmIsb3AJBppvpZqck8rsBwBa0ehLp_6oA0No2aH9bkA?e=kc3t4c`
    },
    // SEM06 M5
    {
        name: `Computer Networks`,
        id: `sem06Modal5`,
        img: `06/5`,
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
        yel_b: [
            {
                name: `Lec_Spr_22 Prof. AG`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtN3Z2lQH4CpM_vaKFr41oGI`
            },
            {
                name: `Web_Spr_22 Prof. SM`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~smisra/course/cn.html`
            },
            {
                name: `Lec_Spr_22 Prof. SM`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtNtPW9Myt9otRVQHmuM4nh8`
            }
        ],
        blu_b: [
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
        img: `06/6`,
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
        yel_b: [
            {
                name: `Lec_Spr_22 Prof. AG`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtONEcGM1qFbn7vDfkCDn59z`
            },
            {
                name: `Web_Spr_22 Prof. SM`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~smisra/course/cnlabs.html`
            },
            {
                name: `Lec_Spr_22 Prof. SM`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtNlAzWcvxlchgnDWCKeIwMo`
            }
        ],
        blu_b: [
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=517`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eiwlcs7SBCNJrNNAlZ90zjABTR63GaId-W5Xlm1wdAnOAw?e=2X0pQp`
    },
    // SEM06 M7
    {
        name: `Deep Learning`,
        id: `sem06Modal7`,
        img: `06/7`,
        code: `CS60010`,
        prof_b: [
            {
                name: `Sudeshna Sarkar`,
                link: `http://cse.iitkgp.ac.in/~sudeshna/`
            }
        ],
        yel_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMNU42VobghL-gvIi9dnrDl`
            }
        ],
        blu_b: [
            {
                name: `Online Sessions`,
                icon: `fa-brands fa-youtube`,
                link: `https://youtube.com/playlist?list=PLUfABYNel-fjajhvgA7GCUgRJadjBQ3ZD`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EliLzsMysgdAjJnQ0th2UxIBLnBJrmojqFa_-dLPnSllJQ?e=QRUTtw`
    },
    // SEM06 M8
    {
        name: `Information Retrieval`,
        id: `sem06Modal8`,
        img: `06/8`,
        code: `CS60092`,
        prof_b: [
            {
                name: `Somak Aditya`,
                link: `https://adityasomak.github.io/`
            }
        ],
        yel_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtP8YyzC9JaEQWE7BrK6fju4`
            }
        ],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EnzA6HuELoVDhQGKBUE-F5EBujIZrqhA7_thl7NHC_xsrA?e=5UrfA1`
    },
    // SEM07 M1
    {
        name: `Object Oriented Systems`,
        id: `sem07Modal1`,
        img: `07/1`,
        code: `CS60059`,
        prof_b: [
            {
                name: `Rajib Mall`,
                link: `https://www.iitkgp.ac.in/department/CS/faculty/cs-rajib`
            }
        ],
        yel_b: [
            {
                name: `NPTEL Lec (Prof. RM)`,
                icon: `fa-brands fa-youtube`,
                link: `https://archive.nptel.ac.in/courses/106/105/106105224/`
            }
        ],
        blu_b: [
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=534`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eh2puwNr1nZEiNRqLzepEYYBKLO4lvZItKA8pK7IIfRRow?e=49UNay`
    },
    // SEM07 M2
    {
        name: `Theory and Applications of Blockchain`,
        id: `sem07Modal2`,
        img: `07/2`,
        code: `CS61065`,
        prof_b: [
            {
                name: `Sandip Chakraborty`,
                link: `https://cse.iitkgp.ac.in/~sandipc/`
            }
        ],
        yel_b: [
            {
                name: `Nptel Lec (Prof. SC & Prof. SS)`,
                icon: `fa-brands fa-youtube`,
                link: `https://archive.nptel.ac.in/courses/106/105/106105235/`
            },
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PL_qVBOSlZLkKP_Ql4cIlllb74di0w7pVf`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~sandipc/courses/cs61065/cs61065.html`
            },
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=557`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EteVw2aM2xJHpN6Ifw6qXtUB5Tpqt2fOPOLA60mdzQvTtA?e=kILnOo`
    },
    // SEM07 M3
    {
        name: `Artificial Intelligence for Economics`,
        id: `sem07Modal3`,
        img: `07/3`,
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
        yel_b: [
            {
                name: `Lec_Aut_21`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PL4AVR1di7EiV_9Ij7b4WwwW68vSgFoTGM`
            }
        ],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Eofka2T7tGRHrvjclaRHRYUBNf8gjZ9i1PiyMREr9VABDg?e=AxjsMx`
    },
    // SEM07 M4
    {
        name: `Intercltural Communication`,
        id: `sem07Modal4`,
        img: `07/4`,
        code: `HS30036`,
        prof_b: [
            {
                name: `Vijai Nath Giri`,
                link: `https://www.iitkgp.ac.in/department/HS/faculty/hs-vng`
            }
        ],
        yel_b: [],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Ejak_y42k_ZBmP7fM232pJgBvjiE8ISg6hyP71M27PY0YQ?e=IDRdV3`
    },
    // SEM07 M5
    {
        name: `Frugal Engineering`,
        id: `sem07Modal5`,
        img: `07/5`,
        code: `EP60044`,
        prof_b: [
            {
                name: `Pranab K Dan`,
                link: `http://www.see.iitkgp.ac.in/team-view/p-k-dan-2/`
            }
        ],
        yel_b: [],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EuMqTv-3YOJBveDQ4R0_UBABJjZT5VC9E3YgiBdgeb0Fsw?e=617Ab0`
    },
    // SEM08 M1
    {
        name: `High Performance in Computer Architecture`,
        id: `sem08Modal1`,
        img: `08/1`,
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
        yel_b: [
            {
                name: `NPTEL Lec (Prof. AP)`,
                icon: `fa-brands fa-youtube`,
                link: `https://archive.nptel.ac.in/courses/106/105/106105033/`
            }
        ],
        blu_b: [
            {
                name: `Moodel`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=565`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EpqSvCGMuQZLvoMRg9gfyzMBmVsh6Q3w8OErhLyFIVo53A?e=vrKeod`
    },
    // SEM08 M2
    {
        name: `Big Data Processing`,
        id: `sem08Modal2`,
        img: `08/2`,
        code: `AI60004`,
        prof_b: [
            {
                name: `Jiaul Hoque Paik`,
                link: `https://jiaul.github.io/`
            }
        ],
        yel_b: [
            {
                name: `Lec_Spr_22`,
                icon: `fa-brands fa-youtube`,
                link: `https://www.youtube.com/playlist?list=PLO11h2zbAVtMxvFLBba-NyFRF1fsX4O0f`
            }
        ],
        blu_b: [
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `http://kgpmoodlenew.iitkgp.ac.in/moodle/course/view.php?id=875`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/Er66oy0LPPJChhCpLOW9HRwBtSzY-bs4iaI1hM-87BhjxQ?e=U9GZPF`
    },
    // SEM08 M3
    {
        name: `Computational Biophysics: Algorithms to Applications`,
        id: `sem08Modal3`,
        img: `08/3`,
        code: `CS61060`,
        prof_b: [
            {
                name: `Pralay Mitra`,
                link: `https://cse.iitkgp.ac.in/~pralay/`
            }
        ],
        yel_b: [],
        blu_b: [
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=586`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EhvL17r6S2dFodl1w8W36zkBLquwNQoiQXNFE651cZDd9w?e=FalMIl`
    },
    // SEM08 M4
    {
        name: `Hardware Security`,
        id: `sem08Modal4`,
        img: `08/4`,
        code: `CS60004`,
        prof_b: [
            {
                name: `Sarani Bhattacharya`,
                link: `https://sites.google.com/view/drsaranibhattacharya/bio`
            }
        ],
        yel_b: [
            {
                name: `NPTEL Lec (Prof. DM)`,
                icon: `fa-brands fa-youtube`,
                link: `https://archive.nptel.ac.in/courses/106/105/106105194/`
            }
        ],
        blu_b: [
            {
                name: `Moodle`,
                icon: `fa-solid fa-display`,
                link: `https://moodlecse.iitkgp.ac.in/moodle/course/view.php?id=584`
            }
        ],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EpCUJnG-SWtHrs16zNRdsHkB1-bxVAUC1C9rGvmpy1x-_w?e=8jewCl`
    },
    // SEM08 M5
    {
        name: `Engineering Design Process`,
        id: `sem08Modal5`,
        img: `08/5`,
        code: `EP60042`,
        prof_b: [
            {
                name: `Pranab K Dan`,
                link: `http://www.see.iitkgp.ac.in/team-view/p-k-dan-2/`
            }
        ],
        yel_b: [],
        blu_b: [],
        mat_b: `https://iitkgpacin-my.sharepoint.com/:f:/g/personal/garggopal2001_kgpian_iitkgp_ac_in/EqqnUyTTOOZFv84_1KmqrAUB8kvVQb0ZXOLRcHJQDK8T5g?e=i5t0L4`
    },
    // SEM09 M1
    {
        name: `Social Computing`,
        id: `sem09Modal1`,
        img: `09/1`,
        code: `CS60017`,
        prof_b: [
            {
                name: `Saptarshi Ghosh`,
                link: `https://sites.google.com/site/saptarshighosh/`
            }
        ],
        yel_b: [
            {
                name: `Web_Aut_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://sites.google.com/view/cs60017/home`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_24`,
                icon: `fa-solid fa-file-lines`,
                link: `https://sites.google.com/view/cs60017-2024/home`
            }
        ],
        mat_b: ``
    },
    // SEM09 M2
    {
        name: `Scalable Data Mining`,
        id: `sem09Modal2`,
        img: `09/2`,
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
        yel_b: [
            {
                name: `Web_Aut_23`,
                icon: `fa-solid fa-file-lines`,
                link: `https://panuragreddy.github.io/SDM_2023/`
            }
        ],
        blu_b: [
            {
                name: `Web_Aut_24`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~sourangshu/coursefiles/cs60021_2024a.html`
            }
        ],
        mat_b: ``
    },
    // SEM09 M3
    {
        name: `Data Analytics`,
        id: `sem09Modal3`,
        img: `09/3`,
        code: `CS610161`,
        prof_b: [
            {
                name: `Abhijnan Chakraborty`,
                link: `https://cse.iitkgp.ac.in/~abhijnan/`
            }
        ],
        yel_b: [],
        blu_b: [
            {
                name: `Web_Aut_24`,
                icon: `fa-solid fa-file-lines`,
                link: `https://cse.iitkgp.ac.in/~abhijnan/data-analytics-2024.html`
            }
        ],
        mat_b: ``
    }
]

// Courses Modal
let modal_html = document.getElementById(`modals`);
modal_html.innerHTML = ``;
modal_data.forEach((modal) => {
    let prof_b = ``, yel_b = ``, blu_b = ``;
    // Professor Buttons
    modal.prof_b.forEach((but_p) => {
        prof_b +=
        `<a href="${but_p.link}" target="_blank">
            <button class="btn btn-primary2 _but">
                <i class="fas fa-user fa-fw"></i>${but_p.name}
            </button>
        </a>`
    });
    // Yellow Buttons
    modal.yel_b.forEach((but_yel) => {
        yel_b +=
        `<a href="${but_yel.link}" target="_blank">
            <button class="btn btn-warning _but">
                <i class="fas ${but_yel.icon} fa-fw"></i>${but_yel.name}
            </button>
        </a>`
    });
    // Blue Buttons
    modal.blu_b.forEach((but_blu) => {
        blu_b +=
        `<a href="${but_blu.link}" target="_blank">
            <button class="btn btn-info _but">
                <i class="fas ${but_blu.icon} fa-fw"></i>${but_blu.name}
            </button>
        </a>`
    });
    modal_html.innerHTML +=
    `<div class="portfolio-modal modal fade" id="${modal.id}" tabindex="-1" aria-labelledby="${modal.id}" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                <div class="modal-body text-center pb-2">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <!-- Portfolio Modal - Title-->
                                <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">${modal.name}</h2>
                                <!-- Icon Divider-->
                                <div class="divider-custom">
                                    <div class="divider-custom-line"></div>
                                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                    <div class="divider-custom-line"></div>
                                </div>
                                <!-- Portfolio Modal - Image-->
                                <img class="img-fluid sem_img_b rounded" src="assets/img/sem${modal.img}.png" alt="..." />
                                <!-- Portfolio Modal - Text-->
                                <p class="mb-4 back_text">${modal.code}</p>
                                <!-- Protfolio Modal - Button -->
                                ${prof_b}
                                <br>
                                ${yel_b}
                                ${yel_b == `` ? `` : `<br>`}
                                ${blu_b}
                                ${blu_b == `` ? `` : `<br>`}
                                <a href="${modal.mat_b}" target="_blank">
                                    <button class="btn btn-success _but">
                                        <i class="fas fa-solid fa-jet-fighter fa-fw"></i>Material
                                    </button>
                                </a>
                                <button class="btn btn-danger _but" data-bs-dismiss="modal">
                                    <i class="fas fa-solid fa-circle-xmark fa-fw"></i>Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
});

// Link Modal
let linkmodal_html = document.getElementById(`linkmodal`);
linkmodal_html.innerHTML =
`<div class="portfolio-modal modal fade" id="linksModal1" tabindex="-1" aria-labelledby="linksModal1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
            <div class="modal-body text-center pb-2">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-11">
                            <!-- Portfolio Modal - Title-->
                            <h3>Links/Sources</h3>
                            <!-- Icon Divider-->
                            <div class="divider-custom">
                                <div class="divider-custom-line"></div>
                                <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                <div class="divider-custom-line"></div>
                            </div>
                            <!-- Portfolio Modal - Button -->
                            <a href="https://erp.iitkgp.ac.in/SSOAdministration/login.htm?sessionToken=14ADC44B03533E3B1C22E5BD4DB428A5.worker1&requestedUrl=https://erp.iitkgp.ac.in/IIT_ERP3/" target="_blank" title="Official Site for Admin work">
                                <button class="btn btn-primary _but">ERP</button>
                            </a>
                            <a href="https://moodlecse.iitkgp.ac.in/moodle/login/index.php" target="_blank" title="Moodle of CSE Department">
                                <button class="btn btn-primary _but">CSE Moodle</button>
                            </a>
                            <a href="https://cse.iitkgp.ac.in/~wbcm/" target="_blank" title="CSE Courses">
                                <button class="btn btn-primary _but">WBCM</button>
                            </a>
                            <a href="http://kgpmoodlenew.iitkgp.ac.in/moodle/login/index.php" target="_blank" title="Moodle for Non-CSE Courses">
                                <button class="btn btn-primary _but">KGP Moodle</button>
                            </a>
                            <a href="https://docs.google.com/document/d/1aq7aWjOTEnO338IhHO4woZHirxj1xG5R4H2O6ZDiSRM/edit#heading=h.usm4xzbocfq6" target="_blank" title="CSE Courses lectures and webpages Batch 2019">
                                <button class="btn btn-primary _but">CSE Courses Batch 19</button>
                            </a>
                            <a href="https://www.youtube.com/channel/UCO0mrEUTWadrky_B--FsPCQ" target="_blank" title="CSE Courses Lectures Batch 2019">
                                <button class="btn btn-primary _but">CSE Courses Batch 19</button>
                            </a>
                            <a href="https://thescholarsavenue.github.io/societytable/" target="_blank" title="Society Table by The Scholar's Avenue">
                                <button class="btn btn-primary _but">Clubs & Socities</button>
                            </a>
                            <a href="https://library.iitkgp.ac.in/pages/eSearch2.1/" target="_blank" title="Ebooks by Central Library">
                                <button class="btn btn-primary _but">Library Books</button>
                            </a>
                            <a href="https://qp.metakgp.org/" target="_blank" title="Instant Search through Previous Years' Question Papers">
                                <button class="btn btn-primary _but">Question Papers</button>
                            </a>
                            <a href="https://metakgp.github.io/mcmp/" target="_blank" title="Instant Search for any Faculty Working in your Area of Interest">
                                <button class="btn btn-primary _but">Professor Search</button>
                            </a>
                            <a href="https://wiki.metakgp.org/" target="_blank" title="The community wiki for IIT Kharagpur">
                                <button class="btn btn-primary _but">Meta KGP</button>
                            </a>
                            <a href="https://share.streamlit.io/spookbite/kronos2.0/main/app.py" target="_blank" title="Grade Distribution of Courses">
                                <button class="btn btn-primary _but">Kronos</button>
                            </a>
                            <a href="http://cse.iitkgp.ac.in/~abhij/course/" target="_blank" title="Index of Prof. Abhijit Das Courses">
                                <button class="btn btn-primary _but">Abhijit Das Courses</button>
                            </a>
                            <a href="https://github.com/ansh121/IIT-KGP-Academics" target="_blank" title="CSE Academic Material by Anshul Choudhary">
                                <button class="btn btn-primary _but">CSE Material by ansh121</button>
                            </a>
                            <a href="https://drive.google.com/folderview?id=0Bx7x8HmM7p_zM3VDMURfWWdvY28&resourcekey=0-4H4yE_Kxs1Dr61KH_3fxFw" target="_blank" title="CSE Notes by Anubhav Jain">
                                <button class="btn btn-primary _but">Anubhav Jain Notes</button>
                            </a>
                            <a href="https://www.youtube.com/playlist?list=PLauivoElc3gh3RCiQA82MDI-gJfXQQVnn" target="_blank" title="C++ STL Playlist by Luv">
                                <button class="btn btn-primary _but">C++ STL Playlist</button>
                            </a>
                            <a href="https://www.topcoder.com/thrive/articles/Power%20up%20C++%20with%20the%20Standard%20Template%20Library%20Part%20One" target="_blank" title="C++ STL Tutorial by topcoder.com">
                                <button class="btn btn-primary _but">C++ STL Topcoder</button>
                            </a>
                            <a href="https://www.youtube.com/playlist?list=PLauivoElc3ggagradg8MfOZreCMmXMmJ-" target="_blank" title="CP/DSA Playlist by Luv">
                                <button class="btn btn-primary _but">CP/DSA Playlist</button>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.rr.CPing" target="_blank" title="CPing - Coding Calendar">
                                <button class="btn btn-primary _but">CPing</button>
                            </a>
                            <a href="https://kodeinkgp.live/" target="_blank" title="Questions of PDS Lab and Theory course">
                                <button class="btn btn-primary _but">KodeinKGP</button>
                            </a>
                            <a href="https://clist.by/" target="_blank" title="CP Calendar and more">
                                <button class="btn btn-primary _but">CP Calendar</button>
                            </a>
                            <a href="https://cfviz.netlify.app/index.html" target="_blank" title="Codeforces Visualizer">
                                <button class="btn btn-primary _but">Codeforces Visualizer</button>
                            </a>
                            <a href="https://recommender.codedrills.io/" target="_blank" title="CP Resources and Problem Recommender">
                                <button class="btn btn-primary _but">CP Resources</button>
                            </a>
                            <a href="https://cses.fi/problemset/" target="_blank" title="Problem Set">
                                <button class="btn btn-primary _but">Problem Set 1</button>
                            </a>
                            <a href="https://atcoder.jp/contests/dp/tasks" target="_blank" title="Problem Set">
                                <button class="btn btn-primary _but">Problem Set 2</button>
                            </a>
                            <br>
                            <button class="btn btn-danger _but" data-bs-dismiss="modal">
                                <i class="fas fa-solid fa-circle-xmark fa-fw"></i>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;