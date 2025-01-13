/**
 * Returns the HTML template for a task card.
 * 
 * @param {Object} task - The task object containing id, category, title, description, subtasks, and other properties.
 * @returns {string} The HTML template for the task card.
 */
function getTaskCardTemplate(task) {
    return `
        <div id="${task.id}" class="boardTask" onclick='openBoardOverlay(); renderOverlayTaskCard("${task.id}")' draggable="true" ondragstart="drag(event)" ondragend="removeDragRotate(this)">
            <div class="taskCategoryArea">
              <div class="taskCategory" style="background:${categoryColors[task.category]}">
                <p>${task.category}</p>
              </div>
            </div>
            <div class="taskTitle">
              <h3>${task.title}</h3>
            </div>
            <div class="shortDescription">
                ${task.description}
            </div>
            <div class="progressArea">
              <div class="progressBarContainer">
                <div class="progressBar" id="progressBar${task.id}"></div>
              </div>
              <p id="progressCounter${task.id}">${task.subtasks.filter(s => s.status == "checked").length}/${task.subtasks.length} Subtasks</p>
            </div>
            <div class="iconsAndPrioArea">
              <div id="contactIconsArea${task.id}" class="contactIconsArea">
              </div>
              <div id="prioIcon${task.id}">
              </div>
            </div>
        </div>
    `
}

/**
 * Return the HTML template for the task card overlay.
 * @param {Object} task -the task, which will be displayed in overlay
 * @returns {string} The HTML Template for task card overlay
 */
function getOverlayTaskCard(task) {
    return `
        <div class="overlayCategoryAndCloseButtonContainer">
            <div class="overlayTaskCategory" style="background:${categoryColors[task.category]}; font-size: 23px">
              <p>${task.category}</p>
            </div>
            <div class="overlayCloseButton" onclick="closeBoardOverlay()">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99999 8.40005L2.09999 13.3C1.91665 13.4834 1.68332 13.575 1.39999 13.575C1.11665 13.575 0.883321 13.4834 0.699988 13.3C0.516654 13.1167 0.424988 12.8834 0.424988 12.6C0.424988 12.3167 0.516654 12.0834 0.699988 11.9L5.59999 7.00005L0.699988 2.10005C0.516654 1.91672 0.424988 1.68338 0.424988 1.40005C0.424988 1.11672 0.516654 0.883382 0.699988 0.700049C0.883321 0.516715 1.11665 0.425049 1.39999 0.425049C1.68332 0.425049 1.91665 0.516715 2.09999 0.700049L6.99999 5.60005L11.9 0.700049C12.0833 0.516715 12.3167 0.425049 12.6 0.425049C12.8833 0.425049 13.1167 0.516715 13.3 0.700049C13.4833 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4833 1.91672 13.3 2.10005L8.39999 7.00005L13.3 11.9C13.4833 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4833 13.1167 13.3 13.3C13.1167 13.4834 12.8833 13.575 12.6 13.575C12.3167 13.575 12.0833 13.4834 11.9 13.3L6.99999 8.40005Z" fill="#2A3647"/>
                </svg>
            </div>
        </div>
        <div class="overlayTaskTitle">
          <h3>${task.title}</h3>
        </div>
        <div class="overlayTaskDescription">
            ${task.description}
        </div>
        <div class="overlayDueDateArea">
          <span class="overlayDueDateText">Due date:</span> <span class="overlayDueDate">${task.dueDate}</span>
        </div>
        <div class="overlayPrioArea">
            <span class="overlayPrioText">Priority:</span>
            <span class="overlayPrio">
                ${task.prio.charAt(0).toUpperCase() + task.prio.slice(1)}
                <div id="overlayPrio${task.id}"></div>
            </span>
        </div>
        <div class="assignedToArea">
            <p>Assigned To:</p>
            <div class="assignedContacts" id="overlayAssignedContactsList${task.id}">
            </div>
        </div>
        <div class="overlaySubtasksArea">
            <p>Subtasks</p>
            <div class="overlaySubtasks" id="overlaySubtasks${task.id}">
            </div>
        </div>
        <div class="overlayTaskButtonContainer">
            <p class="overlayTaskButton" onclick="deleteTask('${task.id}')">
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 18C2.95 18 2.47917 17.8042 2.0875 17.4125C1.69583 17.0208 1.5 16.55 1.5 16V3C1.21667 3 0.979167 2.90417 0.7875 2.7125C0.595833 2.52083 0.5 2.28333 0.5 2C0.5 1.71667 0.595833 1.47917 0.7875 1.2875C0.979167 1.09583 1.21667 1 1.5 1H5.5C5.5 0.716667 5.59583 0.479167 5.7875 0.2875C5.97917 0.0958333 6.21667 0 6.5 0H10.5C10.7833 0 11.0208 0.0958333 11.2125 0.2875C11.4042 0.479167 11.5 0.716667 11.5 1H15.5C15.7833 1 16.0208 1.09583 16.2125 1.2875C16.4042 1.47917 16.5 1.71667 16.5 2C16.5 2.28333 16.4042 2.52083 16.2125 2.7125C16.0208 2.90417 15.7833 3 15.5 3V16C15.5 16.55 15.3042 17.0208 14.9125 17.4125C14.5208 17.8042 14.05 18 13.5 18H3.5ZM3.5 3V16H13.5V3H3.5ZM5.5 13C5.5 13.2833 5.59583 13.5208 5.7875 13.7125C5.97917 13.9042 6.21667 14 6.5 14C6.78333 14 7.02083 13.9042 7.2125 13.7125C7.40417 13.5208 7.5 13.2833 7.5 13V6C7.5 5.71667 7.40417 5.47917 7.2125 5.2875C7.02083 5.09583 6.78333 5 6.5 5C6.21667 5 5.97917 5.09583 5.7875 5.2875C5.59583 5.47917 5.5 5.71667 5.5 6V13ZM9.5 13C9.5 13.2833 9.59583 13.5208 9.7875 13.7125C9.97917 13.9042 10.2167 14 10.5 14C10.7833 14 11.0208 13.9042 11.2125 13.7125C11.4042 13.5208 11.5 13.2833 11.5 13V6C11.5 5.71667 11.4042 5.47917 11.2125 5.2875C11.0208 5.09583 10.7833 5 10.5 5C10.2167 5 9.97917 5.09583 9.7875 5.2875C9.59583 5.47917 9.5 5.71667 9.5 6V13Z" fill="#2A3647"/></svg>
                Delete
            </p>
            <div class="overlayTaskButtonSpacer"></div>
            <p class="overlayTaskButton" onclick='renderEditTask("${task.id}")'>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/></svg>
                Edit
            </p>
        </div>
    `
}

