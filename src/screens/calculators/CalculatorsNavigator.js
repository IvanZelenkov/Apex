import { createStackNavigator } from '@react-navigation/stack';

import CalculatorsScreen from './CalculatorsScreen';
import ConverterScreen from './ConverterScreen';

const Stack = createStackNavigator();

export default function CalculatorsNavigator() {
	return (
		<Stack.Navigator initialRouteName="CalculatorsNavigator">
			<Stack.Screen
				name="CalculatorsScreen"
				component={CalculatorsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ConverterScreen"
				component={ConverterScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}