import React, {useContext} from 'react'
import {StyleSheet, View} from "react-native";
import {Navbar} from "./component/Navbar";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {THEME} from "./theme";
import {ScreenContext} from "./context/screen/screenContext";

export const MainLayout = () => {
  const {todoId} = useContext(ScreenContext);

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