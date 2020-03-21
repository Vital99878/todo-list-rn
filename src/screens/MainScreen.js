import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {AddTodo} from "../component/Add-Todo";
import {Todo} from "../component/Todo";

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo}/>

      <FlatList
          keyExtractor={item => item.id.toString()}
          data={todos}
          renderItem={({item}) =>  <Todo todo={item}
                                         onRemove={removeTodo}
          onOpen={openTodo}/> }
      />
    </View>
 )
};

const styles = StyleSheet.create({

});