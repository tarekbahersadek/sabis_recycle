/* =========================================================
   PIANO MASTERS AI
   Complete Front-End AI System
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const AI_NAME = "Piano Masters AI";

let voiceEnabled = true;
let isListening = false;
let recognition = null;

let conversation = [];


/* =========================================================
   SIGNUP CHECK
========================================================= */

/*
   IMPORTANT:

   Your signup.js should save something like:

   localStorage.setItem("pianoMastersUser", "true");

   OR:

   localStorage.setItem("pianoMastersUser", username);

   This AI checks several common names so it can work
   with your existing signup system.
*/

function isSignedUp() {

    const possibleAccounts = [
        "pianoMastersUser",
        "pianoMastersSignedUp",
        "signedUp",
        "userSignedUp",
        "user",
        "username",
        "account"
    ];

    for (const key of possibleAccounts) {

        const value = localStorage.getItem(key);

        if (
            value !== null &&
            value !== "" &&
            value !== "false" &&
            value !== "null" &&
            value !== "undefined"
        ) {
            return true;
        }
    }

    return false;
}


/* =========================================================
   REQUIRE SIGNUP
========================================================= */

function requireSignup() {

    if (isSignedUp()) {
        return true;
    }

    alert(
        "Please sign up for Piano Masters before using the AI."
    );

    window.location.href = "sign.html";

    return false;
}


/* =========================================================
   PAGE START
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeAI();

});


function initializeAI() {

    /*
       Do not automatically redirect immediately.
       This allows the user to see the AI page, but
       every AI action will be blocked until signup.
    */

    setupKeyboard();

    setupSpeechRecognition();

    updateVoiceButton();

}


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

function setupKeyboard() {

    const input =
        document.getElementById("messageInput");

    if (!input) return;

    input.addEventListener("keydown", function(event) {

        if (event.key === "Enter" && !event.shiftKey) {

            event.preventDefault();

            sendMessage();

        }

    });

}


/* =========================================================
   SEND MESSAGE
========================================================= */

async function sendMessage() {

    if (!requireSignup()) {
        return;
    }

    const input =
        document.getElementById("messageInput");

    if (!input) return;

    const message =
        input.value.trim();

    if (!message) return;

    input.value = "";

    addUserMessage(message);

    conversation.push({
        role: "user",
        content: message
    });

    showTyping();

    await wait(400);

    const response =
        await getAIResponse(message);

    hideTyping();

    addAIMessage(response);

    conversation.push({
        role: "assistant",
        content: response
    });

    if (voiceEnabled) {
        speak(response);
    }

}


/* =========================================================
   QUICK QUESTIONS
========================================================= */

function askQuestion(question) {

    if (!requireSignup()) {
        return;
    }

    const input =
        document.getElementById("messageInput");

    if (!input) return;

    input.value = question;

    sendMessage();

}


/* =========================================================
   ADD USER MESSAGE
========================================================= */

function addUserMessage(text) {

    const chat =
        document.getElementById("chatArea");

    if (!chat) return;

    const message =
        document.createElement("div");

    message.className =
        "message user";

    message.innerHTML = `

        <div class="message-icon">
            <i class="fa-solid fa-user"></i>
        </div>

        <div class="message-content">

            <div class="message-name">
                You
            </div>

            <p></p>

        </div>

    `;

    message.querySelector("p").textContent = text;

    chat.appendChild(message);

    scrollChat();

}


/* =========================================================
   ADD AI MESSAGE
========================================================= */

function addAIMessage(text) {

    const chat =
        document.getElementById("chatArea");

    if (!chat) return;

    const message =
        document.createElement("div");

    message.className =
        "message ai-message";

    message.innerHTML = `

        <div class="message-icon">

            <i class="fa-solid fa-robot"></i>

        </div>

        <div class="message-content">

            <div class="message-name">
                ${AI_NAME}
            </div>

            <p></p>

        </div>

    `;

    message.querySelector("p").textContent = text;

    chat.appendChild(message);

    scrollChat();

}


/* =========================================================
   SCROLL CHAT
========================================================= */

function scrollChat() {

    const chat =
        document.getElementById("chatArea");

    if (!chat) return;

    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth"
    });

}


/* =========================================================
   TYPING INDICATOR
========================================================= */

