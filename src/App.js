import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

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

// Layout component for public pages
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
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
                  <div className="pt-32 pb-16">
                    <h1 className="text-3xl text-center">Articles Page</h1>
                    <p className="text-center">(To be implemented)</p>
                  </div>
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
  );
}

export default App;
