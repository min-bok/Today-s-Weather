import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    ScrollView, 
    Dimensions, 
    ActivityIndicator
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function GetWeekWeather(props) {

    return(
        <View style={styles.dust}>
          <ScrollView 
            contentContainerStyle={styles.scroll}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
            <View style={styles.box}></View>
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    dust: {
      flex: 4,
    },
    scroll: {
      paddingLeft: 36,
      paddingRight: 20,
      alignItems: 'center'
    },
    box: {
      width: SCREEN_WIDTH/2.7,
      height: SCREEN_HEIGHT/4,
      borderRadius: 10,
      marginRight: 16,
      backgroundColor: '#F0F0F3',

      ...Platform.select({
        ios: {
          shadowColor: '#161B1D',
          shadowOpacity: 0.23,
          shadowRadius: 5,
          shadowOffset: {
            height: 5,
            width: 5,
          },
        },
        android: {
          elevation: 10,
        },
      })
    }
});

export default GetWeekWeather;