import React, { useEffect } from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { restoreSession } from '../store/slices/auth/thunk';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

  useEffect(() => {
    // Try to restore session from AsyncStorage on app launch
    dispatch(restoreSession());
  }, [dispatch]);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00C2FF" />
      </View>
    );
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
};

export default RootNavigator;
