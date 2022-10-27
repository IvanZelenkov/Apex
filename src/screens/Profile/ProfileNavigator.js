import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useFonts } from "expo-font";
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './ProfileScreen';
import Profile from './ProfileScreen';

const Stack = createStackNavigator();

export default function CalculatorsNavigator() {
	let [fontsLoaded] = useFonts({
		'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf')
	});

	if (!fontsLoaded) {
		return <ActivityIndicator size={'large'} />
	}

	return (
		<Stack.Navigator initialRouteName="ProfileNavigator">
			<Stack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}