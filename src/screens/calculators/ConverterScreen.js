import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';

import { getMarketData } from '../../services/cryptoRequest';

export default function ConverterScreen({ navigation }) {
    const [cryptocurrencies, setCryptocurrencies] = useState([]);
    const currencies = ['usd', 'eur', 'rub', 'cny', 'jpy', 'gbp', 'inr', 'krw'];
    const [amount, setAmount] = useState('');
    const [currentPrice, setCurrentPrice] = useState(amount);
    const [selectedCurrency, setSelectedCurrency] = useState('usd');
    const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
    const [loading, setLoading] = useState(false);

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
        if (loading) return;

        setLoading(true);
        const currentPrice = await getParticularCryptoData(currency, cryptocurrency, '1h');
        setCurrentPrice(currentPrice);
        setLoading(false);
    }

    function getCurrencySign(currencyType) {
        if (selectedCurrency === 'usd')
            return <FontAwesome name={'dollar'} size={35}/>;
        else if (selectedCurrency === 'eur')
            return <FontAwesome name={'euro'} size={35}/>;
        else if (selectedCurrency === 'rub')
            return <FontAwesome name={'ruble'} size={35}/>;
        else if (selectedCurrency === 'cny')
            return <FontAwesome name={'cny'} size={35}/>;
        else if (selectedCurrency === 'jpy')
            return <FontAwesome name={'jpy'} size={35}/>;
        else if (selectedCurrency === 'gbp')
            return <FontAwesome name={'gbp'} size={35}/>;
        else if (selectedCurrency === 'inr')
            return <FontAwesome name={'inr'} size={35}/>;
        else if (selectedCurrency === 'krw') {
            return <FontAwesome name={'krw'} size={35}/>
        }
    }

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    useEffect(() => {
        fetchCrypto();
        fetchCurrencies(selectedCurrency, selectedCrypto);
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/*<View style={styles.header}>*/}
            {/*    <Ionicons*/}
            {/*        name='chevron-back'*/}
            {/*        color='black'*/}
            {/*        size={30}*/}
            {/*        style={styles.backArrow}*/}
            {/*        onPress={() => navigation.goBack()}*/}
            {/*    />*/}
            {/*</View>*/}
            <View style={{alignItems: 'center'}}>
                <TextInput
                    style={styles.amountInputField}
                    mode={'outlined'}
                    outlineColor={'#d9202e'}
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
                        fetchCurrencies(selectedCurrency, itemValue);
                    }}
                    itemStyle={styles.pickerItem}
                >
                    {cryptocurrencies.map(item => (
                        <Picker.Item key={item.id} label={item.id.charAt(0).toUpperCase() + item.id.slice(1)} value={item.id}/>
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedCurrency}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setSelectedCurrency(itemValue);
                        fetchCurrencies(itemValue, selectedCrypto);
                    }}
                    itemStyle={styles.pickerItem}
                >
                    {currencies.map(item => (
                        <Picker.Item key={item} label={item.toUpperCase()} value={item} style={styles.pickerItem}/>
                    ))}
                </Picker>
                {amount === ''
                    ? <Text style={styles.resultOutput}>{getCurrencySign(selectedCurrency)} {parseFloat(currentPrice).toFixed(2)}</Text>
                    : <Text style={styles.resultOutput}>{getCurrencySign(selectedCurrency)} {parseFloat(amount * currentPrice).toFixed(2)}</Text>
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: wp('5%'),
        left: wp('5%')
    },
    backArrow: {},
    amountInputField: {
        width: wp('40%'),
        height: wp('12%'),
        backgroundColor: '#EEEEEE',
        marginVertical: wp('5%')
    },
    picker: {
        height: wp('10%'),
        width: wp('65%'),
        marginBottom: wp('30%')
    },
    pickerItem: {
        fontSize: wp('4%'),
        height: wp('40%')
    },
    resultOutput: {
        fontSize: wp('10%'),
        marginTop: wp('5%'),
        fontFamily: 'Montserrat'
    }
});