import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, useWindowDimensions, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import Logo from '../../../assets/images/logo.png';
import CustomInput from "../../components/CustomInput";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import CustomButton from "../../components/CustomButton";

export default function SignInScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPress = () => {
        // validate user
        navigation.navigate('Home');
    }

    const onForgotPasswordPress = () => {
        navigation.navigate('ForgotPassword')
    }

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.container}>
                <Image
                    source={Logo}
                    style={[styles.logo, {height: height * 0.3}]}
                    resizeMode="contain"
                />
                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                    secureTextEntry={false}/>
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}/>

                <CustomButton
                    title="Sign In"
                    onPress={onSignInPress}
                    type="PRIMARY"/>
                <CustomButton
                    title="Forgot Password?"
                    onPress={onForgotPasswordPress}
                    type="SECONDARY"/>
                <SocialSignInButtons/>
                <CustomButton
                    title="Don't have an account? Create one!"
                    onPress={onSignUpPress}
                    type="SECONDARY"/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white'
    },
    container: {
        alignItems: 'center',
        padding: 20,
        marginTop: 50
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        borderRadius: 20,
        marginBottom: 30
    }
});