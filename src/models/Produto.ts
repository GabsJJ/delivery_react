import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
  categoria: Categoria;
  usuario: Usuario;
  calorias: number;
  energia: number;
  acucares: number;
  gordurasSaturadas: number;
  sodio: number;
  proteinas: number;
  fibras: number;
  frutas: number;
  nutriscore: number;
}
