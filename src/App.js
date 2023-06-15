import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import IntroPage from './pages/AuthPages/IntroPage';
import AdminLoginPage from './pages/AuthPages/AdminLoginPage';
import StudentLoginPage from './pages/AuthPages/StudentLoginPage';
import { useEffect } from 'react';
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
import StudentSignupPage from './pages/AuthPages/StudentSignupPage';
import ResendVerificationPage from './pages/AuthPages/ResendVerificationPage';
import ForgotPasswordPage from './pages/AuthPages/ForgotPasswordPage';
import ResetPasswordPage from './pages/AuthPages/ResetPasswordPage';
import axios from 'axios';
import AuthProvider from './context/AuthContext';
import StudentGetProfile from './pages/AppPages/Student/StudentGetProfile';
import AdminGetProfile from './pages/AppPages/Admin/AdminGetProfile';
import AdminSetProfile from './pages/AuthPages/AdminSetProfile';
import StudentGetRoom from './pages/AppPages/Student/StudentGetRoom';
import StudentHostelDetailPage from './pages/AppPages/Student/StudentHostelDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import ChatSystem from './pages/AppPages/ChatSystem';
const apiUrl = "https://vunafind.onrender.com";
function App() {
  const location = useLocation()
  useEffect(()=>{
    async function ping(){
      try {
        const response = await axios.get(`${apiUrl}/ping`)
        console.log(response)
      } catch (error) {

      }
    }
  },[])
  // const [hideBar,setHideBar] = useState(false)


  return (
    <div>
      <AuthProvider>
        {location.pathname === '/' ? null : location.pathname ===
          '/admin/login' ? null : location.pathname ===
          '/student/login' ? null : location.pathname ===
          '/admin/signup' ? null : location.pathname ===
          '/otp-verify' ? null : location.pathname ===
          '/student/set-profile' ? null : location.pathname ===
          '/student/signup' ? null : location.pathname ===
          '/student/add-info' ? null : location.pathname ===
          '/resend-verification' ? null : location.pathname ===
          '/forgot-password' ? null : location.pathname ===
          '/reset-password' ? null : location.pathname ===
          '/admin/set-profile' ? null : (
          <Navbar />
        )}
        {location.pathname === '/' ? null : location.pathname ===
          '/admin/login' ? null : location.pathname ===
          '/student/login' ? null : location.pathname ===
          '/admin/signup' ? null : location.pathname ===
          '/otp-verify' ? null : location.pathname ===
          '/student/set-profile' ? null : location.pathname ===
          '/student/signup' ? null : location.pathname ===
          '/student/add-info' ? null : location.pathname ===
          '/resend-verification' ? null : location.pathname ===
          '/forgot-password' ? null : location.pathname ===
          '/reset-password' ? null : location.pathname ===
          '/admin/set-profile' ? null : (
          <Sidebar />
        )}
        <Routes>
          <Route path='/' element={<IntroPage />} />
          {/* Admin routes */}
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route
            path='/admin/dashboard'
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/dashboard/hostel-details/:id'
            element={
              <ProtectedRoute>
                <AdminHostelDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/dashboard/hostel-details-girl'
            element={
              <ProtectedRoute>
                <AdminGirlHostelDetailPage />
              </ProtectedRoute>
            }
          />

          <Route path='/*' element={<NotFoundPage />} />
          <Route path='/admin/signup' element={
            <ProtectedRoute>
              <AdminSignupPage />
            </ProtectedRoute>
          } />

          <Route path='/admin/getprofile/:id' element={
            <ProtectedRoute>
              <AdminGetProfile />
            </ProtectedRoute>
          } />
          <Route path='/admin/set-profile' element={
            <ProtectedRoute>
            <AdminSetProfile />
            </ProtectedRoute>
          } />
          <Route
            path='/admin/manage-hostel/:id'
            element={
              <ProtectedRoute>
                <AdminManageHostel />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/manage-student'
            element={<AdminManageFemaleStudents />}
          />
          <Route
            path='/admin/manage-male-student'
            element={<AdminManageMaleStudents />}
          />
          <Route
            path='/admin/get-student-profile/:id'
            element={<AdminGetStudentProfile />}
          />
          <Route path='/admin/add-hostel' element={<AdminAddHostelPage />} />
          {/* Auth routes */}
          <Route
            path='/resend-verification'
            element={<ResendVerificationPage />}
          />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/otp-verify' element={<OtpPage />} />

          {/* Student routes */}
          <Route
            path='/student/getprofile/:id'
            element={<StudentGetProfile />}
          />
          <Route
            path='/student/dashboard/hostel-details/:id'
            element={<StudentHostelDetailPage />}
          />

          <Route path='/student/login' element={<StudentLoginPage />} />
          <Route path='/student/dashboard' element={<StudentDashboardPage />} />
          <Route path='/student/signup' element={<StudentSignupPage />} />

          <Route
            path='/student/set-profile'
            element={<StudentDataInputPage />}
          />
          <Route path='/student/add-info' element={<StudentDataAddPage />} />
          <Route path='/student/get-room' element={<StudentGetRoom />} />
          <Route path='/chat-system' element={<ChatSystem />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;
