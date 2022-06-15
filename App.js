import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  View
} from 'react-native';
import GetTodayWeather from './components/GetTodayWeather';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <GetTodayWeather />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F0F0F3'
//   }
// });