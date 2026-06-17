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

// 1. Thematic Button Randomizer
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

// 2. Number Animation Function (Apple style smooth easing)
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutCubic logic for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNum = Math.floor(easeOut * (end - start) + start);
        
        obj.innerHTML = currentNum.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 3. Age-Based Quotes & Easter Eggs Logic
const getQuoteForAge = (age) => {
    // EASTER EGGS
    if (age < 0) return "Time traveler detected. 🛸";
    if (age === 0) return "You haven't had your first Monday yet. 👶";
    if (age >= 100) return "You've collected quite a few Mondays. 👑";
    
    // STANDARD QUOTES
    if (age < 18) return "Your whole life is ahead of you. Start building the habits of the person you want to become.";
    if (age >= 18 && age < 30) return "The defining decade. Take risks, make mistakes, and figure out what truly matters to you.";
    if (age >= 30 && age < 50) return "You have the experience now. It's time to build, focus, and make these your most impactful years.";
    if (age >= 50 && age < 65) return "Your mastery era. Focus on legacy, teaching others, and prioritizing what brings you peace.";
    if (age >= 65 && age < 100) return "Time is your greatest asset. Spend it on experiences, loved ones, and the simple joys of life.";
};

// 4. Main Calculation Logic
button.addEventListener("click", () => {
    const ageValue = ageInput.value.trim();
    
    if (ageValue === "") {
        alert("Please enter an age.");
        return;
    }

    const age = parseInt(ageValue);

    // Trigger loading state
    button.disabled = true;
    button.innerHTML = `<span class="material-symbols-rounded spin">progress_activity</span> Revealing...`;

    setTimeout(() => {
        // Restore button state and get a NEW random phrase
        button.disabled = false;
        currentPhrase = getRandomPhrase();
        button.innerHTML = currentPhrase;

        const lifeExpectancy = 80;
        let mondaysLeft = 0;
        
        // Calculate logic (handling easter egg math)
        if (age < 0) {
            mondaysLeft = 0; 
        } else if (age === 0) {
            mondaysLeft = Math.floor(lifeExpectancy * 52.14);
        } else if (age < lifeExpectancy) {
            mondaysLeft = Math.floor((lifeExpectancy - age) * 52.14);
        } else {
            mondaysLeft = 0; 
        }

        messageDisplay.innerText = getQuoteForAge(age);
        
        // SWAP VIEWS
        inputView.classList.add("hidden");
        resultView.classList.remove("hidden");

        // Start the number animation
        countDisplay.innerHTML = "0"; 
        animateValue(countDisplay, 0, mondaysLeft, 1500); 

    }, 800); 
});

// 5. Back Button Logic
backBtn.addEventListener("click", () => {
    ageInput.value = "";
    resultView.classList.add("hidden");
    inputView.classList.remove("hidden");
});

// 6. Share Logic
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

// 7. Mouse Glow Logic
const card = document.querySelector('.card');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
});