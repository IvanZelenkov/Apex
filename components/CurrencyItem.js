import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const CurrencyItem = (props) => {
    const { cryptoId, name, abbreviation, currentPrice, pricePercentageChange7days, logo, onPress } = props;
    const priceColorChange = pricePercentageChange7days > 0 ? "green" : "red";
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.currencyItems}>

                {/* Left side */}
                <View style={styles.leftSide}>
                    <Image source={{ uri: logo}} style={styles.image}/>
                    <View style={styles.currencyTitleWrapper}>
                        <Text>{cryptoId}</Text>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subtitle}>{abbreviation.toUpperCase()}</Text>
                    </View>
                </View>

                {/* Right side */}
                <View style={styles.rightSide}>
                    <Text style={styles.title}>${currentPrice.toLocaleString('en-US', {currency: 'USD'})}</Text>
                    <Text style={[styles.subtitle, {color: priceColorChange}]}>{pricePercentageChange7days?.toFixed(2)}%</Text>
                </View>
                
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    currencyItems: {
        // ?
        paddinghorizontal: 16,
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    leftSide: {
        flexDirection: "row",
        alignItems: "center"
    },
    rightSide: {
        alignItems: "flex-end"
    },
    image: {
        height: 48,
        width: 48
    },
    currencyTitleWrapper: {
        marginLeft: 8
    },
    title: {
        fontSize: 18
    },
    subtitle: {
        fontSize: 14,
        marginTop: 4,
        color: "gray"
    }
});

export default CurrencyItem;