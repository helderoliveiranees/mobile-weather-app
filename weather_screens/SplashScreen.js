/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

/**
 * The Splash Screen
 */

 import React, { useEffect, useState, useRef } from 'react';
 import {SafeAreaView, Text, View, StatusBar, Image} from 'react-native';
 import LinearGradient from 'react-native-linear-gradient';
 import * as Font from 'expo-font';
 import * as Constants from '../weather_constants/Constants';
 import {styles} from '../weather_styles/Styles'
 
 export default function SplashScreen({ navigation, route }) {

  //Used to check if the fonts ere loaded
  const [fontsLoaded, setFontsLoaded] = useState(false)

  //Used to trigger the presentation of the next screen
  const [triggerNextScreen, setTriggerNextScreen] = useState(false)

  //Loads the fonts used in the UI while the splash screen is showed
    useEffect(() => {
    (async () =>{
      try{
        console.log("Tag 1")
        await Font.loadAsync({
          'AlegreyaSans-Regular': require('../assets/fonts/AlegreyaSans-Regular.ttf'),
          'AlegreyaSans-Bold': require('../assets/fonts/AlegreyaSans-Bold.ttf'),
          'SFProDisplay-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
          'SFProDisplay-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        });
        setFontsLoaded(true)
        console.log("Tag 2")
      }catch(e){
        // This is set to true because I want to make sure that the weather API is called
        // even if the fonts are not correctly loaded on some devices. By forcing the API call
        // to occur regardless of the font loading status, the user will always have access
        // to the latest weather information.
        setFontsLoaded(true)
        console.log(e)
        //Show some error message
      }
    })()
  }, [])

  //Triggers to the MainScreen when the fonts are loaded and gif
  //animation time finish
  useEffect(() => {
    if(fontsLoaded){
      console.log('print navigate')
      navigation.navigate('MainScreen')
    }
  }, [fontsLoaded])

  return (
    <SafeAreaView>
    <StatusBar
      hidden={false}
      translucent
      backgroundColor="transparent"
    />
      <LinearGradient colors={Constants.SPLASH_THEME}
        style={styles.linearGradientLoading}
      >
        <View style={styles.imageContainer}>
          <Image
            source={Constants.GIF_SPLASH_URI}
            style={styles.gif}
          />
        </View>
        <View style={styles.textSplashContainer}>
          <Text style={styles.textSplash}>Weather App - NEES</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
 