import { ChannelList, useChatContext } from "stream-chat-expo";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

export default function ChannelListScreen(props) {
    const navigation = useNavigation();
    const { user } = props;

    const onChannelPressed = async (channel) => {
        navigation.navigate("ChannelScreen", { channelId: channel.id });
    };

    const filters = {
        members: {
            $in: [user.preferred_username]
        }
    }

    return <ChannelList onSelect={onChannelPressed} filters={filters}/>;
};