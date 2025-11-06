import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useDispatch } from 'react-redux';
import { clearAuth } from '../../../store/slices/auth/authSlice';

const ClientReachHomepage = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(clearAuth());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Profile / Client Reach</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClientReachHomepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  text: { color: '#00C2FF', fontSize: 20, marginBottom: 20 },
  button: {
    backgroundColor: '#FF5555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
