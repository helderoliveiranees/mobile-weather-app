/**
 * Application for NEES selection
 * Weather Application
 * Candidate: HELDER FERNANDO DE ARAUJO OLIVEIRA
 */

/**
 * The Splash Screen
 */

import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Video from 'react-native-video';

import * as Constants from '../weather_constants/Constants';

import {styles} from '../weather_styles/Styles'

const { width, height } = Dimensions.get('window');



export default function SplashScreen ({navigation,route}){
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    if (currentVideoIndex < Constants.VIDEOS.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      videoRef.current.seek(0);
    }
  };

  return (
    <View style={styles.splashContainer}>
      <Video
        ref={videoRef}
        source={Constants.VIDEOS[currentVideoIndex]}
        style={styles.splashVideo}
        resizeMode="cover"
        onEnd={handleVideoEnd}
        muted={true}
        repeat={false}
      />
    </View>
  );
};