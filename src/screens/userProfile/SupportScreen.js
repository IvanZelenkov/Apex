import { View, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useFonts } from "expo-font";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

export default function SupportScreen() {
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
            <View style={styles.developerInfoSection}>
                <Text style={styles.developerText}>Developer</Text>
                <View style={styles.developerInfo}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="account-outline" color="#d9202e" size={30}/>
                        <Text style={styles.email}>Ivan Zelenkov</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="email" color="#3a90ff" size={30}/>
                        <Text style={styles.email}>itproger.ivan@gmail.com</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: wp('3%')
    },
    developerInfoSection: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    developerInfo: {
        flexDirection: 'column'
    },
    developerText: {
        color: "black",
        fontFamily: 'Montserrat-SemiBold',
        fontSize: wp('7%'),
        marginBottom: wp('5%')
    },
    email: {
        color: "black",
        marginLeft: 20,
        fontFamily: 'Montserrat',
        fontSize: wp('4%')
    }
});