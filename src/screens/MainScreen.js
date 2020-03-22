import React from 'react';
import {FlatList, StyleSheet, View, Image} from "react-native";
import {AddTodo} from "../component/Add-Todo";
import {Todo} from "../component/Todo";

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {

  let content = (
      <FlatList
          keyExtractor={item => item.id.toString()}
          data={todos}
          renderItem={({item}) =>  <Todo todo={item}
         onRemove={removeTodo}
         onOpen={openTodo}/> }
      />
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