import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import {THEME} from "../theme";
import {AppCard} from "../component/ui/Card";


export const TodoScreen = ({goBack, todo, onRemove}) => {

  const [modal, setModal] = useState(false);

  return (
      <View>
        <AppCard style={styles.card}>
          <Text>{todo.title}</Text>
          <Button title="Редактировать"
          onPress={ () => setModal(true) }/>
        </AppCard>

        <View style={styles.buttons}>
          <View style={styles.button}><Button title="Назад" color={THEME.GREY_COLOR} onPress={goBack}/></View>
          <View style={styles.button}><Button title="Удалить" color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}/></View>
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
    width: '40%',
  },
  title: {
    fontSize: 20
  }
});