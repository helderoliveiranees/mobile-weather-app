/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

 import React from 'react';
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
 
 export function TodayComponent(props){
 
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
         console.log(json.results.forecast)
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
         </LinearGradient>
       </ScrollView>
     </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   linearGradient: {
     width: '100%',
     alignItems: 'center'
   },
   firstContainer:applyProportions({
     width: 343,
     flexDirection: 'row',
     marginTop: 44,
     alignItems: 'center',
     justifyContent: 'space-between',
   }),
   pinContainer:applyProportions({
     width: 20.25,
     height: 24.44,
   }),
   cityNameText:{
     fontFamily: 'SFProDisplay-Semibold',
     fontSize: 18,
     color: '#FFFFFF',
   },
   chevronContainer:applyProportions({
     width: 9.55,
     height: 6.36,
   }),
   bellContainer:applyProportions({
     width: 29,
     height: 27,
   }),
   selectedCityContainer:applyProportions({
     gap: 12,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
   }),
   selectedCityText:{
     fontSize: 18,
     fontFamily: 'SFProDisplay-Medium',
     //fontWeight: '400',
     color: '#ffffff',
     textAlign: 'left',
   },
   figureAlignment:{
     alignItems: 'center',
     justifyContent: 'center',
     marginTop: 20,
   },
   figureContainerBig:applyProportions({
     width:284,
     height: 187,
     resizeMode: 'contain',
   }),
   figureContainerSmall:applyProportions({
     width: 44,
     height: 44,
     resizeMode: 'contain',
   }),
   curWeatherContainer:{
     width: '100%',
     alignItems: 'center',
   },
   tempText:{
     fontFamily: 'SFProDisplay-Semibold',
     //fontWeight: '600',
     fontSize: 64,
     lineHeight: 75,
     color: '#FFFFFF'
   },
   rowContainer:{
     flexDirection: 'row',
     alignItems: 'center',
     gap:12,
   },
   descriptionText:{
     fontFamily: 'SFProDisplay-Medium',
     //fontWeight: '400',
     fontSize: 18,
     textAlign: 'center',
     color: '#FFFFFF'
   },
   aditionalInfoContainer:applyProportions({
     width: 343,
     marginTop:30,
     borderRadius: 20,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-evenly',
     paddingVertical: 14,
   }),
   aditionalInfoText:{
     fontFamily: 'SFProDisplay-Bold',
     //fontWeight: '700',
     fontSize: 14,
     color: '#FFFFFF'
   },
   smallIconContainer:applyProportions({
     width: 24,
     height: 24,
   }),
   todayContainer:applyProportions({
     width: 343,
     marginTop:20,
     borderRadius: 20,
     paddingHorizontal: 20,
     paddingVertical: 12,
   }),
   titleBoldText:{
     fontFamily: 'SFProDisplay-Bold',
     fontSize: 18,
     color: '#FFFFFF'
   },
   titleMediumText:{
     fontFamily: 'SFProDisplay-Medium',
     fontSize: 18,
     color: '#FFFFFF'
   },
   cardsContainer:applyProportions({
     flexDirection: 'row',
     marginTop: 12,
     alignItems:'center',
     gap:4,
   }),
   singleCardContainer:applyProportions({
     width:70,
     //height: 155,
     justifyContent: 'space-around',
     alignItems:'center',
     paddingVertical:13,
     gap: 20,
   }),
   singleCardContainerWB:applyProportions({
     width:70,
     //height: 155,
     justifyContent: 'space-around',
     alignItems:'center',
     paddingVertical:13,
     gap:20,
     borderRadius: 20,
     backgroundColor: 'rgba(255, 255, 255, 0.10)',
     borderColor: 'rgba(255, 255, 255, 0.85)',
     borderWidth: 1,
   }),
   forecastContainer:applyProportions({
     width: 343,
     marginTop:20,
     borderRadius: 20,
     paddingHorizontal: 20,
     paddingVertical: 12,
   }),
   forecastItensContainer:applyProportions({
     marginTop:20,
     flexDirection: 'column',
     gap: 28,
   }),
   forecastItem:{
     flex:1,
     justifyContent: 'center',
     alignItems: 'center',
   },
 });
 
 export default App;
 