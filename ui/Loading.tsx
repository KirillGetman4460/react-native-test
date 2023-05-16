import React, { useEffect } from 'react'
import { useState,FC } from 'react';
import { View, StyleSheet,Text,ActivityIndicator, Alert } from 'react-native';
export const IsLoading:FC = () =>{
    return(
      <View style={{ 
        flex:1,
        justifyContent: "center",
        alignItems:"center"
      }}>
         <ActivityIndicator size="large" color="#282828" />
         <Text>Loading...</Text>
      </View>
    )
}