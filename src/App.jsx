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
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/booking" element={<ReservationTable />} />
        <Route path="/menu" element={<AdminMenu />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
// add more roots as you go along