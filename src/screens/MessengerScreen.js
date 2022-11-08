import { useState } from "react";
import {StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, View} from 'react-native';
import { useFonts } from 'expo-font';
import { ChannelList, Channel, MessageList, MessageInput } from "stream-chat-expo";

export default function SettingsScreen() {
    const [selectedChannel, setSelectedChannel] = useState(null);

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    const onChannelPressed = (channel) => {
        setSelectedChannel(channel);
    }

    return (
        <>
            { selectedChannel ? (
                    <Channel channel={selectedChannel}>
                        <MessageList/>
                        <Text
                            style={{margin: 50}}
                            onPress={() => setSelectedChannel(null)}
                        >
                            Go back
                        </Text>
                        <MessageInput/>
                    </Channel>
                ) : (
                    <ChannelList onSelect={onChannelPressed}/>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});