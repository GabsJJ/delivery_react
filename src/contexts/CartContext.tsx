// src/contexts/CartContext.tsx

import { createContext, useContext, useState, type ReactNode } from "react";

// 1. (TS) Defina uma interface para os itens do carrinho.
//    Você pode personalizar isso depois com os dados reais do seu produto.
interface CartItem {
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

// 4. (TS) Define a tipagem para as props do nosso Provider.
//    Ele receberá 'children', que são os componentes filhos.
type CartProviderProps = {
    children: ReactNode;
}

// 5. Cria o Provedor do Contexto
export function CartProvider({ children }: CartProviderProps) {
    // (TS) Tipamos o estado para ser um array de 'CartItem'.
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // (TS) Tipamos o parâmetro 'product' da função.
    const addToCart = (product: CartItem) => {
        // No futuro, você pode adicionar lógicas mais complexas aqui,
        // como verificar se o item já existe e apenas aumentar a quantidade.
        setCartItems(prevItems => [...prevItems, product]);
    };

    // A lógica de contagem permanece a mesma.
    const cartItemCount = cartItems.length;

    return (
        <CartContext.Provider value={{ cartItems, addToCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
}

// 6. Cria o hook customizado para usar o contexto.
//    Nenhuma mudança grande aqui, o TypeScript já infere o tipo de retorno
//    a partir do 'CartContext' que criamos.
export function useCart() {
    return useContext(CartContext);
}