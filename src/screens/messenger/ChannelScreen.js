import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Channel, MessageList, MessageInput, useChatContext } from "stream-chat-expo";

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
        <Channel channel={channel}>
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
    );
};