import React, {useReducer, useContext} from 'react';
import {Alert} from "react-native";
import {TodoContext} from './TodoContext'
import {TodoReducer} from "./todoReducer";
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";
import {ScreenContext} from "../screen/screenContext";

export const TodoState = ( {children} ) => {
  const initialState = {
    todos: [
      {id: '1', title: 'React Native'}
    ]
  };
  const {changeScreen} = useContext(ScreenContext);
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const addTodo = title => {
    dispatch({type: ADD_TODO, title: title})
  };

  const removeTodo = id => {
    const todo = state.todos.find ( t => t.id === id);


    Alert.alert(
        'Удаление элемента',
        `Вы уверены, что хотите удалить "${todo.title}"?`,
        [
          {
            text: 'Отмена',
            style: 'cancel',
          },
          {text: 'Уадить',
            onPress: () => {
              changeScreen(null);
              dispatch({type: REMOVE_TODO, id});
            }},
        ],
        {cancelable: false}, //закрытие модального окна при клике за его пределами
    )
  };

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