import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {THEME} from "../theme";

export const Navbar = ({title}) => {

  return (
    <View style={{ ...styles.navbar,
      ...Platform.select( {
        ios: styles.navbarIos,
        android: styles.navbarAndroid
          }
      ) }}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIos: {
    backgroundColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  text: {
    fontSize:20,
    color: Platform.OS ? THEME.MAIN_COLOR : '#fff'
  }
});