function showTyping() {

    const chat =
        document.getElementById("chatArea");

    if (!chat) return;

    if (document.getElementById("typingIndicator")) {
        return;
    }

    const typing =
        document.createElement("div");

    typing.id =
        "typingIndicator";

    typing.className =
        "message ai-message";

    typing.innerHTML = `

        <div class="message-icon">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="message-content">

            <div class="message-name">
                ${AI_NAME}
            </div>

            <p>
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                Thinking...
            </p>

        </div>
    `;

    chat.appendChild(typing);

    scrollChat();

}


function hideTyping() {

    const typing =
        document.getElementById("typingIndicator");

    if (typing) {
        typing.remove();
    }

}


/* =========================================================
   DELAY
========================================================= */

function wait(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });

}


/* =========================================================
   AI RESPONSE ENGINE
========================================================= */

async function getAIResponse(question) {

    const q =
        question
            .toLowerCase()
            .trim();


    /* =========================================
       GREETINGS
    ========================================= */

    if (
        q === "hi" ||
        q === "hello" ||
        q === "hey" ||
        q.includes("good morning") ||
        q.includes("good evening")
    ) {

        return `
Hello! 🎹 I'm Piano Masters AI.

I can help you with piano notes, chords, scales,
music theory, practice, technique, rhythm,
songs, composition, ear training and much more.

What would you like to learn?
        `.trim();

    }


    /* =========================================
       WHO ARE YOU?
    ========================================= */

    if (
        q.includes("who are you") ||
        q.includes("what are you") ||
        q.includes("your name")
    ) {

        return `
I'm Piano Masters AI, your virtual piano teacher. 🎹

I can explain piano concepts, teach music theory,
help you understand notes and chords, suggest
practice exercises, explain techniques, and answer
questions about music.
        `.trim();

    }


    /* =========================================
       PIANO BASICS
    ========================================= */

    if (
        q.includes("what is a piano") ||
        q.includes("how does a piano work")
    ) {

        return `
A piano is a musical instrument where pressing a key
causes a felt-covered hammer to strike strings inside
the instrument.

The strings vibrate and produce sound. The pedals
change characteristics such as sustain and resonance.

A standard modern piano has 88 keys:
52 white keys and 36 black keys.
        `.trim();

    }


    /* =========================================
       NUMBER OF KEYS
    ========================================= */

    if (
        q.includes("how many keys") ||
        q.includes("88 keys") ||
        q.includes("piano keys")
    ) {

        return `
A standard modern acoustic piano has 88 keys:

🎹 52 white keys
🎹 36 black keys

The lowest note is A0 and the highest is C8.
        `.trim();

    }


    /* =========================================
       WHITE KEYS
    ========================================= */

    if (
        q.includes("white keys")
    ) {

        return `
The seven natural notes are:

C - D - E - F - G - A - B

These notes repeat across the piano keyboard.

A useful way to find C is to look for the group of
two black keys. C is the white key immediately to
the left of that group.
        `.trim();

    }


    /* =========================================
       BLACK KEYS
    ========================================= */

    if (
        q.includes("black keys")
    ) {

        return `
The black keys represent sharps or flats.

The five black-key notes are commonly named:

C#/Db
D#/Eb
F#/Gb
G#/Ab
A#/Bb

Notice that there is no black key between E-F
and B-C because those pairs are already separated
by a semitone.
        `.trim();

    }


    /* =========================================
       NOTE NAMES
    ========================================= */

    if (
        q.includes("piano notes") ||
        q.includes("notes on piano") ||
        q.includes("name the notes")
    ) {

        return `
The natural piano notes are:

C D E F G A B

Then the pattern repeats.

The chromatic notes include:

C, C#/Db, D, D#/Eb, E, F,
F#/Gb, G, G#/Ab, A, A#/Bb, B.

There are 12 pitch classes in the chromatic system.
        `.trim();

    }


    /* =========================================
       MIDDLE C
    ========================================= */

    if (
        q.includes("middle c") ||
        q.includes("where is c4")
    ) {

        return `
Middle C is C4.

On a standard piano, Middle C is located near the
center of the keyboard.

Find a group of two black keys. The white key
immediately to their left is C.

Middle C is especially important when learning
music notation and beginner piano.
        `.trim();

    }


    /* =========================================
       OCTAVES
    ========================================= */

    if (
        q.includes("what is an octave") ||
        q.includes("octave")
    ) {

        return `
An octave is the distance between one note and
another note with the same letter name that is
12 semitones higher or lower.

For example:

C → C

The second C is one octave higher.
        `.trim();

    }


    /* =========================================
       SEMITONE
    ========================================= */

    if (
        q.includes("semitone") ||
        q.includes("half step")
    ) {

        return `
A semitone, also called a half step, is the smallest
standard interval in Western chromatic music.

On a piano, it means moving to the immediately
adjacent key.

Examples:

C → C#
E → F
B → C

E-F and B-C are semitones even though there is
no black key between them.
        `.trim();

    }


    /* =========================================
       WHOLE STEP
    ========================================= */

    if (
        q.includes("whole step") ||
        q.includes("whole tone")
    ) {

        return `
A whole step is two semitones.

Examples:

C → D
D → E
F → G

On the piano, count two adjacent key movements.
        `.trim();

    }


    /* =========================================
       C MAJOR SCALE
    ========================================= */

    if (
        q.includes("c major scale") ||
        q.includes("scale of c major")
    ) {

        return `
The C major scale is:

C - D - E - F - G - A - B - C

It uses only white keys.

Its interval pattern is:

Whole - Whole - Half -
Whole - Whole - Whole - Half.

Try playing it slowly with your right hand:
1 2 3 1 2 3 4 5
        `.trim();

    }


    /* =========================================
       MAJOR SCALES
    ========================================= */

    if (
        q.includes("major scale") ||
        q.includes("major scales")
    ) {

        return `
A major scale follows this interval pattern:

Whole
Whole
Half
Whole
Whole
Whole
Half

For example, C major is:

C D E F G A B C

Learning this pattern lets you build major scales
starting from other notes.
        `.trim();

    }


    /* =========================================
       MINOR SCALES
    ========================================= */

    if (
        q.includes("minor scale") ||
        q.includes("minor scales")
    ) {

        return `
There are several important forms of minor scales.

Natural A minor:

A B C D E F G A

A natural minor uses the same notes as C major
but starts on A.

The natural minor interval pattern is:

Whole - Half - Whole - Whole -
Half - Whole - Whole.
        `.trim();

    }


    /* =========================================
       CHORDS
    ========================================= */

    if (
        q.includes("what is a chord") ||
        q.includes("chord")
    ) {

        return `
A chord is a group of notes played together.

A basic three-note chord is called a triad.

For example, C major contains:

C - E - G

The three notes are the root, third, and fifth.

Chords are the foundation of harmony and
accompaniment.
        `.trim();

    }


    /* =========================================
       C MAJOR CHORD
    ========================================= */

    if (
        q.includes("c major chord") ||
        q.includes("c major")
    ) {

        return `
The C major chord contains:

C - E - G

Play C with your thumb,
E with your middle finger,
and G with your little finger
when using a common right-hand beginner shape.

Play the notes together and listen for the bright,
stable major sound.
        `.trim();

    }


    /* =========================================
       A MINOR
    ========================================= */

    if (
        q.includes("a minor chord") ||
        q.includes("a minor")
    ) {

        return `
The A minor triad contains:

A - C - E

Its notes are the root, minor third,
and perfect fifth.

Try playing A-C-E together.
        `.trim();

    }


    /* =========================================
       D MINOR
    ========================================= */

    if (
        q.includes("d minor chord") ||
        q.includes("d minor")
    ) {

        return `
The D minor triad is:

D - F - A

It has a darker sound than a major triad.
        `.trim();

    }


    /* =========================================
       G MAJOR
    ========================================= */

    if (
        q.includes("g major chord") ||
        q.includes("g major")
    ) {

        return `
The G major triad is:

G - B - D

G major contains one sharp in its scale:

G - A - B - C - D - E - F# - G.
        `.trim();

    }


    /* =========================================
       TRIADS
    ========================================= */

    if (
        q.includes("triad")
    ) {

        return `
A triad is a three-note chord built from stacked
thirds.

The four basic triad qualities are:

Major
Minor
Diminished
Augmented

For example:

C major = C E G
C minor = C Eb G
C diminished = C Eb Gb
C augmented = C E G#
        `.trim();

    }


    /* =========================================
       MAJOR VS MINOR
    ========================================= */

    if (
        q.includes("major vs minor") ||
        q.includes("difference between major and minor") ||
        q.includes("major and minor")
    ) {

        return `
The main difference between major and minor
triads is the third.

C major:

C - E - G

C minor:

C - Eb - G

The lowered third gives the minor chord its
characteristic sound.
        `.trim();

    }


    /* =========================================
       CHORD PROGRESSIONS
    ========================================= */

    if (
        q.includes("chord progression") ||
        q.includes("chord progressions")
    ) {

        return `
A chord progression is a sequence of chords.

A very common progression is:

I - V - vi - IV

In C major, that becomes:

C - G - Am - F

This progression appears in many styles of
popular music.
        `.trim();

    }


    /* =========================================
       RHYTHM
    ========================================= */

    if (
        q.includes("rhythm") ||
        q.includes("beat")
    ) {

        return `
Rhythm is the organization of sounds and silences
through time.

A beat is a regular pulse.

Common time signatures include:

4/4
3/4
2/4
6/8

In 4/4, there are four quarter-note beats
per measure.
        `.trim();

    }


    /* =========================================
       TIME SIGNATURE
    ========================================= */

    if (
        q.includes("time signature")
    ) {

        return `
A time signature tells you how beats are organized
inside each measure.

For example, 4/4 means:

4 beats per measure
The quarter note receives one beat.

3/4 has three quarter-note beats per measure
and is commonly associated with waltz music.
        `.trim();

    }


    /* =========================================
       NOTE VALUES
    ========================================= */

    if (
        q.includes("note values") ||
        q.includes("quarter note") ||
        q.includes("half note") ||
        q.includes("whole note")
    ) {

        return `
Common note values in 4/4 include:

Whole note = 4 beats
Half note = 2 beats
Quarter note = 1 beat
Eighth note = 1/2 beat
Sixteenth note = 1/4 beat

Understanding note values is essential for reading
rhythm.
        `.trim();

    }


    /* =========================================
       CLEFS
    ========================================= */

    if (
        q.includes("treble clef") ||
        q.includes("bass clef") ||
        q.includes("clef")
    ) {

        return `
Piano music commonly uses two clefs.

Treble clef:
Used mainly for higher notes and usually played
by the right hand.

Bass clef:
Used mainly for lower notes and usually played
by the left hand.

Together they form the grand staff used in
piano notation.
        `.trim();

    }


    /* =========================================
       GRAND STAFF
    ========================================= */

    if (
        q.includes("grand staff")
    ) {

        return `
The piano grand staff combines:

🎼 Treble clef
🎼 Bass clef

The two staves are connected by a brace.

Middle C sits between the two staves and can be
written on a ledger line in either context.
        `.trim();

    }


    /* =========================================
       FINGERING
    ========================================= */

    if (
        q.includes("finger numbers") ||
        q.includes("piano fingering") ||
        q.includes("fingering")
    ) {

        return `
Piano finger numbers are:

Thumb = 1
Index = 2
Middle = 3
Ring = 4
Little finger = 5

The same numbering system is used for both hands.
        `.trim();

    }


    /* =========================================
       BEGINNER PRACTICE
    ========================================= */

    if (
        q.includes("beginner") ||
        q.includes("beginner exercise") ||
        q.includes("practice")
    ) {

        return `
Here is a simple beginner practice routine:

1. Warm up with five-finger patterns.
2. Play C major slowly.
3. Practice C, F, and G major chords.
4. Use a slow metronome.
5. Practice hands separately.
6. Then combine the hands.
7. Finish by playing something you enjoy.

Try practicing for 15-30 minutes consistently
rather than playing for hours only occasionally.
        `.trim();

    }


    /* =========================================
       METRONOME
    ========================================= */

    if (
        q.includes("metronome")
    ) {

        return `
A metronome produces a steady pulse that helps
you develop timing.

For beginners, start slowly.

Try:

60 BPM

Play one note per click.

Once you can play accurately, gradually increase
the tempo.
        `.trim();

    }


    /* =========================================
       SIGHT READING
    ========================================= */

    if (
        q.includes("sight reading") ||
        q.includes("sight-read")
    ) {

        return `
To improve sight reading:

• Learn note positions.
• Read rhythm separately.
• Practice very slowly.
• Look ahead instead of staring at one note.
• Keep a steady pulse.
• Avoid stopping after mistakes.
• Practice a little every day.

Accuracy and consistency are more important than speed.
        `.trim();

    }


    /* =========================================
       EAR TRAINING
    ========================================= */

    if (
        q.includes("ear training") ||
        q.includes("train my ear")
    ) {

        return `
Start ear training by learning to recognize:

• High vs low sounds
• Melodic direction
• Major vs minor
• Intervals
• Chord qualities
• Rhythmic patterns

Play two notes and try to identify whether
the second note is higher or lower.
        `.trim();

    }


    /* =========================================
       INTERVALS
    ========================================= */

    if (
        q.includes("interval")
    ) {

        return `
An interval is the distance between two pitches.

Common intervals include:

Unison
Second
Third
Fourth
Fifth
Sixth
Seventh
Octave

For example, C to G is a perfect fifth.
        `.trim();

    }


    /* =========================================
       PEDALS
    ========================================= */

    if (
        q.includes("piano pedal") ||
        q.includes("piano pedals") ||
        q.includes("pedal")
    ) {

        return `
Most acoustic pianos have three pedals.

Right pedal:
Sustain/damper pedal.

Middle pedal:
Often a sostenuto pedal, although its function
can vary by piano.

Left pedal:
Soft pedal, traditionally called una corda.

Pedal functions can differ between acoustic
and digital instruments.
        `.trim();

    }


    /* =========================================
       SUSTAIN
    ========================================= */

    if (
        q.includes("sustain")
    ) {

        return `
The sustain pedal allows notes to continue ringing
after you release the keys.

Use it carefully.

A common beginner technique is to change the pedal
when the harmony changes rather than holding it
continuously.
        `.trim();

    }


    /* =========================================
       PIANO TECHNIQUE
    ========================================= */

    if (
        q.includes("technique") ||
        q.includes("proper technique")
    ) {

        return `
Good beginner technique includes:

• Relaxed shoulders
• Natural wrist position
• Curved fingers
• Controlled finger movement
• Minimal unnecessary tension
• Balanced posture
• Slow and accurate practice

If something causes pain, stop and reassess your
technique rather than forcing through it.
        `.trim();

    }


    /* =========================================
       POSTURE
    ========================================= */

    if (
        q.includes("posture") ||
        q.includes("sit at piano")
    ) {

        return `
When sitting at the piano:

• Sit comfortably at the correct height.
• Keep your back naturally upright.
• Relax your shoulders.
• Keep elbows reasonably free.
• Keep wrists flexible.
• Place your feet comfortably on the floor.

You should feel balanced rather than stiff.
        `.trim();

    }


    /* =========================================
       COMPOSITION
    ========================================= */

    if (
        q.includes("compose") ||
        q.includes("composition") ||
        q.includes("write a song")
    ) {

        return `
A simple way to start composing is:

1. Choose a key.
2. Choose a chord progression.
3. Create a short rhythm.
4. Write a melody using notes from the key.
5. Repeat and develop your idea.
6. Add variation.
7. Record yourself.

You do not need advanced theory to start composing.
        `.trim();

    }


    /* =========================================
       IMPROVISATION
    ========================================= */

    if (
        q.includes("improvise") ||
        q.includes("improvisation")
    ) {

        return `
For beginner improvisation, try using only the
white keys over a C major chord progression.

Start with just three notes:

C - E - G

Then add D, F, and A.

Experiment with rhythm before worrying about
playing lots of notes.
        `.trim();

    }


    /* =========================================
       MUSIC THEORY
    ========================================= */

    if (
        q.includes("music theory")
    ) {

        return `
Music theory is a system for understanding how
music works.

Important topics include:

• Notes
• Scales
• Keys
• Intervals
• Chords
• Harmony
• Melody
• Rhythm
• Form
• Modulation
• Voice leading

You don't need to learn everything at once.
        `.trim();

    }


    /* =========================================
       KEY SIGNATURE
    ========================================= */

    if (
        q.includes("key signature")
    ) {

        return `
A key signature tells you which notes are
consistently sharpened or flattened in a piece.

For example:

C major = no sharps or flats
G major = one sharp, F#
F major = one flat, Bb
D major = two sharps, F# and C#

Key signatures help you identify the tonal
environment of a piece.
        `.trim();

    }


    /* =========================================
       SHARP
    ========================================= */

    if (
        q.includes("what is a sharp") ||
        q.includes("sharp")
    ) {

        return `
A sharp raises a note by one semitone.

For example:

C → C#

F → F#

The sharp symbol is:

♯
        `.trim();

    }


    /* =========================================
       FLAT
    ========================================= */

    if (
        q.includes("what is a flat") ||
        q.includes("flat")
    ) {

        return `
A flat lowers a note by one semitone.

For example:

B → Bb

E → Eb

The flat symbol is:

♭
        `.trim();

    }


    /* =========================================
       NATURAL
    ========================================= */

    if (
        q.includes("natural sign")
    ) {

        return `
A natural sign cancels a previous sharp or flat
and returns the note to its natural pitch.

The natural symbol is:

♮
        `.trim();

    }


    /* =========================================
       CHROMATIC SCALE
    ========================================= */

    if (
        q.includes("chromatic scale")
    ) {

        return `
The chromatic scale contains all 12 pitch classes.

Starting on C:

C C# D D# E F F# G G# A A# B C

It moves entirely by semitones.
        `.trim();

    }


    /* =========================================
       FAMOUS PIANISTS
    ========================================= */

    if (
        q.includes("famous pianist") ||
        q.includes("best pianist")
    ) {

        return `
There have been many influential pianists.

Classical examples include:

• Franz Liszt
• Frédéric Chopin
• Wolfgang Amadeus Mozart
• Ludwig van Beethoven
• Sergei Rachmaninoff
• Clara Schumann
• Martha Argerich

In jazz and popular music there are many other
important pianists with very different styles.

There isn't one objectively "best" pianist.
        `.trim();

    }


    /* =========================================
       CHOPIN
    ========================================= */

    if (
        q.includes("chopin")
    ) {

        return `
Frédéric Chopin was a Polish-French Romantic
composer and pianist.

He is especially famous for piano music including:

• Nocturnes
• Études
• Preludes
• Mazurkas
• Polonaises
• Ballades

His music is an important part of advanced
piano repertoire.
        `.trim();

    }


    /* =========================================
       BEETHOVEN
    ========================================= */

    if (
        q.includes("beethoven")
    ) {

        return `
Ludwig van Beethoven was a German composer and
pianist whose music helped bridge the Classical
and Romantic eras.

His piano works include:

• Piano Sonatas
• Bagatelles
• Piano Concertos

He is one of the most influential composers
in Western classical music.
        `.trim();

    }


    /* =========================================
       MOZART
    ========================================= */

    if (
        q.includes("mozart")
    ) {

        return `
Wolfgang Amadeus Mozart was an Austrian composer
and pianist of the Classical period.

He wrote extensively for piano, including
sonatas, concertos and other keyboard works.

His music is known for clarity, balance,
melody and sophisticated structure.
        `.trim();

    }


    /* =========================================
       JAZZ
    ========================================= */

    if (
        q.includes("jazz piano") ||
        q.includes("jazz")
    ) {

        return `
Jazz piano often involves:

• Seventh chords
• Extended chords
• Swing rhythm
• Improvisation
• Walking bass
• Syncopation
• ii-V-I progressions

A great starting progression is:

Dm7 → G7 → Cmaj7

This is a ii-V-I progression in C major.
        `.trim();

    }


    /* =========================================
       POP MUSIC
    ========================================= */

    if (
        q.includes("pop piano") ||
        q.includes("play pop")
    ) {

        return `
Pop piano often focuses on:

• Chord progressions
• Repeated patterns
• Simple melodies
• Rhythmic accompaniment
• Inversions

A useful progression to practice is:

C → G → Am → F

Try different rhythms while keeping the chords
steady.
        `.trim();

    }


    /* =========================================
       BLUES
    ========================================= */

    if (
        q.includes("blues")
    ) {

        return `
A common blues structure is the 12-bar blues.

In C, a basic version uses:

C7
F7
G7

A typical structure is:

C7 | C7 | C7 | C7
F7 | F7 | C7 | C7
G7 | F7 | C7 | G7

Blues piano often uses rhythmic patterns,
seventh chords and improvisation.
        `.trim();

    }


    /* =========================================
       SCALE PRACTICE
    ========================================= */

    if (
        q.includes("scale practice") ||
        q.includes("practice scales")
    ) {

        return `
Try this scale routine:

1. C major
2. G major
3. F major
4. D major
5. A minor

Start slowly.

Play each scale evenly and use a metronome.
Increase the tempo only when your playing
remains accurate and relaxed.
        `.trim();

    }


    /* =========================================
       MOTIVATION
    ========================================= */

    if (
        q.includes("motivate me") ||
        q.includes("motivation") ||
        q.includes("i want to quit")
    ) {

        return `
Remember: you don't have to become amazing
in one day. 🎹

Try practicing just one small thing today.

One scale.
One chord.
One melody.
One exercise.

Small improvements repeated over time become
real progress.

Keep playing. ❤️
        `.trim();

    }


    /* =========================================
       THANK YOU
    ========================================= */

    if (
        q.includes("thank you") ||
        q.includes("thanks")
    ) {

        return `
You're very welcome! 🎹

Keep practicing and don't be afraid to ask me
anything about piano or music.
        `.trim();

    }


    /* =========================================
       GOODBYE
    ========================================= */

    if (
        q === "bye" ||
        q.includes("goodbye")
    ) {

        return `
See you next time! 🎹

Keep practicing, keep learning, and most
importantly, keep enjoying music.
        `.trim();

    }


    /* =========================================
       CALCULATED MUSIC QUESTIONS
    ========================================= */

    if (
        q.includes("how many semitones") &&
        q.includes("octave")
    ) {

        return `
An octave contains 12 semitones.

For example:

C → C

is 12 semitones.
        `.trim();

    }


    /* =========================================
       FALLBACK
    ========================================= */

    return `
That's a good question! 🎹

I don't have a specific built-in lesson for that
question yet.

Try asking me about:

• Piano notes
• Chords
• Scales
• Music theory
• Piano technique
• Practice
• Rhythm
• Intervals
• Ear training
• Sight reading
• Famous pianists
• Composition
• Improvisation
• Jazz
• Pop
• Blues

For completely general questions outside my
built-in knowledge, connect this JavaScript to
an AI API. That will give Piano Masters AI
much broader knowledge.
    `.trim();

}


