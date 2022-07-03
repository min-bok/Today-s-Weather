import axios from 'axios';
import { useEffect, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View
  } from 'react-native';

function GetAirPolution(props) {
  const KEY = `%2FY71MdAa3g6ClOATs%2FkjdG%2BHOyoyRkkpdGhoGUrk7I3%2Fc4%2FIKMhmuDqgkMlsEtXPRx4ozrxlV9seroVN50JQcg%3D%3D`;
  const [sido, setSido] = useState('');
  const [pm10, setPm10] = useState('');
  const [pm2_5, setPm2_5] = useState('');
  const [pm10Grade, setPm10Grade] = useState('');
  const [pm2_5Grade, setPm2_5Grade] = useState('');
  const [pm10Result, setPm10Result] = useState('');
  const [pm2_5Result, setPm2_5Result] = useState('');
  
  useEffect(() => {
    setSido(props.city.slice(0, 2));
    const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sido}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${KEY}&ver=1.3`

    axios.get(url)
    .then(function(res) {
      const data = res.data.response.body.items[0];
      setPm10(data["pm10Value"]);
      setPm2_5(data["pm25Value"]);
      setPm10Grade(data["pm10Grade1h"]);
      setPm2_5Grade(data["pm25Grade1h"]);

      switch(pm10Grade) {
        case '1' : 
          setPm10Result('좋음');
          break;
        case '2' : 
          setPm10Result('보통');
          break;
        case '3' :
          setPm10Result('나쁨');
          break;
        case '4' :
          setPm10Result('매우나쁨');
          break;
      }

      switch(pm2_5Grade) {
        case '1' : 
          setPm2_5Result('좋음');
          break;
        case '2' : 
          setPm2_5Result('보통');
          break;
        case '3' :
          setPm2_5Result('나쁨');
          break;
        case '4' :
          setPm2_5Result('매우나쁨');
          break;
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  },[])

    return(
    <View style={styles.dust}>
        <Text style={styles.fineDust}>미세먼지 {pm10} {pm10Result}</Text>
        <Text style={styles.UltrafineDust}>초미세먼지 {pm2_5} {pm2_5Result}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    dust: {
      flex: 1,
      alignItems: 'flex-start',
      paddingLeft: 36,
    //   backgroundColor: 'green'
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
      fontFamily: "NotoSans",
      marginTop: -10
    },
  });

export default GetAirPolution;