import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BarCodeScanner } from 'expo-barcode-scanner';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = () => (
	<>
		<View style={styles.titleWrapper}>
			<Text style={styles.mainTitle}>NEWS</Text>
		</View>
		<View style={styles.breaker}/>
	</>
);

export default function ScannerScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Scan it!');

    const askCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askCameraPermission()}/>
            </View>
        );
    }

	return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: windowHeight, width: windowWidth }}/>
            </View>
            <Text style={styles.maintext}>{text}</Text>
            {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato'/>}
        </View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 600,
        width: windowWidth,
        overflow: 'hidden'
    }
});