import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, Register, RecipyHub } from './pages';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <h2 id='title'>Caloric Intake Tracker</h2>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/recipyHub' element={<RecipyHub />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;