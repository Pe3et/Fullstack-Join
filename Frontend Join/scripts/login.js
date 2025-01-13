window.addEventListener('resize', ensureCorrectContainerTransitionOnRezise);
let containerMode = 'login';
let policyAccepted = false;

/**
 * Initializes the login process by starting the animation and rendering the login page if remember me is not checked.
 * If remember me is checked, redirects to the summary page.
 */
function initLogin() {
    startAnimation();
    joinStorage.rememberMe == true ? location.href = 'summary.html' : renderLogin();
}

/**
 * Starts the animation for the logo and logo container.
 * Adds the 'logoEndPoint' class to the logo element, sets the fill color of the logo fill elements to '#2A3647',
 * sets the background color of the logo container to '#2a364700', and then sets the height of the logo container to 0 after a delay of 800ms.
 */
function startAnimation() {
    const logo = document.querySelector('.logo');
    const logoContainer = document.getElementById('logoContainer');
    logo.classList.add('logoEndPoint');
    document.querySelectorAll('.logo .logoFill').forEach( e => e.style.fill = "#2A3647");
    logoContainer.style.background = "#2a364700";
    setTimeout( () => logoContainer.style.height = 0, 800);
}

/**
 * Renders the login page by setting the innerHTML of the content container to the login template,
 * removing the 'dnone' class from the sign up option, setting the container mode to 'login',
 * and toggling the checkbox if remember me is true.
 * It also sets up the container transition.
 */
function renderLogin() {
    const containerRef = document.getElementById('contentContainer');
    containerRef.innerHTML = getLoginTemplate();
    document.getElementById('signUpOption').classList.remove('dnone');
    containerMode = "login";
    joinStorage.rememberMe == true && toggleCheckbox('checked');
    setupContainerTransition(containerRef);
}

/**
 * Renders the sign up page by setting the innerHTML of the content container to the sign up template,
 * hiding the sign up option, setting the container mode to 'signup', and setting up the container transition.
 */
function renderSignUp() {
    const containerRef = document.getElementById('contentContainer');
    containerRef.innerHTML = getSignUpTemplate();
    document.getElementById('signUpOption').classList.add('dnone');
    containerMode = "signup";
    setupContainerTransition(containerRef);
}

/**
 * Sets up the transition for the container element.
 * 
 * @param {HTMLElement} containerRef The container element to set up the transition for.
 * 
 * @description This function sets up the transition for the container element by setting its initial height and width,
 * and then setting its final height and width after a short delay. The direction of the transition depends on the current container mode.
 */
function setupContainerTransition(containerRef) {
    let transitionDirection = { start: '', end: ''};
    let startValue = containerMode == 'login' ? 0 : '1000px';
    containerMode == 'login' ? transitionDirection = {start:'min', end:'max'} : transitionDirection = {start:'max', end:'min'};
    containerRef.style[`${transitionDirection.start}Height`] = startValue;
    containerRef.style[`${transitionDirection.start}Width`] = startValue;
    setTimeout( () => {
        containerRef.style[`${transitionDirection.end}Height`] = `${containerRef.getBoundingClientRect().height}px`;
        containerRef.style[`${transitionDirection.end}Width`] = `${containerRef.getBoundingClientRect().width}px`;
    }, 125);
}

/**
 * Ensures the correct container transition on resize by resetting the container's max and min height and width,
 * and then setting up the container transition.
 * 
 * @description This function is called on window resize to ensure the container's transition is correct.
 * It resets the container's max and min height and width, and then sets up the container transition.
 * 
 * @see setupContainerTransition
 */
function ensureCorrectContainerTransitionOnRezise() {
    const containerRef = document.getElementById('contentContainer');
    containerRef.style.maxHeight = '';
    containerRef.style.maxWidth = '';
    containerRef.style.minHeight = '';
    containerRef.style.minWidth = '';
    setupContainerTransition(containerRef);
}

/**
 * Toggles the checkbox status by updating its inner HTML and setting the onclick attribute.
 * 
 * @param {string} status The status of the checkbox, either 'checked' or 'unchecked'.
 * 
 * @description This function updates the checkbox's inner HTML with the corresponding SVG icon
 * and sets the onclick attribute to toggle the checkbox status.
 */
function toggleCheckbox(status) {
    const checkbox = document.getElementById('checkbox');
    checkbox.innerHTML = getCheckboxSVG(status);
    if (status == 'checked') {
        checkbox.setAttribute('onclick', "toggleCheckbox('unchecked')");
    } else {
        checkbox.setAttribute('onclick', "toggleCheckbox('checked')");
    }
}

