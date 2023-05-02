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

  //Load the fonts used in the UI
  useEffect(() => {
    (async () =>{
      try{
        await Font.loadAsync({
          'AlegreyaSans-Regular': require('./assets/fonts/AlegreyaSans-Regular.ttf'),
          'AlegreyaSans-Bold': require('./assets/fonts/AlegreyaSans-Bold.ttf'),
          'SFProDisplay-Regular': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
          'SFProDisplay-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
          'SFProDisplay-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
          'SFProDisplay-Medium': require('./assets/fonts/SF-Pro-Display-Medium.otf'),
          'SFProDisplay-Thin': require('./assets/fonts/SF-Pro-Display-Thin.otf'),
        });
      }catch(e){
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
        //let start_date = new Date().toISOString().split('T')[0]
        let response = await fetch(Constants.WEATHER_API +`&lat=${latitude}&lon=${longitude}`);
        const json = await response.json();
        console.log(json.results)
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
  }, [])

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
          <View style={{...styles.forecastContainer, backgroundColor: containerColor(results.currently)}}>
            <View style={{...styles.rowContainer, justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.titleBoldText}>{i18n.t('nextForecastText')}</Text>
              <Image
                    style={styles.smallIconContainer}
                    source={Constants.ICONS.CALENDAR_URI}
              />
            </View>
            <View style={styles.forecastItensContainer}>
                {results.forecast.map((item, index) => {
                    return (
                      <View key={index}
                        style={{...styles.rowContainer, justifyContent: 'space-between'}}
                      >
                        <View style={{...styles.forecastItem, alignItems: 'flex-start'}}>
                          <Text style={{...styles.descriptionText, fontFamily: 'AlegreyaSans-Bold', 
                            textTransform: 'capitalize'}}>
                              {getDayOfWeek(results.forecast[index].date, Constants.SHORT)}.
                          </Text>
                        </View>
                        <View style={{...styles.forecastItem, alignItems: 'flex-start'}}>
                          <Image
                            style={styles.figureContainerSmall}
                            source={
                              //The figure to represent the current weather condition will be
                              //defined based the condition slug, since it have 12 possibilities.
                              //The condition code could be used instead, however, due the time
                              //limitation to accomplish this activity, it was not the option
                              //(it has 48 possibilities)
                              getConditionWeatherImg(item.condition)
                            }
                          />
                        </View>
                        <View style={[styles.rowContainer, styles.forecastItem]}>
                          <Text style={{...styles.descriptionText, fontFamily: 'AlegreyaSans-Bold'}}>{item.max}°C</Text>
                          <Text style={{...styles.descriptionText, fontFamily: 'AlegreyaSans-Bold', color: Constants.WHITE_50}}>{item.min}°C</Text>
                        </View>
                      </View>
                    );
                })}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
