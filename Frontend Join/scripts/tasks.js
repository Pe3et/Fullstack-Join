const activePrioColors = {
    urgent: "#FF3D00",
    medium: "#FFA800",
    low: "#7AE229"
};
let newTask = {
    title: "",
    description: "",
    assignedContacts: [],
    dueDate: "",
    prio: "medium",
    category: "",
    subtasks: [],
    status: "toDo"
};
let contactsArray = []

/**
 * Initializes the add task form by rendering the contacts dropdown and setting up event listeners for dropdowns.
 */
async function initAddTaskForm() {
    await renderContactsDropdown();
    document.addEventListener("click", (event) => closeDropdownCheck(event.target, "assignedToDropdown"));
    document.addEventListener("click", (event) => closeDropdownCheck(event.target, "categoryDropdown"))
}

/**
 * Renders the contacts dropdown by fetching contacts from the database and populating the dropdown with contact options.
 */
async function renderContactsDropdown() {
    const dropdownRef = document.getElementById("assignedToDropdown");
    dropdownRef.innerHTML = "";
    const contactResults = await getFromDB("contacts");
    if(contactResults) {
        contactsArray = sortContactsArray(contactResults);
        contactsArray.forEach(contact => dropdownRef.innerHTML += getContactDropdownTemplate(contact));
    }
}

/**
 * Toggles a specific dropdown.
 */
function toggleDropdown(dropdownID) {
    const dropdown = document.getElementById(dropdownID);
    const dropdownArrow = document.querySelector(`#${dropdownID}Button svg`);
    dropdown.style.display === "block" ? dropdown.style.display = "none" : dropdown.style.display = "block";
    dropdownArrow.classList.toggle("arrowFlip");
}

/**
 * Checks if a dropdown should be closed based on the clicked element.
 * 
 * @param {HTMLElement} clickedElement - The element that was clicked.
 * @param {string} dropdownID - The ID of the dropdown to check.
 */
function closeDropdownCheck(clickedElement, dropdownID) {
    try {
        if (!document.getElementById(dropdownID).contains(clickedElement) &&
            !document.getElementById(dropdownID + "Button").contains(clickedElement) &&
            clickedElement.tagName != 'rect' &&
            clickedElement.tagName != 'path' &&
            window.getComputedStyle(document.getElementById(dropdownID)).display != "none"
            ){
            toggleDropdown(dropdownID);
        }
    } catch (error) {
        return 
    }   
}

/**
 * Assigns a contact to the task.
 * 
 * @param {Object} contact - The contact to be assigned.
 */
function assignContact(contact) {
    const idElement = document.getElementById('contact' + contact.id);
    const svgElement = document.querySelector(`#contact${contact.id} svg`);
    idElement.classList.toggle("activeDropdownContact");
    if(idElement.classList.contains("activeDropdownContact")){
        svgElement.innerHTML = getCheckboxSVG("checked");  
        !newTask.assignedContacts.includes(contact.id) && newTask.assignedContacts.push(contact.id);
    } else {
        svgElement.innerHTML = getCheckboxSVG("unchecked");
        newTask.assignedContacts = newTask.assignedContacts.filter(pk => pk != contact.id);
    }
    renderAssignedContactsIconRow()
}

/**
 * Renders the assigned contacts icon row by populating the row with contact icons.
 */
function renderAssignedContactsIconRow() {
    const rowRef = document.getElementById("assignedContactsIconRow");
    rowRef.innerHTML = "";
    newTask.assignedContacts.forEach(id => {
        const contact = contactsArray.find(contact => contact.id == id);
        rowRef.innerHTML += `<div class="contactIcon" style='background: ${contact.color}'><p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p></div>`
    });
}

/**
 * Sets the category for the task.
 * 
 * @param {string} category - The category to be set.
 */ 
function setCategory(category) {
    document.querySelector("#categoryDropdownButton p").innerHTML = category;
    newTask.category = category;
    toggleDropdown("categoryDropdown");
}

/**
 * Toggles the visibility of subtask input icons.
 */
function toggleSubtaskInputIcons() {
    setTimeout( () => {
        document.getElementById("subtaskInputClearIcon").classList.toggle("dnone");
        document.getElementById("subtaskInputCheckIcon").classList.toggle("dnone");
        document.getElementById("subtaskInputIconSpacer").classList.toggle("dnone");
        document.getElementById("subtaskPlusIcon").classList.toggle("dnone");
    }, 100)
}

/**
 * Clears the subtask input field.
 */
function clearSubtaskInput() {
    document.getElementById("subtaskInput").value = "";
}

/**
 * Adds a new subtask to the task.
 */
function addSubtask() {
    newTask.subtasks.push({
        text: document.getElementById("subtaskInput").value,
        status: "unchecked"
    });
    clearSubtaskInput();
    renderSubtaskList(newTask.subtasks)
}

/**
 * Renders the subtask list by populating the list container with subtask list items.
 * 
 * @param {Object[]} subtasks - The array of subtasks to be rendered.
 */
