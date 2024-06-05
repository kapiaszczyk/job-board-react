import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import JobList from './components/JobList';
import JobOfferForm from './components/JobOfferForm';
import CompanyForm from './components/CompanyForm.js';
import TechnologyForm from './components/TechnologyForm';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import PublicDashboard from './components/PublicDashboard.js';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import JobOfferInformation from './components/JobOfferInformation.js';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<PublicDashboard />} />
          <Route path="/job-offers/:id" element={<JobOfferInformation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/private" element={<PrivateRoute />}>
            <Route path="/private/jobs" element={<JobList />} />
            <Route path="/private/add-job" element={<JobOfferForm />} />
            <Route path="/private/edit-job/:id" element={<JobOfferForm />} />
            <Route path="/private/add-company" element={<CompanyForm />} />
            <Route path="/private/edit-company/:id" element={<CompanyForm />} />
            <Route path="/private/add-technology" element={<TechnologyForm />} />
            <Route path="/private/admin" element={<AdminDashboard />} />
            <Route path="/private/user" element={<UserDashboard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
