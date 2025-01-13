/**
 * Handles the dragover event by preventing the default behavior and adding a highlight class to the target element.
 * It also removes the highlight class from other elements.
 * 
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
    const highlightRef = ev.target.closest(".taskList");
    highlightRef.classList.add("dragHighlight");
    removeOtherHighlights(highlightRef.id);
}

/**
 * Removes the highlight class from all elements with the class 'taskList' except for the one with the specified ID.
 * 
 * @param {string} currentHighlightID - The ID of the element that should not be removed from the highlight.
 */
function removeOtherHighlights(currentHighlightID) {
    document.querySelectorAll('.taskList').forEach( tl => {
        if (tl.id !== currentHighlightID) {
            tl.classList.remove("dragHighlight");
        }
    })
}

/**
 * Handles the drag event by setting the data to be transferred and adding a rotation class to the target element.
 * 
 * @param {Event} ev - The drag event.
 */ 
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById(ev.target.id).classList.add("dragRotate");
}

/**
 * Removes the 'dragRotate' class from the specified element.
 * 
 * @param {HTMLElement} element - The element from which to remove the 'dragRotate' class.
 */
function removeDragRotate(element) {
    element.classList.remove("dragRotate");
}

/**
 * Handles the drop event by updating the task status and moving the task to the new status list.
 * It also removes the highlight and rotation classes from the elements.
 * 
 * @param {Event} ev - The drop event.
 */ 
function drop(ev) {
    ev.preventDefault();
    const taskID = ev.dataTransfer.getData("text");
    const taskIndex = tasks.findIndex(t => t.id == taskID);
    const newStatusRef = ev.target.closest(".taskList");
    const newStatus = newStatusRef.id.slice(0, -9);
    newStatusRef.append(document.getElementById(taskID));
    newStatusRef.classList.remove("dragHighlight");
    document.getElementById(taskID).classList.remove("dragRotate");
    tasks[taskIndex].status = newStatus;
    putToDB(newStatus, `tasks/${taskID}/status`);
    checkNoTaskDisplayNone(tasks);
}