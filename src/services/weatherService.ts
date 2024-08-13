// src/weatherService.ts

import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherResponse } from '../types';
import Constants from 'expo-constants';

const expoConfig = Constants.expoConfig;
// const WEATHER_API_KEY = Config.OPENWEATHER_API_KEY;
// const WEATHER_API_KEY = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY ?? '';
const API_IN_CODE = '0620d668a7026e4728688ddcef572351';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CACHE_DURATION_TEST = 30 * 1000;
const CACHE_DURATION_PRODUCTION = 30 * 60 * 1000;

const CACHE_DURATION = CACHE_DURATION_TEST;

export const getWeather = async (location: string): Promise<WeatherResponse> => {
    const cacheKey = `weather_${location}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);


    if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }

    
    
    try {
        const response = await axios.get<WeatherResponse>(BASE_URL, {
            params: {
                q: location,
                appid: API_IN_CODE,
                units: 'metric',
            },
        });

        const data = response.data;
        await AsyncStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data,
        }));

        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};
