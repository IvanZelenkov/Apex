import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView } from 'react-native';

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
import {useNavigation} from "@react-navigation/native";

export default function ConfirmEmailScreen() {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');

    const navigation = useNavigation();

    const onConfirmPress = () => {
        navigation.navigate('Home');
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onResendPress = async () => {
        // TODO
        console.warn("onResendPress");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Confirm your email</Text>
                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Enter your confirmation code"
                    value={code}
                    setValue={setCode}
                />

                <CustomButton
                    title="Confirm"
                    onPress={onConfirmPress}
                />
                <CustomButton
                    title="Resend code"
                    onPress={onResendPress}
                    type="SECONDARY"
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