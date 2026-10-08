// ======================================================
// PIANO MASTERS - SIGN UP
// ======================================================

const form = document.querySelector(".signup-form");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values
        const fullname =
            document.querySelector("#fullname").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const password =
            document.querySelector("#password").value;


        // ==================================================
        // CHECK NAME
        // ==================================================

        if (fullname === "") {

            alert("⚠️ Please enter your full name.");

            return;
        }


        // ==================================================
        // CHECK EMAIL
        // ==================================================

        if (email === "") {

            alert("⚠️ Please enter your email.");

            return;
        }


        // Simple email check
        if (!email.includes("@") || !email.includes(".")) {

            alert("⚠️ Please enter a valid email address.");

            return;
        }


        // ==================================================
        // CHECK PASSWORD
        // ==================================================

        if (password.length < 8) {

            alert(
                "⚠️ Your password must be at least 8 characters."
            );

            return;
        }


        // ==================================================
        // SAVE ACCOUNT
        // ==================================================

        const account = {

            fullname: fullname,

            email: email

        };


        localStorage.setItem(
            "pianoMastersAccount",
            JSON.stringify(account)
        );


        // ==================================================
        // UNLOCK THE AI
        // ==================================================

        localStorage.setItem(
            "pianoMastersSignedUp",
            "true"
        );


        // ==================================================
        // SAVE USER NAME FOR AI
        // ==================================================

        localStorage.setItem(
            "pianoMastersName",
            fullname
        );


        // ==================================================
        // SUCCESS
        // ==================================================

        alert(
            "🎉 Account created successfully!\n\n" +
            "Welcome to Piano Masters, " +
            fullname +
            "! 🎹"
        );


        // Clear form
        form.reset();


        // ==================================================
        // GO TO AI PAGE
        // ==================================================

        window.location.href = "ai.html";

    });

}








