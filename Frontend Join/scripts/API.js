const BASE_URL = "http://127.0.0.1:8000/";

/**
 * Retrieves data from the Database.
 * 
 * @async
 * @param {string} [path=""] - The path to the data in the database.
 * @returns {Promise<object>} The data retrieved from the database.
 */
async function getFromDB(path="") {
    const fetchdata = await fetch(BASE_URL + path);
    const result = await fetchdata.json();
    return result
}

/**
 * Posts data to the Database.
 * 
 * @async
 * @param {object} postData - The data to be posted to the database.
 * @param {string} [path=""] - The path to the data in the database.
 * @returns {Promise<void>}
 */
async function postToDB(postData, path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
}

/**
 * Updates data in the  Database.
 * 
 * @async
 * @param {object} putData - The data to be updated in the database.
 * @param {string} [path=""] - The path to the data in the database.
 * @returns {Promise<void>}
 */
async function putToDB(putData, path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(putData)
    });
}

/**
 * Deletes data from the Database.
 * 
 * @async
 * @param {string} [path=""] - The path to the data in the database.
 * @returns {Promise<void>}
 */
async function deleteFromDB(path="") {
    await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    }) 
}