/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

import React from 'react';
//import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
} from 'react-native';

import {useEffect, useState} from 'react';

import * as Localization from 'expo-localization';
import LinearGradient from 'react-native-linear-gradient';
import * as Constants from './weather_constants/Constants';
import i18n from './weather_translation/i18n';
import {applyProportions, containerColor, getConditionWeatherImg, 
  getDayOfWeek, formatMonthDay, getFakeTime} from './weather_utils/utils';

import * as Font from 'expo-font';

import {styles} from './weather_styles/Styles'

import {TodayComponent} from './weather_components/TodayComponent'
import {TimeTableComponent} from './weather_components/TimeTableComponent'
import { ForecastComponent } from './weather_components/ForecastComponent';

function App(){

  //These are the default states. After the first render, they will be loaded
  //from API https://api.hgbrasil.com/weather
  //const [latitude, setLatitude] = useState('-9.5945747')
  //const [longitude, setLongitude] = useState('-35.6866786')
  const [latitude, setLatitude] = useState('50.073658')
  const [longitude, setLongitude] = useState('14.418540')

  const [monthDay, setMonthDay] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [dayOfWeek, setDayOfWeek] = useState(i18n.t('todayText'))

  //The results from API will be load into this state. The constant DEFAULT_RESULTS
  //is used just to initialize the state in the case of the API fail to load the results
  //regarding the required weather info
  const [results, setResults] = useState(Constants.DEFAULT_RESULTS)

  const [fontsLoaded, setFontsLoaded] = useState(false)

  //Loads the fonts used in the UI
  useEffect(() => {
    (async () =>{
      try{
        console.log("Tag 1")
        await Font.loadAsync({
          'AlegreyaSans-Regular': require('./assets/fonts/AlegreyaSans-Regular.ttf'),
          'AlegreyaSans-Bold': require('./assets/fonts/AlegreyaSans-Bold.ttf'),
          'SFProDisplay-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
          'SFProDisplay-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        });
        setFontsLoaded(true)
        console.log("Tag 2")
      }catch(e){
        console.log(e)
        //Show some error message
      }
    })()
  }, [])

  //Call the https://api.hgbrasil.com/
  //Called on the first render
  //Called when other place (city) is chosen
  //OBS: To retrieve the temperature historic, the hgbrasil charges
  //In this way, this functionality was not implemented. However, it was used
  //mock data to simulate this functionality
  useEffect(() => {
    (async () =>{
      try{
        if(!fontsLoaded){
           return
        }
        console.log('fonts were loaded')
        let response = await fetch(Constants.WEATHER_API +`&lat=${latitude}&lon=${longitude}`);
        const json = await response.json();
        //console.log(json.results)
        if(json != null){
          setResults(json.results)
          setMonthDay(formatMonthDay(json.results.forecast[0].date))
        }else{
          //Show some error message
        }
      }catch(e){
        console.log(e)
        //Show some error message
      }
    })()
  }, [fontsLoaded])

  //Update the month day format hen the user click the respective day
  function updateDate(index){
    try{
      let dayOfWeek = getDayOfWeek(results.forecast[index].date, Constants.LONG)
      let monthDayDate = formatMonthDay(results.forecast[index].date)
      setDayOfWeek((index == 0)? i18n.t('todayText'):dayOfWeek)
      setMonthDay(monthDayDate)
      setSelectedIndex(index)
    }catch(e){
      console.log(e)
      //Show some error message
    }
  }

  return (
    <SafeAreaView>
      <StatusBar
        hidden={false}
        translucent
        backgroundColor="transparent"
      />
      <ScrollView>
        {/* If it is daytime, the light theme will be shown instead dark theme (at night) */}
        <LinearGradient colors={
          (results.currently=='dia'|| results.currently=='day')?
          Constants.LIGHT_THEME:Constants.DARK_THEME}
          style={styles.linearGradient}
        >
          <TodayComponent results={results}/>
          <TimeTableComponent results={results}/>
          <ForecastComponent results={results}/>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
