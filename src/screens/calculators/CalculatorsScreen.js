import {StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SettingsScreen() {
	const navigation = useNavigation();

	let [fontsLoaded] = useFonts({
		'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf')
	});

	if (!fontsLoaded) {
		return (
			<View style={{flex: 1, justifyContent: 'center'}}>
				<ActivityIndicator size={'large'} color={'#d9202e'}/>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity style={styles.settingsItem}>
				<Feather name="cpu" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>GPU Mining Calculator</Text>
			</TouchableOpacity>
			<View style={styles.breaker}/>
			<TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('ConverterScreen')}>
				<FontAwesome name="exchange" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Crypto Converter</Text>
			</TouchableOpacity>
			<View style={styles.breaker}/>
			<TouchableOpacity style={styles.settingsItem}>
				<FontAwesome5 name="search-dollar" style={styles.settingsItemIcon}/>
				<Text style={styles.settingsItemTitle}>Crypto Profit Calculator</Text>
			</TouchableOpacity>
			<View style={styles.breaker}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	settingsItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: wp('8%')
	},
	settingsItemIcon: {
		paddingRight: wp('7%'),
		fontSize: wp('6%'),
		color: 'black'
	},
	settingsItemTitle: {
		fontSize: hp('2.5%'),
		color: 'black',
		flexShrink: 1,
		fontFamily: 'Montserrat'
	},
	breaker: {
		height: wp('0.1%'),
		width: wp('100%'),
		borderWidth: 0.5,
		borderColor: '#777777'
	}
});