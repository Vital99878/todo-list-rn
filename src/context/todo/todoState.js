import React, {useReducer} from 'react';
import {TodoContext} from './todoContext'
import {TodoReducer} from "./todoReducer";

export const TodoState = ( {children} ) => {
  const initialState = {
    todos: [
      {id: '1', title: 'React Native'}
    ]
  };
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  return <TodoContext.Provider value={ { todos: state.todos} }> {children} </TodoContext.Provider>
};