import React from 'react';
import {StyleSheet, Text, Pressable, ActivityIndicator} from 'react-native';
import {useFonts} from "expo-font";

export default function CustomButton({ title, onPress, type = "PRIMARY", backgroundColor, foregroundColor }) {
    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                styles[`container_${type}`],
                backgroundColor ? { backgroundColor: backgroundColor } : {}
            ]}>
            <Text style={[
                styles.title,
                styles[`title_${type}`],
                foregroundColor ? { color: foregroundColor } : {}
            ]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5
    },
    container_PRIMARY: {
        backgroundColor: '#3B71F3'
    },
    container_SECONDARY: {
        borderWidth: 2,
        borderColor: '#3B71F3'
    },
    title_PRIMARY: {
        color: 'white',
        fontFamily: 'Montserrat'
    },
    title_SECONDARY: {
        color: '#3B71F3',
        fontFamily: 'Montserrat'
    },
    title_TERTIARY: {
        color: 'gray',
        fontFamily: 'Montserrat'
    }
});