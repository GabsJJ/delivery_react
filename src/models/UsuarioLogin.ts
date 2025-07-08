export default interface UsuarioLogin {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  telefone: string;
  dataNascimento: Date;
  tipo: number;
  token: string;
}