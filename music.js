// =========================================
// PIANO MASTERS - MUSIC PLAYER
// =========================================


// =========================================
// AUDIO
// =========================================

const audioContext = new (
    window.AudioContext ||
    window.webkitAudioContext
)();


// =========================================
// NOTE FREQUENCIES
// =========================================

const notes = {
    Do: 261.63,
    Re: 293.66,
    Mi: 329.63,
    Fa: 349.23,
    Sol: 392.00,
    La: 440.00,
    Si: 493.88
};


// =========================================
// SONGS
// =========================================

// Each number represents how long
// the note should play.

const songs = {

    twinkle: {
        name: "Twinkle Twinkle Little Star",

        melody: [
            ["Do", 400],
            ["Do", 400],
            ["Sol", 400],
            ["Sol", 400],
            ["La", 400],
            ["La", 400],
            ["Sol", 700],

            ["Fa", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Re", 400],
            ["Re", 400],
            ["Do", 700],

            ["Sol", 400],
            ["Sol", 400],
            ["Fa", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Re", 700],

            ["Sol", 400],
            ["Sol", 400],
            ["Fa", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Re", 700],

            ["Do", 400],
            ["Do", 400],
            ["Sol", 400],
            ["Sol", 400],
            ["La", 400],
            ["La", 400],
            ["Sol", 700],

            ["Fa", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Re", 400],
            ["Re", 400],
            ["Do", 800]
        ]
    },


    baa: {
        name: "Baa Baa Black Sheep",

        melody: [
            ["Do", 400],
            ["Do", 400],
            ["Sol", 400],
            ["Sol", 400],
            ["La", 400],
            ["La", 400],
            ["Sol", 700],

            ["Fa", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Re", 400],
            ["Re", 400],
            ["Do", 700],

            ["Sol", 400],
            ["Sol", 400],
            ["Fa", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Re", 700],

            ["Sol", 400],
            ["Sol", 400],
            ["Fa", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Re", 700],

            ["Do", 400],
            ["Do", 400],
            ["Sol", 400],
            ["Sol", 400],
            ["La", 400],
            ["La", 400],
            ["Sol", 700],

            ["Fa", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Re", 400],
            ["Re", 400],
            ["Do", 800]
        ]
    },


    mary: {
        name: "Mary Had a Little Lamb",

        melody: [
            ["Mi", 400],
            ["Re", 400],
            ["Do", 400],
            ["Re", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Mi", 700],

            ["Re", 400],
            ["Re", 400],
            ["Re", 700],

            ["Mi", 400],
            ["Sol", 400],
            ["Sol", 700],

            ["Mi", 400],
            ["Re", 400],
            ["Do", 400],
            ["Re", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Mi", 400],
            ["Mi", 400],

            ["Re", 400],
            ["Re", 400],
            ["Mi", 400],
            ["Re", 400],
            ["Do", 800]
        ]
    },


    birthday: {
        name: "Happy Birthday",

        melody: [
            ["Sol", 300],
            ["Sol", 200],
            ["La", 500],
            ["Sol", 500],
            ["Do", 500],
            ["Si", 800],

            ["Sol", 300],
            ["Sol", 200],
            ["La", 500],
            ["Sol", 500],
            ["Re", 500],
            ["Do", 800],

            ["Sol", 300],
            ["Sol", 200],
            ["Sol", 500],
            ["Mi", 500],
            ["Do", 500],
            ["Si", 500],
            ["La", 800],

            ["Fa", 300],
            ["Fa", 200],
            ["Mi", 500],
            ["Do", 500],
            ["Re", 500],
            ["Do", 900]
        ]
    },


    ode: {
        name: "Ode to Joy",

        melody: [
            ["Mi", 400],
            ["Mi", 400],
            ["Fa", 400],
            ["Sol", 400],

            ["Sol", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Re", 400],

            ["Do", 400],
            ["Do", 400],
            ["Re", 400],
            ["Mi", 400],

            ["Mi", 600],
            ["Re", 200],
            ["Re", 800],

            ["Mi", 400],
            ["Mi", 400],
            ["Fa", 400],
            ["Sol", 400],

            ["Sol", 400],
            ["Fa", 400],
            ["Mi", 400],
            ["Re", 400],

            ["Do", 400],
            ["Do", 400],
            ["Re", 400],
            ["Mi", 400],

            ["Re", 600],
            ["Do", 200],
            ["Do", 800]
        ]
    },


    row: {
        name: "Row, Row, Row Your Boat",

        melody: [
            ["Do", 300],
            ["Do", 300],
            ["Do", 500],

            ["Re", 300],
            ["Mi", 500],

            ["Mi", 300],
            ["Re", 300],
            ["Mi", 300],
            ["Fa", 300],
            ["Sol", 700],

            ["Do", 300],
            ["Do", 300],
            ["Sol", 300],
            ["Sol", 300],
            ["Sol", 500],

            ["Mi", 300],
            ["Mi", 300],
            ["Mi", 300],
            ["Do", 300],
            ["Do", 700]
        ]
    }

};


// =========================================
// VARIABLES
// =========================================

let playing = false;

let stopSong = false;

let currentButton = null;


// =========================================
// PLAY A NOTE
// =========================================

function playNote(note, duration) {

    return new Promise((resolve) => {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type = "sine";

        oscillator.frequency.value =
            notes[note];


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        // Start quietly

        gain.gain.setValueAtTime(
            0,
            audioContext.currentTime
        );


        // Fade in

        gain.gain.linearRampToValueAtTime(
            0.55,
            audioContext.currentTime + 0.03
        );


        // Fade out

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime +
            duration / 1000
        );


        oscillator.start();


        oscillator.stop(
            audioContext.currentTime +
            duration / 1000
        );


        setTimeout(() => {

            resolve();

        }, duration);

    });
}


// =========================================
// PLAY SONG
// =========================================

async function playSong(songKey, button) {

    // If something is already playing,
    // stop it first.

    if (playing) {

        stopSong = true;

        return;

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        await audioContext.resume();

    }


    const song = songs[songKey];

    if (!song) return;


    playing = true;

    stopSong = false;

    currentButton = button;


    // =====================================
    // NOW PLAYING
    // =====================================

    const nowPlaying =
        document.getElementById(
            "nowPlaying"
        );

    const currentSong =
        document.getElementById(
            "currentSong"
        );

    const playingStatus =
        document.getElementById(
            "playingStatus"
        );


    currentSong.textContent =
        song.name;

    playingStatus.textContent =
        "Listen carefully and try to play it yourself!";

    nowPlaying.classList.add(
        "playing"
    );


    // =====================================
    // CHANGE BUTTON
    // =====================================

    const icon =
        button.querySelector("i");

    const text =
        button.querySelector("span");


    icon.className =
        "fa-solid fa-stop";

    text.textContent =
        "Stop Song";


    // =====================================
    // PLAY MELODY
    // =====================================

    for (
        let i = 0;
        i < song.melody.length;
        i++
    ) {

        if (stopSong) {
            break;
        }


        const [note, duration] =
            song.melody[i];


        await playNote(
            note,
            duration
        );


        // Small gap between notes

        if (!stopSong) {

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        40
                    )
            );

        }

    }


    // =====================================
    // RESET
    // =====================================

    playing = false;

    stopSong = false;


    nowPlaying.classList.remove(
        "playing"
    );


    currentSong.textContent =
        "Choose a song";

    playingStatus.textContent =
        "Press Play Song to hear the melody.";


    icon.className =
        "fa-solid fa-play";

    text.textContent =
        "Play Song";

    currentButton = null;

}


// =========================================
// SONG BUTTONS
// =========================================

const songButtons =
    document.querySelectorAll(
        ".play-song"
    );


songButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const songKey =
                button.dataset.song;


            playSong(
                songKey,
                button
            );

        }
    );

});