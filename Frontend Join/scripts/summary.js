
/**
 * Initializes the summary page by displaying a greeting, setting up event listeners for summary cards, and retrieving statistics.
 */
function initSummary() {
    greeting();
    document.querySelectorAll('.summaryCard').forEach( sc => sc.addEventListener('click', () => location.href = './board.html'));
    renderStats();
}

/**
 * Displays a greeting to the user, taking into account the time of day and the user's status.
 * The greeting is displayed in the #greetingContainer element and is animated before being hidden.
 */
function greeting() {
    const greetingContainer = document.getElementById('greetingContainer');
    daytimeGreeting();
    joinStorage.iconInitials == 'G' ? greetGuest() : greetUser();
    greetingContainer.classList.add('greetingAnimation');
    setTimeout(()=>{greetingContainer.style.display = 'none'}, 1600);
}

/**
 * Displays a greeting to the user based on the current time of day.
 * The greeting is displayed in the #greetingText element.
 */
function daytimeGreeting() {
    let timeOfDay = new Date();
    timeOfDay = timeOfDay.getHours();
    const greetingTextRef = document.getElementById('greetingText');
    let greeting;
    if (timeOfDay < 4) {
        greeting = "Good evening";
    } else if (timeOfDay < 12) {
        greeting = "Good morning";
    } else if (timeOfDay < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    greetingTextRef.innerText = greeting;
}

/**
 * Appends an exclamation mark to the greeting text, indicating a guest user.
 */
function greetGuest() {
    const greetingTextRef = document.getElementById('greetingText');
    greetingTextRef.innerText += '!';
}

/**
 * Displays a personalized greeting to the user, appending a comma to the daytime greeting and displaying the user's name.
 */
function greetUser() {
    const greetingTextRef = document.getElementById('greetingText');
    greetingTextRef.innerText += ',';
    document.getElementById('userName').innerText = joinStorage.userName;
}

/**
 * Get's the summary stats from backend and renders each of them.
 */
async function renderStats() {
    summaryStats = await getFromDB('summary/')
    Object.entries(summaryStats).forEach(stat => document.getElementById(stat[0]).innerText = stat[1])
}