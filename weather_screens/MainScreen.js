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
   Text,
   View,
 } from 'react-native';
 
 import {useEffect, useState} from 'react';
 
 import * as Localization from 'expo-localization';
 import LinearGradient from 'react-native-linear-gradient';
 import * as Constants from '../weather_constants/Constants';
 
 import {styles} from '../weather_styles/Styles'
 
 import {TodayComponent} from '../weather_components/TodayComponent'
 import {TimeTableComponent} from '../weather_components/TimeTableComponent'
 import { ForecastComponent } from '../weather_components/ForecastComponent';
 import {LocationComponent} from '../weather_components/LocationComponent'
 
 export default function MainScreen({navigation,route}){
 
   //These are the default latitude and longitude from the Maceio-AL city 
   const [latitude, setLatitude] = useState(Constants.LATITUDE_MACEIO)
   const [longitude, setLongitude] = useState(Constants.LONGITUDE_MACEIO)
 
 
   //The results from API will be load into this state
   const [results, setResults] = useState(null)
 
   //Calls the https://api.hgbrasil.com/ to retrieve the weather information
   //This function is called on the first render, as well as when the the user 
   //selects another city.
   //Note that the temperature historical data is NOT implemented in this version 
   //since it requires a subscription to the HGBrasil API.
   //Therefore, mock data is used to mimic this functionality.
   useEffect(() => {
     (async () =>{
       try{
         if(!locationLoaded){
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
  }, [locationLoaded])
 
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
          {(results != null)?
            <View>
              <LocationComponent results={results}/>
              <TodayComponent results={results}/>
              <TimeTableComponent results={results}/>
              <ForecastComponent results={results}/>
            </View>
          :
            <View style={styles.imageContainer}>
              <Image
                source={Constants.GIF_LOADING}
                style={styles.gif}
                animated
              />
              <Text style={{...styles.descriptionText, fontFamily: 'AlegreyaSans-Bold'}}>{i18n.t('loadingText')}</Text>
            </View>
          }
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
   );
 }
 