/**
 * Returns the HTML template for a single assigned contact in the task overlay.
 * 
 * @param {Object} contact - The contact object containing name and color properties.
 * @returns {string} The HTML template for the single assigned contact.
 */
function getOverlayContactTemplate(contact) {
    return `
        <div class="singleAssignedContact">
            <div class="iconWithLetters" style="background: ${contact.color}">
                ${contact.name[0] + contact.name.split(" ")[1][0]}
            </div>
            <span>${contact.name}</span>
        </div>
    `
}

/**
 * Returns the HTML template for a single subtask in the task overlay.
 * 
 * @param {string} subtaskText - The text of the subtask.
 * @param {number} subtaskIndex - The index of the subtask.
 * @param {Object} task - The task object containing id and other properties.
 * @returns {string} The HTML template for the single subtask.
 */
function getOverlaySubtaskTemplate(subtaskText, subtaskIndex, task) {
    return `
        <div class="singleSubtask">
            <div id="subtaskCheckbox${subtaskIndex}" class="subtaskCheckbox" onclick='toggleSubtaskCheck("${task.id}", ${subtaskIndex})'>
            </div>
            <p>${subtaskText}</p>
        </div>
    `
}

/**
 * Returns the HTML template for a low priority SVG icon.
 * 
 * @returns {string} The HTML template for the low priority SVG icon.
 */
