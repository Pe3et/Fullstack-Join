/**
 * Returns the HTML template for a contact list letter section.
 * 
 * @param {string} letter - The letter of the contact list section.
 * @returns {string} The HTML template for the contact list letter section.
 */
function getContactListLetterSection(letter) {
    return /*html*/`
        <div class="contactListLetterContainer" id="${letter}">
            <p class="contactListLetter">${letter}</p>
            <div class="contactListSpacer"></div>
        </div>
    `
}

/**
 * Returns the HTML template for a contact list person.
 * 
 * @param {object} contactWithSpecificLetter - The contact object with a specific letter.
 * @param {string} contactWithSpecificLetter.name - The name of the contact.
 * @param {string} contactWithSpecificLetter.email - The email of the contact.
 * @param {string} contactWithSpecificLetter.color - The color of the contact.
 * @returns {string} The HTML template for the contact list person.
 */
function getContactListPersonsTemplate(contactWithSpecificLetter) {
    return /*html*/`
        <div class="personInContactList" onclick='renderContactDetails(${JSON.stringify(contactWithSpecificLetter)})'>
            <div class="personInContactListIcon" style='background: ${contactWithSpecificLetter.color}'><p>${contactWithSpecificLetter.name[0]}${contactWithSpecificLetter.name.split(" ")[1][0]}</p></div>
            <div class="personInContactListData">
                <b class="personInContactListName">${contactWithSpecificLetter.name}</b>
                <a class="personInContactListMail">${contactWithSpecificLetter.email}</a>
            </div>
        </div>
    `
}

/**
 * Returns the HTML template for a contact details section.
 * 
 * @param {object} contact - The contact object.
 * @param {number} contact.id - The ID of the contact.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.email - The email of the contact.
 * @param {string} contact.phone - The phone number of the contact.
 * @param {string} contact.color - The color of the contact.
 * @returns {string} The HTML template for the contact details section.
 */
function getContactDetailsTemplate(contact) {
    return /*html*/`
        <div id="contactContainer_${contact.id}">
            <div class="iconAndName">
                <div class="contactDetailsIcon" style="background: ${contact.color}">
                    <p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p>
                </div>
                <div class="contactDetailsNameAndOptions">
                    <p class="contactDetailsName">${contact.name}</p>
                    <div class="contactDetailsOptions">
                        <p class="contactDetailsOption" onclick='openOverlay("editOverlayContainer", "editContactCardOverlay", ${JSON.stringify(contact)})'>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/></svg>
                            Edit
                        </p>
                        <p class="contactDetailsOption" onclick="deleteContact('${contact.id}')">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 18C2.95 18 2.47917 17.8042 2.0875 17.4125C1.69583 17.0208 1.5 16.55 1.5 16V3C1.21667 3 0.979167 2.90417 0.7875 2.7125C0.595833 2.52083 0.5 2.28333 0.5 2C0.5 1.71667 0.595833 1.47917 0.7875 1.2875C0.979167 1.09583 1.21667 1 1.5 1H5.5C5.5 0.716667 5.59583 0.479167 5.7875 0.2875C5.97917 0.0958333 6.21667 0 6.5 0H10.5C10.7833 0 11.0208 0.0958333 11.2125 0.2875C11.4042 0.479167 11.5 0.716667 11.5 1H15.5C15.7833 1 16.0208 1.09583 16.2125 1.2875C16.4042 1.47917 16.5 1.71667 16.5 2C16.5 2.28333 16.4042 2.52083 16.2125 2.7125C16.0208 2.90417 15.7833 3 15.5 3V16C15.5 16.55 15.3042 17.0208 14.9125 17.4125C14.5208 17.8042 14.05 18 13.5 18H3.5ZM3.5 3V16H13.5V3H3.5ZM5.5 13C5.5 13.2833 5.59583 13.5208 5.7875 13.7125C5.97917 13.9042 6.21667 14 6.5 14C6.78333 14 7.02083 13.9042 7.2125 13.7125C7.40417 13.5208 7.5 13.2833 7.5 13V6C7.5 5.71667 7.40417 5.47917 7.2125 5.2875C7.02083 5.09583 6.78333 5 6.5 5C6.21667 5 5.97917 5.09583 5.7875 5.2875C5.59583 5.47917 5.5 5.71667 5.5 6V13ZM9.5 13C9.5 13.2833 9.59583 13.5208 9.7875 13.7125C9.97917 13.9042 10.2167 14 10.5 14C10.7833 14 11.0208 13.9042 11.2125 13.7125C11.4042 13.5208 11.5 13.2833 11.5 13V6C11.5 5.71667 11.4042 5.47917 11.2125 5.2875C11.0208 5.09583 10.7833 5 10.5 5C10.2167 5 9.97917 5.09583 9.7875 5.2875C9.59583 5.47917 9.5 5.71667 9.5 6V13Z" fill="#2A3647"/></svg>
                            Delete
                        </p>
                    </div>
                </div> 
            </div>      
            <div id="contactDetails_${contact.id}">
                <p class="contactInformation">Contact Information</p>
                <div class="contactSocials">
                    <b>Email</b>
                    <a class="contactDetailsEmail">${contact.email}</a>
                    <b>Phone</b>
                    <a class="contactDetailsPhone">${contact.phone}</a>
                </div>  
            </div>
        </div>
    `;
}

