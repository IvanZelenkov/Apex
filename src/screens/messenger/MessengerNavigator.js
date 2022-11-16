import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import MessengerScreen from './MessengerScreen';
import UsersScreen from "./UsersScreen";
import ChannelScreen from "./ChannelScreen"
import {useFonts} from "expo-font";

const Stack = createNativeStackNavigator();

const API_KEY = '4jfzt7sv7jnt';
const stream_client = StreamChat.getInstance(API_KEY);

export default function MessengerNavigator() {
    const [isUserReady, setUserReady] = useState(false);
    const [user, setUser] = useState(undefined);
    const navigation = useNavigation();

    const checkUser = async () => {
        let authUser = {};
        try {
            authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUser(authUser.attributes);
        } catch (error) {
            setUser(null);
        }

        await connectAuthenticatedUser(authUser.attributes.preferred_username, authUser.attributes.name, authUser.attributes.email);
    }

    const connectAuthenticatedUser = async (username, fullName, email) => {
        // connect the user
        await stream_client.connectUser({
            id: username,
            name: fullName,
            email: email
        }, stream_client.devToken(username));
        console.log("User connected.");

        // // create a channel
        // await stream_client.channel('messaging', 'apexChannel', {name: 'Apex Group'}).create();
        // console.log("Channel created.");

        setUserReady(true);
    };

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    useEffect(() => {
        checkUser();
        return () => stream_client.disconnectUser();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    if (user === undefined || !isUserReady) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <OverlayProvider>
                <Chat client={stream_client}>
                    <Stack.Navigator initialRouteName="MessengerNavigator">
                        <Stack.Screen
                            name="MessengerScreen"
                            component={MessengerScreen}
                            initialParams={{ user: user }}
                            options={{
                                headerBackTitleVisible: false,
                                headerStyle: {
                                    backgroundColor: 'white'
                                },
                                title: ' ',
                                headerRight: () => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('UsersScreen')}
                                        style={{flexDirection: 'row', alignItems: 'center'}}
                                    >
                                        <Text style={{fontFamily: 'Montserrat-Medium'}}>Search people</Text>
                                        <FontAwesome5
                                            name='users'
                                            color='#d9202e'
                                            size={30}
                                            style={{marginLeft: wp('3%')}}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <Stack.Screen
                            name="UsersScreen"
                            component={UsersScreen}
                            initialParams={{ user: user }}
                            options={{
                                headerBackTitleVisible: false,
                                headerStyle: {
                                    backgroundColor: 'white'
                                },
                                title: ' ',
                                headerLeft: () => (
                                    <TouchableOpacity onPress={() => navigation.navigate('MessengerScreen')}>
                                        <Ionicons
                                            name='chevron-back'
                                            color='black'
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <Stack.Screen
                            name="ChannelScreen"
                            component={ChannelScreen}
                            options={{
                                headerBackTitleVisible: false,
                                headerStyle: {
                                    backgroundColor: 'white'
                                },
                                title: ' ',
                                headerLeft: () => (
                                    <TouchableOpacity onPress={() => navigation.navigate('MessengerScreen')}>
                                        <Ionicons
                                            name='chevron-back'
                                            color='black'
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </Stack.Navigator>
                </Chat>
            </OverlayProvider>
        </SafeAreaProvider>
    );
}