import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
	const navigation = useNavigation();

	let [fontsLoaded] = useFonts({
		'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf')
	});

	if (!fontsLoaded) {
		return <ActivityIndicator size={'large'} />
	}

	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity style={styles.settingsItem}>
				<Feather name="cpu" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>GPU Mining Calculator</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('Converter')}>
				<FontAwesome name="exchange" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Cryptocurrency Converter</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsItem}>
				<FontAwesome5 name="search-dollar" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Crypto Profit Calculator</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	titleWrapper: {
		alignItems: 'center',
		marginTop: 20,
		paddingHorizontal: 16,
	},
	settingsItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 30,
	},
	settingsItemIcon: {
		marginRight: 30,
		fontSize: 30,
		color: 'white'
	},
	settingsItemTitle: {
		fontSize: 22,
		color: 'white',
		flexShrink: 1,
		fontFamily: 'Montserrat'
	}
});