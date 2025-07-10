import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/login';
import Home from './pages/home/Home';
import { AuthProvider } from './contexts/AuthContext/AuthProvider'
import { CartProvider } from './contexts/CartContext/CartProvider';  // ✅ importa aqui
import { ToastContainer } from "react-toastify";
import AuthLayout from './layouts/AuthLayout';
import DefaultLayout from './layouts/DefaultLayout';
import Cadastro from './pages/Cadastro/Cadastro';
import Produtos from './pages/produtos/Produtos';
import Categorias from './pages/categorias/Categorias';
import ProdutoForm from './components/produtos/ProdutoForm';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* ✅ envolve toda a árvore com o provider */}
        <ToastContainer />
        <BrowserRouter>
          <div className='grid h-screen grid-rows-[auto_1fr_auto]'> {/* Grid da página toda */}
            <Routes>
              <Route element={ <AuthLayout /> }>
                <Route path='/login' element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
              </Route>

              <Route element={ <DefaultLayout /> }>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/novoproduto" element={<ProdutoForm />} />
                <Route path="/editarproduto/:id" element={<ProdutoForm />} />
                <Route path="/sobre" element={<About />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;
