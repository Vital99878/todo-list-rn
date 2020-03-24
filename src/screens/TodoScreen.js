import React, {useState, useContext} from 'react';
import {StyleSheet, View, Dimensions} from "react-native";
import {THEME} from "../theme";
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {AppCard} from "../component/ui/Card";
import {EditModal} from "../component/EditModal";
import {AppTextBold} from "../component/ui/AppTextBold";
import {AppButton} from "../component/ui/AppButton";
import {TodoContext} from "../context/todo/TodoContext";
import {ScreenContext} from "../context/screen/screenContext";

export const TodoScreen = () => {
  const {todos, saveTodo, removeTodo} = useContext(TodoContext);
  const {todoId, changeScreen} = useContext(ScreenContext);
  const [modal, setModal] = useState(false);

  const todo = todos.find(t => t.id === todoId);

  const saveHandler = title => {
    saveTodo(todo.id, title);
    setModal(false)
  };

  return (
      <View>
        <EditModal
          value={todo.title}
          visible={modal}
          onCancel={ () => setModal(false)}
          onSave={saveHandler}/>

        <AppCard style={styles.card}>
          <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
          <AppButton onPress={ () => setModal(true)}>
            <FontAwesome name='edit' size={20}/>
          </AppButton>
          </AppCard>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
              <AntDesign name='back' size={20} color='#fff' />
            </AppButton>
          </View>
          <View style={styles.button}>
            <AppButton title="Удалить" color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
              <FontAwesome name='remove' size={20} color='#fff' />
            </AppButton>
          </View>
        </View>
      </View>
  )
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
    card: {
      marginBottom: 25,
      padding: 10
    },
  button: {
    // width: Dimensions.get('window').width/3
    width: Dimensions.get('window').width >400 ? 150 : 100
  },
  title: {
    fontSize: 20
  }
});