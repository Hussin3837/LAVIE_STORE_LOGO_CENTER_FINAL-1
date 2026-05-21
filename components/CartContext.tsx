"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];

  addItem: (
    item: Omit<CartItem, "quantity">
  ) => void;

  removeItem: (id: string) => void;

  increaseQuantity: (
    id: string
  ) => void;

  decreaseQuantity: (
    id: string
  ) => void;

  total: number;

  count: number;

  isCartOpen: boolean;

  openCart: () => void;

  closeCart: () => void;
};

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<
    CartItem[]
  >([]);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "lavie-cart"
      );

    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "lavie-cart",
      JSON.stringify(items)
    );
  }, [items]);

  function addItem(
    item: Omit<CartItem, "quantity">
  ) {
    setItems((current) => {
      const existing = current.find(
        (x) => x.id === item.id
      );

      if (existing) {
        return current.map((x) =>
          x.id === item.id
            ? {
                ...x,
                quantity:
                  x.quantity + 1,
              }
            : x
        );
      }

      return [
        ...current,
        {
          ...item,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  }

  function removeItem(id: string) {
    setItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function increaseQuantity(
    id: string
  ) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(
    id: string
  ) {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  }

  const total = items.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const count = items.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        total,
        count,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}