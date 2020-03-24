import React, {useContext} from 'react'
import {StyleSheet, View} from "react-native";
import {Navbar} from "./component/Navbar";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {THEME} from "./theme";
import {ScreenContext} from "./context/screen/screenContext";

export const MainLayout = () => {
  const {todoId} = useContext(ScreenContext);
  // const [todoId, setTodoId] = useState(null);
  // const [todos, setTodos] = useState([]);

  // const addTodo = (title) => {
  //   const newTodo = {
  //     id: Date.now().toString(),
  //     title: title
  //   };
  //
  //   setTodos (prev => [
  //     ...prev,
  //     {
  //       id: Date.now().toString(),
  //       title: title // если ключ и значение совпадают, то значение можно не писать
  //     }
  //   ])
  // };

  // const removeTodo = id => {
  //   const todo = todos.find(t => t.id ===id);
  //   Alert.alert(
  //       'Удаление элемента',
  //       `Вы уверены, что хотите удалить "${todo.title}"?`,
  //       [
  //         {
  //           text: 'Отмена',
  //           style: 'cancel',
  //         },
  //         {text: 'Уадить',
  //           onPress: () => {
  //             setTodoId(null);
  //             setTodos(prev => prev.filter(todo => todo.id !== id))
  //           }},
  //       ],
  //       {cancelable: false}, //закрытие модального окна при клике за его пределами
  //   );
  // };

  // const  saveTodo = (id, title) => {
  //   setTodos(old => old.map(todo => {
  //     if(todo.id === id) {
  //       todo.title = title
  //     }
  //     return todo
  //   }))
  // };



  return (
      <View>
        <Navbar title="Todo App"/>
        <View style={styles.container}>
          {todoId ? <TodoScreen/> : <MainScreen/> }
        </View>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical:THEME.PADDING_HORIZONTAL
  },
});