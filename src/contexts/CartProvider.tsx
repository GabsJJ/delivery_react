import { useState } from "react";
import { CartContext } from "./CartContext";
import { addOrUpdateItem } from "@/utils/cartUtils";
import type { CartItem } from "@/models/CartItem";

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCartItems((prev) => addOrUpdateItem(prev, product));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
