import axios from 'axios';
import { useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View
  } from 'react-native';

function GetAirPolution() {
  const KEY = `%2FY71MdAa3g6ClOATs%2FkjdG%2BHOyoyRkkpdGhoGUrk7I3%2Fc4%2FIKMhmuDqgkMlsEtXPRx4ozrxlV9seroVN50JQcg%3D%3D`;
  const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=종로구&dataTerm=month&pageNo=1&numOfRows=100&returnType=xml&serviceKey=${KEY}`
  useEffect(() => {
    axios.get(url)
    .then(function(res) {
      console.log(res)
    })
    .catch(function(error) {
      console.log(error);
    })
  },[])

    return(
    <View style={styles.dust}>
        <Text style={styles.fineDust}>미세먼지 22 좋음</Text>
        <Text style={styles.UltrafineDust}>초미세먼지 16 보통</Text>
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