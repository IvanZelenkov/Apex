import { ActivityIndicator, StatusBar, View} from 'react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import * as Font from "expo-font";
import FavoriteListProvider from './src/contexts/FavoriteListContext';
import Navigation from './src/screens/navigation/Navigation';
import { useEffect, useState } from "react";

Amplify.configure(awsExports);

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const fetchFonts = async () => {
        await Font.loadAsync({
            "Montserrat-Italic-VariableFont": require("./assets/fonts/Montserrat-Italic-VariableFont.ttf"),
            "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
            "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
            "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf")
        });
    };

    useEffect(() => {
        fetchFonts();
        setFontsLoaded(true)
    }, [])

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <StatusBar/>
            <FavoriteListProvider>
                <Navigation/>
            </FavoriteListProvider>
        </SafeAreaProvider>
    );
}