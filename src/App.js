// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/Register';
import LoginPage from './pages/LoginPage/Login';
import ProfilePage from './pages/ProfilePage/Profile';
import AdminPage from './pages/AdminPage/Admin';
import MainPage from './pages/MainPage/Main';
import User from './components/UserProfile';
import Missing from './layouts/Missing';
import Layout from './layouts/Layout';
import Unauthorized from './layouts/Unauthorized';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthProvider';

const ROLES = {
  'User':'user',
  'SuperAdmin': 'superadmin',
  'Admin': 'admin',
  'Executive': 'executive',
  'DepartmentHead': 'departmenthead',
  'TeamLead': 'teamlead',
  'SectionHead': 'sectionhead',
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<PersistLogin />}>
            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin]} />}>
              <Route path='/' element={<MainPage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin, ROLES.Admin]} />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin, ROLES.Admin]} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin]} />}>
              <Route path="/users/:userId" element={<User />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
