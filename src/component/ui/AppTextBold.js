import React from 'react'
import {Text, StyleSheet} from "react-native";

export const AppText = props => (
    <Text style={ {...styles.default, ...prop.style} }>{props.children}</Text>
);

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-regular',
  }

});