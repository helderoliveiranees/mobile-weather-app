/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

/**
 * This component displays a selector that allows the user to choose a city
 * for which to check the weather forecast.
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';

import {useState} from 'react';

import * as Constants from '../weather_constants/Constants';
import i18n from '../weather_translation/i18n';
import {containerColor, getConditionWeatherImg} from '../weather_utils/utils';
import {styles} from '../weather_styles/Styles'

export function LocationComponent(props){

 return (
   <SafeAreaView>
     <View style={styles.todayContainer}>
       <Pressable style={styles.selectedCityContainer}
        onPress={() => props.setClickedButtom(true)}
       >
         <Image
           style={styles.pinContainer}
           source={Constants.ICONS.PIN_URI}
         />
         <Text numberOfLines={1} style={styles.cityNameText}>{props.results.city}</Text>
         <Image
           style={styles.chevronContainer}
           source={Constants.ICONS.CHEVRON_URI}
         />
       </Pressable>
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
           getConditionWeatherImg(props.results.condition_slug)
         }
       />
     </View>
   </SafeAreaView>
 );
}