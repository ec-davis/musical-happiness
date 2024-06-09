// DEPENDENCIES
const taskTitleInput = $('#taskTitleInput');
const taskDueDateInput = $('#taskDueDateInput');
const taskDescriptionInput = $('#taskDescriptionInput');
//const addTaskModel = $('#addTaskModal');
const saveTaskBtn = $('#saveTaskBtn');

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId; // = JSON.parse(localStorage.getItem("nextId"));

// increment taskId or initialize it to 1 if it has yet to be initialized
function generateTaskId() {
    nextId = localStorage.getItem('nextId');
    ++nextId;
    localStorage.setItem('nextId', nextId);
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    console.log("handleAddTask");    
    
    event.preventDefault();
        const taskTitle = taskTitleInput.val();
        const taskDueDate = taskDueDateInput.val();
        const taskDescription = taskDescriptionInput.val();
    
        const newTask = {
            title: taskTitle,
            dueDate: taskDueDate,
            description: taskDescription
        }
    
        let tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
        if (!tasksArray)
            tasksArray = [];
        tasksArray.push(newTask);
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// USER INTERACTIONS



// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    taskDueDateInput.datepicker();
});
saveTaskBtn.on('click',handleAddTask);