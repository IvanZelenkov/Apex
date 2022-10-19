import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';
import { logger } from 'react-native-logs';
import { useFonts } from 'expo-font';
import axios from 'axios';

import { getMarketData } from '../../services/cryptoRequest';

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>CONVERTER</Text>
		</View>
	</>
);

export default function Converter({ navigation }) {
    const [cryptocurrencies, setCryptocurrencies] = useState([]);
    const [currentPrice, setCurrentPrice] = useState([]);
    const currencies = ['usd', 'eur'];
    const [amount, setAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('usd');
    const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
	const [loading, setLoading] = useState(false);

    var log = logger.createLogger();

    const getParticularCryptoData = async (currency, cryptoId, timing) => {
        try {
            const response =  await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${cryptoId}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=${timing}`);
            return response.data[0].current_price;
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchCrypto = async () => {
		if (loading) return;
		
		setLoading(true);
        const marketData = await getMarketData();
		setCryptocurrencies((currentCrypto) => ([...currentCrypto, ...marketData]));
		setLoading(false);
    }

    const fetchCurrencies = async (currency = selectedCurrency, cryptocurrency = selectedCrypto) => {
        const currentPrice = await getParticularCryptoData(currency, cryptocurrency, '1h');
        setCurrentPrice(currentPrice);
    }

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    useEffect(() => {
		fetchCrypto();
        fetchCurrencies(selectedCurrency, selectedCrypto);
	}, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size={'large'} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={30}
                    style={styles.backArrow}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <Header/>
            </View>
            <View style={styles.breaker}/>
            <View>
                <View style={{alignItems: 'center'}}>
                    <TextInput 
                        style={styles.amountInputField}
                        mode={'outlined'}
                        outlineColor={'#F98E07'}
                        activeOutlineColor={'black'}
                        label="Amount"
                        value={amount}
                        onChangeText={amount => setAmount(amount)}
                    />
                    <Picker
                        selectedValue={selectedCrypto}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            setSelectedCrypto(itemValue);
                            fetch(selectedCurrency, itemValue);
                        }}
                    >
                        {cryptocurrencies.map(item => (
                            <Picker.Item key={item.id} label={item.id} value={item.id}/>
                        ))}
                    </Picker>
                    <Picker 
                        selectedValue={selectedCurrency}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            setSelectedCurrency(itemValue);
                            fetch(itemValue, selectedCrypto);
                        }}
                    >
                        {currencies.map(item => (
                            <Picker.Item key={item} label={item.toUpperCase()} value={item}/>
                        ))}
                    </Picker>
                    <Text style={styles.resultOutput}>$ {currentPrice}</Text>
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
    backArrow: {
        alignSelf: 'flex-start'
    },
    titleWrapper: {
		alignItems: 'center',
		paddingHorizontal: 60
	},
	mainTitle: {
		fontSize: 24,
		fontWeight: "900",
		fontStyle: "italic",
		color: "#F98E07",
		fontFamily: 'Montserrat-SemiBold',
		letterSpacing: 5
	},
    breaker: {
		height: StyleSheet.hairlineWidth,
		marginTop: 16,
		backgroundColor: "black",
        borderWidth: 1
	},
    amountInputField: {
        width: 200,
        backgroundColor: '#EEEEEE',
        marginVertical: 30,
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
    }
});
