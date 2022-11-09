import {StyleSheet, Text, Pressable, ActivityIndicator, View} from 'react-native';
import {useFonts} from "expo-font";

export default function CustomButton({ title, onPress, type = "PRIMARY", backgroundColor, foregroundColor }) {
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
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                styles[`container_${type}`],
                backgroundColor ? { backgroundColor: backgroundColor } : {}
            ]}>
            <Text style={[
                styles.title,
                styles[`title_${type}`],
                foregroundColor ? { color: foregroundColor } : {}
            ]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 10
    },
    container_PRIMARY: {
        backgroundColor: '#d9202e'
    },
    container_SECONDARY: {
        borderWidth: 2,
        borderColor: '#d9202e'
    },
    title_PRIMARY: {
        color: 'white',
        fontFamily: 'Montserrat'
    },
    title_SECONDARY: {
        color: 'white',
        fontFamily: 'Montserrat'
    },
    title_TERTIARY: {
        color: 'white',
        fontFamily: 'Montserrat'
    }
});