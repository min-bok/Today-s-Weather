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
import GetWeekWeather from './components/GetWeekWeather';

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

function App() {
  const [isFont, setIsFont] = useState(false);
    const [ok, setOk] = useState(true);
    const [city, setCity] = useState("Loading...");
    const [day, setDay] = useState("Loading...");
    const [days, setDays] = useState("Loading...");

    // 폰트 적용
    useEffect(async () => {
      await Font.loadAsync({
        "NotoSans": require('./assets/font/NotoSansKR-Regular.otf'),
        "Roboto": require('./assets/font/Roboto-Regular.ttf'),
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
      setDay(json.daily[0]);
      setDays(json.daily);
    };
  
    useEffect(() => {
      getWeather();
    },[])

    // console.log(days.weather[main])

    return (
        <View style={styles.container}>
        {isFont && (
        <>
        <View style={styles.upperSide}>
          <Text style={styles.cityName}>{city}</Text>
          <Text style={styles.date}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
        </View>

        <View style={styles.middleSide}>
          <Image source={require('./assets/image/clear.png')} />
          <Text style={styles.description}>Clear</Text>
          <Text style={styles.degree}>21℃</Text>
        </View>

        <View style={styles.dust}>
          <Text style={styles.fineDust}>미세먼지 22 좋음</Text>
          <Text style={styles.UltrafineDust}>초미세먼지 16 보통</Text>
        </View>

        <GetWeekWeather days={days}></GetWeekWeather>
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
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 80,
      // backgroundColor: 'pink'
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
    },

    middleSide: {
      flex: 0.7,
      alignItems: 'center',
      // backgroundColor: 'yello'
    },
    description: {
      color: '#161B1D',
      fontSize: 16,
      fontWeight: '500',
      fontFamily: "Roboto",
    },
    degree: {
      color: '#161B1D',
      fontSize: 24,
      fontWeight: '400',
      fontFamily: "Roboto",
      paddingTop: 8
    },

    dust: {
      flex: 0.12,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingLeft: 36,
      // backgroundColor: 'green'
    },
    fineDust: {
      color: '#161B1D',
      fontSize: 14,
      fontWeight: '400',
      fontFamily: "NotoSans"
    },
    UltrafineDust: {
      color: '#161B1D',
      fontSize: 14,
      fontWeight: '400',
      fontFamily: "NotoSans"
    },
  });

export default App;