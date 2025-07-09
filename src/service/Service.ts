import type Usuario from "@/models/Usuario";
import axios from "axios";

const api = axios.create({
  baseURL: "https://delivery-spring.onrender.com",
});

export const cadastrarUsuario = async (
  url: string,
  dados: object,
  setDados: (data: Usuario) => void
): Promise<void> => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};
