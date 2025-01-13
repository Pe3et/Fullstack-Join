colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#462F8A",
    "#FF4646",
    "#00BEE8",
    "#FF7A00"
];
let joinStorage = {};
document.addEventListener('DOMContentLoaded', generalInit);

/**
 * Initializes the general functionality of the application.
 * This includes redirecting unauthorized users to the login page,
 * loading the user icon for the header, and setting up the header dropdown.
 */
function generalInit() {
    redirectUnauthorizedUserToLogin();
    loadUserIconForHeader();
    const headerDropdown = document.getElementById('headerDropdown');
    if(headerDropdown) {
        document.addEventListener('click', closeHeaderDropdownCheck);
    }
}

/**
 * Redirects an unauthorized user to the login page.
 * Checks if the user is authorized, if the current page is not the login, privacy policy, or legal notice page,
 * and if the remember me option is not enabled.
 * If all conditions are met, redirects the user to the login page.
 */
function redirectUnauthorizedUserToLogin() {
    const userIsAuthorized = JSON.parse(sessionStorage.getItem('loggedIn')) ?? false;
    joinStorage = JSON.parse(localStorage.getItem('joinStorage')) ?? {rememberMe: false};
    if ((userIsAuthorized == false) 
        && (window.location.pathname.split("/").pop() != 'index.html')
        && (window.location.pathname.split("/").pop() != 'privacyPolicyExternal.html')
        && (window.location.pathname.split("/").pop() != 'legalNoticeExternal.html')
        && joinStorage.rememberMe == false) {
        location.href = "./index.html";
    }
}

/**
 * Loads the user icon for the header.
 * Retrieves the user's icon initials from local storage and updates the header icon text accordingly.
 */
function loadUserIconForHeader() {
    const headerIconTextRef = document.querySelector('.userIcon p');
    if(headerIconTextRef) {
        headerIconTextRef.innerText = joinStorage.iconInitials;
    }
}

/**
 * Returns a random color from the predefined colors array.
 * @returns {string} A random color in hexadecimal format.
 */
function getRandomColor() {
    const randomColor = colors[(Math.round(Math.random() * (colors.length - 1)))];
    return randomColor;
}

/**
 * Toggles the visibility of the header dropdown.
 * This function is used to show or hide the header dropdown menu.
 * It checks the current state of the dropdown and toggles its 'dnone' class accordingly.
 * If the dropdown is hidden after the toggle, it also updates the z-index of the task states and lists.
 */
function toggleHeaderDropdown() {
    const headerDropdown = document.getElementById('headerDropdown');
    headerDropdown.classList.toggle('dnone');
    headerDropdown.classList.contains('dnone') && addBoardZindexesAfterHeaderDropdown();
}

/**
 * This Eventhandler checks if a click is outside of a dropdown, so the dropdown closes.
 * @param {*} event 
 */
function closeHeaderDropdownCheck(event) {
    const headerDropdown = document.getElementById('headerDropdown');
    const clickedElement = event.target;
    if ((!headerDropdown.classList.contains('dnone') && !headerDropdown.contains(clickedElement)) || document.querySelector('.userIcon').contains(clickedElement)) {
        toggleHeaderDropdown();
        addBoardZindexesAfterHeaderDropdown();
    }
}

/**
 * Resets the z-index of task states and lists to 0.
 * This function is used to ensure that the task states and lists are displayed behind the header dropdown.
 */
function removeBoardZindexesForCorrectHeaderDropdown() {
    document.querySelectorAll('.taskState').forEach( ts => ts.style.zIndex = '0');
    document.querySelectorAll('.taskList').forEach( tl => tl.style.zIndex = '0');
}

/**
 * Sets the z-index of task states and lists to 1 after the header dropdown is closed.
 * This function is used to ensure that the task states and lists are displayed on top of other elements.
 */
function addBoardZindexesAfterHeaderDropdown() {
    document.querySelectorAll('.taskState').forEach( ts => ts.style.zIndex = '1');
    document.querySelectorAll('.taskList').forEach( tl => tl.style.zIndex = '1');
}

/**
 * Logs out the current user by clearing local and session storage and redirects to the login page.
 * This function is used to handle the logout functionality of the application.
 */
function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    location.href = './index.html'
}

/**
 * Navigates the user back to the previous page in the browser's history.
 * This function is used to handle the back button functionality of the application.
 */
function goBack() {
    window.history.back();
}