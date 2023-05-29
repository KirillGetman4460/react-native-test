import React, { useEffect,useRef } from 'react'
import { useState,FC } from 'react';
import Svg, { Circle,SvgXml  } from 'react-native-svg';
// import SearchIcon from '../icons/Play.svg';
import { View, StyleSheet,Text,ActivityIndicator, Alert,Dimensions,TouchableOpacity,Animated } from 'react-native';
import styled from 'styled-components/native';
import Input from "../ui/input"
// import {useAppDispatch, useAppSelector} from "../hooks/redux";
// import Carousel from 'react-native-reanimated-carousel';

import List from '../components/List'
import {IUser} from '../types/Types'
import {IsLoading} from '../ui/Loading'
import axios from 'axios';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#15141F",
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      
    }
});
  

interface DataProps{
  users: IUser[],
}

// const ListFilters = styled.FlatList`
//   margin:24px 0px;
//   padding-left: 10px;
// `  
const FilterTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  padding:0px 10px;
`
const Header_Max_Height = 200;
const Header_Min_Height = 70;


const HomeScreen:FC = ({navigation}) =>{

    const [data, setData] = useState<DataProps[]>([])

    const[filters,setFilters] = useState<string[]>(['Fantasy','Horror','Science Fiction','Documentaries'])

    const xml = `
    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_b_82_234)">
    <path d="M36 18.5C36 28.1652 28.1653 36 18.5 36C8.83475 36 1 28.1652 1 18.5C1 8.8365 8.83475 1 18.5 1C28.1653 1 36 8.8365 36 18.5Z" fill="#DADADA" fill-opacity="0.2"/>
    <path d="M18.5 36.1367C28.2408 36.1367 36.1367 28.2408 36.1367 18.5C36.1367 8.76099 28.2408 0.863265 18.5 0.863265C8.75923 0.863265 0.863265 8.76099 0.863265 18.5C0.863265 28.2408 8.75923 36.1367 18.5 36.1367Z" stroke="url(#paint0_linear_82_234)" stroke-width="0.27347" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <path d="M22.0057 19.805H21.3734L21.1492 19.5889C21.9337 18.6764 22.4059 17.4917 22.4059 16.203C22.4059 13.3293 20.0766 11 17.203 11C14.3293 11 12 13.3293 12 16.203C12 19.0766 14.3293 21.4059 17.203 21.4059C18.4917 21.4059 19.6764 20.9337 20.5889 20.1492L20.805 20.3734V21.0057L24.8073 25L26 23.8073L22.0057 19.805ZM17.203 19.805C15.2098 19.805 13.6009 18.1961 13.6009 16.203C13.6009 14.2098 15.2098 12.6009 17.203 12.6009C19.1961 12.6009 20.805 14.2098 20.805 16.203C20.805 18.1961 19.1961 19.805 17.203 19.805Z" fill="#D9D9D9" fill-opacity="0.41"/>
    <defs>
    <filter id="filter0_b_82_234" x="-0.588826" y="-0.588826" width="38.1777" height="38.1777" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImageFix" stdDeviation="0.657694"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_82_234"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_82_234" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear_82_234" x1="6.57143" y1="5.07754" x2="28.8977" y2="32.7292" gradientUnits="userSpaceOnUse">
    <stop stop-color="white" stop-opacity="0.25"/>
    <stop offset="1" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    </defs>
    </svg>
    ` 
    // const width = Dimensions.get('window').width;

    // const dispatch = useAppDispatch()

    // const { value } = useAppSelector(state => state.counter)
    
    const[isLoading, setIsLoading] = useState<boolean>(true)

    const [scrollY] = useState(new Animated.Value(0));

    const handleScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: true }
    );

    const opacity = scrollY.interpolate({
      inputRange: [0, 100], 
      outputRange: [1, 0], 
      extrapolate: 'clamp',
    })
    
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
      <Input></Input>   
      <Animated.FlatList 
           style={[
            {
              marginTop:24,
              marginBottom:24,
              paddingLeft:10,  
              opacity                  
             }
           ]}
           data={filters}   
           horizontal={true}  
           renderItem={({item}) =>(
               <TouchableOpacity>
                   <FilterTitle>{item}</FilterTitle>
               </TouchableOpacity>
           )
       }
        />
        <List 
          movies={data} 
          isLoading={isLoading} 
          getData={getData} 
          navigation={navigation}
          handleScroll={handleScroll}
        />  
      
    </View>    
    )
}
export default HomeScreen