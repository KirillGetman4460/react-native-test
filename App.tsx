import React from 'react'
import {StatusBar, SafeAreaView,Platform,StyleSheet,View,Text} from 'react-native'
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setupStore } from './store/store'
import { Provider } from 'react-redux'
import HomeScreen from './screens/Home'
import PagePostScreen from './screens/PagePost'
//import type {StatusBarStyle} from 'react-native';


 const Stack = createNativeStackNavigator();

export default function App() {
  return (      
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#282828"
      />
     <Provider store={setupStore()}>
     <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Список пользователей' }} />
            <Stack.Screen name="PagePost" component={PagePostScreen} options={{ title: 'Страница пользователя' }}/>    
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
     
    </SafeAreaView>
  );  
} 
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }
});

