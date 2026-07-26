
// ==========================================
// GOOGLE APPS SCRIPT WEB APP URL
// ==========================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz476e53gAfbDCDPRzi68iIl6CdlM_9GV6_SrwY7fHCRdMNlNS23jrVaSpGBXh84Iah/exec";


// ==========================================
// GLOBAL VARIABLES
// ==========================================

let selectedCoursePage = "";


// ==========================================
// CHECK WHETHER STUDENT IS REGISTERED
// ==========================================

function isStudentRegistered() {

    const email =
        localStorage.getItem(
            "studentEmail"
        );


    return (
        email !== null &&
        email.trim() !== ""
    );

}


// ==========================================
// OPEN REGISTRATION MODAL
// ==========================================

function startCourse(page) {

    selectedCoursePage =
        page;


    if (
        isStudentRegistered()
    ) {

        window.location.href =
            page;

        return;

    }


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


    if (message) {

        message.innerText =
            "Registering your email...";

    }


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

            mode: "no-cors",

            body: formData

        }

    )

    .then(

        function () {

            localStorage.setItem(
                "studentEmail",
                email
            );


            if (message) {

                message.innerText =
                    "Registration successful";

            }


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
                "Registration error:",
                error
            );


            if (message) {

                message.innerText =
                    "Registration failed. Please try again.";

            }

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


                const page =
                    selectedCoursePage;


                registerStudent(

                    email,

                    page

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
            "Please register your email before continuing."
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

            mode: "no-cors",

            body: formData

        }

    )

    .then(

        function () {

            const progress =
                document.getElementById(
                    "unitProgress"
                );


            if (
                progress
            ) {

                progress.innerText =
                    "✓ Unit "
                    +
                    unitNumber
                    +
                    " completed successfully.";

            }


            alert(

                "Unit "
                +
                unitNumber
                +
                " marked as completed."

            );

        }

    )

    .catch(

        function (error) {

            console.error(
                "Progress update error:",
                error
            );


            alert(
                "Unable to save progress."
            );

        }

    );

}
```
