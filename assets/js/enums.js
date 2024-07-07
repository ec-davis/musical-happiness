//enums
const enums = {
  TASK_LIST_IN_LCL_STORAGE: "taskList",
  NEXT_ID: "nextId",
  STATUS_TODO: "to-do",
  STATUS_WIP: "in-rogress",
  STATUS_DONE: "done",

  COLUMN_TODO_ID: "todo-cards",
  COLUMN_INPROGRESS_ID: "in-progress-cards",
  COLUMN_DONE_ID: "done-cards",

  CLASS_FUTURE: "alert-info",
  CLASS_TODAY: "alert-warning",
  CLASS_PAST_DUE: "alert-danger",
};

function getColumnIdFromStatus(pStatus) {
  switch (pStatus) {
    case enums.STATUS_TODO:
      return enums.COLUMN_TODO_ID;
    case enums.STATUS_WIP:
      return enums.COLUMN_INPROGRESS_ID;
    case enums.STATUS_DONE:
      return enums.COLUMN_DONE_ID;
    default:
      return null;
  }
}
