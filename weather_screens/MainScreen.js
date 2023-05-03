/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

/**
 * The Main screen engloble all the components to construct the
 * weather app: LocationComponent.js, TodayCOmponent.js, TimeTableCOmponent.js
 * and ForecastComponent.js
 */

 import React from 'react';
 //import type {PropsWithChildren} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
 } from 'react-native';
 
 import {useEffect, useState} from 'react';
 
 import * as Localization from 'expo-localization';
 import LinearGradient from 'react-native-linear-gradient';
 import * as Constants from '../weather_constants/Constants';
 
 import * as Font from 'expo-font';
 
 import {styles} from '../weather_styles/Styles'
 
 import {TodayComponent} from '../weather_components/TodayComponent'
 import {TimeTableComponent} from '../weather_components/TimeTableComponent'
 import { ForecastComponent } from '../weather_components/ForecastComponent';
 import {LocationComponent} from '../weather_components/LocationComponent'
 
 export default function MainScreen({navigation,route}){
 
   //These are the default states. After the first render, they will be loaded
   //from API https://api.hgbrasil.com/weather
   //const [latitude, setLatitude] = useState('-9.5945747')
   //const [longitude, setLongitude] = useState('-35.6866786')
   const [latitude, setLatitude] = useState('50.073658')
   const [longitude, setLongitude] = useState('14.418540')
 
 
   //The results from API will be load into this state. The constant DEFAULT_RESULTS
   //is used just to initialize the state in the case of the API fail to load the results
   //regarding the required weather info
   const [results, setResults] = useState(Constants.DEFAULT_RESULTS)
 
   //Used to check if the fonts ere loaded
   const [fontsLoaded, setFontsLoaded] = useState(false)
 
   //Loads the fonts used in the UI
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
 
 
   //Calls the https://api.hgbrasil.com/ to retrieve the weather information
   //This function is called on the first render, as well as when the fonts 
   //are loaded and when the user selects another city.
   //Note that the temperature historical data is not implemented in this version 
   //since it requires a subscription to the HGBrasil API.
   //Therefore, mock data is used to simulate this functionality.
   useEffect(() => {
     (async () =>{
       try{
         if(!fontsLoaded){
            return
         }
         let response = await fetch(Constants.WEATHER_API +`&lat=${latitude}&lon=${longitude}`);
         const json = await response.json();
         if(json != null){
           setResults(json.results)
         }else{
           //Show some warning message
         }
       }catch(e){
         console.log(e)
         //Show some error message
       }
     })()
  }, [fontsLoaded])
 
   return (
    <SafeAreaView>
      <StatusBar
        hidden={false}
        translucent
        backgroundColor="transparent"
      />
      <ScrollView>
        {/* If it is daytime, the component will display the light theme 
        instead of the dark theme used during the night. */}
        <LinearGradient colors={
          (results.currently=='dia'|| results.currently=='day')?
          Constants.LIGHT_THEME:Constants.DARK_THEME}
          style={styles.linearGradient}
        >
          <LocationComponent results={results}/>
          <TodayComponent results={results}/>
          <TimeTableComponent results={results}/>
          <ForecastComponent results={results}/>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
   );
 }
 