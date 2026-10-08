/* =========================================================
   PIANO MASTERS — COACH AHMED SESSIONS
   Dynamic Session System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const sessions = document.querySelectorAll(".session-card");

    const searchInput = document.getElementById("sessionSearch");

    const completedCount = document.querySelector(".completed-count");
    const totalCount = document.querySelector(".total-count");
    const progressText = document.querySelector(".progress-text");
    const progressFill = document.querySelector(".progress-fill");


    /* =====================================================
       STORAGE
       ===================================================== */

    let completedSessions =
        JSON.parse(localStorage.getItem("pianoMastersCompleted")) || [];

    let favoriteSessions =
        JSON.parse(localStorage.getItem("pianoMastersFavorites")) || [];


    /* =====================================================
       HELPERS
       ===================================================== */

    function saveCompleted() {
        localStorage.setItem(
            "pianoMastersCompleted",
            JSON.stringify(completedSessions)
        );
    }

    function saveFavorites() {
        localStorage.setItem(
            "pianoMastersFavorites",
            JSON.stringify(favoriteSessions)
        );
    }


    function getSessionId(card) {
        return card.dataset.session;
    }


    /* =====================================================
       UPDATE PROGRESS
       ===================================================== */

    function updateProgress() {

        const total = sessions.length;

        const completed = sessions.length === 0
            ? 0
            : [...sessions].filter(card =>
                completedSessions.includes(getSessionId(card))
            ).length;

        const percentage = total === 0
            ? 0
            : Math.round((completed / total) * 100);


        if (completedCount) {
            completedCount.textContent = completed;
        }

        if (totalCount) {
            totalCount.textContent = total;
        }

        if (progressText) {
            progressText.textContent =
                `${percentage}% Complete`;
        }

        if (progressFill) {
            progressFill.style.width =
                `${percentage}%`;
        }
    }


    /* =====================================================
       FAVORITES
       ===================================================== */

    function updateFavoriteButton(card) {

        const button =
            card.querySelector(".favorite-session");

        if (!button) return;

        const icon = button.querySelector("i");

        const sessionId =
            getSessionId(card);

        const isFavorite =
            favoriteSessions.includes(sessionId);


        if (isFavorite) {

            button.classList.add("active");

            button.setAttribute(
                "aria-label",
                "Remove from favorites"
            );

            button.setAttribute(
                "title",
                "Remove from favorites"
            );

            if (icon) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
            }

        } else {

            button.classList.remove("active");

            button.setAttribute(
                "aria-label",
                "Add to favorites"
            );

            button.setAttribute(
                "title",
                "Add to favorites"
            );

            if (icon) {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
            }
        }
    }


    function toggleFavorite(card) {

        const sessionId =
            getSessionId(card);

        const index =
            favoriteSessions.indexOf(sessionId);


        if (index === -1) {

            favoriteSessions.push(sessionId);

            showNotification(
                "❤️ Added to favorites"
            );

        } else {

            favoriteSessions.splice(index, 1);

            showNotification(
                "Removed from favorites"
            );
        }


        saveFavorites();

        updateFavoriteButton(card);
    }


    /* =====================================================
       COMPLETION
       ===================================================== */

    function updateCompleteButton(card) {

        const button =
            card.querySelector(".complete-session");

        if (!button) return;

        const sessionId =
            getSessionId(card);

        const isComplete =
            completedSessions.includes(sessionId);


        if (isComplete) {

            card.classList.add("completed");

            button.classList.add("completed");

            button.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Completed';

        } else {

            card.classList.remove("completed");

            button.classList.remove("completed");

            button.innerHTML =
                '<i class="fa-solid fa-check"></i> Mark Complete';
        }
    }


    function toggleComplete(card) {

        const sessionId =
            getSessionId(card);

        const index =
            completedSessions.indexOf(sessionId);


        if (index === -1) {

            completedSessions.push(sessionId);

            showNotification(
                "🎹 Session completed! Great work!"
            );

        } else {

            completedSessions.splice(index, 1);

            showNotification(
                "Session marked as incomplete"
            );
        }


        saveCompleted();

        updateCompleteButton(card);

        updateProgress();
    }


    /* =====================================================
       WATCH SESSION
       ===================================================== */

    function watchSession(card) {

        const video =
            card.querySelector("video");

        if (!video) {
            showNotification(
                "Video could not be found."
            );
            return;
        }


        video.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        setTimeout(() => {

            video.play().catch(() => {

                showNotification(
                    "Press the play button on the video to start."
                );

            });

        }, 500);
    }


    /* =====================================================
       SEARCH
       ===================================================== */

    function searchSessions() {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        let visibleSessions = 0;


        sessions.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            const matches =
                text.includes(searchTerm);


            if (matches) {

                card.style.display = "";

                visibleSessions++;

            } else {

                card.style.display = "none";
            }
        });


        /* No results message */

        let noResults =
            document.querySelector(".no-session-results");


        if (visibleSessions === 0) {

            if (!noResults) {

                noResults =
                    document.createElement("div");

                noResults.className =
                    "no-session-results";

                noResults.innerHTML = `
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>No sessions found</h3>
                    <p>Try searching for another lesson.</p>
                `;

                document
                    .querySelector(".sessions-list")
                    .appendChild(noResults);
            }

            noResults.style.display = "block";

        } else {

            if (noResults) {
                noResults.style.display = "none";
            }
        }
    }


    /* =====================================================
       INITIALIZE EVERY SESSION AUTOMATICALLY
       ===================================================== */

    sessions.forEach(card => {

        const favoriteButton =
            card.querySelector(".favorite-session");

        const completeButton =
            card.querySelector(".complete-session");

        const watchButton =
            card.querySelector(".open-session");


        /* Favorite */

        if (favoriteButton) {

            favoriteButton.addEventListener(
                "click",
                () => toggleFavorite(card)
            );
        }


        /* Complete */

        if (completeButton) {

            completeButton.addEventListener(
                "click",
                () => toggleComplete(card)
            );
        }


        /* Watch */

        if (watchButton) {

            watchButton.addEventListener(
                "click",
                () => watchSession(card)
            );
        }


        /* Restore saved state */

        updateFavoriteButton(card);

        updateCompleteButton(card);
    });


    /* =====================================================
       SEARCH EVENT
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchSessions
        );
    }


    /* =====================================================
       VIDEO EVENTS
       ===================================================== */

    sessions.forEach(card => {

        const video =
            card.querySelector("video");

        if (!video) return;


        /* When video starts */

        video.addEventListener("play", () => {

            card.classList.add("watching");
        });


        /* When video stops */

        video.addEventListener("pause", () => {

            card.classList.remove("watching");
        });


        /* When video finishes */

        video.addEventListener("ended", () => {

            showNotification(
                "🎉 You finished the session!"
            );
        });
    });


    /* =====================================================
       NOTIFICATION SYSTEM
       ===================================================== */

    function showNotification(message) {

        const oldNotification =
            document.querySelector(
                ".session-notification"
            );

        if (oldNotification) {
            oldNotification.remove();
        }


        const notification =
            document.createElement("div");

        notification.className =
            "session-notification";

        notification.innerHTML = `
            <span>${message}</span>
            <button type="button" aria-label="Close">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;


        document.body.appendChild(notification);


        notification
            .querySelector("button")
            .addEventListener(
                "click",
                () => notification.remove()
            );


        setTimeout(() => {

            if (notification.parentElement) {
                notification.remove();
            }

        }, 3000);
    }


    /* =====================================================
       SIGN OUT
       ===================================================== */

    window.signOut = function () {

        const confirmed =
            confirm(
                "Are you sure you want to sign out?"
            );


        if (!confirmed) return;


        /*
         * If your signup/login system uses a specific
         * localStorage key, add it here.
         */

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userLoggedIn");


        showNotification(
            "You have been signed out."
        );


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 800);
    };


    /* =====================================================
       INITIAL PROGRESS
       ===================================================== */

    updateProgress();


    /* =====================================================
       WELCOME MESSAGE
       ===================================================== */

    console.log(
        `Piano Masters: ${sessions.length} session(s) loaded.`
    );

});