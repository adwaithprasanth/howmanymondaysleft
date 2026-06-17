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

// Number Animation Function (Apple style smooth easing)
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

// Age-Based Quotes & Easter Eggs Logic
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

button.addEventListener("click", () => {
    // Note: Removed validation blocking < 1 to allow easter eggs
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
        button.disabled = false;
        button.innerHTML = "Reveal My Mondays";

        const lifeExpectancy = 80;
        let mondaysLeft = 0;
        
        // Calculate logic (handling easter egg math)
        if (age < 0) {
            mondaysLeft = 0; // Don't calculate for time travelers
        } else if (age === 0) {
            mondaysLeft = Math.floor(lifeExpectancy * 52.14);
        } else if (age < lifeExpectancy) {
            mondaysLeft = Math.floor((lifeExpectancy - age) * 52.14);
        } else {
            mondaysLeft = 0; // 80+ shouldn't have negative mondays
        }

        messageDisplay.innerText = getQuoteForAge(age);
        
        // SWAP VIEWS
        inputView.classList.add("hidden");
        resultView.classList.remove("hidden");

        // Start the number animation
        countDisplay.innerHTML = "0"; // reset visually first
        animateValue(countDisplay, 0, mondaysLeft, 1500); // 1.5 second animation

    }, 800); // Slightly faster load time for a snappier app feel
});

// Back Button Logic
backBtn.addEventListener("click", () => {
    ageInput.value = "";
    resultView.classList.add("hidden");
    inputView.classList.remove("hidden");
});

// Share Logic
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