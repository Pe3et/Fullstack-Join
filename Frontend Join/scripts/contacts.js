/**
 * Initializes the application by loading the contact list.
 */
function init() {
    loadContactList();
}

/**
 * Loads the contact list from the database and renders it in the contact list content element.
 * 
 * @async
 * @function loadContactList
 * @returns {Promise<void>}
 */
async function loadContactList() {
    const contactResults = await getFromDB("contacts");
    document.getElementById("contactListContent").innerHTML = "";
    if(contactResults) {
        contactsArray = getContactsArray(contactResults);
        firstLettersArray = getFirstLettersArray(contactsArray);
        firstLettersArray.forEach(letter => {
            renderLetterSection(letter);
            const contactsWithSameFirstLetter = contactsArray.filter(contact => contact.name[0] == letter);
            contactsWithSameFirstLetter.forEach(contact => renderContactInList(contact))
        });
        addClickListenersToContacts();
    }
}

/**
 * Renders a contact in the contact list.
 * 
 * @param {Object} contact - The contact object to be rendered.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * 
 * @returns {void}
 */
function renderContactInList(contact) {
    const contentRef = document.getElementById(contact.name[0]);
    contentRef.innerHTML += getContactListPersonsTemplate(contact);
}

/**
 * Returns the HTML template for a contact in the contact list.
 * 
 * @param {Object} contact - The contact object to be rendered.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * 
 * @returns {string} The HTML template for the contact.
 */
function getContactListPersonsTemplate(contact) {
    return `
        <div class="personInContactList" data-contact-id="${contact.id}">
            <p>${contact.name}</p>
        </div>
    `;
}

/**
 * Retrieves a contact object from the contacts array based on the provided contact element.
 * 
 * @param {HTMLElement} contactElement - The contact element containing the contact ID.
 * @returns {Object} The contact object associated with the provided contact element.
 */
function getContactFromElement(contactElement) {
    const contactId = contactElement.getAttribute('data-contact-id');
    const contact = contactsArray.find(contact => contact.id === contactId);
    return contact;
}

/**
 * Renders a letter section in the contact list.
 * 
 * @param {string} letter - The letter to be rendered.
 * @returns {void}
 */
function renderLetterSection(letter) {
    const contentRef = document.getElementById("contactListContent");
    contentRef.innerHTML += getContactListLetterSection(letter);
}

/**
 * Retrieves an array of unique first letters from a given array of contact objects.
 * 
 * @param {Array<Object>} contactsArray - The array of contact objects.
 * @returns {Array<string>} An array of unique first letters.
 */
function getFirstLettersArray(contactsArray) {
    firstLettersArray = [];
    contactsArray.forEach(contact => {
        const firstLetter = contact.name[0];
        !firstLettersArray.includes(firstLetter) && firstLettersArray.push(firstLetter)
    })
    return firstLettersArray;
}

/**
 * Retrieves an array of contact objects from a given object of contact results.
 * 
 * @param {Object} contactResults - The object containing contact results.
 * @returns {Array<Object>} An array of contact objects.
 */
function getContactsArray(contactResults) {
    contacts = [];
    Object.keys(contactResults).forEach(key => {
        contacts.push({
            id: key,
            name: contactResults[key].name,
            email: contactResults[key].email,
            phone: contactResults[key].phone,
            color: contactResults[key].color
        });
    });
    contacts.sort((a, b) => (a.name).localeCompare(b.name));
    return contacts;
}

/**
 * Renders the contact details in the contact content element.
 * 
 * @param {Object} contact - The contact object to be rendered.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * @param {string} contact.email - The email of the contact.
 * @param {string} contact.phone - The phone number of the contact.
 * @param {string} contact.color - The color associated with the contact.
 * 
 * @returns {void}
 */
function renderContactDetails(contact) {
    const contentRef = document.getElementById('contactContent');
    contentRef.style.transition = "none";
    contentRef.style.left = "100vw";
    contentRef.innerHTML = getContactDetailsTemplate(contact);
    window.innerWidth <= 1050 && respContentToggle(contact);
    setTimeout(() => {
        contentRef.style.transition = "all 300ms ease-out";
        contentRef.style.left = "0";
    }, 1);
}

/**
 * Toggles the responsive contact content and list.
 * 
 * @param {Object} contact - The contact object associated with the toggle action.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * 
 * @returns {void}
 */
function respContentToggle(contact) {
    const contactContainerRef = document.querySelector('.contactContainer');
    const contactListRef = document.querySelector('.contactList');
    contactListRef.classList.toggle('dnone');
    swapRespBurgerButton(contact);
}

/**
 * Swaps the responsive burger button based on the contact list visibility.
 * 
 * @param {Object} contact - The contact object associated with the swap action.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * 
 * @returns {void}
 */
