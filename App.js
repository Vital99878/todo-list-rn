import React, {useState} from 'react';
import * as  Font from 'expo-font';
import AppLoading from "expo/build/launch/AppLoading";
import {MainLayout} from "./src/MainLayout";
import {TodoState} from "./src/context/todo/TodoState";
import {ScreenState} from "./src/context/screen/ScreenState";

async function loadFontsRoboto() {
  await Font.loadAsync( {
    'roboto-bold': require('./assets/Fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('./assets/Fonts/Roboto-Regular.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if(!isReady) {
    return (
        <AppLoading
            startAsync={loadFontsRoboto}
            onError={err => console.log('Error')}
            onFinish={() => setIsReady(true)}
        />
    )
  }

  return (
      <ScreenState>
        <TodoState>
          <MainLayout/>
        </TodoState>
      </ScreenState>
  );
}


