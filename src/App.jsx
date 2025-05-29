import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import AdminOrders from './Orders';
import ReservationTable from './Reservations';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminMenu from './AdminMenu';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Orders" element={<AdminOrders />} />
        <Route path="/Reservations" element={<ReservationTable />} />
        <Route path="/AdminMenu" element={<AdminMenu />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;