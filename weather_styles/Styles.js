import {StyleSheet} from 'react-native';
import {applyProportions} from '../weather_utils/utils';

export const styles = StyleSheet.create({
    linearGradient: {
      width: '100%',
      alignItems: 'center'
    },
    todayContainer:applyProportions({
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
    timeTableContainer:applyProportions({
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