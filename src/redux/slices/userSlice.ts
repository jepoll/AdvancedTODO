import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  username: string;
  role: string;
  isLoggedIn: boolean;
  temperatureUnit: 'Celsius' | 'Fahrenheit';
}

const initialState: UserState = {
  email: '',
  username: '',
  role: '',
  isLoggedIn: false,
  temperatureUnit: 'Celsius',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; username: string; role: string }>) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = '';
      state.username = '';
      state.role = '';
      state.isLoggedIn = false;
    },
    setTemperatureUnit: (state, action: PayloadAction<'Celsius' | 'Fahrenheit'>) => {
      state.temperatureUnit = action.payload;
    },
  },
});

export const { login, logout, setTemperatureUnit } = userSlice.actions;
export default userSlice.reducer;
