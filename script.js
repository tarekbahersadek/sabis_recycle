// ==========================================
// 61 KEY PIANO
// ==========================================

const piano = document.getElementById("pianoKeys");


// ==========================================
// NOTES
// ==========================================

const notes = [
    "C", "C#", "D", "D#", "E", "F",
    "F#", "G", "G#", "A", "A#", "B"
];


// ==========================================
// CREATE 61 KEYS
// C2 TO C7
// ==========================================

let whiteKeyCount = 0;

for (let midi = 36; midi <= 96; midi++) {

    const noteName = notes[midi % 12];

    const octave = Math.floor(midi / 12) - 1;

    const note = noteName + octave;

    const isBlack = noteName.includes("#");


    // ======================================
    // WHITE KEY
    // ======================================

    if (!isBlack) {

        const key = document.createElement("div");

        key.className = "white";

        key.dataset.note = note;

        key.textContent = noteName;


        // Save its white-key number
        key.dataset.whiteNumber =
            whiteKeyCount;


        piano.appendChild(key);

        whiteKeyCount++;

    }


    // ======================================
    // BLACK KEY
    // ======================================

    else {

        const key = document.createElement("div");

        key.className = "black";

        key.dataset.note = note;

        key.textContent = noteName;


        // Position black key
        key.style.left =
            (whiteKeyCount * 55 - 18) + "px";


        piano.appendChild(key);

    }

}


// ==========================================
// AUDIO
// ==========================================

let audioContext = null;


// ==========================================
// NOTE TO MIDI
// ==========================================

function getMidi(note) {

    const match =
        note.match(/^([A-G]#?)([0-9])$/);

    if (!match) return null;

    const name = match[1];

    const octave =
        Number(match[2]);

    const noteNumber =
        notes.indexOf(name);

    return (octave + 1) * 12 + noteNumber;
}


// ==========================================
// PLAY NOTE
// ==========================================

function playNote(note, element) {

    if (!audioContext) {

        audioContext =
            new AudioContext();

    }


    const midi = getMidi(note);

    if (midi === null) return;


    const frequency =
        440 * Math.pow(
            2,
            (midi - 69) / 12
        );


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = "triangle";

    oscillator.frequency.value =
        frequency;


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    const now =
        audioContext.currentTime;


    gain.gain.setValueAtTime(
        0.001,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.4,
        now + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 1
    );


    oscillator.start();

    oscillator.stop(
        now + 1
    );


    // Key animation

    element.classList.add(
        "active"
    );


    setTimeout(() => {

        element.classList.remove(
            "active"
        );

    }, 150);

}


// ==========================================
// MOUSE CLICK
// ==========================================

document
    .querySelectorAll(".white, .black")
    .forEach(key => {

        key.addEventListener(
            "mousedown",
            () => {

                playNote(
                    key.dataset.note,
                    key
                );

            }
        );

    });


// ==========================================
// COMPUTER KEYBOARD
// ==========================================

const computerKeys = [
    "a", "w", "s", "e", "d",
    "f", "t", "g", "y", "h",
    "u", "j", "k", "o", "l",
    "p", "z", "x", "c", "v",
    "b", "n", "m"
];


const allKeys =
    document.querySelectorAll(
        ".white, .black"
    );


computerKeys.forEach(
    (computerKey, index) => {

        if (allKeys[index]) {

            allKeys[index].dataset.key =
                computerKey;

        }

    }
);


// ==========================================
// KEYBOARD PRESS
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (event.repeat) return;


        const key =
            event.key.toLowerCase();


        const pianoKey =
            document.querySelector(
                `[data-key="${key}"]`
            );


        if (pianoKey) {

            playNote(
                pianoKey.dataset.note,
                pianoKey
            );

        }

    }
);