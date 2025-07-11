import axios from "axios";
import type Usuario from "@/models/Usuario"; // Se este 'Usuario' for diferente de

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
  localStorage.setItem("token", resposta.data.token);
};

export const buscar = async <T = unknown>(
  url: string,
  setDados: (data: T) => void
) => {
  const resposta = await api.get<T>(url);
  setDados(resposta.data);
};

export const cadastrar = async <T = unknown>(
  url: string,
  dados: object,
  setDados: (data: T) => void
) => {
  const resposta = await api.post<T>(url, dados);
  setDados(resposta.data);
};

export const atualizar = async <T = unknown> (
  url: string,
  dados: object,
  setDados: (data: T) => void
) => {
  const resposta = await api.put<T>(url, dados);
  setDados(resposta.data);
};

export const deletar = async (url: string) => {
  await api.delete(url);
};
