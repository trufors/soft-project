import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { HttpService } from '../../../api';
import { IdParams, TodoType } from '../../../types';
import { LoadingStatus } from '../../constants';

import { selectTodoById, selectTodosIds } from './selectors';

export const fetchTodos = createAsyncThunk<TodoType[]>('todos/fetchTodos', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  if (selectTodosIds(state).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatus.EARLYADDED);
  }
  const { data } = await HttpService.get('/users/1/todos');
  return data;
});

export const fetchDeleteTodo = createAsyncThunk<number, IdParams>(
  'todos/fetchDeleteTodos',
  async ({ id }, thunkAPI) => {
    await HttpService.delete(`/todos/${id}`);
    return parseInt(id);
  },
);

export const fetchCreateTodo = createAsyncThunk<TodoType, TodoType>(
  'todos/fetchCreateTodos',
  async (todo, thunkAPI) => {
    const { data } = await HttpService.post<TodoType>('/todos', todo);
    return todo;
  },
);

export const fetchUpdateTodo = createAsyncThunk<TodoType, IdParams>(
  'todos/fetchUpdateTodo',
  async ({ id }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const newTodo = { ...selectTodoById(state, id) };

    newTodo.completed = !newTodo.completed;

    const { data } = await HttpService.patch<TodoType>(`/todos/${newTodo.id}`, {
      completed: newTodo.completed,
    });

    return newTodo as TodoType;
  },
);
