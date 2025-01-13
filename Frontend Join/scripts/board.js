let tasks = [];
const categoryColors = {
    "User Story": "#0038FF",
    "Technical Task": "#1FD7C1"
};

/**
 * Initializes the board by fetching tasks from the database and rendering them.
 * Also sets up event listeners for responsive design.
 * @async
 */
async function initBoard() {
    await getTasksFromDB();
    renderBoardTasks(tasks);
    responsiveAddTaskButtonFunctions();
    window.addEventListener('resize', responsiveAddTaskButtonFunctions);
}

/**
 * Fetches tasks from the database and populates the tasks array.
 * @async
 */
async function getTasksFromDB() {
    let fetchResult = await getFromDB("tasks");
    if(fetchResult) {
        Object.keys(fetchResult).forEach(key => {
            tasks.push({
                id: key,
                assignedContacts: fetchResult[key].assignedContacts ?? [],
                category: fetchResult[key].category,
                description: fetchResult[key].description,
                dueDate: fetchResult[key].dueDate,
                prio: fetchResult[key].prio,
                subtasks: fetchResult[key].subtasks ?? [],
                title: fetchResult[key].title,
                status: fetchResult[key].status
            })
        });
    }
}

/**
 * Renders task cards for each task in the provided array.
 * @param {Array} renderTasks - The array of tasks to render.
 */
function renderBoardTasks(renderTasks) {
    renderTasks.forEach(task => {
        const containerRef = document.getElementById(`${task.status}Container`);
        containerRef.innerHTML += getTaskCardTemplate(task);
        calculateProgressBar(task);
        renderContactIconRow(task);
        const prioIconRef = document.getElementById("prioIcon" + task.id);
        prioIconRef.innerHTML = getPrioSVG(task.prio);
    });
    checkNoTaskDisplayNone(renderTasks);
}

/**
 * Checks if there are no tasks in each status category and updates the display accordingly.
 * @param {Array} tasksToCheck - The array of tasks to check.
 */
function checkNoTaskDisplayNone(tasksToCheck) {
    let noTasks = { toDo: true, inProgress: true, awaitFeedback: true, done: true };
    tasksToCheck.forEach(task => noTasks[task.status] = false);
    Object.keys(noTasks).forEach((noTask) => {
        const containerRef = document.getElementById(noTask + "NoTasks");
        noTasks[noTask] ? containerRef.classList.remove("dnone") : containerRef.classList.add("dnone");
    });
}

/**
 * Renders a row of contact icons for a given task. Maximum 6 Icons - if there are more than 6
 * assigned Contacts, then the "excess" users will be displayed as a number.
 * @param {Object} task - The task object containing assigned contacts.
 */
function renderContactIconRow(task) {
    const containerRef = document.getElementById("contactIconsArea" + task.id);
    const assignedContacts = task.assignedContacts;
    const iconRenderAmount = assignedContacts.length > 6 ? 5 : assignedContacts.length;
    let rightOffset = 0;
    for (let i = 0; i < iconRenderAmount; i++) {
        const contact = assignedContacts[i];
        const initials = contact.name[0] + contact.name.split(" ")[1][0]; 
        const bgColor = contact.color;
        renderContactIcon(initials, bgColor, containerRef, rightOffset);
        rightOffset += 8;
    };
    (assignedContacts.length > 6) && renderContactIcon(`+${assignedContacts.length-5}`, 'rgba(42, 54, 71, 1)', containerRef, rightOffset);
}

/**
 * Renders a contact icon with the provided text and background color.
 * 
 * @param {string} iconText - The text to be displayed inside the icon.
 * @param {string} bgColor - The background color of the icon.
 * @param {HTMLElement} containerRef - The container element where the icon will be appended.
 * @param {number} rightOffset - The right offset of the icon in pixels.
 */
function renderContactIcon(iconText, bgColor, containerRef, rightOffset) {
    const contactIcon = document.createElement("div");
    contactIcon.classList.add("iconWithLetters");
    contactIcon.style.background = bgColor;
    contactIcon.innerText = iconText;
    contactIcon.style.right = rightOffset + "px";
    containerRef.append(contactIcon);
}

/**
 * Returns the SVG representation of a task's priority.
 * 
 * @param {string} prio - The priority of the task. Can be "low", "medium", or "urgent".
 * @returns {string} The SVG representation of the task's priority.
 */
function getPrioSVG(prio) {
    let prioSVG = "";
    switch (prio) {
        case "low":
            prioSVG = getPrioLowSVG();
            break;
        case "medium":
            prioSVG = getPrioMediumSVG();
            break;
        case "urgent":
            prioSVG = getPrioUrgentSVG();
            break;
    }
    return prioSVG
}

/**
 * Opens the board overlay by adding the 'slideInRight' and 'overlayBackgroundColor' classes to the board overlay container and the 'slideInRight' class to the board card overlay.
 */
