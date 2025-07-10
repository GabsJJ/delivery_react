import { Link } from "react-router-dom";
import { FaShoppingBag, FaAngleDown, FaSignInAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import logo from "../../assets/logo_navbar2.svg";
import { useCart } from "@/contexts/CartContext/useCart";

export default function Navbar() {
  const { cartItemCount } = useCart();

  return (
    <nav className="w-full bg-gray-300 border-b border-gray-400 h-27 px-50 flex items-center">
      <div className="w-full flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="GetFood Logo" className="h-42 w-auto" />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8 text-xl font-medium">
          <Link
            to="/sobre"
            className="relative text-[#e54300] hover:opacity-90 transition"
          >
            Por que GetFood?
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-1 h-1 bg-[#e54300] rounded-full" />
          </Link>

          <Link
            to="/produtos"
            className="flex items-center gap-1 hover:text-[#e54300] transition"
          >
            Cardápio <FaAngleDown className="text-xs" />
          </Link>

          <Link to="/categorias" className="hover:text-[#e54300] transition">
            Categorias
          </Link>

          <Link to="/sobre" className="hover:text-[#e54300] transition">
            Contato
          </Link>
        </div>

        {/* Ações à direita */}
        <div className="flex items-center gap-6 text-[#333] text-lg">
          {/* Pesquisa */}
          <button className="hover:text-[#e54300] transition">
            <FiSearch />
          </button>

          {/* Carrinho com badge */}
          <div className="relative">
            <FaShoppingBag className="text-xl hover:text-[#e54300] transition" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#e54300] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>

          {/* Botão de login */}
          <Link
            to="/login"
            className="bg-[#e54300] hover:bg-[#c93c00] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition"
          >
            <FaSignInAlt /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