function getPrioLowSVG() {
    return `
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.99998 7.24524C8.80055 7.24557 8.60628 7.18367 8.44574 7.06863L0.877242 1.63467C0.778768 1.56391 0.695595 1.47498 0.632471 1.37296C0.569347 1.27094 0.527508 1.15784 0.509344 1.0401C0.472658 0.802317 0.53463 0.560105 0.681625 0.366747C0.828621 0.17339 1.0486 0.0447247 1.29317 0.00905743C1.53773 -0.0266099 1.78686 0.0336422 1.98574 0.176559L8.99998 5.2075L16.0142 0.17656C16.1127 0.105795 16.2245 0.0545799 16.3434 0.02584C16.4622 -0.00289994 16.5857 -0.00860237 16.7068 0.00905829C16.8279 0.0267189 16.9442 0.0673968 17.0492 0.128769C17.1541 0.190142 17.2456 0.271007 17.3183 0.366748C17.3911 0.462489 17.4438 0.571231 17.4734 0.686765C17.5029 0.802299 17.5088 0.922362 17.4906 1.0401C17.4725 1.15784 17.4306 1.27094 17.3675 1.37296C17.3044 1.47498 17.2212 1.56391 17.1227 1.63467L9.55423 7.06863C9.39369 7.18367 9.19941 7.24557 8.99998 7.24524Z" fill="#7AE229"/>
            <path d="M8.99998 12.0001C8.80055 12.0005 8.60628 11.9386 8.44574 11.8235L0.877242 6.38955C0.678366 6.24664 0.546029 6.03276 0.509344 5.79498C0.472658 5.5572 0.53463 5.31499 0.681625 5.12163C0.828621 4.92827 1.0486 4.79961 1.29317 4.76394C1.53773 4.72827 1.78686 4.78853 1.98574 4.93144L8.99998 9.96239L16.0142 4.93144C16.2131 4.78853 16.4622 4.72827 16.7068 4.76394C16.9514 4.79961 17.1713 4.92827 17.3183 5.12163C17.4653 5.31499 17.5273 5.5572 17.4906 5.79498C17.4539 6.03276 17.3216 6.24664 17.1227 6.38956L9.55423 11.8235C9.39369 11.9386 9.19941 12.0005 8.99998 12.0001Z" fill="#7AE229"/>
        </svg>
    `
}

/**
 * Returns the HTML template for a medium priority SVG icon.
 * 
 * @returns {string} The HTML template for the medium priority SVG icon.
 */
function getPrioMediumSVG() {
    return `
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z" fill="#FFA800"/>
            <path d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z" fill="#FFA800"/>
        </svg>
    `
}

/**
 * Returns the HTML template for an urgent priority SVG icon.
 * 
 * @returns {string} The HTML template for the urgent priority SVG icon.
 */
function getPrioUrgentSVG() {
    return `
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.00002 4.75476C9.19945 4.75443 9.39372 4.81633 9.55427 4.93137L17.1228 10.3653C17.2212 10.4361 17.3044 10.525 17.3675 10.627C17.4307 10.7291 17.4725 10.8422 17.4907 10.9599C17.5273 11.1977 17.4654 11.4399 17.3184 11.6333C17.1714 11.8266 16.9514 11.9553 16.7068 11.9909C16.4623 12.0266 16.2131 11.9664 16.0143 11.8234L9.00002 6.7925L1.98577 11.8234C1.8873 11.8942 1.77545 11.9454 1.65662 11.9742C1.53779 12.0029 1.4143 12.0086 1.2932 11.9909C1.1721 11.9733 1.05577 11.9326 0.950844 11.8712C0.845915 11.8099 0.754446 11.729 0.681662 11.6333C0.608878 11.5375 0.556201 11.4288 0.52664 11.3132C0.49708 11.1977 0.491215 11.0776 0.509379 10.9599C0.527545 10.8422 0.569382 10.7291 0.632508 10.627C0.695632 10.525 0.778805 10.4361 0.87728 10.3653L8.44577 4.93137C8.60631 4.81633 8.80059 4.75443 9.00002 4.75476Z" fill="#FF3D00"/>
            <path d="M9.00002 -0.000121266C9.19945 -0.000455511 9.39372 0.0614475 9.55427 0.176482L17.1228 5.61045C17.3216 5.75336 17.454 5.96724 17.4907 6.20502C17.5273 6.4428 17.4654 6.68501 17.3184 6.87837C17.1714 7.07173 16.9514 7.20039 16.7068 7.23606C16.4623 7.27173 16.2131 7.21147 16.0143 7.06856L9.00002 2.03761L1.98577 7.06856C1.78689 7.21147 1.53777 7.27173 1.2932 7.23606C1.04863 7.20039 0.828657 7.07173 0.681662 6.87837C0.534667 6.68501 0.472695 6.4428 0.509379 6.20502C0.546065 5.96723 0.678402 5.75336 0.87728 5.61044L8.44577 0.176482C8.60631 0.0614474 8.80059 -0.000455546 9.00002 -0.000121266Z" fill="#FF3D00"/>
        </svg>

    `
}

/**
 * Returns the HTML template for a subtask checkbox SVG icon based on the provided status.
 * 
 * @param {string} status - The status of the subtask, either "checked" or "unchecked".
 * @returns {string} The HTML template for the subtask checkbox SVG icon.
 */
function getSubtaskCheckboxSVG(status) {
    switch (status) {
        case "checked":
            return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                        <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`;
        case "unchecked":
            return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                    </svg>`;
        default:
            break;
    }
}

/**
 * Returns the HTML template for the add task overlay.
 * 
 * @returns {string} The HTML template for the add task overlay.
 */
