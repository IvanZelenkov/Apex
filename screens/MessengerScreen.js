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
import { useFonts } from 'expo-font';

const Header = () => (
    <>
        <View style={styles.titleWrapper}>
            <Text style={styles.mainTitle}>MESSENGER</Text>
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
        color: "#3B8F0D",
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: 5
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
        color: "black"
    },
    settingsItemTitle: {
        fontSize: 22,
        color: "black",
        fontFamily: 'Montserrat'
    }
});