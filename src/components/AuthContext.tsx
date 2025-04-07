import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { loginUser, registerUser } from '@/services';

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  mobile?: string;
  exp?: number; // Expiry time of the token
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, mobile: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log("deoc", user )

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          // Token has expired
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          setUser(null);
          toast.error('Session expired. Please log in again.');
        }
      } catch (error) {
        console.error('Token decoding error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      if (res?.success) {
        const user = res?.user?.user;
        const isAdmin = user?.role?.toLowerCase() === 'admin';
        const userData = {
          id: user?._id,
          name: user?.name,
          email: user?.email,
          isAdmin: isAdmin,
          mobile: user?.phone,
          token: res?.user?.token
        };
        const token = res?.user?.token;
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', isAdmin.toString());
        toast.success('Logged in successfully!');
        navigate(isAdmin ? '/admin' : '/dashboard');
      }
      else {
        // If API response was not successful
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    toast.info('Logged out successfully');
    navigate('/');
  };

  const register = async (name: string, email: string, mobile: string, password: string) => {
    setLoading(true);
    try {
      const res = await registerUser({ name, email, mobile, password });
      if (res?.success && res?.user?.newUser) { // Ensure res.user.newUser exists
        const user = res.user.newUser;
        const isAdmin = user?.role?.toLowerCase() === 'admin';
        const userData = {
          id: user?._id,
          name: user?.name,
          email: user?.email,
          isAdmin: isAdmin,
          mobile: user?.phone,
          token: res?.user?.token,
        };
        setUser(userData);
        localStorage.setItem('token', res?.user?.token);
        localStorage.setItem('isAdmin', isAdmin?.toString());
        toast.success('Registration is successfully done!');
        navigate(isAdmin ? '/admin' : '/dashboard');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Password reset link sent to your email!');
      navigate('/login');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      forgotPassword,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
