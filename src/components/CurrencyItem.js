import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useFonts } from "expo-font";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CurrencyItem = (props) => {
    const { cryptoId, name, abbreviation, currentPrice, pricePercentageChange7days, logo, onPress } = props;
    const priceColorChange = pricePercentageChange7days > 0 ? "green" : "red";

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.currencyItem}>

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
        marginHorizontal: wp('2%')
    },
    currencyItem: {
        paddingHorizontal: wp('2%'),
        marginTop: wp('2.5%'),
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
        height: wp('13%'),
        width: wp('13%')
    },
    currencyTitleWrapper: {
        marginLeft: wp('3%')
    },
    title: {
        fontSize: wp('4.3%'),
        fontFamily: 'Montserrat-Medium',
        color: 'black'
    },
    subtitle: {
        fontSize: wp('3.5%'),
        marginTop: wp('2%'),
        color: "#777777",
        fontFamily: 'Montserrat'
    }
});

export default CurrencyItem;