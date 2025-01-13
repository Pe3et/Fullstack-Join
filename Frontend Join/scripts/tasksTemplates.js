/**
 * Returns a template string for a contact dropdown element.
 * 
 * @param {Object} contact - The contact object containing id, name, and color properties.
 * @returns {string} A template string for the contact dropdown element.
 */
function getContactDropdownTemplate(contact) {
    return `
        <div class="dropdownContent" id="${contact.id}" onclick='assignContact(${JSON.stringify(contact)})'>
            <div class="dropdownContactIconAndName">
              <div class="contactIcon" style='background: ${contact.color}'><p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p></div>
              <p>${contact.name}</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
            </svg>
        </div>
    `
}

/**
 * Returns an SVG string representing a checkbox icon based on the provided status.
 * 
 * @param {string} status - The status of the checkbox, either "checked" or "unchecked".
 * @returns {string} An SVG string representing the checkbox icon.
 */
function getCheckboxSVG(status) {
    switch (status) {
        case "checked":
            return `<path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M5 9L9 13L17 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
        case "unchecked":
            return '<rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>';
        default:
            break;
    }
}

/**
 * Returns a template string for a subtask list element.
 * 
 * @param {string} subtask - The text content of the subtask.
 * @param {number} index - The index of the subtask in the list.
 * @returns {string} A template string for the subtask list element.
 */
function getSubtaskListTemplate(subtask, index) {
    return `
        <div class="subtaskListElement"><li id="subtaskLiElement${index}" onclick="editSubtaskMode(${index})" contenteditable=true onkeydown="if(event.key === 'Enter') exitEditSubtaskMode(${index})">${subtask}</li>
        <div class="subtaskListIcons">
            <div id="subtaskEditIcon${index}" class="subtaskInputIcon" onclick="editSubtaskMode(${index})">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.00098 17H3.40098L12.026 8.375L10.626 6.975L2.00098 15.6V17ZM16.301 6.925L12.051 2.725L13.451 1.325C13.8343 0.941667 14.3051 0.75 14.8635 0.75C15.4218 0.75 15.8926 0.941667 16.276 1.325L17.676 2.725C18.0593 3.10833 18.2593 3.57083 18.276 4.1125C18.2926 4.65417 18.1093 5.11667 17.726 5.5L16.301 6.925ZM14.851 8.4L4.25098 19H0.000976562V14.75L10.601 4.15L14.851 8.4Z" fill="#2A3647"/>
                </svg>
            </div>
            <div class="subtaskListSpacer"></div>
            <div class="subtaskInputIcon" onclick="deleteSubtask(${index})">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.00098 18C2.45098 18 1.98014 17.8042 1.58848 17.4125C1.19681 17.0208 1.00098 16.55 1.00098 16V3C0.717643 3 0.480143 2.90417 0.288477 2.7125C0.0968099 2.52083 0.000976562 2.28333 0.000976562 2C0.000976562 1.71667 0.0968099 1.47917 0.288477 1.2875C0.480143 1.09583 0.717643 1 1.00098 1H5.00098C5.00098 0.716667 5.09681 0.479167 5.28848 0.2875C5.48014 0.0958333 5.71764 0 6.00098 0H10.001C10.2843 0 10.5218 0.0958333 10.7135 0.2875C10.9051 0.479167 11.001 0.716667 11.001 1H15.001C15.2843 1 15.5218 1.09583 15.7135 1.2875C15.9051 1.47917 16.001 1.71667 16.001 2C16.001 2.28333 15.9051 2.52083 15.7135 2.7125C15.5218 2.90417 15.2843 3 15.001 3V16C15.001 16.55 14.8051 17.0208 14.4135 17.4125C14.0218 17.8042 13.551 18 13.001 18H3.00098ZM3.00098 3V16H13.001V3H3.00098ZM5.00098 13C5.00098 13.2833 5.09681 13.5208 5.28848 13.7125C5.48014 13.9042 5.71764 14 6.00098 14C6.28431 14 6.52181 13.9042 6.71348 13.7125C6.90514 13.5208 7.00098 13.2833 7.00098 13V6C7.00098 5.71667 6.90514 5.47917 6.71348 5.2875C6.52181 5.09583 6.28431 5 6.00098 5C5.71764 5 5.48014 5.09583 5.28848 5.2875C5.09681 5.47917 5.00098 5.71667 5.00098 6V13ZM9.00098 13C9.00098 13.2833 9.09681 13.5208 9.28848 13.7125C9.48014 13.9042 9.71764 14 10.001 14C10.2843 14 10.5218 13.9042 10.7135 13.7125C10.9051 13.5208 11.001 13.2833 11.001 13V6C11.001 5.71667 10.9051 5.47917 10.7135 5.2875C10.5218 5.09583 10.2843 5 10.001 5C9.71764 5 9.48014 5.09583 9.28848 5.2875C9.09681 5.47917 9.00098 5.71667 9.00098 6V13Z" fill="#2A3647"/>
                </svg>
            </div>
        </div>
    `
}

/**
 * Returns an SVG string representing a subtask check icon.
 * 
 * @returns {string} An SVG string representing the subtask check icon.
 */
function getSubtaskCheckIcon() {
    return `<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.69474 9.15L14.1697 0.675C14.3697 0.475 14.6072 0.375 14.8822 0.375C15.1572 0.375 15.3947 0.475 15.5947 0.675C15.7947 0.875 15.8947 1.1125 15.8947 1.3875C15.8947 1.6625 15.7947 1.9 15.5947 2.1L6.39474 11.3C6.19474 11.5 5.96141 11.6 5.69474 11.6C5.42807 11.6 5.19474 11.5 4.99474 11.3L0.694738 7C0.494738 6.8 0.398905 6.5625 0.407238 6.2875C0.415572 6.0125 0.519738 5.775 0.719738 5.575C0.919738 5.375 1.15724 5.275 1.43224 5.275C1.70724 5.275 1.94474 5.375 2.14474 5.575L5.69474 9.15Z" fill="#2A3647"/>
            </svg>`
}

/**
 * Returns an SVG string representing a subtask edit icon.
 * 
 * @returns {string} An SVG string representing the subtask edit icon.
 */
function getSubtaskEditIcon() {
    return `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00098 17H3.40098L12.026 8.375L10.626 6.975L2.00098 15.6V17ZM16.301 6.925L12.051 2.725L13.451 1.325C13.8343 0.941667 14.3051 0.75 14.8635 0.75C15.4218 0.75 15.8926 0.941667 16.276 1.325L17.676 2.725C18.0593 3.10833 18.2593 3.57083 18.276 4.1125C18.2926 4.65417 18.1093 5.11667 17.726 5.5L16.301 6.925ZM14.851 8.4L4.25098 19H0.000976562V14.75L10.601 4.15L14.851 8.4Z" fill="#2A3647"/>
            </svg>`
}

/**
 * Returns an SVG string representing a board icon.
 * 
 * @returns {string} An SVG string representing the board icon.
 */
function getBoardSVG() {
    return `<svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.4544 2.77273L23.4545 23.2271C23.4538 23.8296 23.2142 24.4074 22.7881 24.8334C22.362 25.2595 21.7843 25.4992 21.1817 25.4998L16.6363 25.4998C16.0338 25.4992 15.456 25.2595 15.03 24.8334C14.6039 24.4074 14.3642 23.8296 14.3636 23.2271L14.3636 2.77273C14.3642 2.17015 14.6039 1.59243 15.03 1.16635C15.456 0.740262 16.0338 0.500623 16.6363 0.50002L21.1817 0.50002C21.7843 0.500623 22.362 0.740262 22.7881 1.16635C23.2142 1.59243 23.4538 2.17015 23.4544 2.77273ZM16.6363 23.2271L21.1817 23.2271L21.1817 2.77273L16.6363 2.77273L16.6363 23.2271ZM16.6363 2.77273L16.6363 23.2271C16.6357 23.8296 16.3961 24.4073 15.97 24.8334C15.5439 25.2595 14.9662 25.4991 14.3636 25.4997L9.81823 25.4997C9.21566 25.4991 8.63794 25.2595 8.21185 24.8334C7.78577 24.4073 7.54613 23.8296 7.54553 23.227L7.54553 2.7727C7.54613 2.17013 7.78577 1.59241 8.21185 1.16632C8.63793 0.740238 9.21566 0.500602 9.81823 0.5L14.3636 0.499999C14.9662 0.500602 15.5439 0.740238 15.97 1.16632C16.3961 1.59241 16.6357 2.17015 16.6363 2.77273ZM9.81823 23.227L14.3636 23.2271L14.3636 2.77273L9.81823 2.7727L9.81823 23.227ZM9.81823 2.7727L9.81823 23.227C9.81763 23.8296 9.57799 24.4073 9.15191 24.8334C8.72582 25.2595 8.1481 25.4991 7.54553 25.4997L3.00012 25.4997C2.39755 25.4991 1.81983 25.2595 1.39374 24.8334C0.967657 24.4073 0.728019 23.8296 0.727417 23.227L0.727416 2.7727C0.728018 2.17013 0.967656 1.59241 1.39374 1.16632C1.81982 0.740238 2.39755 0.500603 3.00012 0.5L7.54553 0.5C8.1481 0.500602 8.72582 0.740238 9.1519 1.16632C9.57799 1.59241 9.81763 2.17013 9.81823 2.7727ZM3.00012 23.227L7.54553 23.227L7.54553 2.7727L3.00012 2.7727L3.00012 23.227Z" fill="white"/>
                <path d="M30.2726 2.77298L30.2726 23.2273C30.272 23.8299 30.0323 24.4076 29.6062 24.8337C29.1802 25.2598 28.6024 25.4994 27.9999 25.5L23.4545 25.5C22.8519 25.4994 22.2742 25.2598 21.8481 24.8337C21.422 24.4076 21.1824 23.8296 21.1817 23.2271L21.1817 2.77273C21.1823 2.17015 21.422 1.59268 21.8481 1.1666C22.2742 0.740514 22.8519 0.500876 23.4544 0.500274L27.9999 0.500273C28.6024 0.500876 29.1801 0.740514 29.6062 1.1666C30.0323 1.59268 30.272 2.1704 30.2726 2.77298ZM23.4545 23.2271L27.9999 23.2273L27.9999 2.77298L23.4544 2.77273L23.4545 23.2271Z" fill="white"/>
            </svg>`
}