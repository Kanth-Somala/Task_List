//constants are declared for the input button and task list area
const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector(".tasks");

// Load tasks from localStorage when page loads
window.onload = () => {
  loadTasks();
};

//listener for the enter key, Used to add new task.
taskInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    createTask();
  }
});

//the onclick event for the 'add' button
document.querySelector("#push").onclick = function () {
  createTask();
};

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", taskSection.innerHTML);
}

// Function to load tasks from localStorage
function loadTasks() {
  if (localStorage.getItem("tasks")) {
    taskSection.innerHTML = localStorage.getItem("tasks");

    // Re-attach delete event listeners after loading
    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
        saveTasks();
      };
    }

    // Re-attach checkbox listeners
    var checkboxes = document.querySelectorAll("#check-task");
    checkboxes.forEach((checkbox) => {
      checkbox.onclick = function () {
        updateTask(this);
        saveTasks();
      };
    });
  }
}

//the function to create the task
function createTask() {
  if (taskInput.value.length == 0) {
    alert("The task field is blank, Enter a task name and try again.");
  } else {
    //this block inserts HTML that creates each area div element
    taskSection.innerHTML += `
      <div class="task">
        <label id="taskname">
          <input onclick="updateTask(this)" type="checkbox" id="check-task">
          <p>${document.querySelector("#newtask input").value}</p>
        </label>
        <div class="delete">
          <i class="uil uil-trash"></i>
        </div>
      </div>`;

    // Attach delete functionality
    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
        saveTasks();
      };
    }

    taskSection.offsetHeight >= 300
      ? taskSection.classList.add("overflow")
      : taskSection.classList.remove("overflow");

    taskInput.value = "";

    // Save tasks to localStorage
    saveTasks();
  }
}

// Function to mark/unmark task
function updateTask(task) {
  let taskItem = task.parentElement.lastElementChild;
  if (task.checked) {
    taskItem.classList.add("checked");
  } else {
    taskItem.classList.remove("checked");
  }
  saveTasks();
}
