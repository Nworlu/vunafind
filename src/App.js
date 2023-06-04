import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import IntroPage from './pages/AuthPages/IntroPage';
import AdminLoginPage from './pages/AuthPages/AdminLoginPage';
import StudentLoginPage from './pages/AuthPages/StudentLoginPage';
import { useState } from 'react';
import Navbar from './components/Navbar';
import AdminDashboardPage from './pages/AppPages/Admin/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import Sidebar from './components/Sidebar';
import AdminHostelDetailPage from './pages/AppPages/Admin/AdminHostelDetailPage';
import StudentDashboardPage from './pages/AppPages/Student/StudentDashboardPage';
import AdminSignupPage from './pages/AuthPages/AdminSigupPage';
import OtpPage from './pages/AuthPages/OtpPage';
import StudentDataInputPage from './pages/AuthPages/StudentDataInputPage';
import StudentDataAddPage from './pages/AuthPages/StudentDataAddPage';
import AdminManageHostel from './pages/AppPages/Admin/AdminManageHostel';
import AdminManageFemaleStudents from './pages/AppPages/Admin/AdminManageFemaleStudents';
import AdminManageMaleStudents from './pages/AppPages/Admin/AdminManageMaleStudents';
import AdminGetStudentProfile from './pages/AppPages/Admin/AdminGetStudentProfile';
import AdminAddHostelPage from './pages/AppPages/Admin/AdminAddHostelPage';
import AdminGirlHostelDetailPage from './pages/AppPages/Admin/AdminGirlHostelDetailPage';

function App() {
  const location = useLocation()
  // const [hideBar,setHideBar] = useState(false)


  return (
    <div>
      {location.pathname === '/' ? null : location.pathname === '/admin/login' ? null : location.pathname === '/student/login' ? null : location.pathname === '/admin/signup' ? null : location.pathname === '/otp-verify' ? null :location.pathname === '/student/set-profile' ? null:location.pathname === '/student/add-info' ? null:<Navbar/>}
      {location.pathname === '/' ? null : location.pathname === '/admin/login' ? null : location.pathname === '/student/login' ? null : location.pathname === '/admin/signup' ? null : location.pathname === '/otp-verify' ? null : location.pathname === '/student/set-profile' ? null: location.pathname === '/student/add-info' ? null:<Sidebar/>}
      <Routes>
        <Route path='/' element={<IntroPage />} />
        <Route path='/admin/login' element={<AdminLoginPage />} />
        <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
        <Route path='/admin/dashboard/hostel-details' element={<AdminHostelDetailPage />} />
        <Route path='/admin/dashboard/hostel-details-girl' element={<AdminGirlHostelDetailPage />} />
        <Route path='/student/login' element={<StudentLoginPage />} />
        <Route path='/student/dashboard' element={<StudentDashboardPage />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/admin/signup' element={<AdminSignupPage />} />
        <Route path='/otp-verify' element={<OtpPage />} />
        <Route path='/student/set-profile' element={<StudentDataInputPage />} />
        <Route path='/student/add-info' element={<StudentDataAddPage />} />
        <Route path='/admin/manage-hostel/:id' element={<AdminManageHostel />} />
        <Route path='/admin/manage-student' element={<AdminManageFemaleStudents />} />
        <Route path='/admin/manage-male-student' element={<AdminManageMaleStudents />} />
        <Route path='/admin/get-student-profile/:id' element={<AdminGetStudentProfile />} />
        <Route path='/admin/add-hostel' element={<AdminAddHostelPage />} />
      </Routes>
    </div>
  );
}

export default App;
