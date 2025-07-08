import { createContext } from "react";

interface AuthContextProps {
	usuario: UsuarioLogin
	handleLogout(): void
	handleLogin(usuario: UsuarioLogin): Promise<void>
	isLoading: boolean
}

const AuthContext = createContext({} as AuthContextProps);

export default AuthContext