import { useTheme } from '@react-navigation/native';
import Dayjs from 'dayjs';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useFonts } from "expo-font";
import { ChatText } from "./ChatText";

export const MessageUserBar = React.memo(({ message }) => {
    const { colors } = useTheme();

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

    if (message?.groupStyles?.[0] === 'single' || message?.groupStyles?.[0] === 'top') {
        return (
            <>
                <View style={styles.userBar}>
                    <ChatText
                        style={[
                            styles.messageUserName,
                            {
                                color: colors.boldText,
                            },
                        ]}>
                        {message.user.name}
                    </ChatText>
                    <ChatText style={styles.messageDate}>
                        {Dayjs(message.created_at).format('LT')}
                    </ChatText>
                </View>
            </>
        );
    }
    return null;
});

export const MessageHeader = React.memo(({ message }) => (
    <View style={styles.column}>
        {message.attachments.length > 0 && (
            <View style={styles.header}>
                <MessageUserBar message={message} />
            </View>
        )}
    </View>
));

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column'
    },
    header: {
        paddingLeft: 2
    },
    messageDate: {
        color: 'grey',
        fontSize: 10,
        marginLeft: 6
    },
    messageUserName: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        fontWeight: '900'
    },
    userBar: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },
});