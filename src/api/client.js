import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE = 'https://Brighton233j-Messenger-back-database.hf.space';

const client = axios.create({ baseURL: API_BASE });

client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('b24_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
