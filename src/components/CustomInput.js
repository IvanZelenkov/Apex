import { StyleSheet, View, TextInput, ActivityIndicator, Text } from 'react-native';
import { useFonts } from "expo-font";
import { Controller } from 'react-hook-form';

export default function CustomInput({ control, name, rules = {}, placeholder, secureTextEntry }) {
    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View
                        style={[
                            styles.container,
                            {borderColor: error ? 'red' : '#e8e8e8'},
                        ]}>
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            style={styles.input}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                    )}
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    input: {
        fontFamily: 'Montserrat'
    }
});