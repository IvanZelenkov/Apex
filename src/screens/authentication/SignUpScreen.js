import { StyleSheet, ScrollView, Text, View, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useFonts } from "expo-font";
import { Auth } from "aws-amplify";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function SignUpScreen() {
    const navigation = useNavigation();
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');

    const onRegisterPress = async (data) => {
        const { username, password, email, name } = data;
        try {
            await Auth.signUp({
                username,
                password,
                attributes: { email, name, preferred_username: username },
            });

            navigation.navigate('ConfirmEmail', { username });
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
    };

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
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            style={styles.scrollView}
            centerContent={true}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Create an Account</Text>
                <CustomInput
                    name="name"
                    placeholder="Full Name"
                    control={control}
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 3,
                            message: 'Name should be at least 3 characters long'
                        },
                        maxLength: {
                            value: 24,
                            message: 'Name should be max 24 characters long'
                        }
                    }}
                />
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username should be at least 3 characters long'
                        },
                        maxLength: {
                            value: 24,
                            message: 'Username should be max 24 characters long'
                        }
                    }}
                />
                <CustomInput
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}
                    }}
                />
                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    secureTextEntry={true}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password should be at least 8 characters long'
                        }
                    }}
                />
                <CustomInput
                    name="password-repeat"
                    placeholder="Repeat Password"
                    control={control}
                    secureTextEntry={true}
                    rules={{
                        validate: value => value === pwd || 'Password do not match'
                    }}
                />
                <CustomButton
                    title="Register"
                    onPress={handleSubmit(onRegisterPress)}
                    type="PRIMARY"
                />
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
                {/*<SocialSignInButtons/>*/}
                <CustomButton
                    title="Have an account? Sign in"
                    onPress={onSignInPress}
                    type="SECONDARY"/>
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
        padding: wp('10%'),
    },
    title: {
        fontSize: wp('6%'),
        fontFamily: 'Montserrat',
        color: 'white',
        margin: wp('2%')
    },
    text: {
        color: 'white',
        marginVertical: wp('3%')
    },
    link: {
        color: '#3a90ff'
    }
});