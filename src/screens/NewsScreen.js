import { useState, useEffect } from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView, RefreshControl, ActivityIndicator} from 'react-native';
import axios from "axios";
import NewsItem from '../components/NewsItem';
import { getMarketNews } from '../services/cryptoRequest';
import { logger } from 'react-native-logs';
import { useFonts } from "expo-font";

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
			url: 'https://crypto-news-live11.p.rapidapi.com/all',
			params: {page: '1', per_page: '50'},
			headers: {
				'X-RapidAPI-Key': 'c896b36245msh5f7010b3637c44cp14a62fjsn5cb74015600b',
				'X-RapidAPI-Host': 'crypto-news-live11.p.rapidapi.com'
			},
		};

		axios.request(options).then(function (response) {
			setData(response.data.news);
		}).catch(function (error) {
			console.error(error);
		});
	}

	const refreshNews = async () => {
		if (loading) return;

		setLoading(true);
		getMarketNews();
		setLoading(false);
	}

	const openNews = (item) => {
		setSelectedNewsData(item);
	};

	let [fontsLoaded] = useFonts({
		'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
	});

	useEffect(() => {
		// fetchCrypto();
		getMarketNews();
	}, []);

	if (!fontsLoaded) {
		return <ActivityIndicator size={'large'} />
	}

	return (
		<SafeAreaView style={styles.container}>
				<FlatList
					keyExtractor={(item) => item.id}
					data={data}
					renderItem={({ item }) => (
						<NewsItem
							title={item.title}
							link={item.link}
							imageURL={item.img}
							pubDate={item.date}
							id={item.id}
							onPress={() => openNews(item)}
						/>
					)}
					// onEndReached={() => fetchCryptoNews(((data.length / 50) + 1))}
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
		backgroundColor: 'black'
	},
	titleWrapper: {
		alignItems: 'center',
		marginTop: 20,
		paddingHorizontal: 16
	},
	breaker: {
		height: StyleSheet.hairlineWidth,
		marginTop: 16,
		backgroundColor: 'black',
        borderWidth: 1
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