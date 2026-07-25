// =====================================
// GOOGLE APPS SCRIPT URL
// =====================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzG-4cVnCpbekmjzf80LYVyRdK4D7XAzduOE6-2ySZriSF_7QCU4G0rKLNTUNwSO4b7/exec";


// =====================================
// GET STUDENT EMAIL
// =====================================

function getStudentEmail() {

    return localStorage.getItem(
        "studentEmail"
    );

}


// =====================================
// SAVE EMAIL LOCALLY
// =====================================

function saveStudentEmail(
    email
) {

    localStorage.setItem(
        "studentEmail",
        email
    );

}


// =====================================
// SEND DATA TO GOOGLE SHEETS
// =====================================

async function sendToGoogleSheets(
    data
) {

    try {

        const response =
            await fetch(
                GOOGLE_SCRIPT_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "text/plain;charset=utf-8"

                    },

                    body:
                        JSON.stringify(data)

                }
            );


        return await response.json();


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        return {

            success: false,

            message:
                "Connection error"

        };

    }

}


// =====================================
// REGISTER STUDENT
// =====================================

async function registerStudent(
    email
) {

    const result =
        await sendToGoogleSheets({

            action:
                "register",

            email:
                email

        });


    if (
        result.success
    ) {

        saveStudentEmail(
            email
        );

        return true;

    }


    alert(
        result.message
    );


    return false;

}


// =====================================
// COMPLETE UNIT
// =====================================

async function completeUnit(
    unitNumber
) {

    const email =
        getStudentEmail();


    if (!email) {

        alert(
            "Please register with your email first."
        );


        window.location.href =
            "../index.html";


        return;

    }


    const result =
        await sendToGoogleSheets({

            action:
                "complete_unit",

            email:
                email,

            unit:
                unitNumber

        });


    if (
        result.success
    ) {

        localStorage.setItem(

            "unit" +
            unitNumber +
            "Completed",

            "true"

        );


        const progressElement =
            document.getElementById(
                "unitProgress"
            );


        if (
            progressElement
        ) {

            progressElement.innerText =
                "Overall Progress: "
                +
                result.progress;

        }


        alert(
            "Unit completed successfully!"
        );

    }

}


// =====================================
// SAVE QUIZ SCORE
// =====================================

async function saveQuizScore(
    quizNumber,
    score,
    total
) {

    const email =
        getStudentEmail();


    if (!email) {

        alert(
            "Please register with your email first."
        );


        return;

    }


    const scoreText =
        score
        +
        "/"
        +
        total;


    const result =
        await sendToGoogleSheets({

            action:
                "quiz_score",

            email:
                email,

            quiz:
                quizNumber,

            score:
                scoreText

        });


    if (
        result.success
    ) {

        alert(
            "Quiz score saved: "
            +
            scoreText
        );

    }

}


// =====================================
// DARK MODE
// =====================================

function toggleTheme() {

    document.body
        .classList
        .toggle(
            "dark-mode"
        );


    const button =
        document.getElementById(
            "themeButton"
        );


    if (
        document.body
            .classList
            .contains(
                "dark-mode"
            )
    ) {

        button.innerHTML =
            "☀️";

    } else {

        button.innerHTML =
            "🌙";

    }

}


// =====================================
// CHECK STUDENT REGISTRATION
// =====================================

function checkStudentRegistration() {

    const email =
        getStudentEmail();


    if (
        !email
    ) {

        return false;

    }


    return true;

}
