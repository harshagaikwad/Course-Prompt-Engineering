// ==========================================
// GOOGLE APPS SCRIPT WEB APP URL
// ==========================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxwDUhvARZ96FYptAbeWubeDrg8ciog0JuSVRhmsop7q4HIl2J0CvCTBVAc4uinbmtl/exec";


// ==========================================
// GLOBAL VARIABLE
// ==========================================

let selectedCoursePage = "";


// ==========================================
// CHECK STUDENT REGISTRATION
// ==========================================

function isStudentRegistered() {

    const email =
        localStorage.getItem("studentEmail");

    return (
        email &&
        email.trim() !== ""
    );

}


// ==========================================
// START COURSE
// ==========================================

function startCourse(page) {

    selectedCoursePage =
        page;


    // If email is already registered,
    // directly open the selected unit

    if (isStudentRegistered()) {

        window.location.href =
            page;

        return;

    }


    // Otherwise show registration form

    const modal =
        document.getElementById(
            "registrationModal"
        );


    if (modal) {

        modal.style.display =
            "flex";

    }

}


// ==========================================
// CLOSE REGISTRATION MODAL
// ==========================================

function closeRegistration() {

    const modal =
        document.getElementById(
            "registrationModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// ==========================================
// REGISTER STUDENT
// ==========================================

function registerStudent(
    email,
    page
) {


    const message =
        document.getElementById(
            "registrationMessage"
        );


    message.innerText =
        "Registering your email...";


    const formData =
        new URLSearchParams();


    formData.append(
        "email",
        email
    );


    fetch(

        GOOGLE_SCRIPT_URL,

        {

            method: "POST",

            body: formData

        }

    )

    .then(

        response => response.text()

    )

    .then(

        result => {


            console.log(
                "Google Apps Script Response:",
                result
            );


            // SAVE EMAIL LOCALLY

            localStorage.setItem(
                "studentEmail",
                email
            );


            message.innerText =
                "Registration successful";


            // OPEN SELECTED COURSE PAGE

            setTimeout(

                function () {

                    window.location.href =
                        page;

                },

                500

            );

        }

    )

    .catch(

        function (error) {


            console.error(
                "Registration Error:",
                error
            );


            message.innerText =
                "Registration failed. Please try again.";

        }

    );

}


// ==========================================
// REGISTRATION FORM
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    function () {


        const form =
            document.getElementById(
                "registrationForm"
            );


        if (!form) {

            return;

        }


        form.addEventListener(

            "submit",

            function (event) {


                event.preventDefault();


                const emailInput =
                    document.getElementById(
                        "studentEmail"
                    );


                const email =
                    emailInput.value.trim();


                if (
                    email === ""
                ) {

                    return;

                }


                registerStudent(

                    email,

                    selectedCoursePage

                );

            }

        );

    }

);


// ==========================================
// COMPLETE UNIT
// ==========================================

function completeUnit(
    unitNumber
) {


    const email =
        localStorage.getItem(
            "studentEmail"
        );


    if (
        !email
    ) {


        alert(
            "Please register your email first."
        );


        window.location.href =
            "../index.html";


        return;

    }


    const formData =
        new URLSearchParams();


    formData.append(
        "email",
        email
    );


    formData.append(
        "unit",
        unitNumber
    );


    formData.append(
        "status",
        "Completed"
    );


    fetch(

        GOOGLE_SCRIPT_URL,

        {

            method: "POST",

            body: formData

        }

    )

    .then(

        response => response.text()

    )

    .then(

        result => {


            alert(
                "Unit "
                +
                unitNumber
                +
                " completed successfully."
            );


            // REDIRECT TO HOME PAGE

            window.location.href =
                "../index.html";

        }

    )

    .catch(

        function (error) {


            console.error(
                "Progress Error:",
                error
            );


            alert(
                "Unable to save progress."
            );

        }

    );

}
