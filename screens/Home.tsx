import React, { useEffect } from 'react'
import { useState,FC } from 'react';
import { View, StyleSheet,Text,ActivityIndicator, Alert,Dimensions } from 'react-native';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Carousel from 'react-native-reanimated-carousel';

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
      
    }
  });
  

interface DataProps{
  users: IUser[],
  
}


const HomeScreen:FC = ({navigation}) =>{

    const [data, setData] = useState<DataProps[]>([])

    const width = Dimensions.get('window').width;

    // const dispatch = useAppDispatch()

    // const { value } = useAppSelector(state => state.counter)
    
    const[isLoading, setIsLoading] = useState<boolean>(true)

    const getData =() => {
        setIsLoading(true)

        setTimeout(async()=>{
          await axios.get<DataProps[]>("https://api.themoviedb.org/3/movie/popular",{headers:{
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTMxYjVlNDA4NDY2MmMwNzcxMTcxOTM4MzgzMWIwZSIsInN1YiI6IjYyMDI5MmNiZjcwNmRlMDBkNzAyNDJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0z6231lzDw4QpqPJHLYH-qwwUaFkn9_FsB5y1lihSVk",
            accept:'application/json'
          }})
          .then(({data}) => setData(data.results)) 
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
        <List movies={data} isLoading={isLoading} getData={getData} navigation={navigation}/>       
    </View>    
    )
}
export default HomeScreen