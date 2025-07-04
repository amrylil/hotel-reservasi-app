import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layouts'; // 1. Impor komponen Layout Anda
import Home from './pages/Home';
import Login from './pages/Login';
import RoomDetail from './pages/RoomDetail';
import RoomList from './pages/RoomList';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import ReservationHistory from './pages/ReservationHistory';
import ReservationDetail from './pages/ReservasiDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-reservations" element={<ReservationHistory />} />
          <Route path="/reservations/:id" element={<ReservationDetail />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
