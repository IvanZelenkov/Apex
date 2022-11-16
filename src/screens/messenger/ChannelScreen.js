import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, SafeAreaView } from "react-native";
import { Channel, MessageList, MessageInput, useChatContext, useMessageContext, MessageSimple } from "stream-chat-expo";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MessageHeader } from "../../components/MessageHeader";
import { RenderNothing } from "../../components/RenderNothing";

export default function ChannelScreen({ route, navigation }) {
    const [channel, setChannel] = useState(null);
    const { channelId } = route.params;
    const { client } = useChatContext();

    useEffect(() => {
        const fetchChannel = async () => {
            setChannel(null);
            console.log("fetching channel", channelId);
            const channels = await client.queryChannels({ id: { $eq: channelId } });
            if (channels.length > 0) {
                console.log("updating channel state");
                setChannel(channels[0]);
            } else {
                console.log("No channels found");
            }
        };

        fetchChannel();
    }, [channelId]);

    if (channel === null) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <Channel
                channel={channel}
                MessageHeader={MessageHeader}
                DateHeader={RenderNothing}
            >
                <MessageList
                    onThreadSelect={(thread) =>
                        navigation.navigate("Thread", {
                            channelId: channelId,
                            thread
                        })
                    }
                />
                <MessageInput/>
            </Channel>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: wp('5%'),
        left: wp('5%')
    },
    backArrow: {}
});