function getOverlayAddTaskCard() {
    return `
          <div class="addTaskContainer">
            <h1>Add Task
                <div class="overlayCloseButton" onclick="closeBoardOverlay()">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.99999 8.40005L2.09999 13.3C1.91665 13.4834 1.68332 13.575 1.39999 13.575C1.11665 13.575 0.883321 13.4834 0.699988 13.3C0.516654 13.1167 0.424988 12.8834 0.424988 12.6C0.424988 12.3167 0.516654 12.0834 0.699988 11.9L5.59999 7.00005L0.699988 2.10005C0.516654 1.91672 0.424988 1.68338 0.424988 1.40005C0.424988 1.11672 0.516654 0.883382 0.699988 0.700049C0.883321 0.516715 1.11665 0.425049 1.39999 0.425049C1.68332 0.425049 1.91665 0.516715 2.09999 0.700049L6.99999 5.60005L11.9 0.700049C12.0833 0.516715 12.3167 0.425049 12.6 0.425049C12.8833 0.425049 13.1167 0.516715 13.3 0.700049C13.4833 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4833 1.91672 13.3 2.10005L8.39999 7.00005L13.3 11.9C13.4833 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4833 13.1167 13.3 13.3C13.1167 13.4834 12.8833 13.575 12.6 13.575C12.3167 13.575 12.0833 13.4834 11.9 13.3L6.99999 8.40005Z" fill="#2A3647"/>
                    </svg>
                </div>
            </h1>
            <section class="addTaskForm">
            <div class="addTaskColumn">
                <p>Title<span>*</span></p>
                <input id="titleInput" type="text" placeholder="Enter a title">
                <p>Description</p>
                <textarea id="descriptionInput" type="text" placeholder="Enter a Description"></textarea>
                <p>Assigned to</p>
                <div id="assignedToDropdownButton" class="dropdownButton" onclick="toggleDropdown('assignedToDropdown')">
                <p>Select contacts to assign</p>
                <div class="dropdownArrow">
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.29998 4.3L0.699975 1.7C0.383309 1.38333 0.312475 1.02083 0.487475 0.6125C0.662475 0.204167 0.974975 0 1.42498 0H6.57498C7.02498 0 7.33747 0.204167 7.51248 0.6125C7.68748 1.02083 7.61664 1.38333 7.29997 1.7L4.69998 4.3C4.59998 4.4 4.49164 4.475 4.37498 4.525C4.25831 4.575 4.13331 4.6 3.99998 4.6C3.86664 4.6 3.74164 4.575 3.62498 4.525C3.50831 4.475 3.39998 4.4 3.29998 4.3Z" fill="#2A3647"/>
                    </svg>
                </div>
                </div>
                <div id="assignedToDropdown" class="dropdown">
                </div>
                <div id="assignedContactsIconRow"></div>
                <p id="requiredInfo"><span>*</span>This field is required</p>
            </div>
            <div class="spacer"></div>
            <div class="addTaskColumn">
                <p>Due date<span>*</span></p>
                <input id="dateInput" type="date" placeholder="dd/mm/yyyy">
                <p>Prio</p>
                <div class="prioContainer">
                <div id="urgentPrio" class="prio" onclick="setActivePrio('urgent')">
                    <p>Urgent</p>
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00"/>
                    <path d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00"/>
                    </svg>              
                </div>
                <div id="mediumPrio" class="prio activePrio" onclick="setActivePrio('medium')">
                    <p>Medium</p>
                    <svg width="21" height="9" viewBox="0 0 21 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.4041 8.22552H1.59589C1.30524 8.22552 1.0265 8.10922 0.820979 7.90221C0.61546 7.6952 0.5 7.41443 0.5 7.12167C0.5 6.82891 0.61546 6.54814 0.820979 6.34113C1.0265 6.13412 1.30524 6.01782 1.59589 6.01782H19.4041C19.6948 6.01782 19.9735 6.13412 20.179 6.34113C20.3845 6.54814 20.5 6.82891 20.5 7.12167C20.5 7.41443 20.3845 7.6952 20.179 7.90221C19.9735 8.10922 19.6948 8.22552 19.4041 8.22552Z" fill="#FFA800"/>
                    <path d="M19.4041 2.98223H1.59589C1.30524 2.98223 1.0265 2.86594 0.820979 2.65892C0.61546 2.45191 0.5 2.17114 0.5 1.87839C0.5 1.58563 0.61546 1.30486 0.820979 1.09785C1.0265 0.890834 1.30524 0.774536 1.59589 0.774536L19.4041 0.774536C19.6948 0.774536 19.9735 0.890834 20.179 1.09785C20.3845 1.30486 20.5 1.58563 20.5 1.87839C20.5 2.17114 20.3845 2.45191 20.179 2.65892C19.9735 2.86594 19.6948 2.98223 19.4041 2.98223Z" fill="#FFA800"/>
                    </svg>              
                </div>
                <div id="lowPrio" class="prio" onclick="setActivePrio('low')">
                    <p>Low</p>
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229"/>
                    <path d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z" fill="#7AE229"/>
                    </svg>
                </div>
                </div>
                <p>Category<span>*</span></p>
                <div id="categoryDropdownButton" class="dropdownButton" onclick="toggleDropdown('categoryDropdown')">
                <p>Select task category</p>
                <div class="dropdownArrow">
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.29998 4.3L0.699975 1.7C0.383309 1.38333 0.312475 1.02083 0.487475 0.6125C0.662475 0.204167 0.974975 0 1.42498 0H6.57498C7.02498 0 7.33747 0.204167 7.51248 0.6125C7.68748 1.02083 7.61664 1.38333 7.29997 1.7L4.69998 4.3C4.59998 4.4 4.49164 4.475 4.37498 4.525C4.25831 4.575 4.13331 4.6 3.99998 4.6C3.86664 4.6 3.74164 4.575 3.62498 4.525C3.50831 4.475 3.39998 4.4 3.29998 4.3Z" fill="#2A3647"/></svg>
                </div>
                </div>
                <div id="categoryDropdown" class="dropdown">
                <div class="dropdownContent" onclick="setCategory('User Story')"><p>User Story</p></div>
                <div class="dropdownContent" onclick="setCategory('Technical Task')"><p>Technical Task</p></div>
                </div>
                <p>Subtasks</p>
                <div class="subtaskInputContainer">
                <input id="subtaskInput" type="text" placeholder="Add new subtask" onfocus="toggleSubtaskInputIcons()" onblur="toggleSubtaskInputIcons()" onkeydown="if(event.key === 'Enter') addSubtask()">
                <div class="subtaskInputIconContainer">
                    <div class="subtaskInputIcon" id="subtaskPlusIcon" onclick="document.getElementById('subtaskInput').focus()">
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.24854 8H1.24854C0.965202 8 0.727702 7.90417 0.536035 7.7125C0.344368 7.52083 0.248535 7.28333 0.248535 7C0.248535 6.71667 0.344368 6.47917 0.536035 6.2875C0.727702 6.09583 0.965202 6 1.24854 6H6.24854V1C6.24854 0.716667 6.34437 0.479167 6.53604 0.2875C6.7277 0.0958333 6.9652 0 7.24854 0C7.53187 0 7.76937 0.0958333 7.96104 0.2875C8.1527 0.479167 8.24854 0.716667 8.24854 1V6H13.2485C13.5319 6 13.7694 6.09583 13.961 6.2875C14.1527 6.47917 14.2485 6.71667 14.2485 7C14.2485 7.28333 14.1527 7.52083 13.961 7.7125C13.7694 7.90417 13.5319 8 13.2485 8H8.24854V13C8.24854 13.2833 8.1527 13.5208 7.96104 13.7125C7.76937 13.9042 7.53187 14 7.24854 14C6.9652 14 6.7277 13.9042 6.53604 13.7125C6.34437 13.5208 6.24854 13.2833 6.24854 13V8Z" fill="#2A3647"/>
                    </svg>
                    </div>
                    <div class="subtaskInputIcon dnone" id="subtaskInputClearIcon" onclick="clearSubtaskInput()">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00078 8.40005L2.10078 13.3C1.91745 13.4834 1.68411 13.575 1.40078 13.575C1.11745 13.575 0.884115 13.4834 0.700781 13.3C0.517448 13.1167 0.425781 12.8834 0.425781 12.6C0.425781 12.3167 0.517448 12.0834 0.700781 11.9L5.60078 7.00005L0.700781 2.10005C0.517448 1.91672 0.425781 1.68338 0.425781 1.40005C0.425781 1.11672 0.517448 0.883382 0.700781 0.700049C0.884115 0.516715 1.11745 0.425049 1.40078 0.425049C1.68411 0.425049 1.91745 0.516715 2.10078 0.700049L7.00078 5.60005L11.9008 0.700049C12.0841 0.516715 12.3174 0.425049 12.6008 0.425049C12.8841 0.425049 13.1174 0.516715 13.3008 0.700049C13.4841 0.883382 13.5758 1.11672 13.5758 1.40005C13.5758 1.68338 13.4841 1.91672 13.3008 2.10005L8.40078 7.00005L13.3008 11.9C13.4841 12.0834 13.5758 12.3167 13.5758 12.6C13.5758 12.8834 13.4841 13.1167 13.3008 13.3C13.1174 13.4834 12.8841 13.575 12.6008 13.575C12.3174 13.575 12.0841 13.4834 11.9008 13.3L7.00078 8.40005Z" fill="#2A3647"/>
                    </svg>                
                    </div>
                    <div id="subtaskInputIconSpacer" class="dnone"></div>
                    <div class="subtaskInputIcon dnone" id="subtaskInputCheckIcon" onclick="addSubtask()">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.55118 9.15L14.0262 0.675C14.2262 0.475 14.4637 0.375 14.7387 0.375C15.0137 0.375 15.2512 0.475 15.4512 0.675C15.6512 0.875 15.7512 1.1125 15.7512 1.3875C15.7512 1.6625 15.6512 1.9 15.4512 2.1L6.25118 11.3C6.05118 11.5 5.81785 11.6 5.55118 11.6C5.28452 11.6 5.05118 11.5 4.85118 11.3L0.551184 7C0.351184 6.8 0.25535 6.5625 0.263684 6.2875C0.272017 6.0125 0.376184 5.775 0.576184 5.575C0.776184 5.375 1.01368 5.275 1.28868 5.275C1.56368 5.275 1.80118 5.375 2.00118 5.575L5.55118 9.15Z" fill="#2A3647"/>
                    </svg>                
                    </div>
                </div>
                </div>
                <div id="subtaskListContainer">
                </div>
            </div>
            </section>
            <div class="buttonContainer">
            <div id="clearButton" class="hollowButton" onclick="clearTask()">
                <p>Clear</p>
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div id="createTaskButton" class="fullButton" onclick="createTask()">
                <p>Create Task</p>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.79923 9.15L14.2742 0.675C14.4742 0.475 14.7117 0.375 14.9867 0.375C15.2617 0.375 15.4992 0.475 15.6992 0.675C15.8992 0.875 15.9992 1.1125 15.9992 1.3875C15.9992 1.6625 15.8992 1.9 15.6992 2.1L6.49923 11.3C6.29923 11.5 6.0659 11.6 5.79923 11.6C5.53256 11.6 5.29923 11.5 5.09923 11.3L0.79923 7C0.59923 6.8 0.503397 6.5625 0.51173 6.2875C0.520064 6.0125 0.62423 5.775 0.82423 5.575C1.02423 5.375 1.26173 5.275 1.53673 5.275C1.81173 5.275 2.04923 5.375 2.24923 5.575L5.79923 9.15Z" fill="white"/>
                </svg>   
            </div>
            </div>
        </div>
    `
}

