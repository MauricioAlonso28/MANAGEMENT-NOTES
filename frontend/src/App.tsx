import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/not-found/NotFoundPage'
import MainPage from './pages/main/MainPage'
import AddNote from './pages/form/AddNote'
import EditNote from './pages/form/EditNote'
import AllNotesPage from './pages/main/AllNotesPage'
import PrivateRoute from './components/routes/PrivateRoute'
import LoginPage from './pages/auth/LoginPage'
import { useEffect, useState } from 'react'
import { verifyAuth } from './services/users.services'
import { AuthProvider, useAuth } from './AuthContext'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await verifyAuth();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<AuthGuard />}/>

          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoute />}>
            <Route path="form" element={<AddNote/>} />
            <Route path="allNotes" element={<AllNotesPage/>} />
            <Route path="edit/:id" element={<EditNote/>} />
          </Route>

          {/* PAGE NOT FOUND */}
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

const AuthGuard = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <MainPage /> : <LoginPage />;
};

export default App
