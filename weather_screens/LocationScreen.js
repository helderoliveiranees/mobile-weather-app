//import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,
        Dimensions, SafeAreaView, StatusBar, ActivityIndicator,} from "react-native" 

import i18n from '../weather_translation/i18n';

import * as Localization from 'expo-localization';

import Constants from '../weather_constants/Constants'

import countries from '../weather_countries/countries'

import {Picker} from '@react-native-picker/picker';


export default function DefineLocationScreen ({ route, navigation }){

    const themeColor = '#4285F4'

    //console.log('Renderized the map')
    const[latitude, setLatitude] = useState(null)
    const[longitude, setLongitude] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState({
        dial_code: null,
        flag: null,
        iso: null,
        name: null,
    });
    const[state, setState] = useState (null)
    const [stateId, setStateId] = useState(null)
    const[city, setCity] = useState (null)
    const [cityId, setCityId] = useState(null)
    const [locationLoaded, setLocationLoaded] = useState(null)
    const [showLoading, setShowLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    //Dropdown picker
    const [mustLoadStates, setMustLoadStates] = useState(false);
    const [stateItems, setStateItems] = useState(null);

    const [mustLoadCities, setMustLoadCities] = useState(false);
    const [cityItems, setCityItems] = useState(null);


    //used to include a fake id in states and cities list
    const DEFAULT_ID = '-1'
    const DEFAULT_STATE = i18n.t('selectState')
    const DEFAULT_CITY = i18n.t('selectCity')
    const DEFAULT_LATITUDE = '0'
    const DEFAULT_LONGITUDE = '0'

    const [clickedSave, setClickedSave] = useState(null)

    const [loadDefault, setLoadDefault] = useState(false)

    const [triggerGoBack, setTriggerGoBack] = useState(false)

    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height

    //Loads the default country information using the Localization library. If not possible, 
    //the default will be US
    useEffect(()=>{
        try{
            //let isoKey = Localization.region
            let isoKey = Localization.getLocales()[0].regionCode
            if(isoKey == null){
                setSelectedCountry({
                    dial_code: "1",
                    flag: "🇺🇸",
                    iso: "US",
                    name: "United States",
                })
                console.log("tag1")
                setMustLoadStates(!mustLoadStates)
                return
            }else{
                for(var i = 0; i < countries.length; i++) {
                    var obj = countries[i];
                    if(obj.iso === isoKey){
                        setSelectedCountry({
                            dial_code: obj.dial_code,
                            flag: obj.flag,
                            iso: obj.iso,
                            name: obj.name,
                        })
                        setMustLoadStates(!mustLoadStates)
                        //if found the data, return. Doesnt need search anymore
                        return
                    }
                }
                //return a default value, case not found
                setSelectedCountry({
                    dial_code: "1",
                    flag: "🇺🇸",
                    iso: "US",
                    name: "United States",
                })
                setMustLoadStates(!mustLoadStates)
            }
    
        } catch (e){
            console.log(e)
            //return a default value, case not found
            setSelectedCountry({
                dial_code: "1",
                flag: "🇺🇸",
                iso: "US",
                name: "United States",
            })
            setMustLoadStates(!mustLoadStates)
        }
	},[])

    //Gets the list os states given some country from database
    useEffect(() =>{
		(async () => {
            //Return on first render
            if(selectedCountry.iso === null){
                return
            }
		    try {
                // const storedTokens = await verifyStoredTokens()
                // if(storedTokens === null){
                //     return
                // }else{
                //     const accessToken = storedTokens.accessToken
                    //console.log("Stored token value is: ", storedToken)
                    let response = await fetch('http://10.220.0.9:3000' + "/states", {
                        method: 'POST',
                        headers: {
                            'Accept':'application/json',
                            'Content-type': 'application/json',
                            //'Authorization': 'Bearer ' + accessToken
                        },
                        body: JSON.stringify({
                            country_code: selectedCountry.iso,
                        })
                    });
                    const json = await response.json();
                    // console.log("json will be printed")
                    // console.log(json)
                    if(json !== null && json.length !==0){
                        //console.log(json)
                        json.push({"id": DEFAULT_ID, "name": DEFAULT_STATE})
                        setStateItems(json)
                        //console.log("json zero position is ", json[0].id)
                        //The first item of array will be the default state to be searched
                        setState(DEFAULT_STATE)
                        setStateId(DEFAULT_ID)
                        //setMustLoadCities(!mustLoadCities)
                        setIsLoading(false)  
                        //console.log(json)
                    } else{
                        //Set the empty list as the list of state names
                        setStateItems([])
                        setState(null)
                        setStateId(null)
                        setCityItems([])
                        setCity(null)
                        setCityId(null)
                        setIsLoading(false)
                        ///setIsLoading(false)
                        console.log("Empty set. States could not be loaded")
                        return
                    }
			    //}
		    } catch(e) {
                setIsLoading(false)
                console.log("Error. States could not be loaded")
                console.log(e)
		    }
		}
	)()}, [mustLoadStates])

    //Gets the list os cities given some country from database
    useEffect(() =>{
        (async () => {
            //Return on first render
            if(selectedCountry.iso === null){
                return
            }
            //Return on first render
            if(stateId === null){
                return
            }
            try {
                // const storedTokens = await verifyStoredTokens()
                // if(storedTokens === null){
                //     return
                // }else{
                //     const accessToken = storedTokens.accessToken
                    //console.log("Stored token value is: ", storedToken)
                    let response = await fetch('http://10.220.0.9:3000' + "/cities", {
                        method: 'POST',
                        headers: {
                            'Accept':'application/json',
                            'Content-type': 'application/json',
                            //'Authorization': 'Bearer ' + accessToken
                        },
                        body: JSON.stringify({
                            state_id: stateId,
                        })
                    });
                    const json = await response.json();
                    // console.log("json will be printed")
                    if(json !== null && json.length !==0){
                        //console.log(json)
                        json.push({"id": DEFAULT_ID, "latitude": DEFAULT_LATITUDE, 
                            "longitude": DEFAULT_LONGITUDE, "name": DEFAULT_CITY})
                        setCityItems(json)
                        setCity(DEFAULT_CITY)
                        setCityId(DEFAULT_ID)
                        setLatitude(DEFAULT_LATITUDE)
                        setLongitude(DEFAULT_LONGITUDE)
                        //console.log(json[0].latitude)
                        //console.log(json[0].longitude)
                        setIsLoading(false)
                        //console.log(json)
                    } else{
                        setCityItems([])
                        setCity(null)
                        setCityId(null)
                        setIsLoading(false)
                        ///setIsLoading(false)
                        console.log("Empty set. Cities could not be loaded")
                        return
                    }
                //}
            } catch(e) {
                setIsLoading(false)
                console.log("Error. States could not be loaded")
                console.log(e)
            }
        }
    )()}, [mustLoadCities])

    //Go to the previous screen passing the location data params
    //city_field1 is the field called city in reverse location from expo
    //city_field2 is the field called subregion in reverse location from expo
    //it will be set to null, since the city was choosen by menu in this screen
    useEffect(() => {
        if(clickedSave && locationLoaded){
            setClickedSave(false)
            setShowLoading(false)
            navigation.navigate(
                'MainScreenDrawer', {
                    screen: 'MainScreen',
                    params: { locationData: {
                        selectedCountry: selectedCountry,
                        city: city,
                        cityId: cityId,
                        cityItems: cityItems,
                        state: state,
                        stateId: stateId,
                        stateItems: stateItems,
                        // latitude: (checkBox)?latitude:null,
                        // longitude: (checkBox)?longitude:null
                    }},
                //merge: true,
                }
            )
        }else{
            setShowLoading(false)
        }
    }, [triggerGoBack])


    return (
        
        <SafeAreaView style = {styles.wrapperContainer}>
                <StatusBar
                animated={true}
                backgroundColor="#FFFFFF"
                barStyle={'dark-content'}
                //translucent ={true}
                showHideTransition={'fade'}
                hidden={false} />         
            
                <View style={styles.allInputsContainer}>
                    <View style ={styles.inputContainer}>
                        <Text style={styles.textOverInput}> 
                            {i18n.t('countryText')} {' '}
                        </Text>

                        <View  style={styles.pickerContainer}>
                            {(isLoading && selectedCountry.iso == null)?
                            <View style={{flexDirection: 'row', justifyContent:'space-between', 
                                alignItems: 'center', paddingHorizontal: 15}}>
                                <Text style={{fontSize: 15}}>{i18n.t('textLoading2')}</Text>
                                <ActivityIndicator size='small' color={themeColor}/>
                            </View>
                            :
                            <Picker
                                selectedValue={selectedCountry.iso}
                                onValueChange={(itemValue, itemIndex) => {
                                    for(var i = 0; i < countries.length; i++) {
                                        var obj = countries[i];
                                        if(obj.iso === itemValue){
                                            setSelectedCountry({
                                                dial_code: obj.dial_code,
                                                flag: obj.flag,
                                                iso: obj.iso,
                                                name: obj.name,
                                            })
                                        }
                                    }
                                    setStateItems(null)
                                    setState(null)
                                    setStateId(null)
                                    setCityItems(null)
                                    setCity(null)
                                    setCityId(null)
                                    // setLatitude(null)
                                    // setLongitude(null)
                                    setClickedSave(false)
                                    setIsLoading(true)
                                    setMustLoadStates(!mustLoadStates)
                                }}
                                dropdownIconColor={'black'}
                            >
                                {
                                countries.map((item,key) =>
                                    <Picker.Item key={item.iso} label={item.flag + " " + item.name} value={item.iso} />)
                                }
                            </Picker>
                            }
                        </View>
                    </View>

                    <View style ={styles.inputContainer}>
                        <Text style={styles.textOverInput}> 
                            {i18n.t('stateText')} {' '}
                        </Text>

                        <View style={(state == DEFAULT_STATE && clickedSave)?
                            styles.pickerContainerError:styles.pickerContainer}>
                            {(isLoading && stateId == null)?
                            <View style={{flexDirection: 'row', justifyContent:'space-between', 
                                alignItems: 'center', paddingHorizontal: 15}}>
                                <Text style={{fontSize: 15}}>{i18n.t('textLoading2')}</Text>
                                <ActivityIndicator size='small' color={themeColor}/>
                            </View>
                            :
                            <Picker
                                selectedValue={stateId}
                                onValueChange={(itemValue, itemIndex) => {
                                    console.log("The selected state was: ", stateItems[itemIndex].name)
                                    setState(stateItems[itemIndex].name)
                                    setStateId(itemValue)
                                    console.log("item value is: ", itemValue)
                                    setCityItems(null)
                                    setCity(null)
                                    setCityId(null)
                                    // setLatitude(null)
                                    // setLongitude(null)
                                    setClickedSave(false)
                                    setIsLoading(true)
                                    setMustLoadCities(!mustLoadCities)
                                }}
                                enabled={(stateItems === null || stateItems.length === 0 )? false: true}
                                dropdownIconColor={'black'}
                            >
                                {
                                    (stateItems === null || stateItems.length === 0)?
                                    <Picker.Item label={i18n.t('textPickerNothingToShow')} value={"null"} />
                                    :
                                    stateItems.map((item,key) =>
                                    <Picker.Item key={item.id} label={item.name} value={item.id} />)
                                }
                            </Picker>
                            }
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1, alignItems:'flex-start'}}>
                            {((stateItems === null || stateItems.length === 0) && clickedSave)&&
                                <Text style={styles.textHintUnderInput}> 
                                    {i18n.t('selectOtherCountry')}
                                </Text>		
                            }
                            {(state == DEFAULT_STATE && clickedSave)&&
                                <Text style={styles.textHintUnderInput}> 
                                    {i18n.t('mandatoryField')}
                                </Text>
                            }
                            </View>
                        </View>
                    </View>

                    <View style ={styles.inputContainer}>
                        <Text style={styles.textOverInput}> 
                            {i18n.t('cityText')} {' '}
                            {/* <Text style={styles.textHintOverInput}>
                                {i18n.t('adsHintText')}
                            </Text> */}
                        </Text>

                        <View  style={(city == DEFAULT_CITY && clickedSave)?
                            styles.pickerContainerError:styles.pickerContainer}>
                            {(isLoading)?
                            <View style={{flexDirection: 'row', justifyContent:'space-between', 
                                alignItems: 'center', paddingHorizontal: 15}}>
                                <Text style={{fontSize: 15}}>{i18n.t('textLoading2')}</Text>
                                <ActivityIndicator size='small' color={themeColor}/>
                            </View>
                            :
                            <Picker
                                selectedValue={cityId}
                                onValueChange={(itemValue, itemIndex) => {
                                    //console.log("The selected city was: ", cityItems[itemIndex].name)
                                    console.log("item value is: ", itemValue)
                                    setCity(cityItems[itemIndex].name)
                                    // setLatitude(cityItems[itemIndex].latitude)
                                    // setLongitude(cityItems[itemIndex].longitude)
                                    setCityId(itemValue)
                                    //The location will be considered loaded when the city was chosen
                                    setLocationLoaded(true)
                                    setClickedSave(false)
                                }}
                                enabled={(cityItems === null || cityItems.length ===0 )? false: true}
                                dropdownIconColor={'black'}
                            >
                                {
                                    (cityItems === null || cityItems.length === 0)?
                                    <Picker.Item label={i18n.t('textPickerNothingToShow')} value={"null"} />
                                        :
                                    cityItems.map((item,key) =>
                                    <Picker.Item key={item.id} label={item.name} value={item.id} />)
                                }
                            </Picker>
                            }
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1, alignItems:'flex-start'}}>
                            {((cityItems === null || cityItems.length === 0) && clickedSave)&&
                                <Text style={styles.textHintUnderInput}> 
                                    {i18n.t('selectOtherState')}
                                </Text>		
                            }
                            {(city == DEFAULT_CITY && clickedSave)&&
                                <Text style={styles.textHintUnderInput}> 
                                    {i18n.t('mandatoryField')}
                                </Text>	
                            }
                            </View>
                        </View>
                    </View>

                    {/* <View style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
                            <CheckBox
                                //center
                                title={i18n.t('textCheckBoxLocation')}
                                checked={checkBox}
                                onPress={() => {
                                    setCheckBox(!checkBox)
                                    setTriggerGrantPermission(!triggerGrantPermission)
                                }}
                            />

                        </View>
                    </View> */}

                    <TouchableOpacity
						style={styles.nextButton}
                        disabled={showLoading || isLoading}
						onPress={() => {
                            setClickedSave(true)
                            setShowLoading(true)
                            setTriggerGoBack(!triggerGoBack)
                            //getCoordinates(addressLine)
                            // setTimeout(function(){
                            //     goToNextScreen()
                            // }, 200);
							//navigation.navigate('EditAdvertisingPhoto')
						}}
					>
                        {(showLoading)?
                            <ActivityIndicator size='small' color='#FFFFFF'/>
                            :
					        <Text style={styles.textNextButton}>{i18n.t('textDone')} </Text>
                        }
					</TouchableOpacity>
                </View>
                
        </SafeAreaView>     
    )
}


