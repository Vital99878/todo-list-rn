import React, {useState} from 'react';
import { StyleSheet,  View, Alert } from 'react-native';
import { Navbar} from "./src/component/Navbar";
import {MainScreen} from "./src/screens/MainScreen";
import {TodoScreen} from "./src/screens/TodoScreen";
import * as  Font from 'expo-font';
import AppLoading from "expo/build/launch/AppLoading";

async function loadFontsRoboto() {
  await Font.loadAsync( {
    'roboto-bold': require('./assets/Fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('./assets/Fonts/Roboto-Regular.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    {id: '1', title: 'React Native'}
  ]);

  if(!isReady) {
    return (
        <AppLoading
            startAsync={loadFontsRoboto}
            onError={err => console.log('Error')}
            onFinish={() => setIsReady(true)}
        />
    )
  }

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title
    };


    setTodos (prev => [
        ...prev,
      {
      id: Date.now().toString(),
      title: title // если ключ и значение совпадают, то значение можно не писать
      }
    ])
  };

  const removeTodo = id => {
    const todo = todos.find(t => t.id ===id);
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
              setTodoId(null);
              setTodos(prev => prev.filter(todo => todo.id !== id))
          }},
        ],
        {cancelable: false}, //закрытие модального окна при клике за его пределами
    );
  };

  const  saveTodo = (id, title) => {
    setTodos(old => old.map(todo => {
      if(todo.id === id) {
        todo.title = title
      }
      return todo
    }))
  };

  let content = (<MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo}
                             openTodo={ id => { setTodoId(id)}
                             }/>);
  if(todoId){
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = (
        <TodoScreen
            goBack={() => setTodoId(null)}
            todo={selectedTodo}
            onRemove={removeTodo}
            onSave={saveTodo}
            />)
  }
  return (
    <View >
        <Navbar title="Todo App"/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical:30
  },
});
