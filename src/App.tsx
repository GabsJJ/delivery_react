import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Home from './pages/Home';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext/AuthProvider'
import { CartProvider } from './contexts/CartContext/CartProvider';  // ✅ importa aqui

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* ✅ envolve toda a árvore com o provider */}
        <BrowserRouter>
          <div className='grid h-screen grid-rows-[auto_1fr_auto]'> {/* Grid da página toda */}
            <Navbar />
            <div className='flex w-full justify-center p-3 text-base bg-amber-100'>Navbar</div>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
            <div className='flex w-full justify-center text-base p-6 bg-amber-100'>Footer</div>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;
