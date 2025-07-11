import { useContext } from "react";
import CartContext from "./CartContext";

// 6. Cria o hook customizado para usar o contexto.
//    Nenhuma mudança grande aqui, o TypeScript já infere o tipo de retorno
//    a partir do 'CartContext' que criamos.
export function useCart() {
    return useContext(CartContext);
}