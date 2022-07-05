import axios from 'axios';
import useSWR from 'swr'
import { useEffect, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View
  } from 'react-native';

function GetAirPolution(props) {

  const sido = props.city.slice(0, 2);
  const [pm10Result, setPm10Result] = useState('뿅');
  const [pm2_5Result, setPm2_5Result] = useState('');
  const KEY = `%2FY71MdAa3g6ClOATs%2FkjdG%2BHOyoyRkkpdGhoGUrk7I3%2Fc4%2FIKMhmuDqgkMlsEtXPRx4ozrxlV9seroVN50JQcg%3D%3D`;
  const URL = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sido}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${KEY}&ver=1.3`;

  const fetcher = url => axios.get(url).then(res => res.data);
  const { data, error } = useSWR(URL, fetcher);

  console.log(data.response.body.items[0]); 
  
  useEffect(() => {
    if(data !== undefined) {
      switch(data.response.body.items[0]["pm10Grade"]) {
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
  
      switch(data.response.body.items[0]["pm25Grade"]) {
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
    }
  },[]);

  if (error) return <Text>데이터 불러오기에 실패하였습니다😢</Text>
  if (!data) return <Text>미세먼지 정보 가져오는 중🐾</Text>

  console.log(`pm10Result ${pm10Result}`)

    return (
      <View style={styles.dust}>
            <Text style={styles.fineDust}>미세먼지 {data.response.body.items[0]["pm10Value"]} {pm10Result}</Text>
            <Text style={styles.UltrafineDust}>초미세먼지 {data.response.body.items[0]["pm25Value"]} {pm2_5Result}</Text>
      </View>
    )
  }


const styles = StyleSheet.create({
    dust: {
      flex: 1,
      alignItems: 'flex-start',
      paddingLeft: 36,
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