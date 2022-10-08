import React, { useRef, useMemo, useState, useEffect } from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl, SafeAreaView, ActivityIndicator} from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Chart from "../components/Chart";
import CurrencyItem from '../components/CurrencyItem';
import { getFavoriteCrypto } from '../services/cryptoRequest';
import { useFavoriteList } from '../contexts/FavoriteListContext';
import {useFonts} from "expo-font";

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>FAVORITE</Text>
		</View>
		<View style={styles.breaker}/>
	</>
);

export default function FavoriteCryptoScreen() {
    const [favoriteCrypto, setFavoriteCrypto] = useState([]);
	const [selectedCurrencyData, setSelectedCurrencyData] = useState(null);
	const [loading, setLoading] = useState(false);
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ['55%'], []);

    const { favoriteCryptoIds } = useFavoriteList();

    const formatCryptoString = () => favoriteCryptoIds.join('%2C');

    const fetchFavoriteCrypto = async (cryptoPageNumber, timing) => {
		if (loading) return;
		
		setLoading(true);
		const favoriteCrypto = await getFavoriteCrypto(1, formatCryptoString(), '7d');
		setFavoriteCrypto(favoriteCrypto);
		setLoading(false);
	}

    const openModal = (item) => {
		setSelectedCurrencyData(item);
		bottomSheetModalRef.current.present();
	};

	let [fontsLoaded] = useFonts({
		'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
	});
    
	useEffect(() => {
        if (favoriteCryptoIds.length > 0) 
            fetchFavoriteCrypto();
    }, [favoriteCryptoIds]);

	if (!fontsLoaded) {
		return <ActivityIndicator size={'large'} />
	}

    return (
		<BottomSheetModalProvider style={styles.bottomSheetWrapper}>
			<SafeAreaView style={styles.container}>
				<FlatList
					keyExtractor={(item) => item.id}
					data={favoriteCrypto}
					renderItem={({ item }) => (
						<CurrencyItem 
							name={item.name}
							abbreviation={item.symbol}
							currentPrice={item.current_price}
							pricePercentageChange7days={item.price_change_percentage_7d_in_currency}
							logo={item.image}
							onPress={() => openModal(item)}
						/>
					)}
					onEndReached={() => fetchFavoriteCrypto(((favoriteCrypto.length / 50) + 1), '7d')}
					ListHeaderComponent={<Header/>}
					refreshControl={
						<RefreshControl
							refreshing={loading}
							tintColor="black"
							onRefresh={favoriteCryptoIds.length > 0 ? fetchFavoriteCrypto : null}
						/>
					}
				/>
			</SafeAreaView>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
				style={styles.bottomSheet}
			>
				{selectedCurrencyData ? ( <Chart
					cryptoId={selectedCurrencyData.id}
					name={selectedCurrencyData.name}
					abbreviation={selectedCurrencyData.symbol}
					currentPrice={selectedCurrencyData.current_price}
					pricePercentageChange7days={selectedCurrencyData.price_change_percentage_7d_in_currency}
					logo={selectedCurrencyData.image}
					sparkline={selectedCurrencyData.sparkline_in_7d.price}
				/>) : null}
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	titleWrapper: {
		alignItems: 'center',
		marginTop: 20,
		paddingHorizontal: 16
	},
	mainTitle: {
		fontSize: 24,
		fontWeight: "900",
		fontStyle: "italic",
		color: "#FFAB33",
		fontFamily: 'Montserrat-SemiBold',
		letterSpacing: 5
	},
	breaker: {
		height: StyleSheet.hairlineWidth,
		marginTop: 16,
		backgroundColor: "black",
        borderWidth: 1
	},
	bottomSheet: {
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: -5
		},
		shadowOpacity: 0.45,
		shadowRadius: 5,
		elevation: 5
	}
});