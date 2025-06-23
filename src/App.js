import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Components
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';

// Admin Components
import DashboardLayout from './components/admin/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import Team from './pages/public/Team';
import ArticlesList from './pages/public/ArticlesList';
import ArticleDetail from './pages/public/ArticleDetail';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Admins from './pages/admin/Admins';
import AboutEntries from './pages/admin/AboutEntries';
import Categories from './pages/admin/Categories';
import AdminServices from './pages/admin/Services';
import Contacts from './pages/admin/Contacts';
import TeamMembers from './pages/admin/TeamMembers';
import Consultations from './pages/admin/Consultations';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import TrustedCompaniesAdmin from './pages/admin/TrustedCompaniesAdmin';
import ArticlesAdmin from './pages/admin/ArticlesAdmin';

// Layout component for public pages
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow text-gray-800 dark:text-gray-100">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/" 
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/about" 
                element={
                  <PublicLayout>
                    <About />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/services" 
                element={
                  <PublicLayout>
                    <Services />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/team" 
                element={
                  <PublicLayout>
                    <Team />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/articles" 
                element={
                  <PublicLayout>
                    <ArticlesList />
                  </PublicLayout>
                } 
              />
              <Route 
                path="/articles/:id" 
                element={
                  <PublicLayout>
                    <ArticleDetail />
                  </PublicLayout>
                } 
              />
              
              <Route 
                path="/contact" 
                element={
                  <PublicLayout>
                    <Contact />
                  </PublicLayout>
                } 
              />
              
              {/* Admin Login Route */}
              <Route 
                path="/admin/login" 
                element={<Login />} 
              />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route 
                  path="dashboard" 
                  element={<Dashboard />} 
                />
                <Route 
                  path="admins" 
                  element={<Admins />} 
                />
                <Route 
                  path="about" 
                  element={<AboutEntries />} 
                />
                <Route 
                  path="categories" 
                  element={<Categories />} 
                />
                <Route 
                  path="services" 
                  element={<AdminServices />} 
                />
                <Route 
                  path="contacts" 
                  element={<Contacts />} 
                />
                <Route 
                  path="team" 
                  element={<TeamMembers />} 
                />
                <Route 
                  path="consultations" 
                  element={<Consultations />} 
                />
                <Route 
                  path="testimonials" 
                  element={<TestimonialsAdmin />} 
                />
                <Route 
                  path="trusted-companies" 
                  element={<TrustedCompaniesAdmin />} 
                />
                <Route 
                  path="articles" 
                  element={<ArticlesAdmin />} 
                />
                {/* Redirect to dashboard if no specific admin route */}
                <Route 
                  path="" 
                  element={<Dashboard />} 
                />
              </Route>
              
              {/* 404 Route */}
              <Route 
                path="*" 
                element={
                  <PublicLayout>
                    <div className="pt-32 pb-16 text-center">
                      <h1 className="text-5xl font-bold mb-4">404</h1>
                      <p className="text-xl mb-8">Page not found</p>
                    </div>
                  </PublicLayout>
                } 
              />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
}

export default App;