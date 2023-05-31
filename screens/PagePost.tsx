import React, { useEffect } from 'react'
import { useState,FC } from 'react';
import Svg, { Circle,SvgXml  } from 'react-native-svg';
import { View, StyleSheet,Text,ActivityIndicator, Alert, RefreshControl,ScrollView,Image} from 'react-native';
import {IUser} from '../types/Types'
import {IsLoading} from '../ui/Loading'
import axios from 'axios';

interface DataProps{
    users: IUser,   
}

const PagePostScreen:FC = ({route,navigation}) =>{
  const xml = `
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.274 27.7561C25.2366 28.7176 25.2366 30.2759 24.306 31.2706C23.8247 31.7679 23.215 32 22.5733 32C21.9636 32 21.3539 31.7679 20.9047 31.2706L9.70594 19.7655C9.25671 19.3014 9 18.6714 9 18.0083C9 17.3452 9.25671 16.7152 9.70594 16.251L20.9047 4.746C21.8353 3.75133 23.3434 3.75133 24.306 4.746C25.2366 5.70752 25.2366 7.29899 24.274 8.26051L14.808 18.0083L24.274 27.7561Z" fill="white"/>
</svg>
  ` 
    const{id} = route.params
    
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
            .then(({data}) => {
              setMovie(data)
              console.log(data);
              
            }) 
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
        <ScrollView 
          refreshControl={<RefreshControl 
          refreshing={isLoading}
          backgroundColor="#15141F"
        />}>
          <SvgXml 
            xml={xml} 
            width="36px" 
            height="36px" 
            onPress={() => navigation.navigate('Home')}
            style={{
              position:"absolute",
              zIndex:1,
              marginLeft:34,
              marginTop:50
            }}
           />
          <Image
              source={{uri: `https://image.tmdb.org/t/p/original//${movie.backdrop_path}`}}
                style={{
                  width: '100%',          
                  aspectRatio: 4 / 3,                       
              }}          
                />
           <Text
            style={{
              color:'white',
              fontSize:24,

            }}
           >{movie.title}</Text>

        </ScrollView>
    )
}
export default PagePostScreen