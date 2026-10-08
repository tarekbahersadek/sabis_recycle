// =========================================
// PIANO MASTERS - NOTE SOUNDS
// =========================================

const audioContext = new (
    window.AudioContext ||
    window.webkitAudioContext
)();


// Frequencies for Do Re Mi Fa Sol La Si
const noteFrequencies = {
    "Do": 261.63,
    "Re": 293.66,
    "Mi": 329.63,
    "Fa": 349.23,
    "Sol": 392.00,
    "La": 440.00,
    "Si": 493.88
};


// =========================================
// PLAY NOTE
// =========================================

function playNote(note) {

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
        noteFrequencies[note];

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start quietly
    gainNode.gain.setValueAtTime(
        0,
        audioContext.currentTime
    );

    // Fade in
    gainNode.gain.linearRampToValueAtTime(
        0.6,
        audioContext.currentTime + 0.02
    );

    // Fade out
    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 1
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 1
    );
}


// =========================================
// MAKE NOTES CLICKABLE
// =========================================

const notes = document.querySelectorAll(
    ".notes span"
);

notes.forEach(note => {

    note.addEventListener("click", () => {

        const noteName =
            note.textContent.trim();

        playNote(noteName);


        // Visual feedback
        note.classList.add("playing");

        setTimeout(() => {

            note.classList.remove("playing");

        }, 180);

    });

});