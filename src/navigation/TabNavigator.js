import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Import your stacks
import HomeStack from './stacks/HomeStack';
import LeadsStack from './stacks/LeadsStack';
import LeaderboardStack from './stacks/LeaderboardStack';
import ClientReachStack from './stacks/ClientReachStack';

import Iconify from 'react-native-iconify';
import { useAppTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.midnightgreen,
        tabBarInactiveTintColor: theme.colors.inactive,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.BodyMedium,

        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'HomeTab':
              iconName = 'mdi:map-marker';
              break;
            case 'LeadsTab':
              iconName = 'mdi:account-outline';
              break;
            case 'LeaderboardTab':
              iconName = 'mdi:map-marker';
              break;
            case 'ClientReachTab':
              iconName = 'mdi:email-outline';
              break;
            default:
              iconName = 'mdi:account-box';
          }
          return <Iconify icon={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="LeadsTab" component={LeadsStack} options={{ title: 'Leads' }} />
      <Tab.Screen name="LeaderboardTab" component={LeaderboardStack} options={{ title: 'Leaderboard' }} />
      <Tab.Screen name="ClientReachTab" component={ClientReachStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
