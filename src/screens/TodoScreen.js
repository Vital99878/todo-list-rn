import React, {useState} from 'react';
import {StyleSheet, View, Button} from "react-native";
import {THEME} from "../theme";
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {AppCard} from "../component/ui/Card";
import {EditModal} from "../component/EditModal";
import {AppTextBold} from "../component/ui/AppTextBold";
import {AppButton} from "../component/ui/AppButton";

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {

  const [modal, setModal] = useState(false);

  const saveHandler = title => {
    onSave(todo.id, title);
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
            <AppButton color={THEME.GREY_COLOR} onPress={goBack}>
              <AntDesign name='back' size={20} color='#fff' />
            </AppButton>
          </View>
          <View style={styles.button}>
            <AppButton title="Удалить" color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}>
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
    width: '40%',
  },
  title: {
    fontSize: 20
  }
});