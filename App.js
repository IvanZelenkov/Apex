import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { RecoilRoot } from 'recoil';

import BottomTabNavigator from './screens/BottomTabNavigator';
import FavoriteListProvider from './contexts/FavoriteListContext';
import { DrawerContent } from './screens/DrawerContent';
import Navigatior from './screens/Navigator'
import {useFonts} from "expo-font";

// const Drawer = createDrawerNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <NavigationContainer>
            <RecoilRoot>
                <FavoriteListProvider>
                    <Navigatior/>
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
            </RecoilRoot>
        </NavigationContainer>
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