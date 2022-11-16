import { useState, useEffect } from "react";
import {StyleSheet, ActivityIndicator, View, FlatList, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { useChatContext } from "stream-chat-expo";

import UserListItem from "../../components/UserListItem";

export default function UsersScreen({ route }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user: authUser } = route.params;

    const { client } = useChatContext();

    const fetchUsers = async () => {
        setIsLoading(true);
        const response = await client.queryUsers({});
        // filter out the admin account
        const result = response.users.filter(user => {
            return user.role !== 'admin' && user.id !== authUser.preferred_username
        });
        setUsers(result);
        setIsLoading(false);
    }

    let [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    useEffect(() => {
        fetchUsers();
    }, [])

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={'#d9202e'}/>
            </View>
        );
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item }) =>
                    <UserListItem user={item}/>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        tintColor="#d9202e"
                        onRefresh={fetchUsers}
                    />
                }
            />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});