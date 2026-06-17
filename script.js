const button = document.getElementById("calculate");
const ageInput = document.getElementById("age");

// Views
const inputView = document.getElementById("input-view");
const resultView = document.getElementById("result-view");

// Result Elements
const countDisplay = document.getElementById("count");
const messageDisplay = document.getElementById("message");
const shareBtn = document.getElementById("share-btn");
const backBtn = document.getElementById("back-btn");

// 1. Array of thematic button phrases
const buttonPhrases = [
    "Reveal My Mondays",
    "Count My Mondays",
    "See What's Left",
    "Show My Timeline",
    "Uncover My Time"
];

const getRandomPhrase = () => buttonPhrases[Math.floor(Math.random() * buttonPhrases.length)];

let currentPhrase = getRandomPhrase();
button.innerHTML = currentPhrase;

// 2. Age-Based Quotes Logic
const getQuoteForAge = (age) => {
    if (age < 18) return "Your whole life is ahead of you. Start building the habits of the person you want to become.";
    if (age >= 18 && age < 30) return "The defining decade. Take risks, make mistakes, and figure out what truly matters to you.";
    if (age >= 30 && age < 50) return "You have the experience now. It's time to build, focus, and make these your most impactful years.";
    if (age >= 50 && age < 65) return "Your mastery era. Focus on legacy, teaching others, and prioritizing what brings you peace.";
    if (age >= 65 && age < 80) return "Time is your greatest asset. Spend it on experiences, loved ones, and the simple joys of life.";
    return "You've outlived the average! Every new Monday is a beautiful bonus. Enjoy it to the fullest.";
};

// 3. Main Calculation & View Swap Logic
button.addEventListener("click", () => {
    const age = parseInt(ageInput.value);
    
    if (!age || age < 1 || age > 120) {
        alert("Please enter a valid age.");
        return;
    }

    // Trigger loading state
    button.disabled = true;
    button.innerHTML = `<span class="material-symbols-rounded spin">progress_activity</span> Revealing...`;

    setTimeout(() => {
        // Restore main button state in the background
        button.disabled = false;
        currentPhrase = getRandomPhrase();
        button.innerHTML = currentPhrase;

        // Calculate Mondays
        const lifeExpectancy = 80;
        let mondaysLeft = 0;
        
        if (age < lifeExpectancy) {
            mondaysLeft = Math.floor((lifeExpectancy - age) * 52.14);
        }

        // Update the text values
        countDisplay.innerText = mondaysLeft.toLocaleString();
        messageDisplay.innerText = getQuoteForAge(age);
        
        // SWAP VIEWS
        inputView.classList.add("hidden");
        resultView.classList.remove("hidden");

    }, 1200); 
});

// 4. Back Button Logic
backBtn.addEventListener("click", () => {
    // Clear input so it's fresh
    ageInput.value = "";
    
    // Swap back to the input view
    resultView.classList.add("hidden");
    inputView.classList.remove("hidden");
});

// 5. Share Logic (Native Web Share API)
shareBtn.addEventListener("click", async () => {
    const mondays = countDisplay.innerText;
    const shareText = `I have exactly ${mondays} Mondays left to make an impact. How many do you have? ⏳`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'My Mondays Left',
                text: shareText,
            });
        } catch (err) {
            console.log("Share canceled or failed", err);
        }
    } else {
        navigator.clipboard.writeText(shareText);
        
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = `<span class="material-symbols-rounded">check</span> Copied to Clipboard!`;
        setTimeout(() => {
            shareBtn.innerHTML = originalText;
        }, 2000);
    }
});

// 6. Mouse Glow Logic
const card = document.querySelector('.card');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
});