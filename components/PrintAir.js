import { 
    StyleSheet, 
    Text
} from 'react-native';

export default function PrintAir(props) {

    // console.log(props)

    return(
        <>
            <Text style={styles.fineDust}>미세먼지 {props["pm10"]} {props["pm10Result"]}</Text>
            <Text style={styles.UltrafineDust}>초미세먼지 {props["pm2_5"]} {props["pm2_5Result"]}</Text>
        </>
    )
}

const styles = StyleSheet.create({
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