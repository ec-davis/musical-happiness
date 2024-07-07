// DEPENDENCIES

const taskTitleInput = $("#taskTitleInput");
const taskDueDateInput = $("#taskDueDateInput");
const taskDescriptionInput = $("#taskDescriptionInput");
const addTaskModal = $("#addTaskModal");
const saveTaskBtn = $("#saveTaskBtn");

//TODO refactor these to use the enums for column IDs
const toDoColumn = $("#todo-cards");
const inProgressColumn = $("#in-progress-cards");
const doneColumn = $("#done-cards");

// DATA
let taskList;

/////////////////////////////////////
// UTILITY FUNCTIONS
function log(msg) {
  console.log(msg + " ARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRGH");
  alert(msg + " ARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRGH");
}

function saveTask(pTask) {
  fetchTaskList();
  taskList.push(pTask);
  localStorage.setItem(
    enums.TASK_LIST_IN_LCL_STORAGE,
    JSON.stringify(taskList)
  );
}

function makeColumnsSortable() {
  toDoColumn.sortable();
  inProgressColumn.sortable();
  doneColumn.sortable();
}
function makeColumnsDroppable() {
  toDoColumn.droppable({
    accept: ".task-card",
    drop: handleDrop,
  });
  inProgressColumn.droppable({
    accept: ".task-card",
    drop: handleDrop,
  });
  doneColumn.droppable({
    accept: ".task-card",
    drop: handleDrop,
  });
}

function removeTaskFromStorage(pTaskId) {
  let indexToRemove;
  console.log(`removeTaskFromStorage: taskList length [${taskList.length}]`);
  for (const task of taskList) {
    console.log(`task ID [${task.taskId}]`);
    if (pTaskId == task.taskId) {
      indexToRemove = task;
    }
    taskList.splice(indexToRemove, 1);
    break;
  }
  console.log(`taskList length [${taskList.length}]`);

  localStorage.setItem(
    enums.TASK_LIST_IN_LCL_STORAGE,
    JSON.stringify(taskList)
  );
}

// create a task card element
function createTaskCard(task, status) {
  const taskCard = $(`
        <div class="task-card alert" id="task-${task.taskId}">
            <header>Title: ${task.title}</header>
            <div>Desc: ${task.description}</div>
            <div>ID: ${task.taskId}</div>
            <div>Status: ${task.status}</div>
            <div>Due Date: ${task.dueDate}</div>
            <div><button type="submit" class="delete-btn" data-taskid="${task.taskId}" id="delete-${task.taskId}">Delete</button></div>
        </div>
    `);
  taskCard.draggable({
    zIndex: 200,
    helper: "clone",
  });

  // TODO: add CSS class appropriate to today's date vs due date

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(taskList) {
  if (null === taskList) return;
  clearColumns();

  //for (let ii = 0; ii < taskList.length; ++ii) {
  for (const task of taskList) {
    if (null === task) break;
    if (enums.STATUS_TODO == task.status) {
      toDoColumn.append(createTaskCard(task, task.status));
    } else if (enums.STATUS_WIP == task.status)
      inProgressColumn.append(createTaskCard(task, task.status));
    else doneColumn.append(createTaskCard(task, task.status));
  }
  $(".delete-btn").on("click", handleDeleteTask);
}

function fetchTaskList() {
  taskList = JSON.parse(localStorage.getItem(enums.TASK_LIST_IN_LCL_STORAGE));
  if (!taskList) taskList = [];
}

//////////////////////////
// USER INTERACTIONS
// HANDLERS
function handleDeleteTask(event) {
  event.preventDefault();
  console.log(`handleDeleteTask taskId ${event.target.dataset.taskid}`);

  removeTaskFromStorage(event.target.dataset.taskid);
  //remove self from parent
  renderTaskList(taskList);
}

// handles the addition of a new task. Saves input from the model, hides the model and refreshes the task lists
function handleAddTask(event) {
  event.preventDefault();
  const newTask = initTaskObject(
    taskTitleInput.val(),
    taskDueDateInput.val(),
    taskDescriptionInput.val()
  );

  saveTask(newTask);
  clearInputFields();
  // hide the dialog
  addTaskModal.modal("hide");
  renderTaskList(taskList);
}

// Handles dropping a task into a new status lane
function handleDrop(event, ui) {
  const droppedCard = ui.draggable;
  const receivingColumn = this;
  console.log(`dropped on ${receivingColumn.id}`);
  console.log(`droppedCard ${droppedCard.text()}`);
  console.log(droppedCard);
  console.log(droppedCard[0].id);
  console.log(droppedCard[0].status);
  console.log(droppedCard[0].status.val());
  const droppedCardId = droppedCard[0].id;
}

// When the DOM is ready, set up a few things
$(document).ready(function () {
  taskDueDateInput.datepicker();
  makeColumnsDroppable();
  fetchTaskList();
  if (taskList) renderTaskList(taskList);
  saveTaskBtn.on("click", handleAddTask);
});
