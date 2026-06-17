const button = document.getElementById("calculate");
const ageInput = document.getElementById("age");
const resultSection = document.querySelector(".result");
const countDisplay = document.getElementById("count");
const messageDisplay = document.getElementById("message");

// 1. Array of thematic button phrases
const buttonPhrases = [
    "Reveal My Mondays",
    "Count My Mondays",
    "See What's Left",
    "Show My Timeline",
    "Uncover My Time"
];

// 2. Function to pick a random phrase
const getRandomPhrase = () => {
    return buttonPhrases[Math.floor(Math.random() * buttonPhrases.length)];
};

// 3. Set the initial button text on load
let currentPhrase = getRandomPhrase();
button.innerHTML = currentPhrase;

button.addEventListener("click", () => {
    const age = parseInt(ageInput.value);
    
    if (!age || age < 1 || age > 120) {
        alert("Please enter a valid age.");
        return;
    }

    button.disabled = true;
    button.innerHTML = `<span class="material-symbols-rounded spin">progress_activity</span> Revealing...`;
    
    resultSection.classList.add("hidden"); 

    setTimeout(() => {
        // Restore the button with a NEW random phrase
        button.disabled = false;
        currentPhrase = getRandomPhrase();
        button.innerHTML = currentPhrase;

        const lifeExpectancy = 80;
        let mondaysLeft = 0;
        
        if (age >= lifeExpectancy) {
            mondaysLeft = 0;
            messageDisplay.innerText = "You've outlived the average! Every new Monday is a bonus. Enjoy it.";
        } else {
            mondaysLeft = Math.floor((lifeExpectancy - age) * 52.14);
            messageDisplay.innerText = "Make sure to make the most out of every single one of them.";
        }

        countDisplay.innerText = mondaysLeft.toLocaleString();
        resultSection.classList.remove("hidden"); 

    }, 1200); 
});

// Mouse Glow Logic
const card = document.querySelector('.card');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
});