import type { CartItem } from "@/models/CartItem";
import { createContext } from "react";

export interface ICartContext {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  cartItemCount: number;
}

export const CartContext = createContext<ICartContext>(null!);
