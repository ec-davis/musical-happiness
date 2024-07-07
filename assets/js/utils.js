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

function isPastDue(dueDate) {
  return dueDate < new Date();
}

function isDueToday(dueDate) {
  const today = new Date();
  return (
    dueDate.getDate() == today.getDate() &&
    dueDate.getMonth() == today.getMonth() &&
    dueDate.getFullYear() == today.getFullYear()
  );
}

// Sets class according to due date. Note that we check isDueToday() before isPastDue().
// This is for the case in which the due date is earlier today. In that case, we want
// the class from isDueToday(), but isPastDue() would return true if it came before isDueToday()
function setUrgencyClass(task, element) {
  const dueDate = new Date(task.dueDate);

  if (isDueToday(dueDate)) {
    element.removeClass("alert-info").addClass("alert-warning");
  } else if (isPastDue(dueDate)) {
    element
      .removeClass("alert-info")
      .removeClass("alert-warning")
      .addClass("alert-danger");
  } else element.addClass("alert-info");
}
