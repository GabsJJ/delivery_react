// src/App.tsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { CartProvider } from './contexts/CartContext';
import ProdutoForm from './components/produtos/ProdutoForm';
import Produtos from './pages/Produtos'; // Sua página que listará os cards
import { ToastContainer } from 'react-toastify'; // Importe o container de notificações
import 'react-toastify/dist/ReactToastify.css'; // E o CSS dele

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
            <Route path="/produtos" element={<Produtos />} />
            
            {/* --- ROTAS ADICIONADAS --- */}
            <Route path="/cadastrarProduto" element={<ProdutoForm />} />
            <Route path="/editarProduto/:id" element={<ProdutoForm />} />
            
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;