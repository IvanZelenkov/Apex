import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { logger } from "react-native-logs";

import MessengerScreen from './MessengerScreen';
import UsersScreen from "./UsersScreen";
import ChannelScreen from "./ChannelScreen"

const Stack = createNativeStackNavigator();

const API_KEY = "t6x5tevv26kt";
const stream_client = StreamChat.getInstance(API_KEY);

export default function MessengerNavigator() {
    const [isUserReady, setUserReady] = useState(false);
    const [user, setUser] = useState(undefined);

    const log = logger.createLogger();

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
        await stream_client.connectUser({id: username, name: fullName, email: email}, stream_client.devToken(username));
        log.info("User connected.");

        // create a channel
        await stream_client.channel('livestream', 'apexMainChannel', {name: 'Apex Channel'}).create();
        log.info("Channel created.");

        setUserReady(true);
    };

    useEffect(() => {
        checkUser();
        return () => stream_client.disconnectUser();
    }, []);

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
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="UsersScreen"
                            component={UsersScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ChannelScreen"
                            component={ChannelScreen}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </Chat>
            </OverlayProvider>
        </SafeAreaProvider>
    );
}