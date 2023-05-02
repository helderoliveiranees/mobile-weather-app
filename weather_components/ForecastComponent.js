/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

 import React from 'react';
 //import type {PropsWithChildren} from 'react';
 import {
   SafeAreaView,
   Text,
   View,
   Image,
 } from 'react-native';
 
 
 import * as Constants from '../weather_constants/Constants';
 import i18n from '../weather_translation/i18n';
 import {applyProportions, containerColor, getConditionWeatherImg, 
   getDayOfWeek, formatMonthDay, getFakeTime} from '../weather_utils/utils';
 
 import {styles} from '../weather_styles/Styles'
 
export function ForecastComponent(props){

   return (
     <SafeAreaView>
        <View style={{...styles.forecastContainer, backgroundColor: containerColor(props.results.currently)}}>
            <View style={{...styles.rowContainer, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.titleBoldText}>{i18n.t('nextForecastText')}</Text>
            <Image
                style={styles.smallIconContainer}
                source={Constants.ICONS.CALENDAR_URI}
            />
            </View>
            <View style={styles.forecastItensContainer}>
                {props.results.forecast.map((item, index) => {
                    return (
                    <View key={index}
                        style={{...styles.rowContainer, justifyContent: 'space-between'}}
                    >
                        <View style={{...styles.forecastItem, alignItems: 'flex-start'}}>
                        <Text style={{...styles.descriptionText, fontFamily: 'AlegreyaSans-Bold', 
                            textTransform: 'capitalize'}}>
                            {getDayOfWeek(props.results.forecast[index].date, Constants.SHORT)}.
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
     </SafeAreaView>
   );
 }
 