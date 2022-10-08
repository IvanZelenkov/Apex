import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';
import { useFonts } from 'expo-font';

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>SIGN IN</Text>
		</View>
	</>
);

export default function SignIn({ navigation }) {
    const [inputText, setInputText] = useState('');

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{alignItems: 'center', marginTop: 240 }}>
                    <Header/>
                    <TextInput 
                        style={styles.amountInputField}
                        mode={'outlined'}
                        outlineColor={'red'}
                        activeOutlineColor={'black'}
                        label="Username"
                        value={inputText}
                        onChangeText={inputText => setAmount(inputText)}
                    />
                    <TextInput 
                        style={styles.amountInputField}
                        mode={'outlined'}
                        outlineColor={'red'}
                        activeOutlineColor={'black'}
                        label="Password"
                        value={inputText}
                        onChangeText={inputText => setAmount(inputText)}
                    />
                    <Text style={{textDecorationLine: 'underline'}}>Forgot Password?</Text>
                    
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 20,
    },
    titleWrapper: {
		alignItems: 'center',
		paddingHorizontal: 60
	},
	mainTitle: {
		fontSize: 24,
		fontWeight: "900",
		fontStyle: "italic",
		color: "red",
		fontFamily: 'Montserrat-SemiBold',
		letterSpacing: 5
	},
    amountInputField: {
        width: 200,
        backgroundColor: '#EEEEEE',
        marginVertical: 15,
    },
    picker: {
        height: 50,
        width: 300,
        marginBottom: 130
    },
    resultOutput: {
        fontSize: 50, 
        marginTop: 50, 
        fontFamily: 'Montserrat'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'black',
        marginTop: 20
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});