function openBoardOverlay() {
    document.getElementById("boardOverlayContainer").classList.add('slideInRight');
    document.getElementById("boardOverlayContainer").classList.add('overlayBackgroundColor');
    document.getElementById("boardCardOverlay").classList.add('slideInRight');
}

/**
 * Closes the board overlay by removing the 'slideInRight' and 'overlayBackgroundColor' classes from the board overlay container and the 'slideInRight' class from the board card overlay.
 */
function closeBoardOverlay() {
    document.getElementById("boardOverlayContainer").classList.remove('overlayBackgroundColor');
    document.getElementById("boardCardOverlay").classList.remove('slideInRight');
    setTimeout(() => {
        document.getElementById("boardOverlayContainer").classList.remove('slideInRight')
    }, 200);
}

/**
 * Renders the task card overlay for a given task ID.
 * 
 * @param {string} taskID - The ID of the task to render.
 */
function renderOverlayTaskCard(taskID) {
    let task = tasks.find(t => t.id == taskID);
    const containerRef = document.getElementById('boardCardOverlay');
    containerRef.innerHTML = getOverlayTaskCard(task);
    containerRef.style.width = "525px";
    renderOverlayPrio(task);
    renderOverlayAssignedContactsList(task);
    renderOverlaySubtasks(task);
}

/**
 * Renders the task card overlay priority for a given task.
 * 
 * @param {Object} task - The task object containing priority information.
 */
function renderOverlayPrio(task) {
    const prioIconRef = document.getElementById('overlayPrio' + task.id);
    prioIconRef.innerHTML = getPrioSVG(task.prio);
}

/**
 * Renders the assigned contacts list for a given task in the overlay.
 * 
 * @param {Object} task - The task object containing assigned contacts.
 */
function renderOverlayAssignedContactsList(task) {
    const contactsListRef = document.getElementById('overlayAssignedContactsList' + task.id);
    contactsListRef.innerHTML = "";
    task.assignedContacts.forEach(contact => {
        contactsListRef.innerHTML += getOverlayContactTemplate(contact)
    });
}

/**
 * Renders the subtasks for a given task in the overlay.
 * 
 * @param {Object} task - The task object containing subtasks.
 */
function renderOverlaySubtasks(task) {
    const subtasksRef = document.getElementById('overlaySubtasks' + task.id);
    subtasksRef.innerHTML = "";
    task.subtasks.forEach((subtask, index) => {
        subtasksRef.innerHTML += getOverlaySubtaskTemplate(subtask.text, index, task);
        const checkBoxRef = document.getElementById("subtaskCheckbox" + index);
        checkBoxRef.innerHTML = getSubtaskCheckboxSVG(subtask.status);
    });
}

/**
 * Toggles the check status of a subtask.
 * 
 * @param {string} taskID - The ID of the task containing the subtask.
 * @param {number} subtaskIndex - The index of the subtask to toggle.
 */
function toggleSubtaskCheck(taskID, subtaskIndex) {
    let task = tasks.find(t => t.id == taskID);
    let subtaskStatus = task.subtasks[subtaskIndex].status;
    const checkBoxRef = document.getElementById("subtaskCheckbox" + subtaskIndex);
    if (subtaskStatus == "unchecked") {
        subtaskStatus = "checked";
        checkBoxRef.innerHTML = getSubtaskCheckboxSVG("checked");
    } else if (subtaskStatus == "checked") {
        subtaskStatus = "unchecked";
        checkBoxRef.innerHTML = getSubtaskCheckboxSVG("unchecked")
    }
    task.subtasks[subtaskIndex].status = subtaskStatus;
    putToDB(subtaskStatus, `tasks/${task.id}/subtasks/${subtaskIndex}/status`);
    renderOverlaySubtasks(task);
    calculateProgressBar(task);
}

/**
 * Deletes a task from the database and updates the tasks array.
 * 
 * @async
 * @param {string} key - The ID of the task to delete.
 */
async function deleteTask(key) {
    await deleteFromDB("tasks/" + key);
    tasks = tasks.filter(task => task.id != key);
    closeBoardOverlay();
    reloadBoard();
}

/**
 * Reloads the board by removing all task elements and re-rendering tasks.
 * If searchReload is true, it will render the search results instead of all tasks.
 * @param {boolean} searchReload - Whether to render search results or all tasks.
 */
function reloadBoard(searchReload = false) {
    document.querySelectorAll(".boardTask").forEach(boardTask => boardTask.remove());
    noTasks = { toDo: true, inProgress: true, awaitFeedback: true, done: true };
    !searchReload && renderBoardTasks(tasks);
}

/**
 * Renders the task card overlay for adding a new task.
 * 
 * @async
 * @description This function is responsible for rendering the task card overlay for adding a new task.
 * It sets up the overlay container, renders the add task card template, and sets up event listeners for dropdowns.
 * 
 * @returns {void}
 */
