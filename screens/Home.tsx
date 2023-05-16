import React, { useEffect } from 'react'
import { useState,FC } from 'react';
import { View, StyleSheet,Text,ActivityIndicator, Alert } from 'react-native';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from '../components/List'
import {IUser} from '../types/Types'
import {IsLoading} from '../ui/Loading'
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


const HomeScreen:FC = ({navigation}) =>{

    const [data, setData] = useState<DataProps[]>([])

    // const dispatch = useAppDispatch()

    // const { value } = useAppSelector(state => state.counter)
    
    const[isLoading, setIsLoading] = useState<boolean>(true)

    const getData =() => {
        setIsLoading(true)

        setTimeout(async()=>{
          await axios.get<DataProps[]>('https://jsonplaceholder.typicode.com/users')
          .then(res => setData(res.data)) 
          .catch(err =>{
            console.log(err);
            Alert.alert("Не удалось загрузить список пользователей",err)
          })
          .finally(() => setIsLoading(false))
        },300)
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
        <List users={data} isLoading={isLoading} getData={getData} navigation={navigation}/>
      </View>
    </View>    
    )
}
export default HomeScreen