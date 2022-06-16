import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  ScrollView, 
  Dimensions, 
  ActivityIndicator
} from 'react-native';

function GetTodayWeather(props) {

  console.log(props.days[0])

  return(
    <>
    {props.days.length ===  0 ? (
      <Text>날씨 준비중!</Text>
    ) : (
      <View style={styles.cont}>
        <Image source={require('../assets/image/clear.png')} />
        <Text style={styles.description}>{props.days[0].weather[0].main.toUpperCase()}</Text>
        <Text style={styles.degree}>{Math.round(props.days[0].temp.max)}℃ / {Math.round(props.days[0].temp.min)}℃</Text>
      </View>
    )}
    </>
  )
}

const styles = StyleSheet.create({
  cont: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'powderblue'
  },
  description: {
    color: '#161B1D',
    fontSize: 16,
    fontFamily: "RobotoM",
  },
  degree: {
    color: '#161B1D',
    fontSize: 24,
    fontFamily: 'Roboto',
    paddingTop: 8
  }
});

export default GetTodayWeather;