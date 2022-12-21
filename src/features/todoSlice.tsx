import { createSlice } from "@reduxjs/toolkit";

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
};

type Todos = {
  todos: Todo[];
  filterType: string | null;
  sortType: string | null;
};

const initialState: Todos = {
  todos: [],
  filterType: 'ALL',
  sortType: 'DEFAULT',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state: Todos, action) => {
      state.todos.push(action.payload);
    },
    toggleCompletedTodo: (state, action) => {
      const toggleTodo = state.todos.find((todo) => todo.id === action.payload);
      if (toggleTodo?.completed !== undefined) {toggleTodo.completed = !toggleTodo.completed;}
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    changeSorting: (state, action) => {
      state.sortType = action.payload;
    },
    changeFilter: (state, action) => {
      state.filterType = action.payload;
    },
    renameTodo: (state, action) => {
      const renameTodo = state.todos.find((todo) => todo.id === action.payload[0]);
      if (renameTodo?.title) {renameTodo.title = action.payload[1];}
    },
  }
});

export const { 
  addTodo, 
  toggleCompletedTodo, 
  deleteTodo, 
  changeSorting,
  changeFilter,
  renameTodo,
} = todoSlice.actions;
export default todoSlice.reducer;