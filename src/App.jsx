import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OrdersPage from './Orders';
import ReservationTable from './Reservations';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/booking" element={<ReservationTable />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
// add more roots as you go along