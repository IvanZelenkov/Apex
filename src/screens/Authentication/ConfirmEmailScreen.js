import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';

export default function ConfirmEmailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const {control, handleSubmit, watch} = useForm({
        defaultValues: {username: route?.params?.username},
    });
    const username = watch('username');

    const onConfirmPress = async data => {
        try {
            await Auth.confirmSignUp(data.username, data.code);
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
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Code was resent to your email');
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Confirm your email</Text>
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{required: 'Username code is required'}}
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
        padding: 20,
        marginTop: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        fontFamily: 'Montserrat'
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    }
});