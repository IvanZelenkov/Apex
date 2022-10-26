import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView } from 'react-native';

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
import {useNavigation} from "@react-navigation/native";

export default function NewPasswordScreen() {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigation = useNavigation();

    const onSubmitPress = () => {
        navigation.navigate('Home');
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Reset Your Password</Text>
                <CustomInput
                    placeholder="Code"
                    value={code}
                    setValue={setCode}
                />
                <CustomInput
                    placeholder="Enter your new password"
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <CustomButton
                    title="Submit"
                    onPress={onSubmitPress}
                />
                <CustomButton
                    title="Back to Sign in"
                    onPress={onSignInPress}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white'
    },
    container: {
        alignItems: 'center',
        padding: 20,
        marginTop: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
        fontFamily: 'Montserrat'
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
});