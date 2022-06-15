import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    ScrollView, 
    Dimensions, 
    ActivityIndicator
  } from 'react-native';

function GetWeekWeather(props) {
    console.log(props);
    
    return(
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      opacity: 0.5
    }
});

export default GetWeekWeather;