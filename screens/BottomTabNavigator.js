import {ActivityIndicator, StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

import CryptoScreen from './CryptoScreen';
import FavoriteCryptoScreen from './FavoriteCryptoScreen';
import MessengerScreen from './MessengerScreen';
import CalculatorsNavigator from './Calculators/CalculatorsNavigator';
import NewsScreen from './NewsScreen';
import SettingsNavigator from './Settings/SettingsNavigator';
import React from "react";

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
    let [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

	return (
        <Tab.Navigator initialRouteName="CryptoScreen" activeColor="black" inactiveColor="white" barStyle={styles.bottomTab}>
            <Tab.Screen name="CryptoScreen" component={CryptoScreen} options={{tabBarLabel: 'Crypto', tabBarColor: "dodgerblue", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="bitcoin" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="FavoriteCryptoScreen" component={FavoriteCryptoScreen} options={{ tabBarLabel: 'Favorites', tabBarColor: "#FFAB33", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="star-outline" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="MessengerScreen" component={MessengerScreen} options={{ tabBarLabel: 'Messenger', tabBarColor: "#3B8F0D", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="message-text" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="CalculatorsNavigator" component={CalculatorsNavigator} options={{ tabBarLabel: 'Calculators', tabBarColor: "#F98E07", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="calculator-variant" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="NewsScreen" component={NewsScreen} options={{ tabBarLabel: 'News', tabBarColor: "#FF0000", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="newspaper" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="SettingsNavigator" component={SettingsNavigator} options={{ tabBarLabel: 'Settings', tabBarColor: "#8434C1", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cog" color={color} size={24}/>
                )}}
            />
        </Tab.Navigator>
	);
}

const styles = StyleSheet.create({
    bottomTab: {
        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -8
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
        borderTopWidth: 2
    }
});