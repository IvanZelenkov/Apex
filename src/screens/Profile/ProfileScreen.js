import {useEffect, useState} from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Share, ActivityIndicator } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Auth } from "aws-amplify";
import { logger } from "react-native-logs";

export default function ProfileScreen() {
    const [user, setUser] = useState(undefined);

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            let log = logger.createLogger();
            log.info(authUser.attributes);
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

    useEffect(() => {
        checkUser();
    }, []);

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
                                uri: 'https://4kwallpapers.com/images/walls/thumbs_2t/8235.jpg',
                            }}
                            size={80}
                        />
                        <View style={{marginLeft: 20}}>
                            <Title style={[styles.title, {
                                marginTop:15,
                                marginBottom: 5,
                            }]}>{user.name === undefined ? '': user.name}</Title>
                            <Caption style={styles.caption}>{user.preferred_username === undefined ? '': user.preferred_username}</Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="map-marker-radius" color="#777777" size={20}/>
                        <Text style={{color:"#777777", marginLeft: 20}}>New Orleans, USA</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="phone" color="#777777" size={20}/>
                        <Text style={{color:"#777777", marginLeft: 20}}>+15044138933</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="email" color="#777777" size={20}/>
                        <Text style={{color:"#777777", marginLeft: 20}}>{user.email === undefined ? '' : user.email}</Text>
                    </View>
                </View>

                <View style={styles.infoBoxWrapper}>
                    <View style={[styles.infoBox, {
                        borderRightColor: '#dddddd',
                        borderRightWidth: 1
                    }]}>
                        <Title>₹140.50</Title>
                        <Caption>Wallet</Caption>
                    </View>
                    <View style={styles.infoBox}>
                        <Title>12</Title>
                        <Caption>Orders</Caption>
                    </View>
                </View>

                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="heart-outline" color="#FF6347" size={25}/>
                            <Text style={styles.menuItemText}>Your Favorites</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="credit-card" color="#FF6347" size={25}/>
                            <Text style={styles.menuItemText}>Payment</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onShare}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="share-outline" color="#FF6347" size={25}/>
                            <Text style={styles.menuItemText}>Tell Your Friends</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="account-check-outline" color="#FF6347" size={25}/>
                            <Text style={styles.menuItemText}>Support</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="cog-outline" color="#FF6347" size={25}/>
                            <Text style={styles.menuItemText}>Settings</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={signOut}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="sign-out" color="#FF6347" size={25}/>
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
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    }
});