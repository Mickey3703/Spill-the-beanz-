import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import AdminOrders from './Orders';
import AdminReservation from './Reservations';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminMenu from './AdminMenu';

function App () {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Orders" element={<AdminOrders />} />
        <Route path="/Reservations" element={<AdminReservation />} />
        <Route path="/AdminMenu" element={<AdminMenu />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;