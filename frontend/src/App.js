import logo from './logo.svg';
import './App.css';
import Login from './screens/landingPage/login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from './screens/mainPage/mainpage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} exact/>
        <Route path='/mainpage' element={<Mainpage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
