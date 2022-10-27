import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import { Auth, Hub } from 'aws-amplify';

import SignInScreen from "./Authentication/SignInScreen";
import SignUpScreen from "./Authentication/SignUpScreen";
import ConfirmEmailScreen from "./Authentication/ConfirmEmailScreen";
import ForgotPasswordScreen from "./Authentication/ForgotPasswordScreen";
import NewPasswordScreen from "./Authentication/NewPasswordScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const [user, setUser] = useState(undefined);

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setUser(authUser);
        } catch (error) {
            setUser(null);
        }
    }

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        const listener = data => {
            if (data.payload.event === 'signIn' || data.payload.event === 'signOut')
                checkUser();
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    if (user === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator/>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <RecoilRoot>
                <Stack.Navigator>
                    {user ? (
                        <Stack.Screen
                            name="Home"
                            component={BottomTabNavigator}
                            options={{
                                title: 'A P E X',
                                headerStyle: {
                                    backgroundColor: '#d9202e',
                                },
                                headerTintColor: '',
                                headerTitleStyle: {
                                    fontSize: 20,
                                    fontWeight: "900",
                                    fontStyle: "italic",
                                    color: "white",
                                    fontFamily: 'Montserrat-SemiBold',
                                    letterSpacing: 5
                                },
                            }}
                        />
                    ) : (
                        <>
                            <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
                            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
                            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{headerShown: false}}/>
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}/>
                            <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{headerShown: false}}/>
                        </>
                    )}
                </Stack.Navigator>
            </RecoilRoot>
        </NavigationContainer>
    );
}