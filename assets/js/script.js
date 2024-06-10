// DEPENDENCIES
const taskTitleInput = $('#taskTitleInput');
const taskDueDateInput = $('#taskDueDateInput');
const taskDescriptionInput = $('#taskDescriptionInput');
const addTaskModal = $('#addTaskModal');
const saveTaskBtn = $('#saveTaskBtn');

const toDoColumn = $('#todo-cards');
const inProgressColumn = $('#in-progress-cards');
const doneColumn = $('#done-cards');

// DATA
//enums
const enums = {
    TASK_LIST_IN_LCL_STORAGE: "taskList",
    NEXT_ID: "nextId",
    STATUS_TODO: "todo",
    STATUS_WIP: "inProgress",
    STATUS_DONE: "done",
    CLASS_FUTURE: "alert-info",
    CLASS_TODAY: "alert-warning",
    CLASS_PAST_DUE: "alert-danger"
}

// Retrieve tasks and nextId from localStorage
let taskList;
// let nextId;

/////////////////////////////////////
// UTILITY FUNCTIONS

function log(msg) {
    console.log(msg);
}

// increment taskId or initialize it to 1 if it has yet to be initialized
function generateTaskId() {
    let nextId = localStorage.getItem(enums.NEXT_ID);
    ++nextId;
    localStorage.setItem(enums.NEXT_ID, nextId);
    return nextId;
}
function clearColumns() {
    toDoColumn.text('');
    inProgressColumn.text('');
    doneColumn.text('');
}
function initTaskObject(pTitle, pDueDate, pDescription) {
    const newTask = {
        taskId: generateTaskId(),
        title: pTitle,
        dueDate: pDueDate,
        description: pDescription,
        status: enums.STATUS_TODO 
    }
    return newTask;
}
function saveTask(pTask) {
    fetchTaskList();
    taskList.push(pTask);
    localStorage.setItem(enums.TASK_LIST_IN_LCL_STORAGE, JSON.stringify(taskList));
}
function clearInputFields() {
    taskTitleInput.val('');
    taskDueDateInput.val('');
    taskDescriptionInput.val('');
}
function makeColumnsDroppable() {
    toDoColumn.sortable();
    inProgressColumn.sortable();
    inProgressColumn.droppable();
    doneColumn.sortable();
}
function removeTaskFromStorage(pTaskId) {
    let indexToRemove;
    log(`removeTaskFromStorage: taskList length [${taskList.length}]`);
    for (const task of taskList) {
        log(`task ID [${task.taskId}]`);
        if (pTaskId == task.taskId) {
            indexToRemove = task;
        }
        taskList.splice(indexToRemove,1);
        break;
    }
    log(`taskList length [${taskList.length}]`);

    localStorage.setItem(enums.TASK_LIST_IN_LCL_STORAGE,JSON.stringify(taskList));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    event.preventDefault();
    log(`handleDeleteTask taskId ${event.target.dataset.taskid}`);

    removeTaskFromStorage(event.target.dataset.taskid);
    //remove self from parent
    renderTaskList(taskList);
    
}


// create a task card element
function createTaskCard(task, status) {
    const taskCard = $(`
        <div class="task-card alert">
                <header>Title: ${task.title}</header>
                <div>ID: ${task.taskId}</div>
                <div>Status: ${task.status}</div>
                <div>Due Date: ${task.dueDate}</div>
                <div><button type="submit" class="delete-btn" data-taskid="${task.taskId}" id="delete-${task.taskId}">Delete</button></div>
              </div>
    `);
    //taskCard.draggable();
    

    // TODO: add CSS class appropriate to today's date vs due date

    return taskCard;

}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList(taskList) {
    if (null === taskList)
        return;
    clearColumns();

    //for (let ii = 0; ii < taskList.length; ++ii) {
    for (const task of taskList) {
        if (null === task)
            break;
        if (enums.STATUS_TODO == task.status) {
            toDoColumn.append(createTaskCard(task, task.status));
        } else if (enums.STATUS_WIP == task.status)
            log(`wip ${task.title}`);
        else 
            log(`done ${task.title}`);
    }
    $(".delete-btn").on('click',handleDeleteTask);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    // const taskTitle = taskTitleInput.val();
    // const taskDueDate = taskDueDateInput.val();
    // const taskDescription = taskDescriptionInput.val();

    const taskTitle = "hike uphill";
    const taskDueDate = "1";
    const taskDescription = "descriptionynoof";

    const newTask = initTaskObject(taskTitle, taskDueDate, taskDescription);
    saveTask(newTask);
    clearInputFields();
    // hide the dialog
    addTaskModal.modal('hide');  
    renderTaskList(taskList);     
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// USER INTERACTIONS

function fetchTaskList() {
    taskList = JSON.parse(localStorage.getItem(enums.TASK_LIST_IN_LCL_STORAGE));
    if (!taskList)
        taskList = [];
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    taskDueDateInput.datepicker();
    makeColumnsDroppable();
    fetchTaskList();
    if (taskList)
        renderTaskList(taskList);
    saveTaskBtn.on('click',handleAddTask);
  //  $(".delete-btn").on('click',handleDeleteTask);
});
