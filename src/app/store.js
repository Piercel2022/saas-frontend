import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import organizationsReducer from '../features/organizations/organizationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organizations: organizationsReducer,
  },
});