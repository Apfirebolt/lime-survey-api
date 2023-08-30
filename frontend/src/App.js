import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Home";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import SurveyScreen from "./pages/Survey";
import AddSurveyScreen from "./pages/AddSurvey";
import SurveyDetail from "./pages/SurveyDetail";
import SurveyResponse from "./pages/Response";
import TestPage from "./pages/TestPage";
import MyResponses from "./pages/MyResponses";
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
        <Route path="/test" element={<TestPage />} exact />
        <Route path="/survey" element={<PrivateRoute />}>
          <Route path="/survey" element={<SurveyScreen />} />
          <Route path="/survey/add" element={<AddSurveyScreen />} />
          <Route path="/survey/:id" element={<SurveyDetail />} />
        </Route>
        <Route path="/response" element={<PrivateRoute />}>
          <Route path="/response/:id" element={<SurveyResponse />} />
        </Route>
        <Route path="/my-responses" element={<PrivateRoute />}>
          <Route path="/my-responses" element={<MyResponses />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;