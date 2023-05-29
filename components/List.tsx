import React from 'react'
import { useEffect,useState,FC,useRef } from 'react';
import { View, StyleSheet,Text,Button,FlatList,RefreshControl,TouchableOpacity,Animated } from 'react-native';
import {IUser} from '../types/Types'
import styled from 'styled-components/native';
import PostItem from './PostItem';

interface ListProps {
    users: IUser[],
    isLoading: boolean,
    getData: any,
    navigation:any,
    handleScroll:any
}


const List:FC<ListProps> = ({movies,isLoading,getData,navigation,handleScroll}) =>{
    
    return (   
            <Animated.FlatList 
                style={{
                    paddingBottom: 30,

                }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                horizontel={true}
                numColumns={2}       
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData}/>}
                data={movies} 
                renderItem={({item}) =>(
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('PagePost', { id: item.id })}
                    >
                        <PostItem key={item.id} name={item.title} img={item.poster_path}/>
                    </TouchableOpacity>
                )
            }></Animated.FlatList>                 
    )
}

export default List