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

const List:FC<ListProps> = ({users,isLoading,getData,navigation}) =>{
    return (
        <ListUsers>     
            <FlatList 
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData}/>}
                data={users} 
                renderItem={({item}) =>(
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('PagePost', { id: item.id })}
                    >
                        <PostItem key={item.id} name={item.name} email={item.email}/>
                    </TouchableOpacity>
                )
            }></FlatList>                 
        </ListUsers>
    )
}

const ListUsers = styled.View`
    padding: 30px 0px;
    padding-top: 0px;
`

export default List