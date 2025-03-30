import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { NotFound } from "./pages/NotFound";
import Landing from "./pages/Landing";
import AuthGuard from "./components/auth/Auth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<AuthGuard />}>
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
