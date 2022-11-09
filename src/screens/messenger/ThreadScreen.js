import { useEffect, useState } from "react";
import {ActivityIndicator, Text, View} from "react-native";
import { Channel, useChatContext, Thread } from "stream-chat-react-native-core";

export default function ThreadScreen({ route }) {
    const [channel, setChannel] = useState(null);
    const { channelId, thread } = route.params;

    const { client } = useChatContext();

    useEffect(() => {
        const fetchChannel = async () => {
            setChannel(null);
            const channels = await client.queryChannels({ id: { $eq: channelId } });
            if (channels.length > 0) {
                setChannel(channels[0]);
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
        <Channel channel={channel} thread={thread}>
            <Thread/>
        </Channel>
    );
};
