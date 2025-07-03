import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layouts'; // 1. Impor komponen Layout Anda
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
        </Route>

        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;