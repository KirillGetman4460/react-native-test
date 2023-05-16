import {SafeAreaView, StyleSheet, TextInput,View} from 'react-native';
import { useState } from 'react';
import styled from 'styled-components/native';

const InputView = styled.View`
    margin:0px 28px;  
`
const InputText = styled.TextInput`
    background: #fff;
    padding: 11px 16px;
    border-top-right-radius: 13px;
    border-bottom-left-radius: 13px;
`

const Input = () =>{
    const[value, setValue] = useState()
    return(
        <InputView>
            <SafeAreaView>
                <InputText
                    onChangeText={setValue}
                    value={value}
                    placeholder='Search Location...'
                >      
                </InputText>
            </SafeAreaView>
        </InputView>
    )
}
export default Input