/**
 * Returns the SVG template for a responsive burger button.
 * 
 * @returns {string} The SVG template for the responsive burger button.
 */
function getRespBurgerButtonSVG() {
    return `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_246673_1615" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_246673_1615)">
            <path d="M15.9997 26.6666C15.2663 26.6666 14.6386 26.4055 14.1163 25.8833C13.5941 25.361 13.333 24.7333 13.333 23.9999C13.333 23.2666 13.5941 22.6388 14.1163 22.1166C14.6386 21.5944 15.2663 21.3333 15.9997 21.3333C16.733 21.3333 17.3608 21.5944 17.883 22.1166C18.4052 22.6388 18.6663 23.2666 18.6663 23.9999C18.6663 24.7333 18.4052 25.361 17.883 25.8833C17.3608 26.4055 16.733 26.6666 15.9997 26.6666ZM15.9997 18.6666C15.2663 18.6666 14.6386 18.4055 14.1163 17.8833C13.5941 17.361 13.333 16.7333 13.333 15.9999C13.333 15.2666 13.5941 14.6388 14.1163 14.1166C14.6386 13.5944 15.2663 13.3333 15.9997 13.3333C16.733 13.3333 17.3608 13.5944 17.883 14.1166C18.4052 14.6388 18.6663 15.2666 18.6663 15.9999C18.6663 16.7333 18.4052 17.361 17.883 17.8833C17.3608 18.4055 16.733 18.6666 15.9997 18.6666ZM15.9997 10.6666C15.2663 10.6666 14.6386 10.4055 14.1163 9.88325C13.5941 9.36103 13.333 8.73325 13.333 7.99992C13.333 7.26659 13.5941 6.63881 14.1163 6.11659C14.6386 5.59436 15.2663 5.33325 15.9997 5.33325C16.733 5.33325 17.3608 5.59436 17.883 6.11659C18.4052 6.63881 18.6663 7.26659 18.6663 7.99992C18.6663 8.73325 18.4052 9.36103 17.883 9.88325C17.3608 10.4055 16.733 10.6666 15.9997 10.6666Z" fill="white"/>
            </g>
        </svg>
    `
}

/**
 * Returns the SVG template for a responsive add contact button.
 * 
 * @returns {string} The SVG template for the responsive add contact button.
 */
