// Wait for the full HTML document to load
document.addEventListener("DOMContentLoaded", function () {

    // --- Select DOM elements ---
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // --- Function to add a new task ---
    function addTask() {
        // Get and trim the task text
        const taskText = taskInput.value.trim();

        // If empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create a Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        // REQUIRED: Add class using classList.add
        removeBtn.classList.add("remove-btn");

        // Set remove button functionality
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to li, then li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field after adding task
        taskInput.value = "";
    }

    // --- Add event listener to button ---
    addButton.addEventListener("click", addTask);

    // --- Allow pressing Enter key to add tasks ---
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Invoke addTask once DOM is loaded (per instructions)
    addTask();
});
