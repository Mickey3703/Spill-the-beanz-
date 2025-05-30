import { Routes, Route } from 'react-router-dom';
import Header from "./components/header.jsx";
import Hotbev from './pages/Hotbev';
import Coldbev from './pages/Coldbev';
import Ourteas from './pages/Ourteas';
import Muffins from './pages/Muffins';
import Cookies from './pages/Cookies';
import Order from './pages/order';
import Menu from './pages/Menu';
import Booking from './pages/booking';
import About from './pages/about';
import Contact from './pages/contact';
import Cakes from './pages/Cakes';


function App({ menuCard, menuCard2, menuCard3, menuCard4, menuCard5,menuCard6}) {
  return (
    <>
      <div className ="headernav">
      <Header />
      </div>
      <Routes>
        <Route path="/hotbev" element={<Hotbev menuCard={menuCard} />} />
        <Route path="/coldbev" element={<Coldbev menuCard2={menuCard2} />} />
        <Route path="/ourteas" element={<Ourteas menuCard3={menuCard3} />} />
        <Route path="/muffins" element={<Muffins menuCard4={menuCard4} />} />
        <Route path="/cookies" element={<Cookies menuCard5={menuCard5} />} />
        <Route path="/cakes" element={<Cakes menuCard6={menuCard6} />} />
        <Route path="/order" element={<Order/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </>
  );
}

export default App;
