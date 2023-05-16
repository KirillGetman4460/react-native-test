import React, { useEffect } from 'react'
import { useState,FC } from 'react';
import { View, StyleSheet,Text,ActivityIndicator, Alert } from 'react-native';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from '../components/List'
import {IUser} from '../types/Types'
import axios from 'axios';


const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      
    },
    wrapper:{
      flex: 1,
      justifyContent: 'center',
      
    }
  });
  

interface DataProps{
  users: IUser[],
  
}

const IsLoading:FC = () =>{
  return(
    <View style={{ 
      flex:1,
      justifyContent: "center",
      alignItems:"center"
    }}>
       <ActivityIndicator size="large" color="#282828" />
       <Text>Loading...</Text>
    </View>
  )
}

const HomeScreen:FC = () =>{

    const [data, setData] = useState<DataProps[]>([])

    const dispatch = useAppDispatch()

    const { value } = useAppSelector(state => state.counter)
    
    const[isLoading, setIsLoading] = useState<boolean>(true)

    const getData = async() => {
        setIsLoading(true)

        await axios.get<DataProps[]>('https://jsonplaceholder.typicode.com/users')
          .then(res => setData(res.data)) 
          .catch(err =>{
            console.log(err);
            Alert.alert("Не удалось загрузить список пользователей",err)
          })
          .finally(() => setIsLoading(false))
    }

    useEffect(() =>{
      getData()
    },[])

    if(isLoading){
      return(
        <IsLoading></IsLoading>
      )
    }

    return(
     <View style={styles.container}>
      <View style={styles.wrapper}>
        <List users={data} isLoading={isLoading} getData={getData}/>
      </View>
    </View>    
    )
}
export default HomeScreen