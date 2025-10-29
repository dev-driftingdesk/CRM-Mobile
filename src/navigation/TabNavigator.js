import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Import your stacks
import HomeStack from './stacks/HomeStack';
import LeadsStack from './stacks/LeadsStack';
import LeaderboardStack from './stacks/LeaderboardStack';
import ClientReachStack from './stacks/ClientReachStack';
import { useTheme } from '@react-navigation/native';
import { useAppTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { currentTheme } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: currentTheme.colors.inactive,
        tabBarStyle: {
          backgroundColor: currentTheme.colors.tabBar,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontFamily: currentTheme.fonts.medium,
          fontSize: currentTheme.fontSizes.regular - 2,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'HomeTab':
              iconName = 'home-outline';
              break;
            case 'LeadsTab':
              iconName = 'people-outline';
              break;
            case 'LeaderboardTab':
              iconName = 'trophy-outline';
              break;
            case 'ClientReachTab':
              iconName = 'person-circle-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
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
