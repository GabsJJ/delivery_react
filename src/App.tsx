import "./App.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/login";
import Produtos from "./pages/produtos/Produtos";
import Categorias from "./pages/categorias/Categorias";
import ProdutoForm from "./components/produtos/ProdutoForm";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCartegoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import { CartProvider } from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import Cadastro from "./pages/Cadastro/Cadastro";
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
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/editarcategorias/:id" element={<FormCategoria />} />
          <Route path="/deletarcategorias/:id" element={<DeletarCategoria />} />
          <Route path="/novacategoria" element={<FormCategoria />} />
          <Route path="/editarproduto/:id" element={<ProdutoForm />} />
          <Route path="/novoproduto" element={<ProdutoForm />} />
          <Route path="/produtos" element={<Produtos />} />
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
