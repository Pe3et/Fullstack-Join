const BASE_URL = "http://127.0.0.1:8000/api/";

/**
 * Retrieves data from the Database.
 * 
 * @param {string} [path=""] - The path to the data in the database.
 */
async function getFromDB(path = "") {
    const fetchdata = await fetch(BASE_URL + path);
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
    const fetchdata = await fetch(BASE_URL + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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
    await fetch(BASE_URL + path, {
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
 * @param {string} [path=""] - The path to the data in the database.
 */
async function deleteFromDB(path = "") {
    await fetch(BASE_URL + path, {
        method: "DELETE",
    })
}