function getRespAddContactButtonSVG() {
    return `
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.3291 13.6667C24.0132 13.6667 23.7497 13.5602 23.5386 13.3473C23.3275 13.1343
            23.2219 12.8704 23.2219 12.5556V9.44448H20.1108C19.796 9.44448 19.5321 9.33763 19.3191
            9.12392C19.1062 8.9102 18.9997 8.64539 18.9997 8.32948C18.9997 8.01357 19.1062 7.75006
            19.3191 7.53895C19.5321 7.32784 19.796 7.22228 20.1108 7.22228H23.2219V4.11115C23.2219 3.79635 23.3288 3.53246 23.5425 3.31948C23.7562 3.10653 24.021 3.00005 24.3369 3.00005C24.6528 3.00005 24.9163 3.10653 25.1274 3.31948C25.3386 3.53246 25.4441 3.79635 25.4441 4.11115V7.22228H28.5552C28.87 7.22228 29.1339 7.32914 29.3469 7.54285C29.5599 7.75656 29.6663 8.02137 29.6663 8.33728C29.6663 8.65319 29.5599 8.91671 29.3469 9.12782C29.1339 9.33893 28.87 9.44448 28.5552 9.44448H25.4441V12.5556C25.4441 12.8704 25.3373 13.1343 25.1235 13.3473C24.9098 13.5602 24.645 13.6667 24.3291 13.6667ZM10.9997 10.9778C9.53301 10.9778 8.31449 10.4926 7.34411 9.52228C6.37375 8.5519 5.88858 7.33338 5.88858 5.86672C5.88858 4.40005 6.37375 3.18154 7.34411 2.21118C8.31449 1.2408 9.53301 0.755615 10.9997 0.755615C12.4663 0.755615 13.6849 1.2408 14.6552 2.21118C15.6256 3.18154 16.1108 4.40005 16.1108 5.86672C16.1108 7.33338 15.6256 8.5519 14.6552 9.52228C13.6849 10.4926 12.4663 10.9778 10.9997 10.9778ZM1.44411 21.6667C1.12931 21.6667 0.865419 21.5602 0.652441 21.3473C0.439486 21.1343 0.333008 20.8704 0.333008 20.5556V18.3334C0.333008 17.563 0.531152 16.8612 0.927441 16.2279C1.32375 15.5945 1.86635 15.1186 2.55524 14.8C4.12562 14.0815 5.57998 13.5649 6.91831 13.25C8.25666 12.9352 9.61592 12.7779 10.9961 12.7779C12.3763 12.7779 13.7367 12.9352 15.0774 13.25C16.4182 13.5649 17.8663 14.0815 19.4219 14.8C20.1108 15.1334 20.6571 15.613 21.0608 16.2389C21.4645 16.8649 21.6663 17.563 21.6663 18.3334V20.5556C21.6663 20.8704 21.5599 21.1343 21.3469 21.3473C21.1339 21.5602 20.87 21.6667 20.5552 21.6667H1.44411ZM2.55521 19.4445H19.4441V18.3334C19.4441 18.0149 19.3645 17.7149 19.2052 17.4334C19.046 17.1519 18.8071 16.9408 18.4886 16.8C17.0515 16.0963 15.7626 15.6204 14.6219 15.3723C13.4812 15.1241 12.2737 15 10.9997 15C9.72561 15 8.5182 15.1278 7.37744 15.3834C6.23671 15.6389 4.94042 16.1112 3.48857 16.8C3.19966 16.9408 2.97187 17.1519 2.80521 17.4334C2.63854 17.7149 2.55521 18.0149 2.55521 18.3334V19.4445ZM10.9997 8.75562C11.8219 8.75562 12.5089 8.47969 13.0608 7.92785C13.6126 7.37598 13.8886 6.68894 13.8886 5.86672C13.8886 5.04449 13.6126 4.35746 13.0608 3.80562C12.5089 3.25375 11.8219 2.97782 10.9997 2.97782C10.1775 2.97782 9.49042 3.25375 8.93857 3.80562C8.38671 4.35746 8.11077 5.04449 8.11077 5.86672C8.11077 6.68894 8.38671 7.37598 8.93857 7.92785C9.49042 8.47969 10.1775 8.75562 10.9997 8.75562Z" fill="white"/>
        </svg>
    `
}