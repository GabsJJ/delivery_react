import './App.css'

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { CartProvider } from "./contexts/CartProvider";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/login";
import { AuthProvider } from "./contexts/AuthProvider";
import Cadastro from './pages/Cadastro/Cadastro';
import ListaCategoria from './components/listacategoria/ListaCategoria';
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
          <Route path="/categorias" element={<ListaCategoria />} />
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
