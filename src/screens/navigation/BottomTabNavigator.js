import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CryptoScreen from '../cryptoMarket/CryptoScreen';
import FavoriteCryptoScreen from '../cryptoMarket/FavoriteCryptoScreen';
import MessengerNavigator from '../messenger/MessengerNavigator';
import CalculatorsNavigator from '../calculators/CalculatorsNavigator';
import NewsScreen from '../news/NewsScreen';
import ProfileNavigator from '../userProfile/ProfileNavigator';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
        <Tab.Navigator initialRouteName="CryptoScreen" activeColor="black" inactiveColor="white" barStyle={styles.bottomTab}>
            <Tab.Screen name="CryptoScreen" component={CryptoScreen} options={{tabBarLabel: 'Crypto', tabBarColor: "#3a90ff", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="bitcoin" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="FavoriteCryptoScreen" component={FavoriteCryptoScreen} options={{ tabBarLabel: 'Favorites', tabBarColor: "#FFAB33", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="star-outline" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="MessengerNavigator" component={MessengerNavigator} options={{ tabBarLabel: 'Messenger', tabBarColor: "#d9202e", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="message-text" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="CalculatorsNavigator" component={CalculatorsNavigator} options={{ tabBarLabel: 'Calculate', tabBarColor: "#3a90ff", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="calculator-variant" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="NewsScreen" component={NewsScreen} options={{ tabBarLabel: 'News', tabBarColor: "#d9202e", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="newspaper" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{ tabBarLabel: 'Profile', tabBarColor: "#3a90ff", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={24}/>
                )}}
            />
        </Tab.Navigator>
	);
}

const styles = StyleSheet.create({
    bottomTab: {
        shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: -8
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 10,
        borderTopWidth: 2
    }
});