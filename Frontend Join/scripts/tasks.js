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

/**
 * Initializes the add task form by rendering the contacts dropdown and setting up event listeners for dropdowns.
 * @async
 */
async function initAddTaskForm() {
    await renderContactsDropdown();
    document.addEventListener("click", (event) => closeDropdownCheck(event.target, "assignedToDropdown"));
    document.addEventListener("click", (event) => closeDropdownCheck(event.target, "categoryDropdown"))
}

/**
 * Renders the contacts dropdown by fetching contacts from the database and populating the dropdown with contact options.
 * @async
 * @returns {void}
 */
async function renderContactsDropdown() {
    const dropdownRef = document.getElementById("assignedToDropdown");
    dropdownRef.innerHTML = "";
    const contactResults = await getFromDB("contacts");
    if(contactResults) {
        contactsArray = getContactsArray(contactResults);
        contactsArray.forEach(contact => dropdownRef.innerHTML += getContactDropdownTemplate(contact));
    }
}

/**
 * Sets the active priority for the task.
 * 
 * @param {string} prio - The priority to be set (e.g., "urgent", "medium", "low").
 * 
 * @description This function updates the task's priority by removing the active class from all priority elements, 
 *              adding the active class to the selected priority element, and updating the task's priority property.
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
 * 
 * @description This function checks if the clicked element is outside of the dropdown and its button.
 *              If it is, the function toggles the dropdown.
 * 
 * @throws {Error} If an error occurs while checking the dropdown.
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
 * @param {string} contact.id - The ID of the contact.
 * 
 * @description This function toggles the active class of the contact element, 
 *              updates the contact's SVG icon, and adds or removes the contact 
 *              from the task's assigned contacts array.
 */
function assignContact(contact) {
    const idElement = document.getElementById(contact.id);
    const svgElement = document.querySelector(`#${contact.id} svg`);
    idElement.classList.toggle("activeDropdownContact");
    if(idElement.classList.contains("activeDropdownContact")){
        svgElement.innerHTML = getCheckboxSVG("checked");  
        !newTask.assignedContacts.some(c => c.id == contact.id) && newTask.assignedContacts.push(contact);
    } else {
        svgElement.innerHTML = getCheckboxSVG("unchecked");
        newTask.assignedContacts = newTask.assignedContacts.filter(item => item.id != contact.id);
    }
    renderAssignedContactsIconRow()
}

/**
 * Renders the assigned contacts icon row by populating the row with contact icons.
 * 
 * @description This function clears the assigned contacts icon row and then appends a contact icon for each assigned contact.
 *              The contact icon displays the contact's initials and is colored according to the contact's color.
 * 
 * @returns {void}
 */
function renderAssignedContactsIconRow() {
    const rowRef = document.getElementById("assignedContactsIconRow");
    rowRef.innerHTML = "";
    newTask.assignedContacts.forEach(contact => {
        rowRef.innerHTML += `<div class="contactIcon" style='background: ${contact.color}'><p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p></div>`
    });
}

/**
 * Sets the category for the task.
 * 
 * @param {string} category - The category to be set.
 * 
 * @description This function updates the task's category by changing the text of the category dropdown button, 
 *              updating the task's category property, and toggling the category dropdown.
 */ 
function setCategory(category) {
    document.querySelector("#categoryDropdownButton p").innerHTML = category;
    newTask.category = category;
    toggleDropdown("categoryDropdown");
}

/**
 * Toggles the visibility of subtask input icons.
 * 
 * @description This function toggles the display of the subtask input clear icon, 
 *              check icon, icon spacer, and plus icon after a 100ms delay.
 * 
 * @returns {void}
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
 * 
 * @description This function resets the subtask input field to an empty string.
 * 
 * @returns {void}
 */
function clearSubtaskInput() {
    document.getElementById("subtaskInput").value = "";
}

/**
 * Adds a new subtask to the task.
 * 
 * @description This function retrieves the text from the subtask input field, 
 *              creates a new subtask object with the text and an unchecked status, 
 *              adds the subtask to the task's subtasks array, clears the subtask input field, 
 *              and renders the updated subtask list.
 * 
 * @returns {void}
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
 * @param {string} subtasks.text - The text of the subtask.
 * @param {number} index - The index of the subtask in the array.
 * 
 * @description This function clears the subtask list container and then appends a subtask list item for each subtask in the array.
 *              The subtask list item is generated using the getSubtaskListTemplate function.
 * 
 * @returns {void}
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
 * 
 * @description This function removes the subtask at the specified index from the task's subtasks array and 
 *              re-renders the subtask list.
 * 
 * @returns {void}
 */
function deleteSubtask(index) {
    newTask.subtasks.splice(index, 1);
    renderSubtaskList(newTask.subtasks);
}

/**
 * Enters edit mode for a subtask at the specified index.
 * 
 * @param {number} index - The index of the subtask to be edited.
 * 
 * @description This function enables content editing for the subtask list item, 
 *              adds a focus event listener to exit edit mode when the element loses focus, 
 *              and swaps the edit icon to a check icon.
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
 * 
 * @description This function updates the edit icon of the subtask at the specified index.
 *              If the subtask is in edit mode, it displays a check icon; otherwise, it displays an edit icon.
 *              The function also updates the onclick event of the icon accordingly.
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
 * 
 * @description This function disables content editing for the subtask list item, 
 *              removes the focus event listener, and swaps the check icon back to an edit icon.
 * 
 * @throws {Error} If an error occurs while exiting edit mode.
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
 * 
 * @async
 * @description This function is called when the user submits the task form.
 *              It checks if the task data is valid, updates the task object with the user input, 
 *              posts the task to the database, and displays a success message.
 * 
 * @returns {void}
 */
async function createTask() {
    if(taskValidation()) {
        newTask.title = document.getElementById("titleInput").value;
        newTask.description = document.getElementById("descriptionInput").value;
        newTask.dueDate = document.getElementById("dateInput").value;
        await postToDB(newTask,"tasks");
        taskCreatedSuccess();
    }
}

/**
 * Clears the task form by resetting the task JSON, clearing input fields, 
 * re-rendering the contacts dropdown, and resetting the assigned contacts icon row.
 * 
 * @async
 * @description This function is called when the user wants to clear the task form.
 *              It resets the task JSON, clears the input fields, re-renders the contacts dropdown, 
 *              and resets the assigned contacts icon row.
 * 
 * @returns {void}
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
 * 
 * @description This function resets the task JSON object by clearing its properties.
 *              It is used to clear the task form and start with a new task.
 * 
 * @returns {void}
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
 * @returns {boolean} True if the task data is valid, false otherwise.
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
 * 
 * @description This function creates a success message element, appends it to the body, and redirects to the board page after a short delay.
 * 
 * @returns {void}
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
 * 
 * @description This function updates the task's priority by removing the active class from all priority elements, 
 *              adding the active class to the selected priority element, and updating the task's priority property.
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