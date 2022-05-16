import "./App.css";
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import {ProtectedRoute} from "../src/Routes/ProtectedRoute"
import { NavBar } from "./components";
import { LeftAsideBar } from "../src/components";
import {HomePage, LandingPage, ErrorPage, LoginPage, LogoutPage, SignupPage, SinglePostPage} from "../src/pages"


function MockAPI() {
  return (
    <div className="MockAPI">
      <Mockman />
    </div>
  );
}

function App() {
  return (
    <div className="App relative">
      <NavBar/>
      <Routes>
        <Route path="/mockman" element={<MockAPI />} />
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/loginpage" element={<LoginPage/>}/>
        <Route path="/logoutpage" element={<LogoutPage/>}/>
        <Route path="/signuppage" element={<SignupPage/>}/>
        <Route path="/homepage" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path="/singlepostpage/:username/:postID" element={<ProtectedRoute><SinglePostPage/></ProtectedRoute>}/>
        <Route path="*" element={<ErrorPage/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
