import { useEffect, useState } from "react";
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
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    {user ? (
                        <Stack.Screen name="Home" component={BottomTabNavigator}/>
                    ) : (
                        <>
                            <Stack.Screen name="SignIn" component={SignInScreen}/>
                            <Stack.Screen name="SignUp" component={SignUpScreen}/>
                            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                            <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
                        </>
                    )}
                </Stack.Navigator>
            </RecoilRoot>
        </NavigationContainer>
    );
}