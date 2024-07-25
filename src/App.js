import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import PublicRoutes from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Logout from "./pages/Auth/Logout";
import Notifications from "./pages/Home/Notification";
import PublicProfile from "./pages/Profile/PublicProfile";
import ApplyMentor from "./pages/Mentor/ApplyMentor";
import Schedule from "./pages/Schedule/Schedule";
import Users from "./pages/Admin/Users";
import Mentors from "./pages/Admin/Mentors";
import Events from "./pages/Admin/Events";
import RequestedAppointment from "./pages/Mentor/RequestedAppointment";
import Appointment from "./pages/Mentor/Appointment";
import EditProfile from "./pages/Profile/EditProfile";
import ApplyAppointment from "./pages/Appointment/ApplyAppointment";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div class="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Users Route */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoutes>
                <Logout />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoutes>
                <Notifications />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoutes>
                <PublicProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/book-appointment/:mentorId"
            element={
              <ProtectedRoutes>
                <ApplyAppointment />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/edit-profile/:userId"
            element={
              <ProtectedRoutes>
                <EditProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/apply-mentor"
            element={
              <ProtectedRoutes>
                <ApplyMentor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoutes>
                <Schedule />
              </ProtectedRoutes>
            }
          />
          {/*Admin Route*/}
          <Route
            path="/admin/all-users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/all-mentors"
            element={
              <ProtectedRoutes>
                <Mentors />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoutes>
                <Events />
              </ProtectedRoutes>
            }
          />
          {/*Mentor Route*/}
          <Route
            path="/mentor/appointments"
            element={
              <ProtectedRoutes>
                <Appointment />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/mentor/requested-appointments"
            element={
              <ProtectedRoutes>
                <RequestedAppointment />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
