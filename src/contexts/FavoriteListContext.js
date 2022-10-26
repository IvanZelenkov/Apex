import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteListContext = createContext();

export const useFavoriteList = () => useContext(FavoriteListContext);

const FavoriteListProvider = ({ children }) => {
    const [favoriteCryptoIds, setFavoriteCryptoIds] = useState([]);

    const getFavoriteCryptoData = async () => {
        try {
            const data = await AsyncStorage.getItem("@favorite_crypto");
            setFavoriteCryptoIds(data != null ? JSON.parse(data) : []);
        } catch (error) {
            console.log(error.message);
        }
    }
    
    useEffect(() => {
        getFavoriteCryptoData();
    }, []);
    
    const addFavoriteCrypto = async (cryptoId) => {
        try {
            const newFavoriteCrypto = [...favoriteCryptoIds, cryptoId];
            const data = JSON.stringify(newFavoriteCrypto);
            await AsyncStorage.setItem('@favorite_crypto', data);
            setFavoriteCryptoIds(newFavoriteCrypto);
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const removeFavoriteCrypto = async (cryptoId) => {
        const newFavoriteCrypto = favoriteCryptoIds.filter((cryptoIdValue) => cryptoIdValue !== cryptoId);
        const data = JSON.stringify(newFavoriteCrypto);
        await AsyncStorage.setItem('@favorite_crypto', data);
        setFavoriteCryptoIds(newFavoriteCrypto);
    }

    return (
        <FavoriteListContext.Provider value={{favoriteCryptoIds, addFavoriteCrypto, removeFavoriteCrypto}}>
            {children}
        </FavoriteListContext.Provider>
    );
}

export default FavoriteListProvider;