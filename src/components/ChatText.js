import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useFonts } from "expo-font";

export const ChatText = (props) => {
    const { colors } = useTheme();
    const { onPress, style: propStyle } = props;

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    const style = Array.isArray(propStyle)
        ? [
            {
                color: colors.text,
                fontFamily: 'Montserrat-Medium',
                fontSize: 16,
            },
            ...propStyle,
        ]
        : {
            color: colors.text,
            fontFamily: 'Montserrat-Medium',
            fontSize: 16,
            ...propStyle,
        };

    return (
        <Text onPress={onPress} style={style}>
            {props.children}
        </Text>
    );
};