/**
 * Toggles the remember me status by updating the joinStorage object and the checkbox element.
 * 
 * @description This function updates the joinStorage object with the new remember me status and
 * toggles the checkbox element accordingly.
 */
function toggleRememberMe() {
    const checkbox = document.getElementById('checkbox');
    joinStorage.rememberMe = !joinStorage.rememberMe;
    checkbox.addEventListener('click', toggleRememberMe);
}

/**
 * Checks if the provided login credentials match any existing user in the database.
 * If a match is found, it stores the active user's name in local storage and redirects to the summary page.
 * If no match is found, it calls the loginError function to display an error message.
 * 
 * @async
 * @function checkLoginSucces
 * @returns {void}
 */
async function checkLoginSucces() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const contactResults = await getFromDB('contacts');
    let loginSucces = false;
    if(contactResults) {
        Object.keys(contactResults).forEach(id => {
            if (contactResults[id].email == email && contactResults[id].password == password) {
                loginSucces = true;
                localStoreActiveUser(contactResults[id].name);
                location.href = "summary.html"
            }
        });
    }
    (loginSucces == false) && loginError();
}

/**
 * Handles the login error by adding an error class to the email input field and appending an error message to the password input field.
 * 
 * @description This function is called when the login credentials are invalid. It adds an error class to the email input field and appends an error message to the password input field.
 */
function loginError() {
    document.getElementById('emailInput').classList.add('inputError');
    removeErrorMessage(document.getElementById('passwordInput'));
    appendErrorMessage(document.getElementById('passwordInput'), 'Check your email and password. Please try again.')
}

/**
 * Stores the active user's name in local storage and updates the joinStorage object.
 * 
 * @param {string} name The name of the active user.
 * 
 * @description This function updates the joinStorage object with the active user's name and icon initials,
 * and stores the updated object in local storage. It also sets the 'loggedIn' status to true in session storage.
 */
function localStoreActiveUser(name) {
    joinStorage.userName = name;
    joinStorage.iconInitials = `${name[0]}${name.split(" ")[1][0]}`;
    localStorage.setItem('joinStorage', JSON.stringify(joinStorage));
    sessionStorage.setItem('loggedIn', JSON.stringify(true));
}

/**
 * Logs in as a guest by clearing local storage, setting the joinStorage object to a guest user,
 * and redirecting to the summary page.
 * 
 * @description This function logs in as a guest by clearing local storage, setting the joinStorage object to a guest user,
 * and redirecting to the summary page. The guest user is identified by the icon initials 'G' and has remember me set to false.
 */
function loginGuest() {
    localStorage.clear();
    joinStorage = {iconInitials: 'G', rememberMe: false};
    localStorage.setItem('joinStorage', JSON.stringify(joinStorage));
    sessionStorage.setItem('loggedIn', JSON.stringify(true));
    location.href = 'summary.html'
}

/**
 * Handles the sign up process by creating a new user object, posting it to the database, and storing the active user's name in local storage.
 * 
 * @async
 * @function signUp
 * @returns {void}
 */
async function signUp() {
    const newUser = {};
    newUser.name = getUpperCaseName(document.getElementById('nameInput').value);
    newUser.email = document.getElementById('emailInput').value;
    newUser.password = document.getElementById('confirmPasswordInput').value;
    newUser.color = getRandomColor();
    newUser.phone = '';
    await postToDB(newUser, 'contacts');
    localStoreActiveUser(newUser.name);
    signUpSuccessAnimationAndRedirect();
}

/**
 * Handles the sign up success animation and redirects to the summary page.
 * 
 * @description This function removes the animation start point class from the sign up success element,
 * removes the hidden class from the sign up success background element, and removes the animation background color class.
 * It then redirects to the summary page after a delay of 1000ms.
 * 
 * @returns {void}
 */
function signUpSuccessAnimationAndRedirect() {
    document.querySelector('.signUpSuccess').classList.remove('signupSuccessAnimationStartpoint');
    document.querySelector('.signUpSuccessBackground').classList.remove('hidden');
    document.querySelector('.signUpSuccessBackground').classList.remove('animationBackgroundColor');
    setTimeout(()=>{location.href = 'summary.html'}, 1000)
}

/**
 * Toggles the policy acceptance status by updating the policyAccepted variable and adding or removing an event listener to the checkbox element.
 * If the policy is accepted, it calls the validateSignUpInput function to validate the sign up input fields.
 * 
 * @description This function is called when the policy acceptance checkbox is clicked. It updates the policyAccepted variable and adds or removes an event listener to the checkbox element.
 * If the policy is accepted, it calls the validateSignUpInput function to validate the sign up input fields.
 * 
 * @returns {void}
 */
