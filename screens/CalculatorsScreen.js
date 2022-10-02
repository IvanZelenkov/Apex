import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useFonts} from "expo-font";

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>CALCULATORS</Text>
		</View>
		<View style={styles.breaker}/>
	</>
);

export default function SettingsScreen() {
	let [fontsLoaded] = useFonts({
		'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf')
	});

	if (!fontsLoaded) {
		return <ActivityIndicator size={'large'} />
	}

	return (
		<SafeAreaView style={styles.container}>
			<Header/>
			<TouchableOpacity style={styles.settingsItem}>
				<Feather name="cpu" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>GPU Mining Calculator</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsItem}>
				<FontAwesome name="exchange" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Cryptocurrency Converter</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsItem}>
				<FontAwesome5 name="search-dollar" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Crypto Profit Calculator</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	titleWrapper: {
		alignItems: 'center',
		marginTop: 20,
		paddingHorizontal: 16
	},
	mainTitle: {
		fontSize: 24,
		fontWeight: "900",
		fontStyle: "italic",
		color: "#F98E07",
		fontFamily: 'Montserrat-SemiBold',
		letterSpacing: 5
	},
	breaker: {
		height: StyleSheet.hairlineWidth,
		marginHorizontal: 16,
		marginTop: 16,
		backgroundColor: "black",
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
		color: "black"
	},
	settingsItemTitle: {
		fontSize: 22,
		color: "black",
		flexShrink: 1,
		fontFamily: 'Montserrat'
	}
});