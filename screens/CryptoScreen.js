import React, { useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Chart from "../components/Chart";
import CurrencyItem from '../components/CurrencyItem';
import { getMarketData, getCryptoNews } from '../services/cryptoRequest';
import { logger } from 'react-native-logs';

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>CRYPTO MARKET</Text>
		</View>
		<View style={styles.breaker}/>
	</>
);

export default function CryptoScreen() {
	const [data, setData] = useState([]);
	const [selectedCurrencyData, setSelectedCurrencyData] = useState(null);
	const [loading, setLoading] = useState(false);
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ['55%'], []);

	const fetchCrypto = async (cryptoPageNumber, timing) => {
		if (loading) return;
		
		setLoading(true);
		const marketData = await getMarketData(cryptoPageNumber, timing);
		setData((currentCrypto) => ([...currentCrypto, ...marketData]));
		setLoading(false);
	}

	const refreshCrypto = async () => {
		if (loading) return;
		
		setLoading(true);
		const marketData = await getMarketData();
		setData(marketData);
		setLoading(false);
	}

	// let log = logger.createLogger();

	// const refreshCrypto2 = async () => {
	// 	log.info(getCryptoNews());
	// }

	const openModal = (item) => {
		setSelectedCurrencyData(item);
		bottomSheetModalRef.current.present();
	};

	useEffect(() => {
		fetchCrypto();
	}, []);

	return (
		<BottomSheetModalProvider style={styles.bottomSheetWrapper}>
			<SafeAreaView style={styles.container}>
				<FlatList
					keyExtractor={(item) => item.id}
					data={data}
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
					onEndReached={() => fetchCrypto(((data.length / 50) + 1), '7d')}
					ListHeaderComponent={<Header/>}
					refreshControl={
						<RefreshControl
							refreshing={loading}
							tintColor="black"
							onRefresh={refreshCrypto}
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
		color: "#1e90ff"
	},
	breaker: {
		height: StyleSheet.hairlineWidth,
		marginHorizontal: 16,
		marginTop: 16,
		backgroundColor: "black"
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