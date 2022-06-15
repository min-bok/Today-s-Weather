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
import * as Location from 'expo-location';
import * as Font from "expo-font";
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
  const [isFont, setIsFont] = useState(false);
    const [ok, setOk] = useState(true);
    const [city, setCity] = useState("Loading...");
    const [days, setDays] = useState("Loading...");

    // 폰트 적용
    useEffect(async () => {
      await Font.loadAsync({
        "NotoSans": require('../assets/font/NotoSansKR-Regular.otf'),
        "Roboto": require('../assets/font/Roboto-Regular.ttf'),
      });
      setIsFont(true);
    },[]);

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
  
      setCity(location[0].region);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
      const json = await res.json();
      setDays(json.daily[0]);
    };
  
    useEffect(() => {
      getWeather();
    },[])

    console.log(days)

    return (
        <View style={styles.container}>
        {isFont && (
        <>
        <View style={styles.upperSide}>
          <Text style={styles.cityName}>{city}</Text>
          <Text style={styles.date}>{new Date(days.dt * 1000).toString().substring(0, 10)}</Text>
        </View>

        <View style={styles.middleSide}>
          <Image source={require('../assets/image/clear.png')}></Image>

        </View>
        </>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F0F3'
    },
    upperSide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'pink'
    },
    cityName: {
      color: '#161B1D',
      fontSize: 36,
      fontWeight: '400',
      fontFamily: "NotoSans"
    },
    date: {
      color: '#161B1D',
      fontSize: 16,
      fontWeight: '400',
      fontFamily: "Roboto",
      marginTop: -30
    },

    middleSide: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow'
    }
  });

export default GetTodayWeather;