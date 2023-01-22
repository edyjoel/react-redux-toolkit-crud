import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Take out the trash",
    description: "Take out the trash and put it in the bin",
    completed: false,
  },
  {
    id: 2,
    description: "Buy some milk",
    title: "Grocery shopping",
    completed: false,
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    },
    editTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload.id);
      if (taskFound) {
        taskFound.title = action.payload.title;
        taskFound.description = action.payload.description;
      }
    },
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
