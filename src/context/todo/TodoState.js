import React, {useReducer, useContext} from 'react';
import {TodoContext} from './TodoContext'
import {TodoReducer} from "./todoReducer";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from "../types";
import {ScreenContext} from "../screen/screenContext";

export const TodoState = ( {children} ) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };
  const {changeScreen} = useContext(ScreenContext);
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const addTodo = async title => {
    const response = await fetch('https://rn-todo-b530c.firebaseio.com/todos.json',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title})
    });
    const data = await response.json();
    dispatch({type: ADD_TODO, title: title, id: data.name})
  };

  const removeTodo = id => {
    dispatch({type: REMOVE_TODO, id});
    changeScreen(null);
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const response = await fetch('https://rn-todo-b530c.firebaseio.com/todos.json',{
        method: 'GET',
        headers: {'Content_Type': 'application/json'}
      });
      const data = await response.json();
      const todos = Object.keys(data).map(key => ({...data[key], id:key}));
      dispatch({type:FETCH_TODOS, todos});
    } catch (e) {
      showError('Что-то сломалось!');
      console.log(e)
    } finally {
      hideLoader()
    }
  };

  const saveTodo =async (id, title) => {
    await fetch(`https://rn-todo-b530c.firebaseio.com/${id}.json`, {
      method: 'PATCH', // PATCH используется когда нужно изменить часть элемента, PUT - изменить весь объект
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title})
    });
    dispatch({type: UPDATE_TODO, id, title})
  };

  const showLoader = () => dispatch({type: SHOW_LOADER});

  const hideLoader = () => dispatch({type: HIDE_LOADER});

  const showError = (error) => dispatch( {type: SHOW_ERROR});

  const clearError = () => dispatch( {type: CLEAR_ERROR});

  return (
    <TodoContext.Provider
        value={{
          loading: state.loading,
          error: state.error,
          todos: state.todos,
          addTodo,
          removeTodo,
          saveTodo,
          showLoader,
          fetchTodos}}
    >
      {children}
    </TodoContext.Provider>
  )
};