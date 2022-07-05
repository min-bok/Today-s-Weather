import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image
} from 'react-native';

function GetTodayWeather(props) {
  const [clear, setClear] = useState(false);
  const [cloud, setCloud] = useState(false);
  const [rain, setRain] = useState(false);
  const [snow, setSnow] = useState(false);

  const icons = {
    Clear: require('../assets/image/clear.png'),
    Clouds : require('../assets/image/cloud.png'),
    // Atmosphere: "cloudy-gusts",
    Rain: require('../assets/image/rain.png'),
    Snow: require('../assets/image/snow.png'),
    // Drizzle: "rain",
    // Thunderstorm: "lightning"
  }

  useEffect(() => {
    if(props.days[0] !== undefined) {
      switch(props.days[0].weather[0].main) {
        case 'Clear' :
          setClear(true);
          break;
        case 'Clouds' :
          setCloud(true)
          break;
        case 'Rain' :
          setRain(true);
          break;
        case 'Snow' :
          setSnow(true);
          break;
      }
    } 
  },[props]);

  return(
    <>
    {props.days.length ===  0 ? (
      <Text>날씨 준비중!</Text>
    ) : (
      <View style={styles.cont}>
        {props.days[0].weather[0].main === undefined ? (
          <Text>룰루랄라</Text>
        ) : (
          <>
          {clear && <Image source={icons.Clear} />}
          {cloud && <Image source={icons.Clouds} />}
          {rain && <Image source={icons.Rain} />}
          {snow && <Image source={icons.Snow} />}
          </>
        )}
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
    // backgroundColor: 'powderblue'
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