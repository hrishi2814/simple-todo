function getDate() {
    const today = new Date();
    const formattedDate = today.toDateString();
    document.getElementById('currentDate').textContent = formattedDate;
}

// Helper function to create buttons with click handlers
function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = clickHandler;
    return button;
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.task-item'))
        .map(task => ({
            text: task.textContent,
            completed: task.classList.contains('completed')
        }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.forEach(task => {
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';

        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        listItem.className = 'task-item';
        if (task.completed) {
            listItem.classList.add('completed');
        }

        const doneButton = createButton('Done', () => {
            listItem.classList.toggle('completed');
            saveTasks();
        });

        const removeButton = createButton('Delete', () => {
            taskContainer.remove();
            saveTasks();
        });

        taskContainer.appendChild(listItem);
        taskContainer.appendChild(doneButton);
        taskContainer.appendChild(removeButton);

        document.getElementById('taskList').appendChild(taskContainer);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task');
    const text = taskInput.value.trim();

    if (text !== '') {
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';

        const listItem = document.createElement('li');
        listItem.textContent = text;
        listItem.className = 'task-item';

        const doneButton = createButton('Done', () => {
            listItem.classList.toggle('completed');
            saveTasks();
        });

        const removeButton = createButton('Delete', () => {
            taskContainer.remove();
            saveTasks();
        });

        taskContainer.appendChild(listItem);
        taskContainer.appendChild(doneButton);
        taskContainer.appendChild(removeButton);

        document.getElementById('taskList').appendChild(taskContainer);
        taskInput.value = '';
        saveTasks();
    } else {
        alert("No task entered!");
    }
}

// Function to enable Enter key for task submission
function enableEnterKeySubmission() {
    const taskInput = document.getElementById('task');
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('addtask').click();
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    getDate();
    enableEnterKeySubmission();
    loadTasks();
});
