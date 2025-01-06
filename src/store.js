import { configureStore } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Auth Slice with Async Actions
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Organizations Slice with Async Actions
const organizationsSlice = createSlice({
  name: 'organizations',
  initialState: {
    organizations: [],
    currentOrganization: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Organizations
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Organization
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations.push(action.payload);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Organization Details
      .addCase(fetchOrganizationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrganization = action.payload;
      })
      .addCase(fetchOrganizationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Organization
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrganization = action.payload;
        state.organizations = state.organizations.map(org =>
          org.id === action.payload.id ? action.payload : org
        );
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Async Thunks for Auth
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunks for Organizations
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch('/api/organizations', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrganization = createAsyncThunk(
  'organizations/create',
  async (organizationData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(organizationData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create organization');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrganizationById = createAsyncThunk(
  'organizations/fetchById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`/api/organizations/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch organization');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrganization = createAsyncThunk(
  'organizations/update',
  async ({ id, ...updateData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`/api/organizations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update organization');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Export actions
export const { logout } = authSlice.actions;

// Configure Store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    organizations: organizationsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/signup/fulfilled'],
      },
    }),
});

export default store;