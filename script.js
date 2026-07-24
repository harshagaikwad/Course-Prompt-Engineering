function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const button =
        document.getElementById("themeButton");

    if (
        document.body.classList.contains("dark-mode")
    ) {

        button.innerHTML = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        button.innerHTML = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}


window.addEventListener(

    "DOMContentLoaded",

    function () {

        const savedTheme =
            localStorage.getItem("theme");

        if (
            savedTheme === "dark"
        ) {

            document.body.classList.add(
                "dark-mode"
            );

            document.getElementById(
                "themeButton"
            ).innerHTML = "☀️";

        }

        updateProgress();

    }

);


function updateProgress() {

    for (
        let unit = 1;
        unit <= 5;
        unit++
    ) {

        const completed =
            localStorage.getItem(
                "unit" + unit + "Completed"
            );

        const progress =
            document.getElementById(
                "progress" + unit
            );

        const progressText =
            document.getElementById(
                "progressText" + unit
            );

        if (
            progress &&
            progressText
        ) {

            if (
                completed === "true"
            ) {

                progress.style.width =
                    "100%";

                progressText.innerHTML =
                    "Completed ✓";

            } else {

                progress.style.width =
                    "0%";

                progressText.innerHTML =
                    "Not Started";

            }

        }

    }

}