function swapRespBurgerButton(contact) {
    const buttonRef = document.querySelector('.respButton');
    const contactListRef = document.querySelector('.contactList');
    if(contactListRef.classList.contains('dnone')) {
        buttonRef.innerHTML = getRespBurgerButtonSVG();
        buttonRef.onclick = () => toggleRespContextMenu(contact);
    } else {
        buttonRef.innerHTML = getRespAddContactButtonSVG();
        buttonRef.onclick = () => openOverlay('addContactOverlayContainer', 'addContactCardOverlay');
    }
}

/**
 * Toggles the responsive contact context menu.
 * 
 * @param {Object} contact - The contact object associated with the toggle action.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * 
 * @returns {void}
 */
function toggleRespContextMenu(contact) {
    const respContactOptionsRef = document.querySelector('.respContactOptions');
    const buttonRef = document.querySelector('.respButton');
    buttonRef.classList.toggle('dnone');
    respContactOptionsRef.classList.toggle('respContactOptionsSlideIn');
    if(buttonRef.classList.contains('dnone')) {
        setTimeout(() => document.addEventListener('click', closeRespContextMenuCheck), 0)
        document.getElementById('respEditButton').onclick = () => openOverlay('editOverlayContainer', 'editContactCardOverlay', contact);
        document.getElementById('respDeleteButton').onclick = () => {deleteContact(contact.id); respContentToggle()};
    } else {
        document.removeEventListener('click', closeRespContextMenuCheck)
    }
}

/**
 * Checks if a click event occurred outside the responsive contact context menu and toggles it if necessary.
 * 
 * @param {Event} event - The click event to be checked.
 * @returns {void}
 */
function closeRespContextMenuCheck(event) {
    const respContactOptionsRef = document.querySelector('.respContactOptions');
    const buttonRef = document.querySelector('.respButton');
    if(event.target != respContactOptionsRef && event.target != buttonRef) {
        toggleRespContextMenu();
    }
}

/**
 * Opens the overlay for adding or editing a contact.
 * 
 * @param {string} containerRefID - The ID of the overlay container element.
 * @param {string} cardRefId - The ID of the overlay card element.
 * @param {Object} [contact] - The contact object to be edited (optional).
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * 
 * @returns {void}
 */
function openOverlay(containerRefID, cardRefId, contact) {
    document.getElementById(containerRefID).classList.add('overlayAppear');
    document.getElementById(containerRefID).classList.add('overlayBackgroundColor');
    window.innerWidth > 1050 ? document.getElementById(cardRefId).classList.add('slideInRight') : document.getElementById(cardRefId).classList.add('slideInBottom');
    contact != undefined && loadEditContactCard(contact);
}

/**
 * Closes the overlay for adding or editing a contact.
 * 
 * @param {string} containerRefID - The ID of the overlay container element.
 * @param {string} cardRefId - The ID of the overlay card element.
 * 
 * @returns {void}
 */
function closeOverlay(containerRefID, cardRefId) {
    document.getElementById(containerRefID).classList.remove('overlayBackgroundColor');
    document.getElementById(cardRefId).classList.remove('slideInRight');
    document.getElementById(cardRefId).classList.remove('slideInBottom');
    setTimeout(() => {
        document.getElementById(containerRefID).classList.remove('overlayAppear')
    }, 300);
    emptyInputFields();
}

/**
 * Loads the edit contact card with the provided contact information.
 * 
 * @param {Object} contact - The contact object to be loaded.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * @param {string} contact.email - The email of the contact.
 * @param {string} contact.phone - The phone number of the contact.
 * @param {string} contact.color - The color associated with the contact.
 * 
 * @returns {void}
 */
function loadEditContactCard(contact) {
    document.getElementById('editContactInputName').value = contact.name;
    document.getElementById('editContactInputEmail').value = contact.email;
    document.getElementById('editContactInputPhone').value = contact.phone;
    document.getElementById('editContactButton').setAttribute("onclick", `editContact(${JSON.stringify(contact)})`);
    document.getElementById('deleteContactOverlayButton').setAttribute("onclick", `deleteContact("${contact.id}")`);
    const profileIconRef = document.getElementById('editCardProfileIcon');
    profileIconRef.innerHTML = `
        <div class="contactDetailsIcon" style="background: ${contact.color}">
            <p>${contact.name[0]}${contact.name.split(" ")[1][0]}</p>
        </div>
    `;
}

/**
 * Resets the input fields for adding or editing a contact.
 * 
 * @function emptyInputFields
 * @returns {void}
 */
function emptyInputFields() {
    document.getElementById('addContactInputName').value = "";
    document.getElementById('addContactInputEmail').value = "";
    document.getElementById('addContactInputPhone').value = "";
    document.getElementById('editContactInputName').value = "";
    document.getElementById('editContactInputEmail').value = "";
    document.getElementById('editContactInputPhone').value = "";
    document.querySelectorAll('.inputError').forEach(errorRef => removeErrorMessage(errorRef));
}

