import React from 'react'
import { FC } from 'react';
import { View,Text,Button,FlatList,Image  } from 'react-native';
import styled from 'styled-components/native';
import {IUser} from '../types/Types'

const PostItem:FC<IUser>  = ({name,img}) =>{   
    return(
        <PostView>
            <View
                style={{
                    flex: 1,                         
                }}
            >
                <Image
                    source={{uri: `https://image.tmdb.org/t/p/original//${img}`}}
                    style={{
                        width: 166, 
                        height: 215,
                        borderRadius: 12,
                        
                    }}          
                />
                <PostTitle>{name}</PostTitle>
            </View>
            
        </PostView>
    )
}

const PostView = styled.View`
    padding: 0px 22px;
    
    flex: 0 1;
    
    width: 200px;
`

const PostTitle = styled.Text`
    font-weight: 500;
    font-size: 16px;
    color:#FFFFFF;
    text-align: left;
    padding-bottom: 13px;
    padding-top: 8px;
`
const PostTitleText = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;    
    text-align: left;
`

export default PostItem