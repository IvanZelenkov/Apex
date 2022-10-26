import React from 'react';
import {StyleSheet, View, TextInput, ActivityIndicator} from 'react-native';
import { useFonts } from "expo-font";

export default function CustomInput({ value, setValue, placeholder, secureTextEntry }) {
    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    input: {
        fontFamily: 'Montserrat'
    }
});