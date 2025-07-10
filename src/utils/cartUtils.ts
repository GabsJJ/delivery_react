import type { CartItem } from "@/models/CartItem";

export function addOrUpdateItem(
  items: CartItem[],
  product: CartItem
): CartItem[] {
  const existingItem = items.find((item) => item.id === product.id);

  if (existingItem) {
    return items.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + product.quantity }
        : item
    );
  }

  return [...items, product];
}

export function removeCartItem(items: CartItem[], id: number): CartItem[] {
  return items.filter((item) => item.id !== id);
}

export function updateQuantity(
  items: CartItem[],
  id: number,
  quantity: number
): CartItem[] {
  return items.map((item) => (item.id === id ? { ...item, quantity } : item));
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
