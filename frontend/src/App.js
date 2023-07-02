import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from './screens/mainPage/mainpage';
import LoginPage from './screens/landingPage/login';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} exact/>
        <Route path='/mainpage' element={<Mainpage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
