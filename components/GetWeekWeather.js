import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    ScrollView, 
    Dimensions, 
    ActivityIndicator
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const icons = {
  Clouds : "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning"
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function GetWeekWeather(props) {
      
    props.days.shift()

    return(
        <View style={styles.dust}>
          <ScrollView 
            contentContainerStyle={styles.scroll}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
          {props.days.length === 0 ? (
            <View style={styles.loading}>
              <ActivityIndicator color='#161B1D' size='large'/>
            </View>
          ) : (
            <View style={styles.weekCont}>
              {props.days.map((day, idx) => {
                return (
                <View style={styles.box} key={idx}>
                  <Text style={styles.date}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
                  <Fontisto name={icons[day.weather[0].main]} size={68} color='white'></Fontisto>
                  <Text style={styles.temp}>{Math.round(day.temp.max)}℃ / {Math.round(day.temp.min)}℃</Text>
                </View>
                )
              })}
            </View>
          )}
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    dust: {
      flex: 4,
    },
    scroll: {
      alignItems: 'center'
    },
    box: {
      width: SCREEN_WIDTH/2.7,
      height: SCREEN_HEIGHT/4,
      borderRadius: 10,
      marginRight: 16,
      backgroundColor: '#F0F0F3',
      alignItems: 'center',
      justifyContent: 'center',

      ...Platform.select({
        ios: {
          shadowColor: '#161B1D',
          shadowOpacity: 0.23,
          shadowRadius: 5,
          shadowOffset: {
            height: 5,
            width: 5,
          },
        },
        android: {
          elevation: 10,
        },
      })
    },
    loading: {
      width: SCREEN_WIDTH,
      alignItems: 'center'
    },
    weekCont: {
      flexDirection: 'row',
      paddingLeft: 36,
      paddingRight: 20,
    },
    date: {
      color: '#161B1D',
      fontSize: 12,
      fontFamily: 'RobotoM',
    },
    temp: {
      color: '#161B1D',
      fontSize: 18,
      fontFamily: 'RobotoM',
    }
});

export default GetWeekWeather;