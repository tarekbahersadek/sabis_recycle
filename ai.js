// ================================
// SABIS RECYCLE AI
// ================================


// ================================
// CHECK ACCESS
// ================================

function checkAccess() {

    // Get the values from the input boxes
    const nameInput = document.getElementById("studentName");
    const sloInput = document.getElementById("studentSlo");

    const name = nameInput.value.trim().toLowerCase();
    const slo = sloInput.value.trim().toLowerCase();

    const message = document.getElementById("loginMessage");


    // Check if the name is Tarek or Manwel
    const correctName =
        name === "tarek" ||
        name === "manwel";


    // Check if SLO is Management
    const correctSlo =
        slo === "management";


    // If both are correct
    if (correctName && correctSlo) {

        // Hide login
        document.getElementById("ai-login").style.display = "none";

        // Show AI
        document.getElementById("ai-chat").style.display = "block";

        // Clear error message
        message.innerText = "";

    }

    // If the information is wrong
    else {

        message.innerText =
            "❌ Access denied. Your name or SLO is incorrect.";

        message.style.color = "red";

    }
}


// ================================
// ASK AI
// ================================

function askAI() {

    const input =
        document.getElementById("userQuestion");

    const question =
        input.value.trim();


    // Don't send an empty question
    if (question === "") {
        return;
    }


    const chat =
        document.getElementById("chatMessages");


    // ================================
    // USER MESSAGE
    // ================================

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "user-message";

    userMessage.innerText =
        "You: " + question;

    chat.appendChild(userMessage);


    // ================================
    // AI ANSWER
    // ================================

    const answer =
        getRecycleAnswer(question);


    const aiMessage =
        document.createElement("div");

    aiMessage.className =
        "ai-message";

    aiMessage.innerText =
        "🤖 AI: " + answer;

    chat.appendChild(aiMessage);


    // Clear input
    input.value = "";


    // Scroll to newest message
    chat.scrollTop =
        chat.scrollHeight;
}


// ================================
// QUICK QUESTIONS
// ================================

function quickQuestion(question) {

    document.getElementById("userQuestion").value =
        question;

    askAI();
}


// ================================
// RECYCLING ANSWERS
// ================================

function getRecycleAnswer(question) {

    const q =
        question.toLowerCase();


    // -------------------------------
    // GREETING
    // -------------------------------

    if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("hey")
    ) {

        return "Hello! ♻️ I'm the Sabis Recycle AI. Ask me anything about recycling!";
    }


    // -------------------------------
    // WHAT IS RECYCLING
    // -------------------------------

    if (
        q.includes("what is recycling") ||
        q.includes("define recycling") ||
        q.includes("meaning of recycling")
    ) {

        return "Recycling is the process of collecting and processing used materials so they can be turned into new products instead of becoming waste.";
    }


    // -------------------------------
    // 3 R's
    // -------------------------------

    if (
        q.includes("3 r") ||
        q.includes("three r") ||
        q.includes("reduce reuse recycle") ||
        q.includes("three rs")
    ) {

        return "The 3 Rs are Reduce, Reuse, and Recycle. Reduce means using less, Reuse means using something again, and Recycle means processing materials into new products.";
    }


    // -------------------------------
    // REDUCE
    // -------------------------------

    if (q.includes("reduce")) {

        return "Reduce means using fewer resources and creating less waste. For example, avoid buying things you don't need and use less plastic.";
    }


    // -------------------------------
    // REUSE
    // -------------------------------

    if (q.includes("reuse")) {

        return "Reuse means using an item again instead of throwing it away. For example, you can reuse a water bottle or a shopping bag.";
    }


    // -------------------------------
    // PLASTIC
    // -------------------------------

    if (q.includes("plastic")) {

        return "Some plastics can be recycled, but not every type is accepted everywhere. Check the recycling symbol and your local recycling rules.";
    }


    // -------------------------------
    // PAPER
    // -------------------------------

    if (
        q.includes("paper") ||
        q.includes("cardboard")
    ) {

        return "Clean and dry paper and cardboard are commonly recyclable. Keep them away from food, liquids, and other contamination.";
    }


    // -------------------------------
    // GLASS
    // -------------------------------

    if (q.includes("glass")) {

        return "Glass bottles and jars are commonly recyclable. They should usually be empty and rinsed before recycling.";
    }


    // -------------------------------
    // METAL
    // -------------------------------

    if (
        q.includes("metal") ||
        q.includes("aluminum") ||
        q.includes("aluminium") ||
        q.includes("can")
    ) {

        return "Many metal cans, including aluminum and steel cans, can be recycled. Empty and rinse them before placing them in the appropriate recycling bin.";
    }


    // -------------------------------
    // FOOD WASTE
    // -------------------------------

    if (
        q.includes("food waste") ||
        q.includes("food")
    ) {

        return "Food waste usually should not go into a regular recycling bin. Where available, food scraps can be composted or placed in a food-waste collection system.";
    }


    // -------------------------------
    // RECYCLING BIN
    // -------------------------------

    if (
        q.includes("recycling bin") ||
        q.includes("recycle bin")
    ) {

        return "A recycling bin is used to collect materials that can be processed into new products. Common examples include certain paper, cardboard, metal cans, glass, and plastics.";
    }


    // -------------------------------
    // ENVIRONMENT
    // -------------------------------

    if (
        q.includes("environment") ||
        q.includes("earth")
    ) {

        return "Recycling can help conserve resources and reduce the amount of waste sent to disposal facilities. Reducing and reusing are also important parts of protecting the environment.";
    }


    // -------------------------------
    // WHY RECYCLE
    // -------------------------------

    if (
        q.includes("why recycle") ||
        q.includes("why should we recycle") ||
        q.includes("benefit")
    ) {

        return "Recycling can conserve materials, reduce waste, and help lower the need for new raw materials. Remember: reducing and reusing are important too.";
    }


    // -------------------------------
    // QUIZ HELP
    // -------------------------------

    if (
        q.includes("quiz") ||
        q.includes("question") ||
        q.includes("help me")
    ) {

        return "Sure! ♻️ Try asking me a specific recycling question, or ask me to give you a practice recycling question.";
    }


    // -------------------------------
    // PRACTICE QUESTION
    // -------------------------------

    if (
        q.includes("practice question") ||
        q.includes("give me a question") ||
        q.includes("quiz question")
    ) {

        return "Here's a practice question: Which of these is one of the 3 Rs? A) Reduce  B) Replace  C) Remove. The answer is A) Reduce.";
    }


    // -------------------------------
    // THANK YOU
    // -------------------------------

    if (
        q.includes("thank") ||
        q.includes("thanks")
    ) {

        return "You're welcome! ♻️ Keep reducing, reusing, and recycling!";
    }


    // -------------------------------
    // DEFAULT ANSWER
    // -------------------------------

    return "I'm focused on recycling topics. Try asking me about the 3 Rs, plastic, paper, glass, metal, food waste, recycling bins, or why recycling is important.";
}


// ================================
// ENTER KEY
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const input =
        document.getElementById("userQuestion");


    if (input) {

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                askAI();

            }

        });

    }

});
