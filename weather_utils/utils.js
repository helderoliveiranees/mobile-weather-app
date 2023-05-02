/*
* The util functions are defined here. They are clustered here to make the
* function components cleaner and easy to read
*/
import { Dimensions } from 'react-native';
import * as Localization from 'expo-localization';
import * as Constants from '../weather_constants/Constants'



// =========================== UI RELATED FUNCTIONS ========================
//==========================================================================

//Calculates the proportional width and height based on
//the weather figma model width and height
export const applyProportions = (styleObject) => {

    const widthRatio = (Dimensions.get('window').width/Constants.FIGMA_MODEL_WIDTH).toFixed(2)
    const heightRatio = (Dimensions.get('window').height/Constants.FIGMA_MODEL_HEIGHT).toFixed(2)

    const newStyleObject = {};

    for (let key in styleObject) {
      const value = styleObject[key];

      if (typeof value === 'object') {
        newStyleObject[key] = applyProportions(value);
      } else if (typeof value === 'number') {
        if (key === 'width') {
          newStyleObject[key] = value * widthRatio;
        } else if (key === 'height') {
          newStyleObject[key] = value * heightRatio;
        } else {
          newStyleObject[key] = value;
        }
      } else {
        newStyleObject[key] = value;
      }
    }

    return newStyleObject;
};


//Define the color of container, acording with the daylight time
export function containerColor(dayPeriod){
    return (dayPeriod =='dia'|| dayPeriod =='day')?
    Constants.LIGHT_CONTAINER:Constants.DARK_CONTAINER
}

//Returns the current weather image acording with the condition slug
export function getConditionWeatherImg(condition){
  switch (condition){
    case 'storm':
      return Constants.IMAGES.STORM_URI;
    case 'snow':
      return Constants.IMAGES.SNOW_URI;
      case 'hail':
      return Constants.IMAGES.HAIL_URI;
    case 'rain':
      return Constants.IMAGES.RAIN_URI;
      case 'fog':
      return Constants.IMAGES.FOG_URI;
    case 'clear_day':
      return Constants.IMAGES.CLEAR_DAY_URI;
    case 'clear_night':
      return Constants.IMAGES.CLEAR_NIGHT_URI;
    case 'cloud':
      return Constants.IMAGES.CLOUD_URI;
    case 'cloudly_day':
      return Constants.IMAGES.CLOUDLY_DAY_URI;
    case 'cloudly_night':
      return Constants.IMAGES.CLOUDLY_NIGTH_URI;
    case 'none_day':
      return Constants.IMAGES.NONE_DAY_URI;
    case 'none_night':
      return Constants.IMAGES.NONE_NIGHT_URI;
    default:
      return Constants.IMAGES.CLEAR_DAY_URI
  }
}

// ==================== END OF UI RELATED FUNCTIONS ========================
//==========================================================================


// =========================== DATE RELATED FUNCTIONS ========================
// Note that you DONT NEED TO USE HEAVY LIBRARIES TO DEAL WITH THE SIMPLE DATE
// USED IN THIS APP. That is why Moment.js WAS NOT USED!
//===========================================================================


//Function to get the week day. This is INTERNATIONALIZED!
export function normalizeShortDate (shortDate){
    try{
        let normalized_date = ''
        let day = ''
        let month = ''
        let year = new Date().getFullYear()
        if(Localization.locale == 'pt-BR' && shortDate.includes('/')){
            let splited_date = shortDate.split('/')
            day = splited_date[0]
            month = splited_date[1]
            normalized_date = year + '-' + month + '-' + day
        }else{
            let splited_date = shortDate.split('-')
            month = splited_date[0]
            day = splited_date[1]
            normalized_date = year + '-' + month + '-' + day
        }
        return {normalized_date, day, month, year}
    }catch (e){
        console.log(e)
        //Show some error message
    }
};

//Function to get the week day. This is INTERNATIONALIZED!
export function getDayOfWeek (shortDate, format){
    try{
        const {normalized_date, day, month, year} = normalizeShortDate(shortDate)
        const date = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
        const dayOfWeek = date.toLocaleString(Localization.locale, {weekday: format});
        let shortName = dayOfWeek.substring(0, dayOfWeek.indexOf(','))
        return shortName
    }catch (e){
        console.log(e)
        //Show some error message
    }
};

//Function to format the short date (e.g., 29/04) to 
//the format Month, day (e.g., Apr, 4). This is INTERNATIONALIZED!
export function formatMonthDay (shortDate){
    try{
        const {normalized_date, day, month, year} = normalizeShortDate(shortDate)
        const date = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
        let month_name = date.toLocaleString(Localization.locale, {month:'short'})
        if(month != '' && day != ''){
            return month_name + ', ' + parseInt(day)
        }
        return shortDate
    }catch (e){
        console.log(e)
        //Show some error message
    }
};

//Based on current time, retrieve a new time plus the factor (the weight of
//the factor is 1 hour)
export function getFakeTime (factor){
  try{
      let today = new Date()
      today.setHours(today.getHours() + factor);
      console.log(today)
      const time_now = today.toLocaleString(Localization.locale, {hour:'numeric'})
      return time_now +':00'
  }catch (e){
      console.log(e)
      //Show some error message
  }
};

// ==================== END OF DATE RELATED FUNCTIONS ========================
//============================================================================