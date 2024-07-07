// increment taskId or initialize it to 1 if it has yet to be initialized
function generateTaskId() {
  let nextId = localStorage.getItem(enums.NEXT_ID);
  ++nextId;
  localStorage.setItem(enums.NEXT_ID, nextId);
  return nextId;
}

function clearColumns() {
  toDoColumn.text("");
  inProgressColumn.text("");
  doneColumn.text("");
}

function clearInputFields() {
  taskTitleInput.val("");
  taskDueDateInput.val("");
  taskDescriptionInput.val("");
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
