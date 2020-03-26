import React, {useReducer, useContext} from 'react';
import {TodoContext} from './TodoContext'
import {TodoReducer} from "./todoReducer";
import {ADD_TODO, CLEAR_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO} from "../types";
import {ScreenContext} from "../screen/screenContext";

export const TodoState = ( {children} ) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };
  const {changeScreen} = useContext(ScreenContext);
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const addTodo = title => {
    dispatch({type: ADD_TODO, title: title})
  };

  const removeTodo = id => {
    dispatch({type: REMOVE_TODO, id})
    changeScreen(null);
  };

  const saveTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

  const showLoader = () => dispatch({type: SHOW_LOADER});

  const hideLoader = () => dispatch({type: HIDE_LOADER});

  const showError = (error) => dispatch( {type: SHOW_ERROR});

  const clearError = (error) => dispatch( {type: CLEAR_ERROR});

  return (
    <TodoContext.Provider
        value={{
          todos: state.todos,
          addTodo,
          removeTodo,
          saveTodo}}
    >
      {children}
    </TodoContext.Provider>
  )
};