/**
 * Edits a contact by updating its name, email, and phone number in the database.
 * 
 * @async
 * @function editContact
 * @param {Object} contact - The contact object to be edited.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.id - The ID of the contact.
 * @param {string} contact.email - The email of the contact.
 * @param {string} contact.phone - The phone number of the contact.
 * @returns {Promise<void>}
 */
async function editContact(contact) {
    let nameInput = document.getElementById('editContactInputName').value;
    const emailInput = document.getElementById('editContactInputEmail').value;
    const phoneInput = document.getElementById('editContactInputPhone').value;
    if (validateAddContact('editContactInputName', 'editContactInputEmail')) {
        nameInput = getUpperCaseName(nameInput);
        await putToDB(nameInput, ("contacts/" + contact.id + "/name"));
        await putToDB(emailInput, ("contacts/" + contact.id + "/email"));
        await putToDB(phoneInput, ("contacts/" + contact.id + "/phone"));
        await loadContactList();
        document.querySelector('.contactDetailsName').innerText = nameInput;
        document.querySelector('.contactDetailsEmail').innerText = emailInput;
        document.querySelector('.contactDetailsPhone').innerText = phoneInput;
        hardcloseEditOverlay();
    }
}

/**
 * Closes the edit overlay.
 * 
 * @function hardcloseEditOverlay
 * @returns {void}
 */
function hardcloseEditOverlay() {
    document.getElementById('editOverlayContainer').classList.remove('overlayBackgroundColor');
    document.getElementById('editContactCardOverlay').classList.remove('slideInRight');
    document.getElementById('editOverlayContainer').classList.remove('overlayAppear');
}

/**
 * Adds a new contact to the database and updates the contact list.
 * 
 * @async
 * @function addContact
 * @returns {Promise<void>}
 */
async function addContact() {
    let nameInput = document.getElementById('addContactInputName').value;
    const emailInput = document.getElementById('addContactInputEmail').value;
    const phoneInput = document.getElementById('addContactInputPhone').value;
    if (validateAddContact('addContactInputName', 'addContactInputEmail')) {
        nameInput = getUpperCaseName(nameInput);
        const randomColor = getRandomColor();
        const newContact = { name: nameInput, email: emailInput, phone: phoneInput, color: randomColor };
        await postToDB(newContact, "contacts");
        loadContactList();
        closeOverlay("addContactOverlayContainer", "addContactCardOverlay");
        contactCreatedSuccess();
    }
}

/**
 * Deletes a contact from the database and updates the contact list.
 * 
 * @async
 * @function deleteContact
 * @param {string} key - The ID of the contact to be deleted.
 * @returns {Promise<void>}
 */
async function deleteContact(key) {
    await deleteFromDB("contacts/" + key);
    document.getElementById('contactContent').innerHTML = "";
    loadContactList();
    if (document.getElementById('editOverlayContainer').classList.contains("overlayAppear")) {
        document.getElementById('editOverlayContainer').classList.remove('overlayBackgroundColor');
        document.getElementById('editContactCardOverlay').classList.remove('slideInRight');
        document.getElementById('editOverlayContainer').classList.remove('overlayAppear');
    }
}

/**
 * Handles the successful creation of a contact by removing the add contact overlay and animating a success message.
 * 
 * @function contactCreatedSuccess
 * @returns {void}
 */
function contactCreatedSuccess() {
    const ref = document.getElementById('contactCreateSuccess');
    const slideInDirectionClass = window.innerWidth > 1050 ? 'slideInRight' : 'slideInBottomSuccess';
    document.getElementById('addContactOverlayContainer').classList.remove('overlayBackgroundColor');
    document.getElementById('addContactCardOverlay').classList.remove('slideInRight');
    document.getElementById('addContactOverlayContainer').classList.remove('overlayAppear');
    ref.classList.add(slideInDirectionClass);
    setTimeout(() => { ref.classList.remove(slideInDirectionClass); }, 800);
}

/**
 * Adds click event listeners to the contact list elements.
 * 
 * @function addClickListenersToContacts
 * @returns {void}
 */
function addClickListenersToContacts() {
    const contactElements = document.querySelectorAll('.personInContactList');
    contactElements.forEach(contact => {
        contact.addEventListener('click', function () {     
            contactElements.forEach(c => c.classList.remove('active'));
            contact.classList.add('active');
        });
    });
}

/**
 * Validates the input fields for adding a new contact.
 * 
 * @param {string} nameInputID - The ID of the name input field.
 * @param {string} emailInputID - The ID of the email input field.
 * @returns {boolean} True if the input fields are valid, false otherwise.
 */
function validateAddContact(nameInputID, emailInputID) {
    const nameInputRef = document.getElementById(nameInputID);
    const emailInputRef = document.getElementById(emailInputID);
    validateName(nameInputRef, nameInputRef.closest('.inputContainer'));
    validateEmail(emailInputRef, emailInputRef.closest('.inputContainer'));
    if(validated.name && validated.email) {
        return true
    } else {
        return false
    }
}