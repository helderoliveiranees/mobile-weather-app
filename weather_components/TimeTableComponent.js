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
   Text,
   View,
   Image,
   Pressable,
 } from 'react-native';
 
 import {useState} from 'react';
 
 import * as Constants from '../weather_constants/Constants';
 import i18n from '../weather_translation/i18n';
 import {containerColor, getConditionWeatherImg, 
   getDayOfWeek, formatMonthDay, getFakeTime} from '../weather_utils/utils';
 
 import {styles} from '../weather_styles/Styles'
 
 export function TimeTableComponent(props){
 
   const [monthDay, setMonthDay] = useState('')
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [dayOfWeek, setDayOfWeek] = useState(i18n.t('todayText'))
 
   //Update the month day format hen the user click the respective day
   function updateDate(index){
     try{
       let dayOfWeek = getDayOfWeek(props.results.forecast[index].date, Constants.LONG)
       let monthDayDate = formatMonthDay(props.results.forecast[index].date)
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
         <View style={{...styles.timeTableContainer, backgroundColor: containerColor(props.results.currently)}}>
             <View style={{... styles.rowContainer, justifyContent: 'space-between'}}>
                 <Text style={{...styles.titleBoldText, textTransform: 'capitalize'}}>{dayOfWeek}</Text>
                 <Text style={{...styles.titleMediumText, textTransform: 'capitalize'}} >{monthDay}</Text>
             </View>
             <ScrollView
                 contentContainerStyle={styles.cardsContainer}
                 horizontal={true}
                 showsHorizontalScrollIndicator={false}
             >
                 {props.results.forecast.map((item, index) => {
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
     </SafeAreaView>
   );
 }
 