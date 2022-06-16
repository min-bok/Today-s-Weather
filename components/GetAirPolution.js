import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    ScrollView, 
    Dimensions, 
    ActivityIndicator
  } from 'react-native';

function GetAirPolution() {
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
      backgroundColor: 'green'
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