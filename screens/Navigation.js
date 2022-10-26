import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";

import SignInScreen from "./Authentication/SignInScreen";
import SignUpScreen from "./Authentication/SignUpScreen";
import ConfirmEmailScreen from "./Authentication/ConfirmEmailScreen";
import ForgotPasswordScreen from "./Authentication/ForgotPasswordScreen";
import NewPasswordScreen from "./Authentication/NewPasswordScreen";
import {NavigationContainer} from "@react-navigation/native";
import { RecoilRoot } from "recoil";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <RecoilRoot>
                <Stack.Navigator initialRouteName="Root" screenOptions={{headerShown: false}}>
                    <Stack.Screen name="SignIn" component={SignInScreen}/>
                    <Stack.Screen name="SignUp" component={SignUpScreen}/>
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
                    <Stack.Screen name="Home" component={BottomTabNavigator}/>
                </Stack.Navigator>
            </RecoilRoot>
        </NavigationContainer>
    );
}