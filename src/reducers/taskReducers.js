const addTaskReducer = (state, action) => {
  const { boardName, columnName, task } = action.payload;
  const board = state.boards.find((board) => board.name === boardName);

  if (board) {
    const column = board.columns[columnName.toLowerCase()];

    if (column === undefined) return;

    if (!column.tasks) {
      column.tasks = [];
    }
    column.tasks.push(task);
  }
};

const updateTaskReducer = (state, action) => {
  const { boardName, task } = action.payload;
  const board = state.boards.find((board) => board.name === boardName);

  if (board) {
    Object.keys(board.columns).forEach((columnKey) => {
      if (!board.columns[columnKey].tasks) {
        board.columns[columnKey].tasks = [];
      }
      board.columns[columnKey].tasks = board.columns[columnKey].tasks.filter((t) => t.title !== task.oldTask.title);
    });

    const newColumn = board.columns[task.status.toLowerCase()];

    if (!newColumn.tasks) {
      newColumn.tasks = [];
    }
    newColumn.tasks.push({ ...task, status: task.status });
  }
};

const removeTaskReducer = (state, action) => {
  const { boardName, taskTitle } = action.payload;
  const board = state.boards.find((board) => board.name === boardName);

  Object.keys(board.columns).forEach((columnKey) => {
    const column = board.columns[columnKey];
    column.tasks = column.tasks.filter((task) => task.title !== taskTitle);
  });
};

const updateSubtaskStatusReducer = (state, action) => {
  const { boardName, columnName, taskTitle, subtaskIndex } = action.payload;
  const board = state.boards.find((board) => board.name === boardName);
  if (!board) return;
  
  let column = board.columns[columnName.toLowerCase()];
  let task = column.tasks.find((task) => task.title === taskTitle);

  if (task) {
    task.subtasks[subtaskIndex].isCompleted = !task.subtasks[subtaskIndex].isCompleted;
  }
};

export { addTaskReducer, updateTaskReducer, removeTaskReducer, updateSubtaskStatusReducer };
