import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { useFonts } from "expo-font";
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from './SettingsScreen';
import Profile from './Profile';

const Stack = createStackNavigator();

export default function CalculatorsNavigator() {
	let [fontsLoaded] = useFonts({
		'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
	});

	if (!fontsLoaded) {
		return <ActivityIndicator size={'large'} />
	}

	return (
		<Stack.Navigator initialRouteName="SettingsNavigator">
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}