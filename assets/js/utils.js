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
