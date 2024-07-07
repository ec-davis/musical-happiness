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

// Retrieve tasks and nextId from localStorage
let taskList;
// let nextId;

/////////////////////////////////////
// UTILITY FUNCTIONS
function log(msg) {
  console.log(msg);
}

function initTaskObject(pTitle, pDueDate, pDescription) {
  const newTaskId = generateTaskId();

  const newTask = {
    taskId: newTaskId,
    elementId: `task-${newTaskId}`,
    title: pTitle,
    dueDate: pDueDate,
    description: pDescription,
    status: enums.STATUS_TODO,
    currentColumn: getColumnIdFromStatus(enums.STATUS_TODO),
  };
  return newTask;
}
function saveTask(pTask) {
  fetchTaskList();
  taskList.push(pTask);
  localStorage.setItem(
    enums.TASK_LIST_IN_LCL_STORAGE,
    JSON.stringify(taskList)
  );
}
function clearInputFields() {
  taskTitleInput.val("");
  taskDueDateInput.val("");
  taskDescriptionInput.val("");
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

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const droppedCard = ui.draggable;
  const receivingColumn = this;
  log(`dropped on ${receivingColumn.id}`);
  log(`droppedCard ${droppedCard.text()}`);
  log(droppedCard);
  log(droppedCard[0].id);
  log(droppedCard[0].status);
  log(droppedCard[0].status.val());
  const droppedCardId = droppedCard[0].id;
  //let previousColumnCards =
}

function removeTaskFromStorage(pTaskId) {
  let indexToRemove;
  log(`removeTaskFromStorage: taskList length [${taskList.length}]`);
  for (const task of taskList) {
    log(`task ID [${task.taskId}]`);
    if (pTaskId == task.taskId) {
      indexToRemove = task;
    }
    taskList.splice(indexToRemove, 1);
    break;
  }
  log(`taskList length [${taskList.length}]`);

  localStorage.setItem(
    enums.TASK_LIST_IN_LCL_STORAGE,
    JSON.stringify(taskList)
  );
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  log(`handleDeleteTask taskId ${event.target.dataset.taskid}`);

  removeTaskFromStorage(event.target.dataset.taskid);
  //remove self from parent
  renderTaskList(taskList);
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

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskTitle = taskTitleInput.val();
  const taskDueDate = taskDueDateInput.val();
  const taskDescription = taskDescriptionInput.val();

  const newTask = initTaskObject(taskTitle, taskDueDate, taskDescription);
  log(`newTask: ${newTask}`);

  saveTask(newTask);
  clearInputFields();
  // hide the dialog
  addTaskModal.modal("hide");
  renderTaskList(taskList);
}

// USER INTERACTIONS

function fetchTaskList() {
  taskList = JSON.parse(localStorage.getItem(enums.TASK_LIST_IN_LCL_STORAGE));
  if (!taskList) taskList = [];
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  taskDueDateInput.datepicker();
  makeColumnsDroppable();
  fetchTaskList();
  if (taskList) renderTaskList(taskList);
  saveTaskBtn.on("click", handleAddTask);
});
