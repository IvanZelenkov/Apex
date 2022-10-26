import React, { useState } from 'react';
import {StyleSheet, ScrollView, Text, Image, useWindowDimensions, View, ActivityIndicator} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useFonts} from "expo-font";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import {useNavigation} from "@react-navigation/native";

export default function SignUpScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();

    const onRegisterPress = () => {
        navigation.navigate('ConfirmEmail');
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    const onTermsOfUsePress = () => {
        // TODO
        console.warn('onTermsOfUsePressed');
    }

    const onPrivacyPress = () => {
        // TODO
        console.warn('onPrivacyPressed');
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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Create an Account</Text>
                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                    secureTextEntry={false}/>
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    secureTextEntry={false}/>
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}/>
                <CustomInput
                    placeholder="Repeat Password"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry={true}/>

                <CustomButton
                    title="Register"
                    onPress={onRegisterPress}
                    type="PRIMARY"/>

                <Text style={styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style={styles.link} onPress={onTermsOfUsePress}>
                        Terms of Use
                    </Text>{' '}
                    and{' '}
                    <Text style={styles.link} onPress={onPrivacyPress}>
                        Privacy Policy
                    </Text>
                </Text>

                <SocialSignInButtons/>
                <CustomButton
                    title="Have an acount? Sign in"
                    onPress={onSignInPress}
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
    },
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat',
        color: '#051C60',
        margin: 10
    },
    text: {
        color: 'gray',
        marginVertical: 10
    },
    link: {
        color: '#FDB075'
    }
});