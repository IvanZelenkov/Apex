import React, { useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import axios from "axios";
import NewsItem from '../components/NewsItem';
import { getMarketNews } from '../services/cryptoRequest';
import { logger } from 'react-native-logs';

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>NEWS</Text>
		</View>
		<View style={styles.breaker}/>
	</>
);

export default function NewsScreen() {
	const [data, setData] = useState([]);
	const [selectedNewsData, setSelectedNewsData] = useState(null);
	const [loading, setLoading] = useState(false);

	// const fetchCrypto = async () => {
	// 	if (loading) return;
	//
	// 	setLoading(true);
	// 	const marketData = await getMarketNews();
	//
	// 	let log = logger.createLogger();
	// 	log.info(marketData);
	//
	// 	// setData((currentCrypto) => ([...currentCrypto, ...marketData]));
	// 	setLoading(false);
	// }

	const getMarketNews = async () => {
		const options = {
			method: 'GET',
			url: 'https://mboum-finance.p.rapidapi.com/ne/news',
			headers: {
				'X-RapidAPI-Key': 'c896b36245msh5f7010b3637c44cp14a62fjsn5cb74015600b',
				'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
			},
		};

		axios.request(options).then(function (response) {
			setData(response.data);
			// return response.data;
		}).catch(function (error) {
			console.error(error);
		});
	}

	const refreshNews = async () => {
		if (loading) return;

		setLoading(true);
		// const marketData = await getMarketNews();
		// setData(marketData);
		getMarketNews();
		setLoading(false);
	}

	const openNews = (item) => {
		setSelectedNewsData(item);
	};

	useEffect(() => {
		// fetchCrypto();
		getMarketNews();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
				<FlatList
					keyExtractor={(item) => item.id}
					data={data}
					renderItem={({ item }) => (
						<NewsItem
							title={item.title}
							link={item.link}
							pubDate={item.pubDate}
							source={item.source}
							guid={item.guid}
							onPress={() => openNews(item)}
						/>
					)}
					// onEndReached={() => fetchCryptoNews(((data.length / 50) + 1))}
					ListHeaderComponent={<Header/>}
					refreshControl={
						<RefreshControl
							refreshing={loading}
							tintColor="black"
							onRefresh={refreshNews}
						/>
					}
				/>
			</SafeAreaView>
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
