import axios from "axios";
import type Usuario from "@/models/Usuario"; // Se este 'Usuario' for diferente de

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const cadastrarUsuario = async (
  url: string,
  dados: object,
  setDados: (usuario: Usuario) => void
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (
  url: string,
  dados: object,
  setDados: (usuario: Usuario) => void
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async <T = unknown>(
  url: string,
  setDados: (data: T) => void,
  header: object
) => {
  const resposta = await api.get<T>(url, header);
  setDados(resposta.data);
};

export const cadastrar = async <T = unknown>(
  url: string,
  dados: object,
  setDados: (data: T) => void,
  header: object
) => {
  const resposta = await api.post<T>(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: object,
  setDados: Function,
  header: object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: object) => {
  await api.delete(url, header);
};
