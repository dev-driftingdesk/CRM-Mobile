import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('ACCESS_TOKEN');
        // setIsAuthenticated(!!token);
      } catch (e) {
        console.log('Auth check failed:', e);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00C2FF" />
      </View>
    );
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
  // return isAuthenticated ? <AuthStack />  : <AppStack />;
};

export default RootNavigator;
