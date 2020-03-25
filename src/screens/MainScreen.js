import React,  {useState, useEffect, useContext, useCallback} from 'react';
import {FlatList, StyleSheet, View, Image, Dimensions} from "react-native";
import {AddTodo} from "../component/Add-Todo";
import {Todo} from "../component/Todo";
import {THEME} from "../theme";
import {TodoContext} from "../context/todo/TodoContext";
import {ScreenContext} from "../context/screen/screenContext";

export const MainScreen = () => {
  const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
  const {changeScreen} =  useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

  const loadTodos = useCallback( async  () => await fetchTodos(), [fetchTodos] );

  useEffect( () => {
    loadTodos()
  }, []);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
    setDeviceWidth(width)
    };
    Dimensions.addEventListener('change', update);
    return () => {
      Dimensions.removeEventListener('change', update)
    }
  });

  let content = (
      <View style={ {width: deviceWidth} }>
        <FlatList
            keyExtractor={item => item.id.toString()}
            data={todos}
            renderItem={({item}) =>
                <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/> }
        />
      </View>

  );

  if (todos.length === 0) {
    content =
        (<View style={styles.imgWrap}>
          {/*<Text style={styles.text}>Нет дел</Text>*/}
          <Image style={styles.image} source={require('../../assets/pencil.png')} />
        </View>)
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo}/>

      {content}
    </View>
 )
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    // width: 250
  },
  image: {
    width: '60%',
    height: '80%',
    resizeMode: 'contain'
  },
  text: {
    fontSize: 26
  }
});