import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
            <View style={styles.barcodeBox}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: windowHeight, width: windowWidth }}/>
            </View>
            <Text style={styles.mainText}>{text}</Text>
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
    mainText: {
        fontSize: 16,
        margin: 20,
    },
    barcodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 600,
        width: windowWidth,
        overflow: 'hidden'
    }
});