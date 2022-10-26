import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>CALCULATORS</Text>
		</View>
		<View style={styles.breaker}/>
	</>
);

export default function CalculatorsScreen({ navigation }) {
	return (
		<SafeAreaView>
			<Header/>
			<TouchableOpacity style={styles.calculatorItem} onPress={() => navigation.navigate('MiningCalculator')}>
				<Feather name="cpu" style={styles.calculatorItemIcon}/>
				<Text style={styles.calculatorItemTitle}>GPU Mining Calculator</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.calculatorItem} onPress={() => navigation.navigate('Converter')}>
				<FontAwesome name="exchange" style={styles.calculatorItemIcon}/>
				<Text style={styles.calculatorItemTitle}>Cryptocurrency Converter</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.calculatorItem} onPress={() => navigation.navigate('ProfitCalculator')}>
				<FontAwesome5 name="search-dollar" style={styles.calculatorItemIcon}/>
				<Text style={styles.calculatorItemTitle}>Crypto Profit Calculator</Text>
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
		marginTop: 16,
		backgroundColor: "black",
        borderWidth: 1
	},
	calculatorItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 30,
	},
	calculatorItemIcon: {
		marginRight: 30,
		fontSize: 30,
		color: "black"
	},
	calculatorItemTitle: {
		fontSize: 22,
		color: "black",
		flexShrink: 1,
		fontFamily: 'Montserrat'
	}
});