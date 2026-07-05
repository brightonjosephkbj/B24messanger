import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const { login } = useAuth();

  function handleMessage(event) {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'AUTH_SUCCESS') {
        login(data.token, data.user);
      }
    } catch (e) {
      console.warn('AuthScreen message parse error', e);
    }
  }

  return (
    <View style={styles.container}>
      <WebView
        source={require('../../assets/login.html')}
        onMessage={handleMessage}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a12' }
});
