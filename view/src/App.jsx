import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RoomDetail from './pages/RoomDetail';
import RoomList from './pages/RoomList';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import ReservationHistory from './pages/ReservationHistory';
import ReservationDetail from './pages/ReservasiDetail';
import Layout from './layouts/Layouts';
import Rooms from './pages/admin/Rooms';
import AdminLayout from './layouts/AdminLayout';
import SearchResults from './pages/SearchResults';

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
          <Route path="/search-results" element={<SearchResults />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Rooms />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
