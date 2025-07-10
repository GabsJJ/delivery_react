import { createContext } from "react";
import type UsuarioLogin from "../../models/UsuarioLogin";

interface AuthContextProps {
	usuario: UsuarioLogin
	handleLogout(): void
	handleLogin(usuario: UsuarioLogin): Promise<void>
	isLoading: boolean
}

const AuthContext = createContext({} as AuthContextProps);

export default AuthContext