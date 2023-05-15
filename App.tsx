import React from 'react'
import {StatusBar, SafeAreaView,Platform,StyleSheet,View,Text} from 'react-native'
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setupStore } from './store/store'
import { Provider } from 'react-redux'
import Wrapper from './components/Wrapper'
//import type {StatusBarStyle} from 'react-native';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

 const Stack = createNativeStackNavigator();

export default function App() {
  return (      
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#282828"
      />
    
      <NavigationContainer>
        <Provider store={setupStore()}>
          <Wrapper/>
        </Provider>
      </NavigationContainer>
    </SafeAreaView>
  );  
} 
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }
});

