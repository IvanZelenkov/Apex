import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Linking, ActivityIndicator} from 'react-native';
import { logger } from 'react-native-logs';
import {useFonts} from "expo-font";

const CurrencyItem = (props) => {
    const { title, link, imageURL, pubDate, id, onPress } = props;
    // let log = logger.createLogger();
    // log.info(imageURL);

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.container}>
            <View style={styles.newsItems}>
                <Image style={styles.image} source={{uri: imageURL}}/>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    newsItems: {
        padding: 16,
        margin: 4,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 20
    },
    title: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center'
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 20
    }
});

export default CurrencyItem;