"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useEffectEvent,
} from "react";
import { CartItem, cartItemSchema } from "@/lib/validation";

type CartError = {
  type: "load_error";
  message: string;
} | null;

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  totalItems: number;
  subtotal: number;
  error: CartError;
  clearError: () => void;
  isLoaded: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "oni-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<CartError>(null);

  const handleParseLocalStorage = useEffectEvent((items: CartItem[]) => {
    setItems(items);
  });

  const handleLoad = useEffectEvent(() => setIsLoaded(true));

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validate with Zod
        const result = cartItemSchema.array().safeParse(parsed);
        if (result.success) {
          handleParseLocalStorage(result.data);
        } else {
          console.error("Cart validation failed:", result.error);
          localStorage.removeItem(CART_STORAGE_KEY);
          setError({ type: "load_error", message: "Error retrieving your cart items. Please add them again." });
        }
      } catch {
        console.error("Failed to parse cart from localStorage");
        localStorage.removeItem(CART_STORAGE_KEY);
        setError({ type: "load_error", message: "Error retrieving your cart items. Please add them again." });
      }
    }
    handleLoad();
  }, []);

  const clearError = () => setError(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const generateItemId = (
    product: { id: string },
    size: string,
  ) => {
    return `${product.id}-${size}`;
  };

  
  const addItem = (newItem: Omit<CartItem, "id">) => {
    const id = generateItemId(newItem.product, newItem.size);

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }

      return [...currentItems, { ...newItem, id }];
    });
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isOpen,
    setIsOpen,
    totalItems,
    subtotal,
    error,
    clearError,
    isLoaded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
