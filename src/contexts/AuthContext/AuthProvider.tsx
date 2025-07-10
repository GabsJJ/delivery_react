import { useState, type ReactNode } from "react"
import AuthContext from "./AuthContext"
import type UsuarioLogin from "../../models/UsuarioLogin"
import { login } from "../../services/Service"

interface AuthProviderProps {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [usuario, setUsuario] = useState<UsuarioLogin>({
		id: 0,
		nome: '',
		usuario: '',
		senha: '',
		foto: '',
		token: '',
	})

	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleLogin(usuarioLogin: UsuarioLogin) {
		setIsLoading(true)

		try {
			await login('/usuarios/logar', usuarioLogin, setUsuario)
			alert('O Usuário foi autenticado com sucesso!')
		} catch (error) {
			alert('Erro ao realizar o login.')
			console.error(error)
		} finally {
            setIsLoading(false)
        }
	}

	function handleLogout() {
		setUsuario({
			id: 0,
			nome: '',
			usuario: '',
			senha: '',
			foto: '',
			token: '',
		})
	}

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}