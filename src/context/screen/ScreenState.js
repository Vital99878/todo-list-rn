import React, {useReducer} from 'react'
import {ScreenContext} from "./screenContext";
import {screenReducer} from './screenReducer'
import {CHANGE_SCREEN} from "../types";

export const ScreenState = ({children}) => {
  const [state, dispatch] = useReducer(screenReducer, null);

  const changeScreen = id => dispath( {type: CHANGE_SCREEN, PADDING_HORIZONTAL, payLoad: id} );

  return <ScreenContext value={{
    changeScreen,
    todoId: state
  }}>
    {children}
  </ScreenContext>
};