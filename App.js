import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { Navbar} from "./src/component/Navbar";
import {MainScreen} from "./src/screens/MainScreen";
import {TodoScreen} from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    {id: '1', title: 'React Native'},
    {id: '2', title: 'React '}
  ]);

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
