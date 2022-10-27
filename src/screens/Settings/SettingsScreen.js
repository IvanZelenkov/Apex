import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Auth } from "aws-amplify";

export default function SettingsScreen({ navigation }) {
	const signOut = () => {
		Auth.signOut();
	}
	let [fontsLoaded] = useFonts({
		'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf')
	});

	if (!fontsLoaded) {
		return <ActivityIndicator size={'large'} />
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('Profile')}>
					<MaterialCommunityIcons name="account-circle" style={styles.settingsItemIcon}/>
					<Text style={styles.settingsItemTitle}>Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('SignIn')}>
					<MaterialCommunityIcons name="cog-outline" style={styles.settingsItemIcon}/>
					<Text style={styles.settingsItemTitle}>General</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('Register')}>
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
				<TouchableOpacity style={styles.settingsItem} onPress={signOut}>
					<FontAwesome name="sign-out" style={styles.settingsItemIcon}/>
					<Text style={styles.settingsItemTitle}>Sign Out</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',

		flexDirection: 'row',
		paddingHorizontal: 20
	},
	titleWrapper: {
		alignItems: 'center',
		marginTop: 20,
		paddingHorizontal: 16
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
		color: "white"
	},
	settingsItemTitle: {
		fontSize: 22,
		color: "white",
		fontFamily: 'Montserrat'
	}
});