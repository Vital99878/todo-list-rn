import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert, Keyboard} from 'react-native';
import {THEME} from "../theme";
import { AntDesign} from '@expo/vector-icons'

export const AddTodo = ({onSubmit}) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if(value.trim()) {
      onSubmit(value);
      setValue('');
      Keyboard.dismiss()
    }else {
      Alert.alert('Введите название дела')
      //error
    }
  };
  
  return (
    <View style={styles.block}>
      <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
          placeholder='Новый'
          autoCorrect={false}
          autoCapitalize="none"
          />
      <AntDesign.Button onPress={pressHandler} name="plus">
        Добавить
      </AntDesign.Button>
      {/*<Button title='Добавить' onPress={pressHandler}/>*/}
    </View>
  )
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom:10
  },
  input: {
    width: '70%',
    padding: 5,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  }
});