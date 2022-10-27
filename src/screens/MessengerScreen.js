import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

export default function SettingsScreen() {
    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.settingsItem}>
                <MaterialCommunityIcons name="account-circle" style={styles.settingsItemIcon}/>
                <Text style={styles.settingsItemTitle}>Gennadi Baranov</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
                <MaterialCommunityIcons name="account-circle" style={styles.settingsItemIcon}/>
                <Text style={styles.settingsItemTitle}>Sofiya Dmitrieva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
                <MaterialCommunityIcons name="account-circle" style={styles.settingsItemIcon}/>
                <Text style={styles.settingsItemTitle}>Katia Nikolaeva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
                <MaterialCommunityIcons name="account-circle" style={styles.settingsItemIcon}/>
                <Text style={styles.settingsItemTitle}>Nikolay Zhvikov</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
                <MaterialCommunityIcons name="account-circle" style={styles.settingsItemIcon}/>
                <Text style={styles.settingsItemTitle}>Aleksandr Kollerov</Text>
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
        paddingHorizontal: 16
    },
    breaker: {
        height: StyleSheet.hairlineWidth,
		marginTop: 16,
		backgroundColor: "black",
        borderWidth: 1
    },
    settingsItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30
    },
    settingsItemIcon: {
        marginRight: 30,
        fontSize: 70,
        color: 'white'
    },
    settingsItemTitle: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'Montserrat'
    }
});