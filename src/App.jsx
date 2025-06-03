import { Routes, Route } from 'react-router-dom';
import AuthForm from './AuthenticationForm';
import AdminOrders from './Orders';
import AdminReservations from './Reservations';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminMenu from './AdminMenu';

function App () {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/Orders" element={<AdminOrders />} />
        <Route path="/Reservations" element={<AdminReservations />} />
        <Route path="/AdminMenu" element={<AdminMenu />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;