import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView } from 'react-native';

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
import {useNavigation} from "@react-navigation/native";

export default function ForgotPasswordScreen() {
    const [username, setUsername] = useState('');

    const navigation = useNavigation();

    const onSendPress = () => {
        navigation.navigate('NewPassword');
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Reset Your Password</Text>
                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />

                <CustomButton
                    title="Send"
                    onPress={onSendPress}
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