/**
 * Returns the HTML template for the edit task overlay.
 * 
 * @returns {string} The HTML template for the edit task overlay.
 */
function getOverlayEditTaskCard(task) {
    return `
        <div class="editTaskOverlayCloseButtonContainer">
            <div class="overlayCloseButton" onclick="closeBoardOverlay()">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99999 8.40005L2.09999 13.3C1.91665 13.4834 1.68332 13.575 1.39999 13.575C1.11665 13.575 0.883321 13.4834 0.699988 13.3C0.516654 13.1167 0.424988 12.8834 0.424988 12.6C0.424988 12.3167 0.516654 12.0834 0.699988 11.9L5.59999 7.00005L0.699988 2.10005C0.516654 1.91672 0.424988 1.68338 0.424988 1.40005C0.424988 1.11672 0.516654 0.883382 0.699988 0.700049C0.883321 0.516715 1.11665 0.425049 1.39999 0.425049C1.68332 0.425049 1.91665 0.516715 2.09999 0.700049L6.99999 5.60005L11.9 0.700049C12.0833 0.516715 12.3167 0.425049 12.6 0.425049C12.8833 0.425049 13.1167 0.516715 13.3 0.700049C13.4833 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4833 1.91672 13.3 2.10005L8.39999 7.00005L13.3 11.9C13.4833 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4833 13.1167 13.3 13.3C13.1167 13.4834 12.8833 13.575 12.6 13.575C12.3167 13.575 12.0833 13.4834 11.9 13.3L6.99999 8.40005Z" fill="#2A3647"/>
                </svg>
            </div>
        </div>
        <div id="editTaskContainer" class="addTaskContainer">
            <section class="addTaskForm">
            <div class="addTaskColumn">
                <p>Title<span>*</span></p>
                <input id="titleInput" type="text" placeholder="Enter a title" value="${task.title}">
                <p>Description</p>
                <textarea id="descriptionInput" type="text" placeholder="Enter a Description">${task.description}</textarea>
                <p>Assigned to</p>
                <div id="assignedToDropdownButton" class="dropdownButton" onclick="toggleDropdown('assignedToDropdown')">
                <p>Select contacts to assign</p>
                <div class="dropdownArrow">
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.29998 4.3L0.699975 1.7C0.383309 1.38333 0.312475 1.02083 0.487475 0.6125C0.662475 0.204167 0.974975 0 1.42498 0H6.57498C7.02498 0 7.33747 0.204167 7.51248 0.6125C7.68748 1.02083 7.61664 1.38333 7.29997 1.7L4.69998 4.3C4.59998 4.4 4.49164 4.475 4.37498 4.525C4.25831 4.575 4.13331 4.6 3.99998 4.6C3.86664 4.6 3.74164 4.575 3.62498 4.525C3.50831 4.475 3.39998 4.4 3.29998 4.3Z" fill="#2A3647"/>
                    </svg>
                </div>
                </div>
                <div id="assignedToDropdown" class="dropdown">
                </div>
                <div id="assignedContactsIconRow"></div>
                <p id="requiredInfo"><span>*</span>This field is required</p>
            </div>
            <div class="spacer"></div>
            <div class="addTaskColumn">
                <p>Due date<span>*</span></p>
                <input id="dateInput" type="date" placeholder="dd/mm/yyyy" value="${task.dueDate}">
                <p>Prio</p>
                <div class="prioContainer">
                <div id="urgentPrio" class="prio" onclick="setActivePrio('urgent')">
                    <p>Urgent</p>
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00"/>
                    <path d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00"/>
                    </svg>              
                </div>
                <div id="mediumPrio" class="prio activePrio" onclick="setActivePrio('medium')">
                    <p>Medium</p>
                    <svg width="21" height="9" viewBox="0 0 21 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.4041 8.22552H1.59589C1.30524 8.22552 1.0265 8.10922 0.820979 7.90221C0.61546 7.6952 0.5 7.41443 0.5 7.12167C0.5 6.82891 0.61546 6.54814 0.820979 6.34113C1.0265 6.13412 1.30524 6.01782 1.59589 6.01782H19.4041C19.6948 6.01782 19.9735 6.13412 20.179 6.34113C20.3845 6.54814 20.5 6.82891 20.5 7.12167C20.5 7.41443 20.3845 7.6952 20.179 7.90221C19.9735 8.10922 19.6948 8.22552 19.4041 8.22552Z" fill="#FFA800"/>
                    <path d="M19.4041 2.98223H1.59589C1.30524 2.98223 1.0265 2.86594 0.820979 2.65892C0.61546 2.45191 0.5 2.17114 0.5 1.87839C0.5 1.58563 0.61546 1.30486 0.820979 1.09785C1.0265 0.890834 1.30524 0.774536 1.59589 0.774536L19.4041 0.774536C19.6948 0.774536 19.9735 0.890834 20.179 1.09785C20.3845 1.30486 20.5 1.58563 20.5 1.87839C20.5 2.17114 20.3845 2.45191 20.179 2.65892C19.9735 2.86594 19.6948 2.98223 19.4041 2.98223Z" fill="#FFA800"/>
                    </svg>              
                </div>
                <div id="lowPrio" class="prio" onclick="setActivePrio('low')">
                    <p>Low</p>
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229"/>
                    <path d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z" fill="#7AE229"/>
                    </svg>
                </div>
                </div>
                <p>Subtasks</p>
                <div class="subtaskInputContainer">
                <input id="subtaskInput" type="text" placeholder="Add new subtask" onfocus="toggleSubtaskInputIcons()" onblur="toggleSubtaskInputIcons()" onkeydown="if(event.key === 'Enter') addSubtask()">
                <div class="subtaskInputIconContainer">
                    <div class="subtaskInputIcon" id="subtaskPlusIcon" onclick="document.getElementById('subtaskInput').focus()">
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.24854 8H1.24854C0.965202 8 0.727702 7.90417 0.536035 7.7125C0.344368 7.52083 0.248535 7.28333 0.248535 7C0.248535 6.71667 0.344368 6.47917 0.536035 6.2875C0.727702 6.09583 0.965202 6 1.24854 6H6.24854V1C6.24854 0.716667 6.34437 0.479167 6.53604 0.2875C6.7277 0.0958333 6.9652 0 7.24854 0C7.53187 0 7.76937 0.0958333 7.96104 0.2875C8.1527 0.479167 8.24854 0.716667 8.24854 1V6H13.2485C13.5319 6 13.7694 6.09583 13.961 6.2875C14.1527 6.47917 14.2485 6.71667 14.2485 7C14.2485 7.28333 14.1527 7.52083 13.961 7.7125C13.7694 7.90417 13.5319 8 13.2485 8H8.24854V13C8.24854 13.2833 8.1527 13.5208 7.96104 13.7125C7.76937 13.9042 7.53187 14 7.24854 14C6.9652 14 6.7277 13.9042 6.53604 13.7125C6.34437 13.5208 6.24854 13.2833 6.24854 13V8Z" fill="#2A3647"/>
                    </svg>
                    </div>
                    <div class="subtaskInputIcon dnone" id="subtaskInputClearIcon" onclick="clearSubtaskInput()">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00078 8.40005L2.10078 13.3C1.91745 13.4834 1.68411 13.575 1.40078 13.575C1.11745 13.575 0.884115 13.4834 0.700781 13.3C0.517448 13.1167 0.425781 12.8834 0.425781 12.6C0.425781 12.3167 0.517448 12.0834 0.700781 11.9L5.60078 7.00005L0.700781 2.10005C0.517448 1.91672 0.425781 1.68338 0.425781 1.40005C0.425781 1.11672 0.517448 0.883382 0.700781 0.700049C0.884115 0.516715 1.11745 0.425049 1.40078 0.425049C1.68411 0.425049 1.91745 0.516715 2.10078 0.700049L7.00078 5.60005L11.9008 0.700049C12.0841 0.516715 12.3174 0.425049 12.6008 0.425049C12.8841 0.425049 13.1174 0.516715 13.3008 0.700049C13.4841 0.883382 13.5758 1.11672 13.5758 1.40005C13.5758 1.68338 13.4841 1.91672 13.3008 2.10005L8.40078 7.00005L13.3008 11.9C13.4841 12.0834 13.5758 12.3167 13.5758 12.6C13.5758 12.8834 13.4841 13.1167 13.3008 13.3C13.1174 13.4834 12.8841 13.575 12.6008 13.575C12.3174 13.575 12.0841 13.4834 11.9008 13.3L7.00078 8.40005Z" fill="#2A3647"/>
                    </svg>                
                    </div>
                    <div id="subtaskInputIconSpacer" class="dnone"></div>
                    <div class="subtaskInputIcon dnone" id="subtaskInputCheckIcon" onclick="addSubtask()">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.55118 9.15L14.0262 0.675C14.2262 0.475 14.4637 0.375 14.7387 0.375C15.0137 0.375 15.2512 0.475 15.4512 0.675C15.6512 0.875 15.7512 1.1125 15.7512 1.3875C15.7512 1.6625 15.6512 1.9 15.4512 2.1L6.25118 11.3C6.05118 11.5 5.81785 11.6 5.55118 11.6C5.28452 11.6 5.05118 11.5 4.85118 11.3L0.551184 7C0.351184 6.8 0.25535 6.5625 0.263684 6.2875C0.272017 6.0125 0.376184 5.775 0.576184 5.575C0.776184 5.375 1.01368 5.275 1.28868 5.275C1.56368 5.275 1.80118 5.375 2.00118 5.575L5.55118 9.15Z" fill="#2A3647"/>
                    </svg>                
                    </div>
                    </div>
                    </div>
                    <div id="subtaskListContainer">
                    </div>
                </div>
            </section>
            <div class="buttonContainer">
            <div id="createTaskButton" class="fullButton" onclick="saveEditTask('${task.id}')">
                <p>OK</p>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.79923 9.15L14.2742 0.675C14.4742 0.475 14.7117 0.375 14.9867 0.375C15.2617 0.375 15.4992 0.475 15.6992 0.675C15.8992 0.875 15.9992 1.1125 15.9992 1.3875C15.9992 1.6625 15.8992 1.9 15.6992 2.1L6.49923 11.3C6.29923 11.5 6.0659 11.6 5.79923 11.6C5.53256 11.6 5.29923 11.5 5.09923 11.3L0.79923 7C0.59923 6.8 0.503397 6.5625 0.51173 6.2875C0.520064 6.0125 0.62423 5.775 0.82423 5.575C1.02423 5.375 1.26173 5.275 1.53673 5.275C1.81173 5.275 2.04923 5.375 2.24923 5.575L5.79923 9.15Z" fill="white"/>
                </svg>   
            </div>
        </div>
    </div>
    `
}