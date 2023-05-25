import React, { useEffect } from 'react'
import { useState,FC } from 'react';
import { View, StyleSheet,Text,ActivityIndicator, Alert, RefreshControl,ScrollView,Image} from 'react-native';
import {IUser} from '../types/Types'
import {IsLoading} from '../ui/Loading'
import axios from 'axios';

interface DataProps{
    users: IUser,   
}

const PagePostScreen:FC = ({route}) =>{

    const{id} = route.params
    console.log(id);
    
    const [movie, setMovie] = useState<DataProps | any>([])
    const[isLoading, setIsLoading] = useState<boolean>(true)

    const getData = () => {
        setIsLoading(true)

        setTimeout(async() =>{
          await axios.get<DataProps[]>(`https://api.themoviedb.org/3/movie/${id}`,{
            headers:{
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTMxYjVlNDA4NDY2MmMwNzcxMTcxOTM4MzgzMWIwZSIsInN1YiI6IjYyMDI5MmNiZjcwNmRlMDBkNzAyNDJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0z6231lzDw4QpqPJHLYH-qwwUaFkn9_FsB5y1lihSVk",
              accept:'application/json'
            }
          })
            .then(({data}) => setMovie(data)) 
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
        <ScrollView refreshControl={<RefreshControl refreshing={isLoading}/>}>
          <Image
              source={{uri: `https://image.tmdb.org/t/p/original//${movie.backdrop_path}`}}
                style={{
                  width: '100%',
                  aspectRatio: 4 / 3,
                        
              }}          
                />
           <Text>{movie.title}</Text>

        </ScrollView>
    )
}
export default PagePostScreen