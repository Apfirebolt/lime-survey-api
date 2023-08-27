import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Home";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import SurveyScreen from "./pages/Survey";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/login" element={<LoginScreen />} exact />
        <Route path="/register" element={<RegisterScreen />} exact />
        <Route path="/survey" element={<PrivateRoute />}>
          <Route path="/survey" element={<SurveyScreen />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;