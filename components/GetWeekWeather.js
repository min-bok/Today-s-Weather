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

function GetWeekWeather(props) {

    return(
        <View style={styles.container}>
        {/* <ScrollView 
          pagingEnabled 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}>
          {week.length === 0 ? (
            <View style={styles.day}>
              <ActivityIndicator color='#161B1D' size='large' style={{marginTop: 10}}/>
            </View>
          ) : (
            week.map((day, index) => 
            <View key={index} style={styles.day}>
              <Text>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.temp}>{Math.round(day.temp.day)}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={68} color='white'></Fontisto>
              </View>
  
              <Text style={styles.description}>{day.weather[0].main}</Text>
            </View>
            )
          )
          }
        </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 5,
      backgroundColor: 'red',
      opacity: 0.5
    }
});

export default GetWeekWeather;