import React, { useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>SETTINGS</Text>
		</View>
		<View style={styles.breaker}/>
	</>
);

export default function SettingsScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Header/>
			<TouchableOpacity style={styles.settingsItem}>
				<MaterialCommunityIcons name="cog-outline" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>General</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsItem}>
				<MaterialCommunityIcons name="eye-outline" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Advanced Settings</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsItem}>
				<MaterialCommunityIcons name="bell-outline" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Notifications</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsItem}>
				<MaterialCommunityIcons name="security" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Security</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsItem}>
				<MaterialCommunityIcons name="chat-question-outline" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Support</Text>
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
		color: "black"
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
		padding: 30
	},
	settingsItemIcon: {
		marginRight: 30,
		fontSize: 30,
		color: "black"
	},
	settingsItemTitle: {
		fontSize: 22,
		color: "black"
	}
});