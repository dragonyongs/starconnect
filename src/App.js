import RegisterPage from './pages/RegisterPage/Register';
import LoginPage from './pages/LoginPage/Login';
import ProfilePage from './pages/ProfilePage/Profile';
import AdminPage from './pages/AdminPage/Admin';
import Main from './layouts/Main';
import User from './components/UserProfile';
import { Routes, Route } from 'react-router-dom';
import Missing from './layouts/Missing';
import Layout from './layouts/Layout';
import Unauthorized from './layouts/Unauthorized';
import RequireAuth from './components/RequireAuth';

const ROLES = {
  'SuperAdmin': 'superadmin', //최고 관리자
  'Admin': 'admin', // 관리자
  'Executive': 'executive', // 임원
  'DepartmentHead': 'departmenthead', // 본부장
  'TeamLead': 'teamlead', // 팀장
  'SectionHead': 'sectionhead', // 파트장
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin]} />}>
            <Route exact path='/' element={<Main />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin, ROLES.Admin]} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin]} />}>
            <Route path="/users/:userId" element={<User />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />

        </Route>
      </Routes>
  );
}

export default App;

// import Header from './layouts/Header';
// import Footer from './layouts/Footer';
// import NotFound from './layouts/NotFound';
// import ProtectedRoute from './components/protectedRoute';
// import { AuthProvider } from './context/Authcontext';
