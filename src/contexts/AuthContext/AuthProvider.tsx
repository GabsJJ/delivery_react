import { useEffect, useMemo, useState, type ReactNode } from "react"
import AuthContext from "./AuthContext"
import type UsuarioLogin from "@/models/UsuarioLogin"
import { api, login } from "@/services/Service"
import { ToastAlerta } from "@/utils/ToastAlerta"
import { ClipLoader } from "react-spinners"

interface AuthProviderProps {
	children: ReactNode
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
	const [usuario, setUsuario] = useState<UsuarioLogin>({
		id: 0,
		nome: '',
		usuario: '',
		senha: '',
		foto: '',
		token: '',
	})
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const atualizarToken = (tokenNovo: string) => {
		if (tokenNovo) {
			localStorage.setItem("token", tokenNovo);
		} else {
			localStorage.removeItem("token");
			delete api.defaults.headers.common["Authorization"];
		}
		setUsuario({ ...usuario, token: tokenNovo });
	}

	useEffect(() => {
		const tokenSalvo = localStorage.getItem('token')
		if(tokenSalvo)
			atualizarToken(tokenSalvo)
		setIsLoading(false)
	}, []);

	async function handleLogin(usuarioLogin: UsuarioLogin) {
		setIsLoading(true)
		try {
			await login('/usuarios/logar', usuarioLogin, setUsuario)
			ToastAlerta('O Usuário foi autenticado com sucesso!', "sucesso")
		} catch (error) {
			ToastAlerta('Erro ao realizar o login.', "erro")
			console.error(error)
		} finally {
            setIsLoading(false)
        }
	}

	function handleLogout() {
		localStorage.removeItem('token')
		setUsuario({
			id: 0,
			nome: '',
			usuario: '',
			senha: '',
			foto: '',
			token: '',
		})
	}

	const contextValue = useMemo(() => ({
        usuario,
		handleLogout,
		handleLogin,
		isLoading,
    }), [isLoading, usuario]);


	if(isLoading)
		return <div className="flex justify-center items-center w-screen h-screen">
			<ClipLoader size={100} color="#e54300"/>
		</div>

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}