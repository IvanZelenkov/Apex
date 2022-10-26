import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { useFonts } from "expo-font";
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';

import BottomTabNavigator from './src/screens/BottomTabNavigator';
import FavoriteListProvider from './src/contexts/FavoriteListContext';
import { DrawerContent } from './src/screens/DrawerContent';
import Navigation from './src/screens/Navigation';

Amplify.configure(awsExports);

// const Drawer = createDrawerNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <>
                <FavoriteListProvider>
                    <Navigation/>
                    {/* <Drawer.Navigator
                        screenOptions={({ navigation }) => ({
                            drawerStyle: {backgroundColor: 'white' },
                            headerLeft: props =>
                                <FeatherIcons
                                    name="menu"
                                    style={styles.drawerIcon}
                                    onPress={navigation.toggleDrawer}
                                />
                        })}
                        drawerContent={props => <DrawerContent {...props}/>}
                    >
                        <Drawer.Screen name="Apex" component={BottomTabNavigator}/>
                    </Drawer.Navigator> */}
                </FavoriteListProvider>
        </>
    );
}

const styles = StyleSheet.create({
    drawer: {
        background: "red"
    },
    drawerIcon: {
        fontSize: 26,
        marginLeft: 10,
        color: "black"
    }
});