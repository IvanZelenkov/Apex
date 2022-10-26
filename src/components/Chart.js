import React, { useContext, createContext, useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFavoriteList } from '../contexts/FavoriteListContext';
import {useFonts} from "expo-font";

export const { width: SIZE } = Dimensions.get('window');
  
export default function Chart(props) {
	const { cryptoId, name, abbreviation, currentPrice, pricePercentageChange7days, logo, sparkline, onPress } = props;
	const { favoriteCryptoIds, addFavoriteCrypto, removeFavoriteCrypto } = useFavoriteList();
	const latestCurrentPrice = useSharedValue(currentPrice);
	const priceColorChange = pricePercentageChange7days > 0 ? "green" : "red";

	let [fontsLoaded] = useFonts({
		'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
	});

	useEffect(() => {
		latestCurrentPrice.value = currentPrice;
	}, [currentPrice]);

	if (!fontsLoaded) {
		return <ActivityIndicator size={'large'} />
	}

	const formatUSD = value => {
		'worklet';
		if (value === '') {
			return `$${latestCurrentPrice.value.toLocaleString('en-US', {currency: 'USD'})}`;
		}
		return `$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
	};

	const isFavorite = () => {
		return favoriteCryptoIds.some((cryptoIdValue) => cryptoIdValue === cryptoId);
	}

	const favoriteCryptoHandler = () => {
		return isFavorite() ? removeFavoriteCrypto(cryptoId) : addFavoriteCrypto(cryptoId);
	}

	// const whatTiming = (timing) => {
		
	// }

	return (
		<ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
			{/* onPress={onPress} */}    
			{/* <MaterialCommunityIcons
				name="###"
				size={30}
				color="white"
				onPress={() => navigation.goBack()}
      		/> */}
			<View style={styles.chartWrapper}>
				<View style={styles.titlesWrapper}>
					<View style={styles.upperTitles}>
						<View style={styles.upperLeftTitle}>
							<Image style={styles.image} source={{uri: logo}}/>
							<Text style={styles.subtitle}>{name} ({abbreviation.toUpperCase()})</Text>
						</View>
						<MaterialCommunityIcons 
							onPress={favoriteCryptoHandler}
							name={isFavorite() ? "star" : "star-outline"} 
							color={isFavorite() ? "#FCC400" : "black"}
							style={styles.favoriteIcon}
						/>
					</View>
					<View style={styles.lowerTitles}>
						<ChartYLabel format={formatUSD} style={styles.boldTitle}/>	
						<Text style={[styles.regularTitle, {color: priceColorChange}]}>{pricePercentageChange7days.toFixed(2)}%</Text>
					</View>
				</View>
				<View style={styles.chartLine}>
					<ChartPath height={SIZE / 2} stroke="black" width={SIZE}/>
					<ChartDot style={{ backgroundColor: 'red' }}/>
				</View>
				<View style={styles.timingWrapper}>
					{/* <TouchableOpacity onPress={whatTiming('1h')} style={styles.timingButton}>
						<Text style={styles.timingText}>1H</Text>
					</TouchableOpacity> */}
					<TouchableOpacity style={styles.timingButton}>
						<Text style={styles.timingText}>1H</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.timingButton}>
						<Text style={styles.timingText}>1D</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.timingButton}>
						<Text style={styles.timingText}>1W</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.timingButton}>
						<Text style={styles.timingText}>1M</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.timingButton}>
						<Text style={styles.timingText}>1Y</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ChartPathProvider>
	);
}

const styles = StyleSheet.create({
	chartWrapper: {
		marginVertical: 8
	},
	favoriteIcon: {
		marginLeft: 'auto',
		fontSize: 30
	},
	titlesWrapper: {
		marginHorizontal: 16
	},
	upperTitles: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	upperLeftTitle: {
		flexDirection: "row",
		alignItems: "center"
	},
	timingWrapper: {
		display: "flex",
		flexDirection: "row",
		marginTop: 20,
		paddingHorizontal: 30,
		justifyContent: "space-between"
	},
	timingButton: {
		borderWidth: 2,
		padding: 8,
		borderRadius: 12
	},
	timingText: {
		fontSize: 14,
		color: "black",
		fontFamily: 'Montserrat-SemiBold'
	},
	image: {
		width: 30,
		height: 30,
		marginRight: 4
	},
	subtitle: {
		fontSize: 14,
		color: "black",
		fontFamily: 'Montserrat-Medium'
	},
	lowerTitles: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	boldTitle: {
		fontSize: 24,
		fontWeight: "bold",
		fontFamily: 'Montserrat-SemiBold'
	},
	regularTitle: {
		fontSize: 18,
		fontFamily: 'Montserrat'
	},
	chartLineWrapper: {
		marginTop: 40
	}
});