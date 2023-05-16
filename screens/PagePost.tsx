import React, { useEffect } from 'react'
import { useState,FC } from 'react';
import { View, StyleSheet,Text,ActivityIndicator, Alert, RefreshControl,ScrollView} from 'react-native';
import {IUser} from '../types/Types'
import {IsLoading} from '../ui/Loading'
import axios from 'axios';

interface DataProps{
    users: IUser,   
}

const PagePostScreen:FC = ({route}) =>{

    const{id} = route.params
    console.log(id);
    

    const [data, setData] = useState<DataProps | any>()
    const[isLoading, setIsLoading] = useState<boolean>(true)

    const getData = () => {
        setIsLoading(true)

        setTimeout(async() =>{
          await axios.get<DataProps[]>(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(({data}) => setData(data)) 
            .catch(err =>{
              console.log(err);
              Alert.alert("Не удалось загрузить список пользователей",err)
            })
            .finally(() => setIsLoading(false))
        },500)
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
        <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData}/>}>
          <Text>{data.name}</Text>
        </ScrollView>
    )
}
export default PagePostScreen