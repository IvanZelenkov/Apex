import { createStackNavigator } from '@react-navigation/stack';
import CalculatorsScreen from './CalculatorsScreen';
import ConverterScreen from './ConverterScreen';
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";

const Stack = createStackNavigator();

export default function CalculatorsNavigator() {
	const navigation = useNavigation();

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
				// options={{ headerShown: false }}
				options={{
					headerBackTitleVisible: false,
					headerStyle: {
						backgroundColor: 'white'
					},
					title: ' ',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.navigate('CalculatorsScreen')}>
							<Ionicons
								name='chevron-back'
								color='black'
								size={30}
								style={{
									marginLeft: wp('5%'),
									marginTop: wp('3%')
							}}
							/>
						</TouchableOpacity>
					),
					headerTransparent: true
				}}
			/>
		</Stack.Navigator>
	);
}