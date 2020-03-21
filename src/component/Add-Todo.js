import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {THEME} from "../theme";

export const AddTodo = ({onSubmit}) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if(value.trim()) {
      onSubmit(value);
      setValue('')
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
      <Button title='Добавь' onPress={pressHandler}/>
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