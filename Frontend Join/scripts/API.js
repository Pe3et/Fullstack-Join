const BASE_URL = "http://127.0.0.1:8000/api/";

/**
 * Retrieves data from the Database.
 * 
 * @param {string} [path=""] - The path to the data in the database.
 */
async function getFromDB(path = "") {
    const token = getUserTokenFromLocalStorage()

    const fetchdata = await fetch(BASE_URL + path, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });
    const result = await fetchdata.json();
    return result
}

/**
 * Posts data to the Database.
 * 
 * @param {object} postData - The data to be posted to the database.
 * @param {string} [path=""] - The path to the data in the database.
 */
async function postToDB(postData, path = "") {
    const token = getUserTokenFromLocalStorage()

    const fetchdata = await fetch(BASE_URL + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(postData)
    });
    const result = await fetchdata.json();
    return result
}

/**
 * Updates data in the  Database.
 * 
 * @param {object} putData - The data to be updated in the database.
 * @param {string} [path=""] - The path to the data in the database.
 */
async function putToDB(putData, path = "") {
    const token = getUserTokenFromLocalStorage()
    await fetch(BASE_URL + path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(putData)
    });
}

/**
 * Deletes data from the Database.
 * 
 * @param {string} [path=""] - The path to the data in the database.
 */
async function deleteFromDB(path = "") {
    const token = getUserTokenFromLocalStorage()
    await fetch(BASE_URL + path, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    })
}

/**
 * Tries to get the users token from local storage.
 * Set's the value for the Authorization header to null, if no token exists in storage.
 * 
 * @returns {string} - The Token string for the Authorization header for a request.
 */
function getUserTokenFromLocalStorage() {
    try {
        token = JSON.parse(localStorage.getItem('joinStorage')).token ?? null
    } catch (error) {
        token = null
    }
    authorization_header = token ? `Token ${token}` : null
    return authorization_header
}