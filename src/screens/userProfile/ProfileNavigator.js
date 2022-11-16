import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import ProfileScreen from "./ProfileScreen";
import SupportScreen from "./SupportScreen";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName="ProfileNavigator">
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SupportScreen"
                component={SupportScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    title: ' ',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                            <Ionicons
                                name='chevron-back'
                                color='black'
                                size={30}
                                style={{marginLeft: wp('5%')}}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </Stack.Navigator>
    );
}