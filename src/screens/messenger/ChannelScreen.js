import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Channel, MessageList, MessageInput, useChatContext } from "stream-chat-expo";
import { logger } from "react-native-logs";

export default function ChannelScreen({ route, navigation }) {
    const [channel, setChannel] = useState(null);
    const { channelId } = route.params;
    const { client } = useChatContext();
    const log = logger.createLogger();

    useEffect(() => {
        const fetchChannel = async () => {
            setChannel(null);
            log.info("fetching channel", channelId);
            const channels = await client.queryChannels({ id: { $eq: channelId } });
            if (channels.length > 0) {
                log.info("updating channel state");
                setChannel(channels[0]);
            } else {
                log.info("No channels found");
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