import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';
import { Auth } from "aws-amplify";

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

export default function NewPasswordScreen() {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm();

    const onSubmitPress = async data => {
        try {
            await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
            navigation.navigate('SignIn');
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            style={styles.scrollView}
            centerContent={true}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Reset Your Password</Text>
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{required: 'Username is required'}}
                />
                <CustomInput
                    name="code"
                    placeholder="Code"
                    control={control}
                    rules={{required: 'Code is required'}}
                />
                <CustomInput
                    name="password"
                    placeholder="Enter your new password"
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
                <CustomButton
                    title="Submit"
                    onPress={handleSubmit(onSubmitPress)}
                />
                <CustomButton
                    title="Back to Sign in"
                    onPress={onSignInPress}
                    type="SECONDARY"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'black'
    },
    container: {
        alignItems: 'center',
        padding: wp('10%')
    },
    title: {
        fontSize: wp('6%'),
        color: 'white',
        margin: wp('2%'),
        fontFamily: 'Montserrat'
    }
});