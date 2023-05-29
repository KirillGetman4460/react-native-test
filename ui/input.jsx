import {SafeAreaView, StyleSheet, TextInput,View} from 'react-native';
import { useState } from 'react';
import styled from 'styled-components/native';

const InputView = styled.View`
    margin:0px 20px;  
    margin-top: 24px;
`
const InputText = styled.TextInput`
    color: red;
    background: #211F30;
    padding: 11px 16px;
    border-radius: 13px;
`

const Input = () =>{
    const[value, setValue] = useState()
    return(
        <InputView>
            <SafeAreaView>
                <InputText
                    onChangeText={setValue}
                    value={value}
                    placeholder='Search Movies...'
                    selectionColor="#BBBBBB"
                    placeholderTextColor="#BBBBBB"
                >      
                </InputText>
            </SafeAreaView>
        </InputView>
    )
}
export default Input