/* =========================================================
   VOICE ON / OFF
========================================================= */

function toggleVoice() {

    if (!requireSignup()) {
        return;
    }

    voiceEnabled =
        !voiceEnabled;

    updateVoiceButton();

    if (!voiceEnabled) {

        window.speechSynthesis.cancel();

    }

}


/* =========================================================
   UPDATE VOICE BUTTON
========================================================= */

function updateVoiceButton() {

    const button =
        document.getElementById("voiceButton");

    if (!button) return;

    const icon =
        button.querySelector("i");

    const text =
        button.querySelector("span");

    if (voiceEnabled) {

        button.classList.remove("voice-off");

        if (icon) {
            icon.className =
                "fa-solid fa-volume-high";
        }

        if (text) {
            text.textContent =
                "Voice On";
        }

    } else {

        button.classList.add("voice-off");

        if (icon) {
            icon.className =
                "fa-solid fa-volume-xmark";
        }

        if (text) {
            text.textContent =
                "Voice Off";
        }

    }

}


/* =========================================================
   AI SPEECH
========================================================= */

function speak(text) {

    if (!voiceEnabled) {
        return;
    }

    if (!("speechSynthesis" in window)) {

        alert(
            "Your browser does not support AI voice."
        );

        return;
    }

    window.speechSynthesis.cancel();

    /*
       Remove some symbols that don't sound natural
       when spoken aloud.
    */

    const cleanText =
        text
            .replace(/[🎹🎼🎵❤️•]/g, "")
            .replace(/\n+/g, ". ");

    const speech =
        new SpeechSynthesisUtterance(cleanText);

    speech.lang = "en-US";

    speech.rate = 0.95;

    speech.pitch = 1.0;

    speech.volume = 1;

    /*
       Try to find a natural English voice.
    */

    const voices =
        window.speechSynthesis.getVoices();

    const preferredVoice =
        voices.find(voice =>
            voice.lang.startsWith("en") &&
            (
                voice.name.toLowerCase().includes("google") ||
                voice.name.toLowerCase().includes("microsoft") ||
                voice.name.toLowerCase().includes("natural")
            )
        );

    if (preferredVoice) {
        speech.voice =
            preferredVoice;
    }

    window.speechSynthesis.speak(speech);

}


