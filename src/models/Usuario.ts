import type Produto from "./Produto";

export default interface Usuario {
  id?: number;
  nome: string;
  usuario: string;
  senha: string;
  foto?: string;
  telefone?: string;
  dataNascimento: Date;
  tipo?: number;
  produtos?: Produto[] | null;
}