import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CompanyForm from './components/CompanyForm.js';
import TechnologyForm from './components/TechnologyForm';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import PublicDashboard from './components/PublicDashboard.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CompanyList from './components/CompanyList.js';
import TechnologyList from './components/TechnologyList.js';
import JobOffersDashboard from './components/JobOffersDashboard.js';
import JobOfferInformationPage from './components/JobOfferInformationPage.js';
import CompanyInformationPage from './components/CompanyInformationPage.js';
import AddJobOffer from './components/AddJobOffer.js';
import EditJobOffer from './components/EditJobOffer.js';

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
          <Route path="/job-offers" element={<JobOffersDashboard />} />
          <Route path="/job-offers/:id" element={<JobOfferInformationPage />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:id" element={<CompanyInformationPage />} />
          <Route path="/technologies" element={<TechnologyList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="/admin/add-technology" element={<TechnologyForm />} />
            <Route path="/admin/add-offer" element={<AddJobOffer/>} />
            <Route path="/admin/edit-offer/:id" element={<EditJobOffer/>} />
            <Route path="/admin/add-company" element={<CompanyForm />} />
          </Route>
          <Route path="/user" element={<UserDashboard />}>
            <Route path="/user/add-offer" element={<AddJobOffer/>} />
            <Route path="/user/edit-offer/:id" element={<EditJobOffer/>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
