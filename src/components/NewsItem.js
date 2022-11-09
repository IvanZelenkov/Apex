import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, ActivityIndicator } from 'react-native';
import { useFonts } from "expo-font";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CurrencyItem = (props) => {
    const { title, link, imageURL, pubDate, id, onPress } = props;

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
        marginHorizontal: wp('3%')
    },
    newsItems: {
        paddingVertical: wp('4%'),
        margin: wp('1%'),
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: wp('4%'),
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
        color: 'white'
    },
    image: {
        width: wp('90%'),
        height: wp('60%'),
        borderRadius: 10
    }
});

export default CurrencyItem;