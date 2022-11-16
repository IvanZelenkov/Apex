import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import { Colors } from 'stream-chat-expo';

import { MessageUserBar } from './MessageHeader';
import { ChatText } from './ChatText';
import {useFonts} from "expo-font";

export const MessageText = React.memo((props) => {
    const { isThreadMessage, message, renderText } = props;
    const navigation = useNavigation();
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

    return (
        <>
            {message.attachments.length === 0 && <MessageUserBar {...props}/>}
            {message.show_in_channel && !isThreadMessage && (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ThreadScreen', {
                            channelId: message.cid.substring(message.cid.indexOf(':') + 1),
                            threadId: message.parent_id,
                        });
                    }}
                    style={{
                        backgroundColor: 'transparent',
                        marginBottom: 10,
                    }}>
                    <ChatText
                        style={{
                            color: colors.dimmedText,
                        }}>
                        replied to a thread{' '}
                        {/* <SCText
              style={{
                color: colors.linkText,
              }}>
              {message.parentMessageText
                ? truncate(message.parentMessageText, 70, '...')
                : ''}
            </SCText> */}
                    </ChatText>
                </TouchableOpacity>
            )}
            {renderText({
                colors: Colors,
                markdownStyles: {
                    inlineCode: {
                        color: 'red',
                        fontWeight: '200',
                    },

                    mentions: {
                        fontWeight: '700',
                    },
                    // unfortunately marginVertical doesn't override the defaults for these within the 3rd party lib
                    paragraph: {
                        marginBottom: 0,
                        marginTop: 0,
                    },

                    paragraphCenter: {
                        marginBottom: 0,
                        marginTop: 0,
                    },
                    paragraphWithImage: {
                        marginBottom: 0,
                        marginTop: 0,
                    },
                    text: {
                        color: colors.text,
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 16,
                    },
                },
                message,
            })}
        </>
    );
});