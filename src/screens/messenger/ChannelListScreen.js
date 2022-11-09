import { ChannelList, useChatContext } from "stream-chat-expo";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

export default function ChannelListScreen() {
    const navigation = useNavigation();

    const onChannelPressed = async (channel) => {
        navigation.navigate("ChannelScreen", { channelId: channel.id });
    };

    return <ChannelList onSelect={onChannelPressed}/>;
};