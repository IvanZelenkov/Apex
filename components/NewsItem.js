import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';

const CurrencyItem = (props) => {
    const { title, link, pubDate, source, guid, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.newsItems}>
                <Text style={styles.sourceTitle}>
                    {source}
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.newsButton}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </TouchableOpacity>
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
    newsButton: {

    },
    title: {
        fontSize: 16
    },
    sourceTitle: {
        fontSize: 18,
        paddingBottom: 5
    }
});

export default CurrencyItem;