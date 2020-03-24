import React, {useReducer} from 'react';
import {TodoContext} from './TodoContext'
import {TodoReducer} from "./todoReducer";
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";

export const TodoState = ( {children} ) => {
  const initialState = {
    todos: [
      {id: '1', title: 'React Native'}
    ]
  };
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const addTodo = title => dispatch({type: ADD_TODO, title: title});

  const removeTodo = id => dispatch({type: REMOVE_TODO, id});

  const saveTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

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