let validated = {
    name: false,
    email: false,
    password: false,
    title: false,
    dueDate: false,
    category: false
};

/**
 * Validates the name input field.
 * @param {HTMLInputElement} inputRef - The input field to validate.
 * @param {HTMLElement} [errorContainer=inputRef] - The container to display the error message.
 */
function validateName(inputRef, errorContainer = inputRef) {
    const name = inputRef.value;
    if (name.trim().split(' ').length == 2) {
        validated.name = true
        removeErrorMessage(errorContainer);
    } else {
        validated.name = false;
        appendErrorMessage(errorContainer, 'Please enter first and last name.');
    }
}

/**
 * Converts a name to uppercase.
 * @param {string} [nameInput=""] - The name to convert.
 * @returns {string} The name in uppercase.
 */
function getUpperCaseName(nameInput="") {
    let splitName = nameInput.trim().split(' ');
    splitName = splitName.map(name => name = name[0].toUpperCase() + name.slice(1));
    const upperCaseName = splitName[0] + " " + splitName[1];
    return upperCaseName
}

/**
 * Validates the email input field.
 * @param {HTMLInputElement} inputRef - The input field to validate.
 * @param {HTMLElement} [errorContainer=inputRef] - The container to display the error message.
 */
function validateEmail(inputRef, errorContainer = inputRef) {
    const email = inputRef.value;
    if (email.includes('@') && email.includes('.')) {
        validated.email = true;
        removeErrorMessage(errorContainer);
    } else {
        validated.email = false;
        appendErrorMessage(errorContainer, 'Please enter valid email address.');
    }
}

/**
 * Validates the confirmed password input field.
 * @param {HTMLInputElement} inputRef - The input field to validate.
 */
function validateConfirmedPassword(inputRef) {
    const password = inputRef.value;
    const checkPassword = document.getElementById('passwordInput').value;
    if (password == checkPassword && password.trim() != '') {
        validated.password = true;
        removeErrorMessage(inputRef);
    } else {
        validated.password = false;
        appendErrorMessage(inputRef, "Your passwords don't match. Please try again.");
    }
}

/**
 * Validates an input field to ensure it is not empty.
 * @param {HTMLInputElement} inputRef - The input field to validate.
 */
function validateInputNotEmpty(inputRef) {
    const inputValue = inputRef.value;
    const inputType = inputRef.id.slice(0, -5);
    if (inputValue.trim() != '') {
        validated[inputType] = true
        removeErrorMessage(inputRef);
    } else {
        validated[inputType] = false;
        appendErrorMessage(inputRef, 'This field is required.');
    }
}

/**
 * Validates the task category input field.
 */
function validateTaskCategory() {
    const categoryTextRef = document.querySelector('#categoryDropdownButton p');
    if (categoryTextRef.textContent != 'Select task category') {
        validated.category = true;
        categoryTextRef.style.color = '';
        categoryTextRef.parentElement.style.border = '1px solid #d1d1d1'
    } else {
        validated.category = false;
        categoryTextRef.style.color = '#FF8190';
        categoryTextRef.parentElement.style.border = '1px solid #FF001F'
    }
}

/**
 * Appends an error message to an input field.
 * @param {HTMLInputElement} inputRef - The input field to append the error message to.
 * @param {string} errorMessage - The error message to display.
 */
function appendErrorMessage(inputRef, errorMessage) {
    if(!inputRef.classList.contains('inputError')){
        const errorText = document.createElement('p');
        const validationContainer = document.createElement('div');
        validationContainer.classList.add('validationContainer');
        inputRef.insertAdjacentElement('beforebegin', validationContainer);
        validationContainer.append(inputRef);
        errorText.classList.add('errorText');
        errorText.innerText = errorMessage;
        errorText.id = 'error' + inputRef.id;
        inputRef.classList.add('inputError');
        inputRef.insertAdjacentElement('afterend', errorText);
    }
}

/**
 * Removes an error message from an input field.
 * @param {HTMLInputElement} inputRef - The input field to remove the error message from.
 */
function removeErrorMessage(inputRef) {
    const errorText = document.getElementById('error' + inputRef.id);
    errorText && errorText.remove();
    inputRef.classList.remove('inputError');
}