import { useState } from "react";
import { StyleSheet, ActivityIndicator, View, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Searchbar } from "react-native-paper";

import UsersScreen from './UsersScreen';
import ChannelListScreen from "./ChannelListScreen";

export default function MessengerScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
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
        <SafeAreaProvider>
            <View style={styles.header}>
                <Searchbar
                    placeholder="Search people"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    iconColor={'#d9202e'}
                    inputStyle={{fontFamily: 'Montserrat-Medium'}}
                    style={styles.searchBar}
                />
                <TouchableOpacity style={styles.usersIcon} onPress={() => navigation.navigate('UsersScreen')}>
                    <FontAwesome5 name="users" color={'#d9202e'} size={25}/>
                </TouchableOpacity>
            </View>
            <ChannelListScreen/>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    searchBar: {
        height: wp('13%'),
        width: wp('80%'),
        backgroundColor: 'white',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0

    },
    usersIcon: {
        height: wp('13%'),
        width: wp('20%'),
        justifyContent: 'center',
        alignItems: 'center'
    }
});