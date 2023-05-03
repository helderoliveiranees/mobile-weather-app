/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

/**
 * The Splash Screen
 */

 import React, { useEffect, useState, useRef } from 'react';
 import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient';
 import * as Font from 'expo-font';
 import * as Constants from '../weather_constants/Constants';
 
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
    if(fontsLoaded && triggerNextScreen){
      console.log('print navigate')
      navigation.navigate('MainScreen')
    }
  }, [fontsLoaded, triggerNextScreen])
  

  const trigger = () =>{
    setTriggerNextScreen(true)
  }

  //Play the next gif at least 3 seconds. It will be played
  //until the trigger to next screen become true and fonts be loaded
   useEffect(() => {
    setTimeout(trigger(), 5000);
   }, []);
 

   return (
     <LinearGradient colors={Constants.SPLASH_THEME}
       style={styles.gradient}
     >
       <View style={styles.imageContainer}>
         <Image
           source={Constants.GIF_SPLASH_URI}
           style={styles.gif}
           animated
         />
       </View>
       <View style={styles.textSplashContainer}>
         <Text style={styles.textSplash}>Weather App - NEES</Text>
       </View>
     </LinearGradient>
   );
 };
 