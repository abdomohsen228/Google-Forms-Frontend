import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import MainBody from './components/mainBody/MainBody';
import Template from './components/mainBody/Template';
import FormHeader from './components/formHeader/FormHeader';
import FormTabs from './components/FormTabs';
import QuestionForm from './components/questionsForm/QuestionForm';
import SuccessPage from './components/questionsForm/SuccessPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/form/:id" element={
            <ProtectedRoute>
              <div>
                <FormHeader />
                <FormTabs />
                <QuestionForm />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/success" element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={
            <ProtectedRoute>
              <>
                <Header onLogout={handleLogout} />
                <Template />
                <MainBody />
              </>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;