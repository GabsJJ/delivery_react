import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaSignInAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import logo from "../../assets/logo_navbar2.svg";
import { useCart } from "@/contexts/CartContext/useCart";
import "@/utils/glass.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import { ToastAlerta } from "@/utils/ToastAlerta";

export default function Navbar() {
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [isLogado, setIsLogado] = useState(false);

  useEffect(() => {
    if (usuario.token !== "") {
      setIsLogado(true);
    }
  }, [usuario.token, navigate]);

  const logout = () => {
    try {
      handleLogout();
      ToastAlerta("Logout realizado. Até mais!", "sucesso");
    } catch (error) {
      ToastAlerta("Erro ao fazer o logout", "erro");
      console.log(error);
    }
  };

  return (
    <nav className="w-full bg-gray-300 h-25 px-40 flex items-center justify-between glass">
      <div className="w-full flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="GetFood-Logo" className="h-35 w-auto" />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-5 text-lg font-medium">
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              `relative ${isActive ? "text-laranja-tema" : ""}
              hover:opacity-90 transition
              hover:text-laranja-escuro`
            }
          >
            Por que GetFood?
          </NavLink>

          {isLogado && (
            <>
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  `flex items-center gap-1
                  ${isActive ? "text-laranja-tema" : ""}
                  hover:opacity-90 transition
                  hover:text-laranja-escuro`
                }
              >
                Cardápio
              </NavLink>

              <NavLink
                to="/categorias"
                className={({ isActive }) =>
                  `relative ${isActive ? "text-laranja-tema" : ""}
                  hover:opacity-90 transition
                  hover:text-laranja-escuro`
                }
              >
                Categorias
              </NavLink>
            </>
          )}

          <NavLink
            to="/equipe"
            className={({ isActive }) =>
              `relative ${isActive ? "text-laranja-tema" : ""}
              hover:opacity-90 transition
              hover:text-laranja-escuro`
            }
          >
            Contato
          </NavLink>
        </div>

        {/* Ações à direita */}
        <div className="flex items-center gap-5 justify-end">
          {isLogado && (
            <>
              <button className="text-cinza-texto hover:text-laranja-tema transition text-lg">
                <FiSearch className="cursor-pointer" />
              </button>

              <div className="relative">
                <FaShoppingBag className="text-xl hover:text-laranja-tema transition cursor-pointer" />
                {cartItemCount > 0 && (
                  <span
                    className="
                    absolute -top-2 -right-2 bg-laranja-tema text-white text-lg w-5 h-5 flex items-center justify-center rounded-full
                  "
                  >
                    {cartItemCount}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Botão de login */}
          {!isLogado ? (
            <Link
              to="/login"
              className="bg-laranja-tema hover:bg-laranja-escuro text-white flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium transition"
            >
              <FaSignInAlt /> Login
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={logout}
              className="bg-laranja-tema hover:bg-laranja-escuro text-white flex items-center gap-1 px-4 py-2 rounded-full text-base font-medium transition"
            >
              <FaSignInAlt /> Sair
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