async function renderOverlayAddTaskCard() {
    const containerRef = document.getElementById('boardCardOverlay');
    containerRef.innerHTML = getOverlayAddTaskCard();
    containerRef.style.width = "auto";
    await renderContactsDropdown();
    document.getElementById("boardCardOverlay").addEventListener("click", (event) => closeDropdownCheck(event.target, "assignedToDropdown"));
    document.getElementById("boardCardOverlay").addEventListener("click", (event) => closeDropdownCheck(event.target, "categoryDropdown"))
    resetTaskJSON();
}

/**
 * Calculates and updates the progress bar for a given task.
 * @param {Object} task - The task object containing subtasks.
 */
function calculateProgressBar(task) {
    const barRef = document.getElementById(`progressBar${task.id}`);
    const counterRef = document.getElementById(`progressCounter${task.id}`);
    const checkedSubtaskCount = task.subtasks.filter(s => s.status == "checked").length;
    const totalSubtaskCount = task.subtasks.length;
    const progressPercentage = (checkedSubtaskCount / totalSubtaskCount) * 100;
    barRef.style.width = `${progressPercentage}%`;
    counterRef.innerText = `${checkedSubtaskCount}/${totalSubtaskCount} Subtasks`;
}

/**
 * Renders the task card overlay for editing a given task.
 * 
 * @async
 * @param {string} taskID - The ID of the task to render.
 * @description This function is responsible for rendering the task card overlay for editing a task.
 * It sets up the overlay container, renders the edit task card template, and sets up event listeners for dropdowns.
 * 
 * @returns {void}
 */
async function renderEditTask(taskID) {
    let task = tasks.find(t => t.id == taskID);
    const containerRef = document.getElementById('boardCardOverlay');
    containerRef.innerHTML = getOverlayEditTaskCard(task);
    setActivePrio(task.prio);
    await renderContactsDropdown();
    newTask.assignedContacts = task.assignedContacts;
    task.assignedContacts.forEach(contact => assignContact(contact));
    document.getElementById("boardCardOverlay").addEventListener("click", (event) => closeDropdownCheck(event.target, "assignedToDropdown"));
    renderSubtaskList(task.subtasks);
    newTask.subtasks = task.subtasks;
}

/**
 * Saves the edited task to the database and updates the tasks array.
 * 
 * @async
 * @param {string} key - The ID of the task to save.
 * @description This function is responsible for saving the edited task to the database and updating the tasks array.
 * It validates the task, updates the task object, saves the task to the database, and re-renders the board.
 * 
 * @returns {void}
 */
async function saveEditTask(key) {
    if(taskValidation(editMode = true)) {
        newTask.title = document.getElementById("titleInput").value;
        newTask.description = document.getElementById("descriptionInput").value;
        newTask.dueDate = document.getElementById("dateInput").value;
        newTask.category = tasks.find(t => t.id == key).category;
        newTask.status = tasks.find(t => t.id == key).status;
        await putToDB(newTask, `tasks/${key}`);
        tasks = [];
        await initBoard();
        reloadBoard();
        renderOverlayTaskCard(tasks.find(t => t.id == key).id);
    }
}

/**
 * Handles responsive design for add task buttons.
 * Sets the onclick attribute of add task buttons based on the window's inner width.
 * If the window's inner width is greater than 1050, the onclick attribute is set to 'redirectToAddTasks()'.
 * Otherwise, the onclick attribute is also set to 'redirectToAddTasks()'.
 * 
 * @function responsiveAddTaskButtonFunctions
 * @returns {void}
 */
function responsiveAddTaskButtonFunctions() {
    const addTaskButtons = document.querySelectorAll('.plusButton');
    if (window.innerWidth > 1050) {
        addTaskButtons.forEach( b => b.setAttribute('onclick', 'openBoardOverlay(); renderOverlayAddTaskCard()'));
    } else {
        addTaskButtons.forEach( b => b.setAttribute('onclick', 'redirectToAddTasks()'));
    }
}

/**
 * Redirects the user to the add tasks page.
 * 
 * @description This function redirects the user to the add tasks page by setting the location.href to 'addTasks.html'.
 * 
 * @returns {void}
 */
function redirectToAddTasks() {
    location.href = 'addTasks.html';
}

/**
 * Searches for tasks based on the input text and renders the results.
 * @param {HTMLElement} searchRef - The search input element.
 */
function searchBoard(searchRef) {
    const searchText = searchRef.value;
    const searchResult = tasks.filter( task => {
        if(task.title.toLowerCase().includes(searchText) || task.description.toLowerCase().includes(searchText)){
            return true
        }
    });
    reloadBoard(searchReload = true);
    renderBoardTasks(searchResult);
    searchResult.length == 0 ? appendErrorMessage(searchRef.parentElement, 'No results found.') : removeErrorMessage(searchRef.parentElement)
    searchRef.focus();
}