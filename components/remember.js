import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Dimensions, 
  ActivityIndicator
} from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

// API키는 서버에 둬야함
const API_KEY = '58df8615efe73067fbead169c0274ab8';

const icons = {
  Clouds : "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning"
}

function GetTodayWeather() {
    const [region, setRegion] = useState("Loading...");
    const [days, setDays] = useState([]);
    const [ok, setOk] = useState(true);
    const getWeather = async() => {
      const {granted} = await Location.requestForegroundPermissionsAsync();
  
      // 사용자의 위치 접근 승인 여부 확인
      if(!granted){
        setOk(false);
      }
  
      // 사용자의 위치에 대한 위도 및 경도 가져오기
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
      
      // 위도와 경도로 사용자 위치 정보 가져오기
      const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
  
      setRegion(location[0].region);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
      const json = await res.json();
      setDays(json.daily);
    };
  
    useEffect(() => {
      getWeather();
    },[])

    return (
        <>
        <View style={styles.city}>
          <Text style={styles.cityName}>{region}</Text>
        </View>
        <ScrollView 
          pagingEnabled 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}>
          {days.length === 0 ? (
            <View style={styles.day}>
              <ActivityIndicator color='#161B1D' size='large' style={{marginTop: 10}}/>
            </View>
          ) : (
            days.map((day, index) => 
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
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    city: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cityName : {
      color: '#000',
      fontSize: 32,
    },
    weather : {
  
    },
    day: {
      width: SCREEN_WIDTH,
      alignItems: 'center'
    },
    temp: {
      marginTop: 50,
      fontSize: 128
    },
    description: {
      marginTop: -30,
      fontSize: 48
    }
  });

export default GetTodayWeather;