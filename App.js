import { ActivityIndicator, StatusBar, View} from 'react-native';
import { useFonts } from "expo-font";
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";

import FavoriteListProvider from './src/contexts/FavoriteListContext';
import Navigation from './src/screens/navigation/Navigation';

Amplify.configure(awsExports);

export default function App() {

    let [fontsLoaded] = useFonts({
        'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
    });

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