import { ActivityIndicator } from 'react-native';
import { useFonts } from "expo-font";
import { createStackNavigator } from '@react-navigation/stack';

import CalculatorsScreen from './CalculatorsScreen';
import Converter from './Converter';

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
		<Stack.Navigator initialRouteName="CalculatorsNavigator">
			<Stack.Screen
				name="CalculatorsScreen"
				component={CalculatorsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Converter"
				component={Converter}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}