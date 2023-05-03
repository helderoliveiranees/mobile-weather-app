/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

/**
* This component displays the current day's weather forecast information,
* including temperature, humidity, wind speed, and chance of rain.
*/

 import React from 'react';
 import {
   SafeAreaView,
   Text,
   View,
   Image,
 } from 'react-native';
 
 import {useState} from 'react';
 
 import * as Constants from '../weather_constants/Constants';
 import i18n from '../weather_translation/i18n';
 import {containerColor, getConditionWeatherImg} from '../weather_utils/utils';
 import {styles} from '../weather_styles/Styles'
 
 export function TodayComponent(props){

  return (
    <SafeAreaView>
      <View style={styles.curWeatherContainer}>
        <Text style={styles.tempText}>{props.results.temp}°C</Text>
        <Text style={styles.descriptionText}>{props.results.description}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.descriptionText}>{i18n.t('maxText')}.: {props.results.forecast[0].max}°</Text>
          <Text style={styles.descriptionText}>{i18n.t('minText')}.: {props.results.forecast[0].min}°</Text>
        </View>
      </View>

      <View style={{... styles.aditionalInfoContainer, backgroundColor: containerColor(props.results.currently)}}>
        <View style={{...styles.rowContainer, gap: 5}}>
          <Image
              style={styles.smallIconContainer}
              source={Constants.ICONS.RAIN_PROBABILITY_URI}
          />
          <Text style={styles.aditionalInfoText}>{props.results.forecast[0].rain_probability}%</Text>
        </View>
        <View style={{...styles.rowContainer, gap: 0}}>
          <Image
              style={styles.smallIconContainer}
              source={Constants.ICONS.HUMIDITY_URI}
          />
          <Text style={styles.aditionalInfoText}>{props.results.humidity}%</Text>
        </View>
        <View style={{...styles.rowContainer, gap: 5}}>
          <Image
              style={styles.smallIconContainer}
              source={Constants.ICONS.WIND_SPEEDY_URI}
          />
          <Text style={styles.aditionalInfoText}>{props.results.wind_speedy}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}