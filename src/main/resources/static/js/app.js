const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

const API_URL = "/api/tasks";

async function loadTasks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        taskCount.textContent = "Could not load tasks. Please try again.";
        console.error(error);
    }
}

function renderTasks(tasks) {
    taskList.replaceChildren();

    const remaining = tasks.filter(task => !task.completed).length;
    taskCount.textContent =
        `${remaining} task${remaining === 1 ? "" : "s"} remaining`;

    if (tasks.length === 0) {
        const message = document.createElement("li");
        message.textContent = "No tasks yet. Add your first task above!";
        taskList.appendChild(message);
        return;
    }

    tasks.forEach(task => {
        const item = document.createElement("li");
        item.className = "task-item";

        const details = document.createElement("div");
        details.className = "task-details";

        const title = document.createElement("h3");
        title.textContent = task.title;
        if (task.completed) {
            title.classList.add("completed");
        }

        const description = document.createElement("p");
        description.className = "task-description";
        description.textContent = task.description || "";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Complete ${task.title}`);

        checkbox.addEventListener("change", async () => {
            try {
                const response = await fetch(`${API_URL}/${task.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: task.title,
                        description: task.description,
                        completed: checkbox.checked
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to update task");
                }

                await loadTasks();
            } catch (error) {
                checkbox.checked = task.completed;
                alert("Could not update the task.");
                console.error(error);
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", async () => {
            try {
                const response = await fetch(`${API_URL}/${task.id}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    throw new Error("Failed to delete task");
                }

                await loadTasks();
            } catch (error) {
                alert("Could not delete the task.");
                console.error(error);
            }
        });

        details.append(title, description);
        item.append(checkbox, details, deleteButton);
        taskList.appendChild(item);
    });
}

taskForm.addEventListener("submit", async event => {
    event.preventDefault();

    const task = {
        title: taskTitle.value.trim(),
        description: taskDescription.value.trim(),
        completed: false
    };

    if (!task.title) {
        taskTitle.focus();
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error("Failed to create task");
        }

        taskForm.reset();
        await loadTasks();
    } catch (error) {
        alert("Could not add the task. Please try again.");
        console.error(error);
    }
});

loadTasks();
