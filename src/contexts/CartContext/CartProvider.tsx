import { useState, type ReactNode } from "react";
import CartContext, { type CartItem } from "./CartContext";

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