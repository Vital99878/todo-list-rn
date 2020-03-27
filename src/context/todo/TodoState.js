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
import {Alert} from "react-native";
import {Http} from "../../http.";

export const TodoState = ( {children} ) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };
  const {changeScreen} = useContext(ScreenContext);
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const addTodo = async title => {
    clearError();
    try {
      const data = await Http.post(
          'https://rn-todo-b530c.firebaseio.com/todos.json',
          {title}
      );
      dispatch({type: ADD_TODO, title: title, id: data.name})
    } catch (e) {
      showError('Xnj')
    }
  };

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id ===id);
    Alert.alert(
        'Удаление элемента',
        `Вы уверены, что хотите удалить "${todo.title}"?`,
        [
          {
            text: 'Отмена',
            style: 'Cancel',
          },
          {
            text: 'Удалить',
            style: 'destructive',
            onPress:async () => {
              changeScreen(null);
              await Http.delete(`https://rn-todo-b530c.firebaseio.com/todos/${id}.json`);
              dispatch({type: REMOVE_TODO, id});
            }
          }
        ],
        {cancelable: false}
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get('https://rn-todo-b530c.firebaseio.com/todos.json', 'GET');
      const todos = Object.keys(data).map(key => ({...data[key], id:key}));
      dispatch({type:FETCH_TODOS, todos});
    } catch (e) {
      showError('Что-то сломалось!');
      console.log(e)
    } finally {
      hideLoader()
    }
  };

  const saveTodo = async (id, title) => {
    await Http.patch(
        `https://rn-todo-b530c.firebaseio.com/todos/${id}.json`
    );
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