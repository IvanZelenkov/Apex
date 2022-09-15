import axios from 'axios';
import moment from 'moment';

const formatSparkline = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, 'days').unix();
    let formattedSparkline = numbers.map((item, index) => {
        return {
            x: sevenDaysAgo + (index + 1) * 3600,
            y: item
        }
    });

    return formattedSparkline;
};

const formatMarketData = (data) => {
    let formattedData = [];

    data.forEach(item => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);

        const formattedItem = {
            ...item,
            sparkline_in_7d: {
                price: formattedSparkline
            }
        };

        formattedData.push(formattedItem);
    });

    return formattedData;
}

// async - wait for a response to come back in order to continue
export const getMarketData = async (cryptoPageNumber = 1, timing = '7d') => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${cryptoPageNumber}&sparkline=true&price_change_percentage=${timing}`);
        return formatMarketData(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

export const getFavoriteCrypto = async (cryptoPageNumber = 1, cryptoIds, timing = '7d') => {
    try {
        const response =  await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds}&order=market_cap_desc&per_page=${cryptoPageNumber}&page=1&sparkline=true&price_change_percentage=${timing}`);
        return formatMarketData(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCryptoNews = async () => {
    try {
        const response =  await axios.get('https://cryptopanic.com/api/v1/posts/?auth_token=be40f8e913f0c690fb9f7e45280c8c6bf5375981&public=true');
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}