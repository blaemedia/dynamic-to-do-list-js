// Wait for the full HTML document to load
document.addEventListener("DOMContentLoaded", function () {

    // --- Select DOM elements ---
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // --- In-memory array of task strings (keeps sync with localStorage) ---
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    /**
     * Save the current tasks array to localStorage
     */
    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    /**
     * Remove a task from the tasks array (removes the first matching string)
     * and update localStorage.
     * @param {string} taskText
     */
    function removeTaskFromStorage(taskText) {
        const idx = tasks.indexOf(taskText);
        if (idx > -1) {
            tasks.splice(idx, 1);
            saveTasksToLocalStorage();
        }
    }

    /**
     * Create and append a task to the DOM.
     * If `save` is true, the task will be appended to the tasks array and saved.
     * If `taskText` is omitted/undefined, it will read from taskInput.
     *
     * @param {string} [taskText] - The text of the task to add.
     * @param {boolean} [save=true] - Whether to save this task into localStorage.
     */
    function addTask(taskText, save = true) {
        // If no taskText was passed, read from the input field (for button/enter)
        if (typeof taskText === "undefined") {
            taskText = taskInput.value.trim();
        }

        // Validate non-empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element and set its text
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create a Remove button and add the required class using classList.add
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // When clicked, remove the li from DOM and update localStorage (and tasks array)
        removeBtn.onclick = function () {
            // Remove from DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }
            // Remove from storage (first matching taskText)
            removeTaskFromStorage(taskText);
        };

        // Append remove button to li and li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If required, save the task to the in-memory array and to localStorage
        if (save) {
            tasks.push(taskText);
            saveTasksToLocalStorage();
        }

        // Clear input field after adding (only meaningful when user typed it)
        taskInput.value = "";
    }

    /**
     * Load tasks from localStorage and populate the DOM.
     * Uses addTask(taskText, false) so tasks aren't saved again during load.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        // Ensure our in-memory tasks array is synced with storage
        tasks = storedTasks.slice();
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // --- Event Listeners ---

    // Add task when button is clicked
    addButton.addEventListener("click", function () {
        addTask(); // reads from input and saves
    });

    // Allow pressing Enter to add tasks
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load saved tasks when the page loads
    loadTasks();
});
