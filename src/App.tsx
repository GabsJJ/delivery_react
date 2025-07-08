import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { CartProvider } from './contexts/CartContext'; // ✅ importa aqui

function App() {
  return (
    <CartProvider> {/* ✅ envolve toda a árvore com o provider */}
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
