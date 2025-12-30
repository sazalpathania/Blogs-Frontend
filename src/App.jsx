import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/login.component.jsx";
import Register from "./components/register/register.component.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import { ProtectedRoute } from "./protected.route.jsx";
import ForgetPassword from "./components/forgetpass.component.jsx";
import AddBlog from "./pages/addBlog/add.blog.jsx";
import MainLayout from "./pages/layouts/main.layout.jsx";
import "./App.css";
import MyBlogs from "./pages/myBlog/myBlog.jsx";
import ResetPassword from "./components/resetpass.component.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/main-layout"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="myblogs" element={<MyBlogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
