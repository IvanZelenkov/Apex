import {useEffect, useState} from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Share, ActivityIndicator } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Auth } from "aws-amplify";
import { logger } from "react-native-logs";
import {useFonts} from "expo-font";

export default function ProfileScreen() {
    const [user, setUser] = useState(undefined);

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            // let log = logger.createLogger();
            // log.info(authUser.attributes);
            setUser(authUser.attributes);
        } catch (error) {
            setUser(null);
        }
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const signOut = () => {
        Auth.signOut();
    }
    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    useEffect(() => {
        checkUser();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    if (user === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator/>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Avatar.Image
                            source={{
                                uri: 'https://c4.wallpaperflare.com/wallpaper/1023/336/834/5bd159f85e972-wallpaper-preview.jpg',
                            }}
                            size={80}
                        />
                        <View style={{marginLeft: 20}}>
                            <Title style={[styles.title, {
                                marginTop: 15,
                                marginBottom: 5,
                            }]}>{user.name === undefined ? '': user.name}</Title>
                            <Caption style={styles.caption}>{user.preferred_username === undefined ? '': user.preferred_username}</Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="map-marker-radius" color="#d9202e" size={20}/>
                        <Text style={{color:"black", marginLeft: 20, fontFamily: 'Montserrat'}}>New Orleans, USA</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="phone" color="#d9202e" size={20}/>
                        <Text style={{color:"black", marginLeft: 20, fontFamily: 'Montserrat'}}>+15044138933</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="email" color="#d9202e" size={20}/>
                        <Text style={{color:"black", marginLeft: 20, fontFamily: 'Montserrat'}}>{user.email === undefined ? '' : user.email}</Text>
                    </View>
                </View>

                {/*<View style={styles.infoBoxWrapper}>*/}
                {/*    <View style={[styles.infoBox, {*/}
                {/*        borderRightColor: '#dddddd',*/}
                {/*        borderRightWidth: 1*/}
                {/*    }]}>*/}
                {/*        <Title>$ 100</Title>*/}
                {/*        <Caption>Wallet</Caption>*/}
                {/*    </View>*/}
                {/*    <View style={styles.infoBox}>*/}
                {/*        <Title>12</Title>*/}
                {/*        <Caption>Orders</Caption>*/}
                {/*    </View>*/}
                {/*</View>*/}

                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="credit-card" color="#d9202e" size={25}/>
                            <Text style={styles.menuItemText}>Payment</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onShare}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="share-outline" color="#d9202e" size={25}/>
                            <Text style={styles.menuItemText}>Tell Your Friends</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="account-check-outline" color="#d9202e" size={25}/>
                            <Text style={styles.menuItemText}>Support</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="cog-outline" color="#d9202e" size={25}/>
                            <Text style={styles.menuItemText}>Settings</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={signOut}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="sign-out" color="#d9202e" size={25}/>
                            <Text style={styles.menuItemText}>Sign Out</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-SemiBold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
        fontFamily: 'Montserrat-Medium'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    menuItemText: {
        color: 'black',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Montserrat-Medium'
    }
});