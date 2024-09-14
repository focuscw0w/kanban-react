import { createSlice } from "@reduxjs/toolkit";
import { extractColumns } from "../helpers/helpers";
import {
  addTaskReducer,
  updateTaskReducer,
  removeTaskReducer,
  updateSubtaskStatusReducer,
} from "../reducers/taskReducers";

import {
  setBoardNameReducer,
  addBoardReducer,
  updateBoardReducer,
  removeBoardReducer,
} from "../reducers/boardReducers";

const platformLaunchData = extractColumns("Platform Launch");
const marketingPlanData = extractColumns("Marketing Plan");
const roadmapData = extractColumns("Roadmap");

const initialState = {
  boards: [
    {
      name: "Platform Launch",
      columns: platformLaunchData.columns,
    },
    {
      name: "Marketing Plan",
      columns: marketingPlanData.columns,
    },
    {
      name: "Roadmap",
      columns: roadmapData.columns,
    },
  ],
  boardName: "Platform Launch",
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoardName: setBoardNameReducer,
    addBoard: addBoardReducer,
    updateBoard: updateBoardReducer,
    removeBoard: removeBoardReducer,
    addTask: addTaskReducer,
    updateTask: updateTaskReducer,
    removeTask: removeTaskReducer,
    updateSubtaskStatus: updateSubtaskStatusReducer,
  }, 
});

export const {
  setBoardName,
  addBoard,
  removeBoard,
  updateBoard,
  addTask,
  updateTask,
  removeTask,
  updateSubtaskStatus,
} = boardsSlice.actions;

export default boardsSlice;
