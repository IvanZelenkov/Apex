import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

export default function ConfirmEmailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const {control, handleSubmit, watch} = useForm({
        defaultValues: { email: route?.params?.email },
    });
    const email = watch('email');

    const onConfirmPress = async data => {
        try {
            await Auth.confirmSignUp(data.email, data.code);
            navigation.navigate('SignIn');
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onResendPress = async () => {
        try {
            await Auth.resendSignUp(email);
            Alert.alert('Success', 'Code was resent to your email');
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            style={styles.scrollView}
            centerContent={true}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Confirm your email</Text>
                <CustomInput
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={{required: 'Email is required'}}
                />
                <CustomInput
                    name="code"
                    placeholder="Enter your confirmation code"
                    control={control}
                    rules={{required: 'Confirmation code is required'}}
                />
                <CustomButton
                    title="Confirm"
                    onPress={handleSubmit(onConfirmPress)}
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