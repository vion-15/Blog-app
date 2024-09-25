import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Dashboard from './pages/dashboard';
import Project from './pages/project';
import SignIN from './pages/signIN';
import SignUp from './pages/signUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivatRoute from './components/PrivatRoute';
import AdminPrivatRoute from './components/AdminPrivatRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivatRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivatRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/project" element={<Project />} />
        <Route path="/sign-IN" element={<SignIN />} />
        <Route path="/sign-Up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
