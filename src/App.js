import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import 'react-toastify/dist/ReactToastify.css';
import UpdateBill from './components/UpdateBill';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/update/:id' element={<UpdateBill />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