const styles = StyleSheet.create({
    wrapperContainer:{
        flex: 1,
        backgroundColor: 'white',
        //alignItems: 'center',
        //paddingHorizontal: 15,
    },
    //Be carefull. The separator width doenst allow a size smaller than the size defined for it.
    //If any component uses the separator component, we cant, for example, give margin horizontal
    //smaller than the separator was defined. Tha means the component size, cant be smaller than
    //the separator component.
    sectionSeparatorContainer:{
        height: 1.2,
        //width: Dimensions.get('window').width - 40,
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        //height: '1%',
        backgroundColor:'#F0F0F0',
        //padding:15,
    },
    textNextButton: {
		//color:'black',
		color: 'white',
		fontWeight:'bold',
		fontSize: 16,
		textAlign: 'center',
	},
    activityContainer:{
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
    },
    coverMessageView: {
        //flex: 0.30,
        width: '80%',
        height: '30%',
        position: 'absolute',
        marginTop: 10,
        //marginHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 15,
        //padding: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTextTitle: {
        paddingHorizontal: 15,
        color:'black',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    modalTextMessage: {
        paddingHorizontal: 15,
        //paddingRight: 5,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 14,
    },
    textButtonStyle: {
        color: '#4285F4',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    activityContainer:{
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
    },
    allInputsContainer:{
        flex:1,
        flexDirection: 'column',
        //alignSelf: 'center',
        paddingHorizontal: 15,
    },
    inputContainer: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        paddingVertical: 5,
        //marginBottom:10,
    },
    magnifierIconContainer:{
        flex: 0.1,
        //backgroundColor: 'red'
    },
    textSearchInput:{
        flex: 0.9,
        marginLeft: 5,
        height: 40,
        borderColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'left',
        fontSize: 15,
        paddingLeft: 10,
        backgroundColor:'#F8F8FF',
        borderWidth: 0.7,
        borderRadius: 5,
    },
    textTouchable: {
		padding: 5,
		//color:'#4285F4',
        color: 'grey',
		fontWeight:'bold',
		fontSize: 13,
		textAlign: 'center',
	},
    textOverInput:{
		color: 'black',
		textAlign:'left',
		fontSize: 14,
		fontWeight: 'bold',
	},
    textHintUnderInput:{
		color: 'red',
		textAlign:'left',
		fontSize: 12,
		fontWeight: 'normal',
		//marginBottom: 4
	},
    pickerContainer:{
        marginTop: 5,
		borderColor: '#D3D3D3',
		borderWidth: 0.7,
        height:45,
		backgroundColor:'#F8F8FF',
		borderRadius:5,
        justifyContent:'center',
	},
    pickerContainerError:{
        marginTop: 5,
		borderColor: 'red',
		borderWidth: 0.7,
        height:45,
		backgroundColor:'#F8F8FF',
		borderRadius:5,
        justifyContent:'center',
	},
    nextButton: {
		marginTop: 15,
        marginBottom: 5,
		borderColor: 'gray',
		borderWidth: 0.7,
		borderRadius: 10,
        backgroundColor: '#4285F4',
		paddingVertical: 10,
	},

})