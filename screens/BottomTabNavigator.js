import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CryptoScreen from './CryptoScreen';
import FavoriteCryptoScreen from './FavoriteCryptoScreen';
import ScannerScreen from './ScannerScreen';
import ProfileScreen from './ProfileScreen';
import NewsScreen from './NewsScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
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
            <Tab.Screen name="Scanner" component={ScannerScreen} options={{ tabBarLabel: 'Scanner', tabBarColor: "#B90000", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="qrcode-scan" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarColor: "#FF0000", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="NewsScreen" component={NewsScreen} options={{ tabBarLabel: 'News', tabBarColor: "#FF0000", tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="newspaper" color={color} size={24}/>
                )}}
            />
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{ tabBarLabel: 'Settings', tabBarColor: "#8434C1", tabBarIcon: ({ color }) => (
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