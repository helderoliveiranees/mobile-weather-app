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
        if(json != null){
          setResults(json.results)
          setMonthDay(formatMonthDay(json.results.forecast[0].date))
        }else{
          //Show some error message
        }
      }catch(e){
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
          <View style={styles.firstContainer}>
            <View style={styles.selectedCityContainer}>
              <Image
                style={styles.pinContainer}
                source={Constants.ICONS.PIN_URI}
              />
              <Text numberOfLines={1} style={styles.cityNameText}>{results.city}</Text>
              <Image
                style={styles.chevronContainer}
                source={Constants.ICONS.CHEVRON_URI}
              />
            </View>
            <Image
              style={styles.bellContainer}
              source={Constants.ICONS.BELL_URI}
            />
          </View>
          <View style={styles.figureAlignment}>
            <Image
              style={styles.figureContainerBig}
              source={
                //The figure to represent the current weather condition will be
                //defined based the condition slug, since it have 12 possibilities.
                //The condition code could be used instead, however, due the time
                //limitation to accomplish this activity, it was not the option
                //(it has 48 possibilities)
                getConditionWeatherImg(results.condition_slug)
              }
            />
          </View>
          <View style={styles.curWeatherContainer}>
            <Text style={styles.tempText}>{results.temp}°C</Text>
            <Text style={styles.descriptionText}>{results.description}</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.descriptionText}>{i18n.t('maxText')}.: {results.forecast[0].max}°</Text>
              <Text style={styles.descriptionText}>{i18n.t('minText')}.: {results.forecast[0].min}°</Text>
            </View>
          </View>

          <View style={{... styles.aditionalInfoContainer, backgroundColor: containerColor(results.currently)}}>
            <View style={{...styles.rowContainer, gap: 5}}>
              <Image
                  style={styles.smallIconContainer}
                  source={Constants.ICONS.RAIN_PROBABILITY_URI}
              />
              <Text style={styles.aditionalInfoText}>{results.forecast[0].rain_probability}%</Text>
            </View>
            <View style={{...styles.rowContainer, gap: 0}}>
              <Image
                  style={styles.smallIconContainer}
                  source={Constants.ICONS.HUMIDITY_URI}
              />
              <Text style={styles.aditionalInfoText}>{results.humidity}%</Text>
            </View>
            <View style={{...styles.rowContainer, gap: 5}}>
              <Image
                  style={styles.smallIconContainer}
                  source={Constants.ICONS.WIND_SPEEDY_URI}
              />
              <Text style={styles.aditionalInfoText}>{results.wind_speedy}</Text>
            </View>
          </View>

          <View style={{...styles.todayContainer, backgroundColor: containerColor(results.currently)}}>
            <View style={{... styles.rowContainer, justifyContent: 'space-between'}}>
              <Text style={{...styles.titleBoldText, textTransform: 'capitalize'}}>{dayOfWeek}</Text>
              <Text style={{...styles.titleMediumText, textTransform: 'capitalize'}} >{monthDay}</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.cardsContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {results.forecast.map((item, index) => {
                    return (
                      <Pressable key={index}
                        onPress={() => updateDate(index)}
                      >
                        <View key={index}
                          style={(index == selectedIndex)?styles.singleCardContainerWB:
                            styles.singleCardContainer}
                        >
                            <Text style={{...styles.descriptionText, fontSize: 16}}>{item.max}°C</Text>
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
                            {/* A fake time was retrieved, since a paid version of the API weather is
                            needed to retrieve the real time forecast based on hours to the present day */}
                            <Text style={{...styles.descriptionText, fontSize: 16}}>{getFakeTime(index)}</Text>
                        </View>
                      </Pressable>
                    );
                })}
            </ScrollView>
          </View>
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
