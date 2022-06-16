import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions
} from 'react-native';
import * as Location from 'expo-location';
import * as Font from "expo-font";
import GetWeekWeather from './components/GetWeekWeather';
import GetAirPolution from './components/GetAirPolution';
import GetTodayWeather from './components/GetTodayWeather';

const SCREEN_WIDTH = Dimensions.get('window').width;

// API키는 서버에 둬야함
const API_KEY = '58df8615efe73067fbead169c0274ab8';

function App() {
  const [isFont, setIsFont] = useState(false);
    const [ok, setOk] = useState(true);
    const [city, setCity] = useState("Loading...");
    const [date, setDate] = useState('로딩중');
    const [days, setDays] = useState([]);

    // 폰트 적용
    useEffect(async () => {
      await Font.loadAsync({
        "NotoSans": require('./assets/font/NotoSansKR-Regular.otf'),
        "Roboto": require('./assets/font/Roboto-Regular.ttf'),
        "RobotoM": require('./assets/font/Roboto-Medium.ttf'),
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
      setDate(json.daily[0]);
      setDays(json.daily);
    };
  
    useEffect(() => {
      getWeather();
    },[])

    return (
      <>
        {isFont && (
        <View style={styles.container}>
          <View style={styles.upperSide}>
            <View style={styles.cityAndDate}>
              <Text style={styles.cityName}>{city}</Text>
              <Text style={styles.date}>{new Date(date.dt * 1000).toString().substring(0, 10)}</Text>
            </View>
          </View>

          <View style={styles.lowerSide}>
            <GetTodayWeather days={days}></GetTodayWeather>
            <GetAirPolution />
            <GetWeekWeather days={days}></GetWeekWeather>
          </View>
        </View>
        )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    upperSide: {
      flex: 1,
      backgroundColor: '#F0F0F3'
      // backgroundColor: 'pink'
    },
    cityAndDate: {
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
    lowerSide: {
      flex: 3,
      backgroundColor: '#F0F0F3'
    }
  });

export default App;