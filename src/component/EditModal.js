import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Modal, Alert} from 'react-native';
import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";

export const EditModal = ( {visible, onCancel, value, onSave} ) => {
  const [title, setTitle] = useState(value);

  const saveName = () => {
    if(title.trim().length <3) {
      Alert.alert( 'Название должно быть минимум 3 символа!')
    }else {
      onSave(title)
    }
  };



  return (
    <Modal visible={visible} animationType={"slide"} transparent={false}>
      <View style={styles.wrap}>
        <TextInput style={styles.input}
                   value={title}
                   onChangeText={setTitle}
                   placeholder="Введите название"
                   autoCapitalize={"none"}
                   autoCorrect={false}
                   maxLength={64}/>
        <View style={styles.buttons}>
          <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
            Отменить
          </AppButton>
          <AppButton  onPress={saveName}>
            Сохранить
          </AppButton>
        </View>
      </View>
    </Modal>
  )
};

 const styles = StyleSheet.create({
   wrap: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   input: {
     padding: 10,
     borderBottomColor: THEME.MAIN_COLOR,
     borderBottomWidth: 2,
     width: '80%'
   },
   buttons: {
     width: '100%',
     flexDirection: 'row',
     padding:10,
     justifyContent: 'space-around'
   }
 });