function renderSubtaskList(subtasks) {
    const listRef = document.getElementById("subtaskListContainer");
    listRef.innerHTML = "";
    subtasks.forEach((subtask, index) => listRef.innerHTML += getSubtaskListTemplate(subtask.text, index));
}

/**
 * Deletes a subtask from the task.
 * 
 * @param {number} index - The index of the subtask to be deleted.
 */
function deleteSubtask(index) {
    newTask.subtasks.splice(index, 1);
    renderSubtaskList(newTask.subtasks);
}

/**
 * Enters edit mode for a subtask at the specified index.
 * 
 * @param {number} index - The index of the subtask to be edited.
 */
function editSubtaskMode(index) {
    const liElement = document.getElementById(`subtaskLiElement${index}`);
    liElement.contentEditable = true;
    liElement.focus();
    const subtaskElement = liElement.parentNode;
    subtaskElement.classList.add("subtaskEditMode");
    liElement.addEventListener("focusout", () => setTimeout(() => exitEditSubtaskMode(index), 100) , { once: true });
    swapSubtaskEditIcon(index, true);
}

/**
 * Swaps the edit icon of a subtask at the specified index.
 * 
 * @param {number} index - The index of the subtask.
 * @param {boolean} [editMode=true] - Whether the subtask is in edit mode.
 */
function swapSubtaskEditIcon(index, editMode = true) {
    const iconRef = document.getElementById(`subtaskEditIcon${index}`);
    if (editMode) {
        iconRef.innerHTML = getSubtaskCheckIcon();
        iconRef.onclick = `exitEditSubtaskMode(${index})`
    } else {
        iconRef.innerHTML = getSubtaskEditIcon();
        iconRef.onclick = `editSubtaskMode(${index})`
    }
}

/**
 * Exits edit mode for a subtask at the specified index.
 * 
 * @param {number} index - The index of the subtask to be edited.
 */
function exitEditSubtaskMode(index) {
    const liElement = document.getElementById(`subtaskLiElement${index}`)
    try {
        liElement.contentEditable = false;
        const subtaskElement = liElement.parentNode;
        subtaskElement.classList.remove("subtaskEditMode");
        swapSubtaskEditIcon(index, false);
        newTask.subtasks[index].text = liElement.innerText;
    } catch (error) {
        return
    }
}

/**
 * Creates a new task by validating the task data, updating the task object, 
 * posting the task to the database, and displaying a success message.
 */
async function createTask() {
    if(taskValidation()) {
        newTask.title = document.getElementById("titleInput").value;
        newTask.description = document.getElementById("descriptionInput").value;
        newTask.dueDate = document.getElementById("dateInput").value;
        await postToDB(newTask,"tasks/");
        taskCreatedSuccess();
    }
}

/**
 * Clears the task form by resetting the task JSON, clearing input fields, 
 * re-rendering the contacts dropdown, and resetting the assigned contacts icon row.
 */
async function clearTask() {
    resetTaskJSON();
    document.getElementById("titleInput").value = "";
    document.getElementById("descriptionInput").value = "";
    await renderContactsDropdown();
    document.getElementById("assignedContactsIconRow").innerHTML = "";  
    document.getElementById("dateInput").value = "";
    setActivePrio("medium");
    document.querySelector("#categoryDropdownButton p").innerText = "Select task category";
    document.getElementById("subtaskInput").value = "";
    document.getElementById("subtaskListContainer").innerHTML = "";
}

/**
 * Resets the task JSON object to its initial state.
 */
function resetTaskJSON(){
    newTask.title = "";
    newTask.description = "";
    newTask.assignedContacts = [];
    newTask.dueDate = "";
    newTask.prio = "medium"
    newTask.category = "";
    newTask.subtasks = [];
    newTask.status = "toDo"
}

/**
 * Validates the task data by checking if the title, date, and category are valid.
 * 
 * @param {boolean} [editMode=false] - Whether the task is in edit mode.
 */
function taskValidation(editMode = false) {
    validated = {};
    validateInputNotEmpty(document.getElementById('titleInput'));
    validateInputNotEmpty(document.getElementById('dateInput'));
    !editMode && validateTaskCategory();
    if (validated.title && validated.date && (validated.category || editMode)) {
        return true
    } else {
        return false
    }
}

/**
 * Handles the success of a task creation by displaying a success message and redirecting to the board page.
 */
function taskCreatedSuccess() {
    const taskSucces = document.createElement('div');
    taskSucces.classList.add('taskSuccess');
    taskSucces.innerText = 'Task added to board';
    taskSucces.innerHTML += getBoardSVG();
    document.body.append(taskSucces);
    setTimeout(() => {location.href = "board.html"}, 900); 
}

/**
 * Sets the active priority for the task.
 * 
 * @param {string} prio - The priority to be set (e.g., "urgent", "medium", "low").
 */
function setActivePrio(prio) {
    document.querySelectorAll(".prio").forEach(element => {
        element.classList.remove("activePrio");
        element.style.background = "white";
    });
    const clickedPrioRef = document.getElementById((prio) + "Prio");
    clickedPrioRef.classList.add("activePrio");
    clickedPrioRef.style.background = activePrioColors[prio];
    newTask.prio = prio;
}