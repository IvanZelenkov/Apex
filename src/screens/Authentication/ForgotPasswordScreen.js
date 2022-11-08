import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useForm } from 'react-hook-form';
import { Auth } from "aws-amplify";

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm();

    const onSendPress = async (data) => {
        try {
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword');
        } catch (error) {
            Alert.alert('ERROR', error.message);
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Reset Your Password</Text>
                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{required: 'Username is required'}}
                />
                <CustomButton
                    title="Send"
                    onPress={handleSubmit(onSendPress)}
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
        padding: 20,
        marginTop: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        fontFamily: 'Montserrat'
    },
    text: {
        color: 'white',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
});