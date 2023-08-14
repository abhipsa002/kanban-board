function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(data));
}

function createTask() {
  var x = document.getElementById("inprogress");
  var y = document.getElementById("done");
  var z = document.getElementById("create-new-task-block");
  x.style.display = "none";
  y.style.display = "none";
  z.style.display = "flex";
}

function cancelTask() {
  var x = document.getElementById("inprogress");
  var y = document.getElementById("done");
  var z = document.getElementById("create-new-task-block");
  x.style.display = "block";
  y.style.display = "block";
  z.style.display = "none";
}

function saveTask() {
  var taskPriority = document.getElementById("task-priority").value;
  var taskDescription = document.getElementById("task-description").value;
  var todo = document.getElementById("todo");
  var taskName = document.getElementById("task-name").value;

  if (taskName) {
    var taskId = taskName.toLowerCase().split(" ").join("");
    todo.innerHTML += `
    <div class="task" id="${taskId}" draggable="true" ondragstart="drag(event)">
        <span title="${taskDescription}">${taskName}</span>
        <i class="fa fa-trash icons" aria-hidden="true"  onclick="deleteTask(this)"></i>                
    </div>
    `;
    var taskCreated = document.getElementById(taskId);
    setPriorityColor(taskPriority, taskCreated);
  }
  else{    
    document.getElementById("alert-msg").style.visibility = "visible"
  }
}

function setPriorityColor(taskPriority, taskCreated) {
  if (taskPriority == "low") {
    taskCreated.style.backgroundColor = "white";
  } else if (taskPriority == "medium") {
    taskCreated.style.backgroundColor = "yellow";
  } else {
    taskCreated.style.backgroundColor = "red";
  }
}

function editTask() {
  var saveButton = document.getElementById("save-button");
  var editButton = document.getElementById("edit-button");
  if (saveButton.style.display === "none") {
    saveButton.style.display = "block";
    editButton.style.display = "none";
  } else {
    saveButton.style.display = "none";
    editButton.style.display = "block";
  }
}

function deleteTask(event) {
  console.log(event.parentNode.id);
  const box = document.getElementById(event.parentNode.id);
  box.remove();
  var parentTask = document.getElementById("todo");
  var listOfChildTasks = parentTask.childNodes;
  console.log(listOfChildTasks);
  let filteredTask = [];
  listOfChildTasks.forEach((task) => {
    if (task.id != event.parentNode.id) {
      filteredTask.push(task);
    }
  });
  console.log(filteredTask);
}

