import React from 'react'
import { useEffect,useState,FC } from 'react';
import { View, StyleSheet,Text,Button,FlatList,RefreshControl,TouchableOpacity } from 'react-native';
import {IUser} from '../types/Types'
import styled from 'styled-components/native';
import PostItem from './PostItem';

interface ListProps {
    users: IUser[],
    isLoading: boolean,
    getData: any,
    navigation:any
}

const List:FC<ListProps> = ({movies,isLoading,getData,navigation}) =>{
    return (   
            <ListUsers 
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
            }></ListUsers>                 
    )
}

const ListUsers = styled.FlatList`
    padding: 30px 0px;
    padding-top: 20px; 
`   


export default List