/* =========================================================
   MICROPHONE / SPEECH RECOGNITION
========================================================= */

function setupSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        console.warn(
            "Speech recognition is not supported by this browser."
        );

        return;
    }

    recognition =
        new SpeechRecognition();

    recognition.lang =
        "en-US";

    recognition.continuous =
        false;

    recognition.interimResults =
        true;

    recognition.maxAlternatives =
        1;


    /* =========================================
       SPEECH RESULT
    ========================================= */

    recognition.onresult =
        function(event) {

            const input =
                document.getElementById(
                    "messageInput"
                );

            if (!input) return;

            let transcript = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0].transcript;

            }

            input.value =
                transcript;

        };


    /* =========================================
       SPEECH END
    ========================================= */

    recognition.onend =
        function() {

            isListening =
                false;

            updateMicButton();

            const input =
                document.getElementById(
                    "messageInput"
                );

            if (
                input &&
                input.value.trim()
            ) {

                sendMessage();

            }

        };


    /* =========================================
       SPEECH ERROR
    ========================================= */

    recognition.onerror =
        function(event) {

            console.error(
                "Microphone error:",
                event.error
            );

            isListening =
                false;

            updateMicButton();

            if (event.error === "not-allowed") {

                alert(
                    "Microphone permission was denied. Please allow microphone access in your browser."
                );

            }

        };

}


