import React, { useEffect } from 'react'
import { useState,FC } from 'react';
import { View, StyleSheet,Text,ActivityIndicator, Alert } from 'react-native';
import {IUser} from '../types/Types'
import axios from 'axios';

interface DataProps{
    users: IUser,   
}

const PagePostScreen:FC = ({id}) =>{

    const [data, setData] = useState<DataProps | any>()
    const[isLoading, setIsLoading] = useState<boolean>(true)

    const getData = async() => {
        setIsLoading(true)

        await axios.get<DataProps[]>(`https://jsonplaceholder.typicode.com/users/${id}`)
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
    return(
        <View><Text>{data.name}</Text></View>
    )
}
export default PagePostScreen