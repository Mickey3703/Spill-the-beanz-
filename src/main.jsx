import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { menuCard, menuCard2, menuCard3, menuCard4, menuCard5,menuCard6} from './components/menuArray.jsx';
import App from './App.jsx';
import './css/index.css';
import './css/navbar.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App 
        menuCard={menuCard} 
        menuCard2={menuCard2} 
        menuCard3={menuCard3} 
        menuCard4={menuCard4}
        menuCard5={menuCard5}
        menuCard6={menuCard6} 
      />
    </BrowserRouter>
  </StrictMode>
);
