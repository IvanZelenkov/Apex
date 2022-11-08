import { useEffect, useState } from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import { useFonts } from "expo-font";
import {Amplify, Auth} from 'aws-amplify';
import awsExports from './src/aws-exports';
import { OverlayProvider, Chat, ChannelList } from "stream-chat-expo";
import { StreamChat } from 'stream-chat';
import { logger } from "react-native-logs";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";

import FavoriteListProvider from './src/contexts/FavoriteListContext';
import Navigation from './src/screens/Navigation';

Amplify.configure(awsExports);

const API_KEY = "agv89m6cch9h";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
    const [isUserReady, setUserReady] = useState(false);
    const [user, setUser] = useState(undefined);

    let log = logger.createLogger();

    let [fontsLoaded] = useFonts({
        'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
    });

    useEffect(() => {
        const connectAuthenticatedUser = async () => {
            let authUser = {};
            try {
                authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
                setUser(authUser.attributes);
            } catch (error) {
                setUser(null);
            }

            await client.connectUser({
                id: 'client1',
                name: authUser.attributes.name,
                email: authUser.attributes.email
            }, client.devToken('client1'));

            log.info("User connected.");

            // create a channel
            const channel = client.channel('messaging', 'apexchannel1', {
                name: 'Apex Channel'
            });
            await channel.create();

            log.info("Channel created.");

            setUserReady(true);
        };

        connectAuthenticatedUser();

        return () => client.disconnectUser();
    }, []);

    if (!isUserReady || !fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }
    else {
        return (
            <SafeAreaProvider>
                <StatusBar/>
                <OverlayProvider>
                    <Chat client={client}>
                        <FavoriteListProvider>
                            <Navigation/>
                        </FavoriteListProvider>
                    </Chat>
                </OverlayProvider>
            </SafeAreaProvider>
        );
    }
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
