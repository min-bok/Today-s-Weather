import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function App() {
  const [region, setRegion] = useState("Loading...");
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

    setRegion(location[0].region)
  };

  useEffect(() => {
    getWeather();
  },[])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{region}</Text>
      </View>
      <ScrollView 
        pagingEnabled 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink'
  },
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
