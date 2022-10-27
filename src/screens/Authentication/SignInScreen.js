import { useState } from 'react';
import { StyleSheet, ScrollView, Image, useWindowDimensions, View, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

import Logo from '../../../assets/images/logo-removed-bg.png';
import CustomInput from "../../components/CustomInput";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import CustomButton from "../../components/CustomButton";

export default function SignInScreen() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { height } = useWindowDimensions();
    const { control, handleSubmit, formState: {errors} } = useForm();

    const onSignInPress = async (data) => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await Auth.signIn(data.username, data.password);
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
        setLoading(false);
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
                    name="username"
                    placeholder="Username"
                    control={control}
                    secureTextEntry={false}
                    rules={{required: 'Username is required'}}
                />
                <CustomInput
                    name="password"
                    placeholder="Password"
                    secureTextEntry={true}
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password should be minimum 8 characters long'
                        }
                    }}
                />
                <CustomButton
                    title={loading ? "Loading..." : "Sign In"}
                    onPress={handleSubmit(onSignInPress)}
                    type="PRIMARY"
                />
                <CustomButton
                    title="Forgot Password?"
                    onPress={onForgotPasswordPress}
                    type="SECONDARY"
                />
                {/*<SocialSignInButtons/>*/}
                <CustomButton
                    title="Don't have an account? Sign Up"
                    onPress={onSignUpPress}
                    type="SECONDARY"
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'black'
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