/* =========================================================
   MICROPHONE TOGGLE
========================================================= */

function toggleMicrophone() {

    if (!requireSignup()) {
        return;
    }

    if (!recognition) {

        alert(
            "Speech recognition is not supported in this browser. Try Google Chrome or Microsoft Edge."
        );

        return;
    }


    if (isListening) {

        recognition.stop();

        isListening =
            false;

        updateMicButton();

        return;

    }


    const input =
        document.getElementById(
            "messageInput"
        );

    if (input) {
        input.value = "";
    }


    try {

        recognition.start();

        isListening =
            true;

        updateMicButton();

    } catch (error) {

        console.log(error);

    }

}


/* =========================================================
   UPDATE MICROPHONE BUTTON
========================================================= */

function updateMicButton() {

    const button =
        document.getElementById(
            "micButton"
        );

    if (!button) return;

    const icon =
        button.querySelector("i");

    if (isListening) {

        button.classList.add(
            "listening"
        );

        if (icon) {
            icon.className =
                "fa-solid fa-microphone-lines";
        }

        button.title =
            "Stop listening";

    } else {

        button.classList.remove(
            "listening"
        );

        if (icon) {
            icon.className =
                "fa-solid fa-microphone";
        }

        button.title =
            "Talk to Piano Masters AI";

    }

}


