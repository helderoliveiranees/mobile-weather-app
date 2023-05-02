export const DARK_THEME = ['#08244F', '#134CB5', '#0B42AB']
export const LIGHT_THEME = ['#29B2DD', '#33AADD', '#2DC8EA']

export const DARK_CONTAINER = 'rgba(0, 16, 38, 0.25)'
export const LIGHT_CONTAINER = 'rgba(16, 64, 132, 0.25)'
export const WHITE_50 = 'rgba(255, 255, 255, 0.5)'

export const FIGMA_MODEL_WIDTH = 423
export const FIGMA_MODEL_HEIGHT = 858

export const HUNDRED_PERCENT = 1

export const LONG = 'long'
export const SHORT = 'short'

//Never expose your API key like this on GitHub.
//Always hide your keys on server side. This key 
//was get for free. That is why it was exposed.
export const WEATHER_API = 'https://api.hgbrasil.com/weather?key=' 

//Mock data is used as default just in case the weather API fails to load the weather information
export const DEFAULT_RESULTS = {"temp":27,"date":"27/04/2023","time":"15:09","condition_code":"28","description":"Tempo nublado","currently":"dia","cid":"","city":"Maceió, AL","img_id":"28","humidity":83,"cloudiness":75.0,"rain":0.0,"wind_speedy":"3.09 km/h","wind_direction":120,"sunrise":"05:26 am","sunset":"05:14 pm","condition_slug":"cloudly_day","city_name":"Maceió","forecast":[{"date":"27/04","weekday":"Qui","max":28,"min":24,"cloudiness":17.0,"rain":17.05,"rain_probability":98,"wind_speedy":"3.73 km/h","description":"Chuva","condition":"rain"},{"date":"28/04","weekday":"Sex","max":29,"min":24,"cloudiness":77.0,"rain":6.14,"rain_probability":93,"wind_speedy":"4.44 km/h","description":"Chuva","condition":"rain"},{"date":"29/04","weekday":"Sáb","max":28,"min":25,"cloudiness":27.0,"rain":3.21,"rain_probability":84,"wind_speedy":"4.19 km/h","description":"Chuvas esparsas","condition":"rain"},{"date":"30/04","weekday":"Dom","max":27,"min":24,"cloudiness":36.0,"rain":16.63,"rain_probability":100,"wind_speedy":"2.91 km/h","description":"Chuva","condition":"rain"},{"date":"01/05","weekday":"Seg","max":28,"min":24,"cloudiness":19.0,"rain":5.87,"rain_probability":81,"wind_speedy":"3.2 km/h","description":"Chuva","condition":"rain"},{"date":"02/05","weekday":"Ter","max":27,"min":24,"cloudiness":50.0,"rain":5.76,"rain_probability":73,"wind_speedy":"3.63 km/h","description":"Chuva","condition":"rain"},{"date":"03/05","weekday":"Qua","max":27,"min":24,"cloudiness":27.0,"rain":5.37,"rain_probability":75,"wind_speedy":"3.84 km/h","description":"Chuvas esparsas","condition":"rain"},{"date":"04/05","weekday":"Qui","max":29,"min":25,"cloudiness":4.0,"rain":0.18,"rain_probability":28,"wind_speedy":"4.7 km/h","description":"Chuvas esparsas","condition":"rain"},{"date":"05/05","weekday":"Sex","max":28,"min":25,"cloudiness":79.0,"rain":0.0,"rain_probability":0,"wind_speedy":"4.07 km/h","description":"Tempo nublado","condition":"cloudly_day"},{"date":"06/05","weekday":"Sáb","max":28,"min":24,"cloudiness":28.0,"rain":6.32,"rain_probability":78,"wind_speedy":"3.66 km/h","description":"Chuvas esparsas","condition":"rain"}],"cref":"ae8730"}

//The images paths used on app related to the condition_slug
export const IMAGES = {
    STORM_URI: require('../weather_figures/condition_slug/storm.png'),
    SNOW_URI: require('../weather_figures/condition_slug/snow.png'),
    HAIL_URI: require('../weather_figures/condition_slug/hail.png'),
    RAIN_URI: require('../weather_figures/condition_slug/rain.png'),
    FOG_URI: require('../weather_figures/condition_slug/fog.png'),
    CLEAR_DAY_URI: require('../weather_figures/condition_slug/clear_day.png'),
    CLEAR_NIGHT_URI: require('../weather_figures/condition_slug/clear_night.png'),
    CLOUD_URI: require('../weather_figures/condition_slug/cloud.png'),
    CLOUDLY_DAY_URI: require('../weather_figures/condition_slug/cloudly_day.png'),
    CLOUDLY_NIGTH_URI: require('../weather_figures/condition_slug/cloudly_night.png'),
    NONE_DAY_URI: require('../weather_figures/condition_slug/none_day.png'),
    NONE_NIGHT_URI: require('../weather_figures/condition_slug/none_night.png')
}

//The images paths used on app related to the condition_slug
export const ICONS = {
    PIN_URI: require('../weather_figures/icons/pin.png'),
    CHEVRON_URI: require('../weather_figures/icons/chevron_down.png'),
    BELL_URI: require('../weather_figures/icons/bell.png'),
    RAIN_PROBABILITY_URI: require('../weather_figures/icons/rain_probability.png'),
    HUMIDITY_URI: require('../weather_figures/icons/humidity.png'),
    WIND_SPEEDY_URI: require('../weather_figures/icons/wind_speedy.png'),
    CALENDAR_URI: require('../weather_figures/icons/calendar.png'),
}
