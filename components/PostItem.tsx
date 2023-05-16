import React from 'react'
import { FC } from 'react';
import { View,Text,Button,FlatList,Image  } from 'react-native';
import styled from 'styled-components/native';
import {IUser} from '../types/Types'

const PostItem:FC<IUser>  = ({name, email}) =>{   
    return(
        <PostView>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',     
                    alignItems:'center',
                    
                }}
            >
                <Image
                    source={{uri: 'https://yt3.ggpht.com/ytc/AL5GRJVSWSvQyp1rEHjpVh2HB2VgWbM6kCsN2MJbC8P7IQ=s68-c-k-c0x00ffffff-no-rj'}}
                    style={{
                        width: 40, 
                        height: 40,
                        borderRadius: 12,
                        
                    }}          
                />
                <PostTitle>{name}</PostTitle>
            </View>
            
            <PostTitleText>{email}</PostTitleText>
        </PostView>
    )
}

const PostView = styled.View`
    padding: 0px 20px;
    

`

const PostTitle = styled.Text`
    font-weight: 500;
    font-size: 20px;
    line-height: 50px;
    text-align: left;
    padding-left: 7px;
`
const PostTitleText = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;    
    text-align: left;
`

export default PostItem