/* =========================================================
   NEW CHAT
========================================================= */

function newChat() {

    if (!requireSignup()) {
        return;
    }

    const chat =
        document.getElementById(
            "chatArea"
        );

    if (!chat) return;

    window.speechSynthesis.cancel();

    if (recognition && isListening) {

        recognition.stop();

        isListening =
            false;

        updateMicButton();

    }

    conversation = [];

    chat.innerHTML = `

        <div class="message ai-message">

            <div class="message-icon">

                <i class="fa-solid fa-robot"></i>

            </div>

            <div class="message-content">

                <div class="message-name">
                    Piano Masters AI
                </div>

                <p>
                    New chat started! 🎹
                </p>

                <p>
                    What would you like to learn today?
                </p>

            </div>

        </div>


        <div class="suggestions">

            <button
                type="button"
                onclick="askQuestion('Teach me the piano notes')"
            >

                <i class="fa-solid fa-music"></i>

                Learn piano notes

            </button>


            <button
                type="button"
                onclick="askQuestion('How do I play a C major chord?')"
            >

                <i class="fa-solid fa-piano-keyboard"></i>

                C major chord

            </button>


            <button
                type="button"
                onclick="askQuestion('Teach me the C major scale')"
            >

                <i class="fa-solid fa-list"></i>

                C major scale

            </button>


            <button
                type="button"
                onclick="askQuestion('Give me a piano exercise for beginners')"
            >

                <i class="fa-solid fa-dumbbell"></i>

                Practice exercise

            </button>

        </div>

    `;

    scrollChat();

}


