
/**
 * Initializes the summary page by displaying a greeting, setting up event listeners for summary cards, and retrieving statistics.
 */
function initSummary() {
    greeting();
    document.querySelectorAll('.summaryCard').forEach( sc => sc.addEventListener('click', () => location.href = './board.html'));
    getStats();
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
 * 
 * @returns {void}
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
 * 
 * @returns {void}
 */
function greetGuest() {
    const greetingTextRef = document.getElementById('greetingText');
    greetingTextRef.innerText += '!';
}

/**
 * Displays a personalized greeting to the user, appending a comma to the daytime greeting and displaying the user's name.
 * 
 * @returns {void}
 */
function greetUser() {
    const greetingTextRef = document.getElementById('greetingText');
    greetingTextRef.innerText += ',';
    document.getElementById('userName').innerText = joinStorage.userName;
}

/**
 * Retrieves and displays task statistics, including the number of tasks in each status category and the number of urgent tasks.
 * The statistics are displayed in the corresponding summary elements on the page.
 * 
 * @async
 * @returns {void}
 */
async function getStats() {
    await getTasksFromDB();
    const category = ['toDo', 'done', 'inProgress', 'awaitFeedback']
    category.forEach( cat => renderStatusStat(cat));
    renderUrgentStat();
    if(tasks[0]) {
        document.getElementById('totalTasksSummary').innerText = tasks.length;
    } else {
        document.getElementById('totalTasksSummary').innerText = '0'
    }
}

/**
 * Renders the status statistic for a given task status category.
 * 
 * @param {string} stat - The task status category (e.g., 'toDo', 'done', 'inProgress', 'awaitFeedback').
 * @returns {void}
 */
function renderStatusStat(stat='') {
    const statCount = tasks.filter( task => task.status == stat).length;
    document.getElementById(stat + 'Summary').innerText = statCount;
}

/**
 * Renders the urgent task statistic, including the number of urgent tasks and the due date of the earliest urgent task.
 * 
 * @returns {void}
 */
function renderUrgentStat() {
    const urgentCount = tasks.filter( task => task.prio == 'urgent').length;
    document.getElementById('urgentSummary').innerText = urgentCount;
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    if (tasks[0]) {
        document.getElementById('urgentDate').innerText = tasks[0].dueDate;
    } else {
        document.getElementById('urgentDate').innerText = '-';
    }
}