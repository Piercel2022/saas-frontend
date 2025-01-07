import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get('http://localhost:3001/api/v1/organizations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOrganization = createAsyncThunk(
  'organizations/create',
  async (organizationData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/api/v1/organizations', 
        organizationData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
 );

 // fetchOrganizationById implementation
export const fetchOrganizationById = createAsyncThunk(
  'organizations/fetchById',
  async (organizationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3001/api/v1/organizations/${organizationId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// updateOrganization implementation
export const updateOrganization = createAsyncThunk(
  'organizations/update',
  async ({ id, organizationData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3001/api/v1/organizations/${id}`,
        organizationData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const organizationsSlice = createSlice({
    name: 'organizations',
    initialState: {
      items: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchOrganizations.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchOrganizations.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchOrganizations.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
export default organizationsSlice.reducer;