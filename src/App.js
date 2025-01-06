import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';

// Organization Components
import OrganizationList from './components/organizations/OrganizationList';
import OrganizationDetail from './components/organizations/OrganizationDetail';
import OrganizationCreate from './components/organizations/OrganizationCreate';

// Dashboard Components
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
          </Route>

          {/* Organization Routes */}
          <Route path="/organizations" element={<DashboardLayout />}>
            <Route index element={<OrganizationList />} />
            <Route path="create" element={<OrganizationCreate />} />
            <Route path=":id" element={<OrganizationDetail />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;