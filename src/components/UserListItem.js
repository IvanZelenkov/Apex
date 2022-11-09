import { StyleSheet, Text, ActivityIndicator, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useChatContext } from "stream-chat-expo";
import { Auth } from "aws-amplify";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

export default function UserListItem({ user }) {
    const { client } = useChatContext();
    const navigation = useNavigation();

    const onPress = async () => {
        let authUser = {};
        let userId;
        try {
            authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            userId = authUser.attributes.preferred_username;
        } catch (error) {
            userId = null;
        }

        if (!user.id || !userId)
            return;

        const channel = client.channel("messaging", { members: [user.id, userId] });
        await channel.watch();

        navigation.navigate("ChannelScreen", { channelId: channel.id });
    }

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

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={styles.image} source={{ uri: `https://4kwallpapers.com/images/walls/thumbs_2t/8085.jpg` }}/>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Text style={styles.username}>{user.name}</Text>
                    <View style={styles.breaker}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginLeft: wp('1%'),
        marginTop: wp('2%')
    },
    image: {
        width: wp('17%'),
        height: wp('17%'),
        backgroundColor: '#777777',
        borderRadius: 99,
        marginRight: wp('3%')
    },
    username: {
        fontFamily: 'Montserrat-Medium',
        fontSize: wp('4.5%'),
        paddingTop: wp('1%'),
        marginBottom: wp('10%'),
        marginTop: wp('2%')
    },
    breaker: {
        height: wp('0.1%'),
        width: wp('100%'),
        borderWidth: 0.5,
        borderColor: '#777777'
    }
});