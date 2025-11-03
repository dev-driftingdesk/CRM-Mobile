import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Iconify from 'react-native-iconify';
import { useAppTheme } from '../context/ThemeContext';
import IconComponent from '../assets/icons/CustomIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const { theme } = useAppTheme();

    return (
        <View style={[styles.container, {
            backgroundColor: theme.colors.white,
            borderTopColor: theme.colors.timberwolf
        }]}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];

                const label = options.title ?? route.name;

                // 🔥 Keep all your tab names exactly the same
                let iconName = 'mdi:account-box';
                switch (route.name) {
                    case 'HomeTab':
                        iconName = 'home-1';
                        break;
                    case 'LeadsTab':
                        iconName = 'user';
                        break;
                    case 'LeaderboardTab':
                        iconName = 'mdi:map-marker';
                        break;
                    case 'ScheduleTab':
                        iconName = 'calendar';
                        break;
                    case 'ClientReachTab':
                        iconName = 'mail-1';
                        break;
                }

                const color = isFocused
                    ? theme.colors.midnightgreen
                    : theme.colors.davysgrey;

                const onPress = () => {
                    if (!isFocused) navigation.navigate(route.name);
                };

                return (
                    // <SafeAreaView style={{ flex:1 }}>
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        activeOpacity={0.8}
                        style={[styles.tabButton, {
                            borderTopColor: theme.colors.timberwolf,
                            paddingBottom: 8
                        }]}
                    >
                        <IconComponent name={iconName} width={28} height={28} color={color} tintColour={color} />
                        <Text
                            style={[{
                                color,
                                marginTop: 8,
                            }, theme.typography.BodySmallMedium]}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                    // </SafeAreaView>
                );
            })}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20,
        shadowColor: '#00000025',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: -3
        },
        borderTopWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    tabButton: {
        flex: 1,
        // borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomTabBar;