/* =========================================================
   SIGN OUT
========================================================= */

function signOut() {

    /*
       Stop AI voice.
    */

    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

    }


    /*
       Stop microphone.
    */

    if (
        recognition &&
        isListening
    ) {

        recognition.stop();

        isListening =
            false;

    }


    /*
       Remove signup/session information.

       IMPORTANT:
       These keys match the possible signup keys
       checked above.
    */

    const keys = [
        "pianoMastersUser",
        "pianoMastersSignedUp",
        "signedUp",
        "userSignedUp",
        "user",
        "username",
        "account"
    ];

    keys.forEach(key => {

        localStorage.removeItem(key);

    });


    /*
       Optional session storage cleanup.
    */

    sessionStorage.clear();


    alert(
        "You have been signed out."
    );


    window.location.href =
        "sign.html";

}


/* =========================================================
   PREVENT AI ACTIONS IF USER IS NOT SIGNED UP
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const target =
            event.target.closest(
                "#voiceButton, #micButton, .send-button, .new-chat-button, .clear-button"
            );

        if (!target) {
            return;
        }

        if (!isSignedUp()) {

            /*
               The actual functions also perform this
               check, so this is an additional safety layer.
            */

            event.preventDefault();

        }

    },
    true
);


/* =========================================================
   LOAD AVAILABLE VOICES
========================================================= */

if ("speechSynthesis" in window) {

    window.speechSynthesis.onvoiceschanged =
        function() {

            window.speechSynthesis.getVoices();

        };

}