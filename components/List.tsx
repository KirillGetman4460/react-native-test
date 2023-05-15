import React from 'react'
import { useEffect,useState,FC } from 'react';
import { View, StyleSheet,Text,Button,FlatList,ActivityIndicator } from 'react-native';
import {IUser} from '../types/Types'
import styled from 'styled-components/native';
import PostItem from './PostItem';

interface ListProps {
    users: IUser[]
}

const List:FC<ListProps> = ({users}) =>{

    return (
        <ListUsers>
            <FlatList data={users} renderItem={({item}) => <PostItem key={item.id} name={item.name} email={item.email}/>}></FlatList>                 
        </ListUsers>
    )
}

const ListUsers = styled.View`
    padding: 30px 0px;
`

export default List