/**
 * Returns an SVG string representing a checkbox in the specified status.
 * 
 * @param {string} status - The status of the checkbox, either "checked" or "unchecked".
 * @returns {string} An SVG string representing the checkbox.
 */
function getCheckboxSVG(status) {
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
 * Returns the HTML template for the login page.
 * 
 * @returns {string} The HTML template for the login page.
 */
function getLoginTemplate() {
    return `
            <h1>Log in</h1>
            <div class="spacer"></div>
            <input type="text" id="emailInput" placeholder="Email">
            <div class="passwordWrapper">
                <input type="password" id="passwordInput" placeholder="Password" oninput="getPasswordVisibilityIcon(this)">
            </div>
            <div class="rememberMe">
                <div id="checkbox" class="rememberMeCheckbox" onclick="toggleCheckbox('checked'); toggleRememberMe()">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1.5" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                    </svg>
                </div>
                <p>Remember me</p>
            </div>
            <div class="buttonContainer">
                <div id="loginButton" class="fullButton button" onclick="checkLoginSucces()">Log in</div>
                <div id="loginGuestButton" class="hollowButton button" onclick="loginGuest()">Guest Log in</div>
            </div>
    `
}

/**
 * Returns the HTML template for the sign up page.
 * 
 * @returns {string} The HTML template for the sign up page.
 */
function getSignUpTemplate() {
    return `
            <div id="backArrow" onclick="renderLogin()">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.43701 9.16673H19.333C20.0694 9.16673 20.6663 9.76368 20.6663 10.5001C20.6663 11.2364 20.0694 11.8334 19.333 11.8334H4.43701L10.6463 18.0427C11.167 18.5634 11.167 19.4074 10.6463 19.9281C10.1257 20.4487 9.28163 20.4487 8.76101 19.9281L0.74722 11.9143C-0.0338288 11.1332 -0.0338272 9.8669 0.747221 9.08585L8.76101 1.07206C9.28163 0.55144 10.1257 0.551441 10.6463 1.07206C11.167 1.59268 11.167 2.43677 10.6463 2.95739L4.43701 9.16673Z" fill="#29ABE2"/>
                </svg>
            </div>                
            <h1>Sign up</h1>
            <div class="spacer"></div>
            <input type="text" id="nameInput" placeholder="Name" onchange="validateName(this)">
            <input type="text" id="emailInput" placeholder="Email" onchange="validateEmail(this)">
            <div class="passwordWrapper">
                <input type="password" id="passwordInput" placeholder="Password" oninput="getPasswordVisibilityIcon(this)">
            </div>
            <div class="passwordWrapper">
                <input type="password" id="confirmPasswordInput" placeholder="Confirm Password" onchange="validateConfirmedPassword(this)" oninput="getPasswordVisibilityIcon(this)">
            </div>
            <div class="acceptPrivatePolicy">
                <div id="checkbox" onclick="toggleCheckbox('checked'); togglePolicyAccept()">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1.5" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                    </svg>
                </div>
                <p>I accept the <a href="#">Privacy policy</a></p>
            </div>
            <div id="signUpButton" class="button fullButton disabledButton">Sign up</div>
    `
}

/**
 * Returns an SVG string representing the visibility off icon.
 * 
 * @returns {string} An SVG string representing the visibility off icon.
 */
function getPasswordVisibilityOffSVG() {
    return `
        <svg class="visibilityIcon" onclick="togglePasswordVisibility(this)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_69978_5514" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_69978_5514)">
                <path d="M16.1 13.3001L14.65 11.8501C14.8 11.0668 14.575 10.3334 13.975 9.6501C13.375 8.96676 12.6 8.7001 11.65
                8.8501L10.2 7.4001C10.4834 7.26676 10.7709 7.16676 11.0625 7.1001C11.3542 7.03343 11.6667 7.0001
                12 7.0001C13.25 7.0001 14.3125 7.4376 15.1875 8.3126C16.0625 9.1876 16.5 10.2501 16.5 11.5001C16.5 11.8334 16.4667 12.1459 16.4 12.4376C16.3334 12.7293 16.2334 13.0168 16.1 13.3001ZM19.3 16.4501L17.85 15.0501C18.4834 14.5668 19.0459 14.0376 19.5375 13.4626C20.0292 12.8876 20.45 12.2334 20.8 11.5001C19.9667 9.81676 18.7709 8.47926 17.2125 7.4876C15.6542 6.49593 13.9167 6.0001 12 6.0001C11.5167 6.0001 11.0417 6.03343 10.575 6.1001C10.1084 6.16676 9.65005 6.26676 9.20005 6.4001L7.65005 4.8501C8.33338 4.56676 9.03338 4.35426 9.75005 4.2126C10.4667 4.07093 11.2167 4.0001 12 4.0001C14.3834 4.0001 16.525 4.62926 18.425 5.8876C20.325 7.14593 21.75 8.78343 22.7 10.8001C22.75 10.8834 22.7834 10.9876 22.8 11.1126C22.8167 11.2376 22.825 11.3668 22.825 11.5001C22.825 11.6334 22.8125 11.7626 22.7875 11.8876C22.7626 12.0126 22.7334 12.1168 22.7 12.2001C22.3167 13.0501 21.8375 13.8334 21.2625 14.5501C20.6875 15.2668 20.0334 15.9001 19.3 16.4501ZM19.1 21.9001L15.6 18.4501C15.0167 18.6334 14.4292 18.7709 13.8375 18.8626C13.2459 18.9543 12.6334 19.0001 12 19.0001C9.61672 19.0001 7.47505 18.3709 5.57505 17.1126C3.67505 15.8543 2.25005 14.2168 1.30005 12.2001C1.25005 12.1168 1.21672 12.0126 1.20005 11.8876C1.18338 11.7626 1.17505 11.6334 1.17505 11.5001C1.17505 11.3668 1.18338 11.2418 1.20005 11.1251C1.21672 11.0084 1.25005 10.9084 1.30005 10.8251C1.65005 10.0751 2.06672 9.38343 2.55005 8.7501C3.03338 8.11676 3.56672 7.53343 4.15005 7.0001L2.07505 4.9001C1.89172 4.71676 1.80005 4.4876 1.80005 4.2126C1.80005 3.9376 1.90005 3.7001 2.10005 3.5001C2.28338 3.31676 2.51672 3.2251 2.80005 3.2251C3.08338 3.2251 3.31672 3.31676 3.50005 3.5001L20.5 20.5001C20.6834 20.6834 20.7792 20.9126 20.7875 21.1876C20.7959 21.4626 20.7001 21.7001 20.5 21.9001C20.3167 22.0834 20.0834 22.1751 19.8 22.1751C19.5167 22.1751 19.2834 22.0834 19.1 21.9001ZM5.55005 8.4001C5.06672 8.83343 4.62505 9.30843 4.22505 9.8251C3.82505 10.3418 3.48338 10.9001 3.20005 11.5001C4.03338 13.1834 5.22922 14.5209 6.78755 15.5126C8.34588 16.5043 10.0834 17.0001 12 17.0001C12.3334 17.0001 12.6584 16.9793 12.975 16.9376C13.2917 16.8959 13.6167 16.8501 13.95 16.8001L13.05 15.8501C12.8667 15.9001 12.6917 15.9376 12.525 15.9626C12.3584 15.9876 12.1834 16.0001 12 16.0001C10.75 16.0001 9.68755 15.5626 8.81255 14.6876C7.93755 13.8126 7.50005 12.7501 7.50005 11.5001C7.50005 11.3168 7.51255 11.1418 7.53755 10.9751C7.56255 10.8084 7.60005 10.6334 7.65005 10.4501L5.55005 8.4001Z" fill="#A8A8A8" />
            </g>
        </svg>`
}

/**
 * Returns an SVG string representing the visibility on icon.
 * 
 * @returns {string} An SVG string representing the visibility on icon.
 */
function getPasswordVisbilityOnSVG() {
    return`
        <svg class="visibilityIcon" onclick="togglePasswordVisibility(this)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_69978_5547" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_69978_5547)">
                <path d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.68755 7.4375 8.81255 8.3125C7.93755 9.1875 7.50005 10.25 7.50005 11.5C7.50005 12.75 7.93755 13.8125 8.81255 14.6875C9.68755 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.56255 12.8875 9.30005 12.25 9.30005 11.5C9.30005 10.75 9.56255 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.68338 19 7.56672 18.3875 5.65005 17.1625C3.73338 15.9375 2.28338 14.2833 1.30005 12.2C1.25005 12.1167 1.21672 12.0125 1.20005 11.8875C1.18338 11.7625 1.17505 11.6333 1.17505 11.5C1.17505 11.3667 1.18338 11.2375 1.20005 11.1125C1.21672 10.9875 1.25005 10.8833 1.30005 10.8C2.28338 8.71667 3.73338 7.0625 5.65005 5.8375C7.56672 4.6125 9.68338 4 12 4C14.3167 4 16.4334 4.6125 18.35 5.8375C20.2667 7.0625 21.7167 8.71667 22.7 10.8C22.75 10.8833 22.7834 10.9875 22.8 11.1125C22.8167 11.2375 22.825 11.3667 22.825 11.5C22.825 11.6333 22.8167 11.7625 22.8 11.8875C22.7834 12.0125 22.75 12.1167 22.7 12.2C21.7167 14.2833 20.2667 15.9375 18.35 17.1625C16.4334 18.3875 14.3167 19 12 19ZM12 17C13.8834 17 15.6125 16.5042 17.1875 15.5125C18.7626 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7626 8.47917 17.1875 7.4875C15.6125 6.49583 13.8834 6 12 6C10.1167 6 8.38755 6.49583 6.81255 7.4875C5.23755 8.47917 4.03338 9.81667 3.20005 11.5C4.03338 13.1833 5.23755 14.5208 6.81255 15.5125C8.38755 16.5042 10.1167 17 12 17Z" fill="#A8A8A8" />
            </g>
        </svg>`
}