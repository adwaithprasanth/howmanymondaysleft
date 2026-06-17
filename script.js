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
const lifeLine = document.getElementById("life-line-progress");
const labelDisplay = document.querySelector(".label");

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

// 2. Number Animation Function
function animateValue(obj, start, end, duration, mode = "normal") {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNum = Math.floor(easeOut * (end - start) + start);
        
        // Dynamically inject the + or - signs!
        if (mode === "bonus" && currentNum > 0) {
            obj.innerHTML = `+${currentNum.toLocaleString()}`;
        } else if (mode === "negative" && currentNum > 0) {
            obj.innerHTML = `-${currentNum.toLocaleString()}`;
        } else {
            obj.innerHTML = currentNum.toLocaleString();
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 3. Dynamic Theme Switcher (Includes Silver/White for Age 0)
const updateThemeForAge = (age) => {
    const root = document.documentElement;
    
    let colorHex = "#5E5CE6";
    let colorRgb = "94, 92, 230";
    let hoverHex = "#4b49c4";

    if (age < 0) {
        // Sci-Fi Teal for Time Travelers
        colorHex = "#00C7BE"; 
        colorRgb = "0, 199, 190";
        hoverHex = "#00a69e";
    } else if (age === 0) {
        // Pure Silver/White for Newborns
        colorHex = "#F5F5F7";
        colorRgb = "245, 245, 247";
        hoverHex = "#D1D1D6";
    } else if (age >= 25 && age < 50) {
        colorHex = "#32ADE6";
        colorRgb = "50, 173, 230";
        hoverHex = "#288ab8";
    } else if (age >= 50 && age < 80) {
        colorHex = "#FF9500";
        colorRgb = "255, 149, 0";
        hoverHex = "#cc7700";
    } else if (age >= 80) {
        colorHex = "#FFCC00";
        colorRgb = "255, 204, 0";
        hoverHex = "#cca300";
    }

    root.style.setProperty('--primary', colorHex);
    root.style.setProperty('--primary-rgb', colorRgb);
    root.style.setProperty('--primary-hover', hoverHex);
};

// 4. Quotes & Easter Eggs Logic
const getQuoteForAge = (age) => {
    if (age < 0) return "Time traveler detected. Generating Mondays from a past timeline... 🛸";
    if (age === 0) return "Day One. System initialized. The canvas is entirely blank—what will you create? ✨";
    
    if (age >= 80 && age < 100) return "You are officially in uncharted territory. Every single Monday from here on out is extra credit. Enjoy it!";
    if (age >= 100) return "You've collected a century of Mondays. You are playing on New Game Plus! 👑";
    
    if (age === 25) return "Your prefrontal cortex has officially finished developing. Your brain is fully upgraded! 🧠";
    if (age === 42) return "The answer to life, the universe, and everything. But you still have plenty of Mondays left to figure out the question. 🌌";

    if (age < 18) return "Your whole life is ahead of you. Start building the habits of the person you want to become.";
    if (age >= 18 && age < 30) return "The defining decade. Take risks, make mistakes, and figure out what truly matters to you.";
    if (age >= 30 && age < 50) return "You have the experience now. It's time to build, focus, and make these your most impactful years.";
    if (age >= 50 && age < 65) return "Your mastery era. Focus on legacy, teaching others, and prioritizing what brings you peace.";
    if (age >= 65 && age < 80) return "Time is your greatest asset. Spend it on experiences, loved ones, and the simple joys of life.";
};

// 5. Main Calculation Logic
button.addEventListener("click", () => {
    const ageValue = ageInput.value.trim();
    
    if (ageValue === "") {
        alert("Please enter an age.");
        return;
    }

    const age = parseInt(ageValue);

    button.disabled = true;
    button.innerHTML = `<span class="material-symbols-rounded spin">progress_activity</span> Revealing...`;

    setTimeout(() => {
        button.disabled = false;
        currentPhrase = getRandomPhrase();
        button.innerHTML = currentPhrase;

        const lifeExpectancy = 80;
        let finalNumber = 0;
        let displayMode = "normal"; 
        
        // The Math Logic
        if (age < 0) {
            displayMode = "negative";
            finalNumber = Math.floor(Math.abs(age) * 52.14); 
            labelDisplay.innerText = "Mondays Before Birth";
        } else if (age === 0) {
            finalNumber = Math.floor(lifeExpectancy * 52.14);
            labelDisplay.innerText = "Mondays Left";
        } else if (age < lifeExpectancy) {
            finalNumber = Math.floor((lifeExpectancy - age) * 52.14);
            labelDisplay.innerText = "Mondays Left"; 
        } else {
            displayMode = "bonus";
            finalNumber = Math.floor((age - lifeExpectancy) * 52.14); 
            labelDisplay.innerText = "Bonus Mondays Earned"; 
        }

        messageDisplay.innerText = getQuoteForAge(age);
        updateThemeForAge(age);
        
        // Reset Life Line width initially
        lifeLine.style.width = "0%";
        
        // SWAP VIEWS
        inputView.classList.add("hidden");
        resultView.classList.remove("hidden");

        // Start Number Animation
        countDisplay.innerHTML = "0"; 
        animateValue(countDisplay, 0, finalNumber, 1500, displayMode); 

        // Handle the Life Line and Age 0 Heartbeat Magic
        let percentLived = 0;
        if (age >= 0) {
            percentLived = (age / lifeExpectancy) * 100;
            if (percentLived > 100) percentLived = 100; 
        }
        
        if (age === 0) {
            // Trigger the infinite pulse for newborns
            countDisplay.classList.add("heartbeat");
            lifeLine.classList.add("loading-pulse");
            lifeLine.style.width = "100%"; 
        } else {
            // Standard fill for everyone else
            countDisplay.classList.remove("heartbeat");
            lifeLine.classList.remove("loading-pulse");
            setTimeout(() => {
                lifeLine.style.width = `${percentLived}%`;
            }, 50);
        }

    }, 800); 
});

// 6. Back Button Logic
backBtn.addEventListener("click", () => {
    ageInput.value = "";
    resultView.classList.add("hidden");
    inputView.classList.remove("hidden");
    
    // Reset to default purple and clear any animations
    updateThemeForAge(20); 
    lifeLine.style.width = "0%"; 
    countDisplay.classList.remove("heartbeat");
    lifeLine.classList.remove("loading-pulse");
});

// 7. Share Logic
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

// 8. Mouse Glow Logic
const card = document.querySelector('.card');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
});