// src/App.tsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { CartProvider } from './contexts/CartProvider';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Container para as notificações aparecerem na tela */}
        <ToastContainer />
        <Navbar />
        <div className="min-h-[80vh] px-4">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Adicionei uma rota para a raiz */}
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;