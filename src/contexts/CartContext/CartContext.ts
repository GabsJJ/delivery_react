import { createContext } from "react";

// 1. (TS) Defina uma interface para os itens do carrinho.
//    Você pode personalizar isso depois com os dados reais do seu produto.
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// 2. (TS) Defina uma interface para o valor do contexto.
//    Isso garante que qualquer componente que usar o contexto saberá quais
//    dados e funções estão disponíveis e quais são seus tipos.
interface ICartContext {
    cartItems: CartItem[];
    addToCart: (product: CartItem) => void;
    cartItemCount: number;
}

// 3. (TS) Cria o Contexto com a tipagem definida.
//    O '!' no final é um "non-null assertion" que diz ao TypeScript:
//    "Confie em mim, este contexto nunca será nulo quando for usado".
const CartContext = createContext<ICartContext>(null!);

export default CartContext