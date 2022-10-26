import React, { useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { getMarketData } from '../services/cryptoRequest';

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>PROFILE</Text>
		</View>
		<View style={styles.breaker}/>
	</>
);

export default function NewsScreen() {
	const [data, setData] = useState([]);
	const [selectedCurrencyData, setSelectedCurrencyData] = useState(null);

	useEffect(() => {
		const fetchMarketData = async () => {
			const marketData = await getMarketData();
			setData(marketData);
		};

		fetchMarketData();
	}, []);

	const bottomSheetModalRef = useRef(null);

	const snapPoints = useMemo(() => ['50%'], []);

	const openModal = (item) => {
		setSelectedCurrencyData(item);
		bottomSheetModalRef.current.present();
	};

	return (
		<BottomSheetModalProvider>
			<SafeAreaView style={styles.container}>
				<FlatList
					keyExtractor={(item) => item.id}
					data={data}
					ListHeaderComponent={<Header/>}
				/>
			</SafeAreaView>
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
		color: "#FF0000"
	},
	breaker: {
		height: StyleSheet.hairlineWidth,
		marginHorizontal: 16,
		marginTop: 16,
		backgroundColor: "black",
	},
	bottomSheet: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -4
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
});