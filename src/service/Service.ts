// src/services/service.ts
import axios, { type AxiosResponse } from "axios";

// A URL base da sua API no Render
const api = axios.create({
  baseURL: "https://delivery-spring.onrender.com"
});

// --- INTERCEPTOR DE REQUISIÇÃO ---
// Isso será executado ANTES de CADA requisição
api.interceptors.request.use(
  (config) => {
    // Pegamos o token do localStorage (ou de onde você o salvar após o login)
    // Assumindo que você salva o token assim: localStorage.setItem('token', resposta.data.token);
    const token = localStorage.getItem('token');
    
    if (token) {
      // Se o token existir, adicionamos ao header de autorização
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  }
);


// Suas funções de serviço agora ficam MAIS SIMPLES, sem precisar do parâmetro 'header'

// ✅ GET: Buscar dados (ex: /produtos, /categorias)
export const buscar = async (url: string, setDados: Function): Promise<void> => {
  const resposta: AxiosResponse = await api.get(url);
  setDados(resposta.data);
};

// ✅ POST: Criar novo recurso (produto, categoria, etc.)
export const cadastrar = async (url:string, dados: object, setDados: Function): Promise<void> => {
  const resposta: AxiosResponse = await api.post(url, dados);
  setDados(resposta.data);
};

// ✅ PUT: Atualizar recurso existente
export const atualizar = async (url: string, dados: object, setDados: Function): Promise<void> => {
  const resposta: AxiosResponse = await api.put(url, dados);
  setDados(resposta.data);
};

// ✅ DELETE: Excluir recurso por ID
export const deletar = async (url: string): Promise<void> => {
  await api.delete(url);
};

// As funções de cadastrarUsuario e login podem permanecer as mesmas, pois
// elas geralmente não precisam de um token de autorização.
export const cadastrarUsuario = async (url: string, dados: object, setDados: Function): Promise<void> => {
    const resposta: AxiosResponse = await api.post(url, dados);
    setDados(resposta.data);
};
  
export const login = async (url: string, dados: object, setDados: Function): Promise<void> => {
    const resposta: AxiosResponse = await api.post(url, dados);
    setDados(resposta.data);
};