/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

/**
 * Defines the stack navigaton screens. There are two screens: 
 * SplashScreen.js and MainScreen.js
 */

import React from 'react';
//import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './weather_screens/MainScreen'
import SplashScreen from './weather_screens/SplashScreen'

const Stack = createNativeStackNavigator();

function App(){
  return (

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen}
              options={({ navigation, route }) => ({ 
              headerShown: false,
            })}/>
            <Stack.Screen name="MainScreen" component={MainScreen}
              options={({ navigation, route }) => ({ 
              headerShown: false,
            })}/>
          </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;
