import { View } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
import { ChannelPreviewMessenger } from "stream-chat-expo";

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

    const CustomListItem = (props) => {
        const backgroundColor = '#dcdcdc'
        return (
            <View style={{ backgroundColor }}>
                <ChannelPreviewMessenger {...props}/>
            </View>
        );
    }

    return (
        <ChannelList
            onSelect={onChannelPressed}
            filters={filters}
            Preview={CustomListItem}
        />
    )
};