function togglePolicyAccept() {
    const checkbox = document.getElementById('checkbox');
    policyAccepted = !policyAccepted;
    checkbox.addEventListener('click', togglePolicyAccept);
    policyAccepted == true && validateSignUpInput();
}

/**
 * Validates the sign up input fields by checking the name, email, and confirmed password.
 * If all fields are valid and the policy is accepted, it enables the sign up button.
 * Otherwise, it disables the sign up button, toggles the policy acceptance, and unchecks the checkbox.
 * 
 * @description This function is called when the policy acceptance checkbox is clicked or when the sign up input fields are updated.
 * It validates the sign up input fields and updates the sign up button accordingly.
 * 
 * @returns {void}
 */
function validateSignUpInput() {
    validateName(document.getElementById('nameInput'));
    validateEmail(document.getElementById('emailInput'));
    validateConfirmedPassword(document.getElementById('confirmPasswordInput'));
    if(validated.name == true && validated.email == true && validated.password == true && policyAccepted) {
        enableSignUpButton();
    } else {
        disableSignUpButton();
        togglePolicyAccept();
        toggleCheckbox('unchecked');
    }
}

/**
 * Enables the sign up button by removing the 'disabledButton' class and adding an event listener to the button.
 * 
 * @description This function is called when the sign up input fields are valid and the policy is accepted.
 * It enables the sign up button, allowing the user to proceed with the sign up process.
 * 
 * @returns {void}
 */
function enableSignUpButton() {
    const signUpButton = document.getElementById('signUpButton');
    signUpButton.classList.remove('disabledButton');
    signUpButton.addEventListener('click', signUp);
}

/**
 * Disables the sign up button by adding the 'disabledButton' class and removing the event listener.
 * 
 * @description This function is called when the sign up input fields are invalid or the policy is not accepted.
 * It disables the sign up button, preventing the user from proceeding with the sign up process.
 * 
 * @returns {void}
 */
function disableSignUpButton() {
    const signUpButton = document.getElementById('signUpButton');
    signUpButton.classList.add('disabledButton');
    signUpButton.removeEventListener('click', signUp);
}

/**
 * Toggles the password visibility icon based on the input field's value.
 * If the input field has a value, it removes the background image and inserts a visibility icon before the input field.
 * If the input field is empty, it removes the visibility icon and sets the background image to a lock icon.
 * 
 * @param {HTMLElement} passwordInputRef The password input field element.
 * @returns {void}
 */
function getPasswordVisibilityIcon(passwordInputRef) {
    if (passwordInputRef.value) {
        passwordInputRef.style.backgroundImage = 'none';
        const visibilityIcon = createVisibilityIcon(false);
        !passwordInputRef.closest('.passwordWrapper').querySelector('.visibilityIcon') && passwordInputRef.insertAdjacentElement('beforebegin', visibilityIcon);
    } else {
        passwordInputRef.closest('.passwordWrapper').querySelector('.visibilityIcon').remove();
        passwordInputRef.style.backgroundImage = 'url(./assets/img/login_lock.svg)';
    }
}

/**
 * Creates a visibility icon for password input fields.
 * 
 * @param {boolean} [isPasswordVisible=false] Whether the password is currently visible.
 * @returns {HTMLElement} The created visibility icon element.
 */
function createVisibilityIcon(isPasswordVisible = false) {
    const visibilityIcon = document.createElement('div');
    visibilityIcon.classList.add('visibilityIcon');
    if (isPasswordVisible) {
        visibilityIcon.innerHTML = getPasswordVisbilityOnSVG();
    } else {
        visibilityIcon.innerHTML = getPasswordVisibilityOffSVG();
    }
    return visibilityIcon;
}

/**
 * Toggles the password visibility by switching the input field's type between 'password' and 'text'.
 * It also updates the visibility icon accordingly.
 * 
 * @param {HTMLElement} svgRef The reference to the visibility icon element.
 * @returns {void}
 */
function togglePasswordVisibility(svgRef) {
    const passwordWrapperRef = svgRef.closest('.passwordWrapper');
    const passwordInputRef = passwordWrapperRef.querySelector('input');
    passwordWrapperRef.querySelector('.visibilityIcon').remove();
    if (passwordInputRef.type == 'password') {
        passwordWrapperRef.append(createVisibilityIcon(true));
        passwordInputRef.type = 'text'
    } else {
        passwordWrapperRef.append(createVisibilityIcon(false));
        passwordInputRef.type = 'password'
    }
    passwordInputRef.focus();
}