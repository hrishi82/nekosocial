import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Mockman from "mockman-js";
import { ProtectedRoute } from "../src/Routes/ProtectedRoute";
import { NavBar, NavAside } from "./components";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  HomePage,
  LandingPage,
  ErrorPage,
  LoginPage,
  LogoutPage,
  SignupPage,
  SinglePostPage,
  BookmarksPage,
  ProfilePage,
  ExplorePage,
  NotificationsPage,
} from "../src/pages";
import { useEffect } from "react";
import { getAllPosts } from "./store/postSlice";
import { getAllUsers } from "./store/userSlice";

function MockAPI() {
  return (
    <div className="MockAPI">
      <Mockman />
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    if (token) {
      dispatch(getAllPosts());
      dispatch(getAllUsers());
    }
  }, [token, navigate, dispatch]);

  return (
    <div className="App relative">
      <NavBar />
      <NavAside/>
      <Routes>
        <Route path="/mockman" element={<MockAPI />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/logoutpage" element={<LogoutPage />} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarkspage"
          element={
            <ProtectedRoute>
              <BookmarksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explorepage"
          element={
            <ProtectedRoute>
              <ExplorePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notificationpage"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profilepage/:username"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/singlepostpage/:username/:postID"
          element={
            <ProtectedRoute>
              <SinglePostPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
