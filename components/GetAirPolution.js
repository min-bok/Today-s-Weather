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
  // const [sido, setSido] = useState('');
  const KEY = `%2FY71MdAa3g6ClOATs%2FkjdG%2BHOyoyRkkpdGhoGUrk7I3%2Fc4%2FIKMhmuDqgkMlsEtXPRx4ozrxlV9seroVN50JQcg%3D%3D`;
  const URL = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=울산&pageNo=1&numOfRows=100&returnType=json&serviceKey=${KEY}&ver=1.3`;

  const fetcher = url => axios.get(url).then(res => res.data);
  const { data, error } = useSWR(URL, fetcher);

  // console.log(data)

  if (error) return <Text>failed to load</Text>
  if (!data) return <Text>loading...</Text>
  
  // const [pm10, setPm10] = useState('');
  // const [pm2_5, setPm2_5] = useState('');
  // const [pm10Grade, setPm10Grade] = useState('');
  // const [pm2_5Grade, setPm2_5Grade] = useState('');
  // const [pm10Result, setPm10Result] = useState('따란');
  // const [pm2_5Result, setPm2_5Result] = useState('');

  // useEffect(() => {
    // setSido(props.city.slice(0, 2));

    // axios.get(url)
    // .then(function(res) {
    //   const data = res.data.response.body.items[0];
      // setPm10(data["pm10Value"]);
      // setPm2_5(data["pm25Value"]);
      // setPm10Grade(data["pm10Grade1h"]);
      // setPm2_5Grade(data["pm25Grade1h"]);

      // switch(pm10Grade) {
      //   case '1' : 
      //     setPm10Result('좋음');
      //     break;
      //   case '2' : 
      //     setPm10Result('보통');
      //     break;
      //   case '3' :
      //     setPm10Result('나쁨');
      //     break;
      //   case '4' :
      //     setPm10Result('매우나쁨');
      //     break;
      // }

      // switch(pm2_5Grade) {
      //   case '1' : 
      //     setPm2_5Result('좋음');
      //     break;
      //   case '2' : 
      //     setPm2_5Result('보통');
      //     break;
      //   case '3' :
      //     setPm2_5Result('나쁨');
      //     break;
      //   case '4' :
      //     setPm2_5Result('매우나쁨');
      //     break;
      // }
    // })
    // .catch(function(error) {
    //   console.log(error);
    // })
  // },[])

  //   return(
  //   <View style={styles.dust}>
  //     <PrintAir pm10={pm10} pm10Result={pm10Result} pm2_5={pm2_5} pm2_5Result={pm2_5Result}/>
  //   </View>
  //   )

  return (
    <View>
          <Text style={styles.fineDust}>미세먼지 {data.response.body.items[0]["pm10Value"]}</Text>
          <Text style={styles.UltrafineDust}>초미세먼지  {data.response.body.items[0]["pm25Value"]}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    dust: {
      flex: 1,
      alignItems: 'flex-start',
      paddingLeft: 36
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