import { useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login as loginApi } from "@/service/Service";
import { ToastAlerta } from "@/utils/ToastAlerta";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogin(usuarioLogin: UsuarioLogin): Promise<void>;
  handleLogout(): void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    telefone: "",
    dataNascimento: new Date(),
    tipo: 0,
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      const resposta = await loginApi("/usuarios/logar", usuarioLogin);

      if (resposta.token?.trim()) {
        setUsuario(resposta);
        ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
      } else {
        ToastAlerta("Token não recebido! Verifique a API.", "erro");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        switch (status) {
          case 400:
            ToastAlerta(
              "Requisição malformada. Verifique os dados enviados.",
              "erro"
            );
            break;
          case 401:
            ToastAlerta("Usuário ou senha incorretos.", "erro");
            break;
          case 403:
            ToastAlerta("Acesso proibido. Você não tem permissão.", "erro");
            break;
          case 404:
            ToastAlerta(
              "Endpoint não encontrado. Verifique a URL da API.",
              "erro"
            );
            break;
          case 500:
            ToastAlerta(
              "Erro interno no servidor. Tente novamente mais tarde.",
              "erro"
            );
            break;
          default:
            ToastAlerta(
              `Erro inesperado (${status}). Tente novamente.`,
              "erro"
            );
        }

        console.warn(`Erro ${status} -`, error.response.data);
      } else {
        console.error("Erro desconhecido ao autenticar:", error);
        ToastAlerta(
          "Erro inesperado. Verifique sua conexão ou tente mais tarde.",
          "erro"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      telefone: "",
      dataNascimento: new Date(),
      tipo: 0,
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
