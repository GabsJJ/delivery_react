import './App.css'
import ListaCategoria from './components/listacategoria/ListaCategoria'
import Categorias from './pages/categorias/Categorias'

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Cadastro from "./pages/cadastro/Cadastro";
import { CartProvider } from "./contexts/CartProvider";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/login";
import { AuthProvider } from "./contexts/AuthProvider";
function AppLayout() {
  const location = useLocation();

  const rotasSemLayout = ["/cadastro", "/login"];

  const exibirLayoutPadrao = !rotasSemLayout.includes(location.pathname);

  return (
    <>
      {exibirLayoutPadrao && <Navbar />}

      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      {exibirLayoutPadrao && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer />
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
