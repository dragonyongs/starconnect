import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/Register';
import LoginPage from './pages/LoginPage/Login';
import ProfilePage from './pages/ProfilePage/Profile';
import NotFound from './layouts/NotFound';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './layouts/Main';
import User from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/users/:userId" element={<User />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route exact path='/' element={<Main />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;