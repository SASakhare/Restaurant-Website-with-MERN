import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type MenuItem } from "./useRestaurantStore";


interface CartItem extends MenuItem {
    quantity: number,
}


type CartState = {
    cart: CartItem[];
    addToCart: (item: MenuItem) => void;
    clearCart: () => void;
    removeFromTheCart: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;

}


export const useCartStore = create<CartState>()(persist((set) => ({
    cart: [],
    addToCart: (item: MenuItem) => {

        set((state: CartState) => {
            const existingItem = state.cart.find((cartItem: CartItem) => cartItem._id == item._id)

            if (existingItem) {
                return {
                    cart: state.cart.map((cartItem: CartItem) => cartItem._id == item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
                }
            } else {
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                }
            }

        });
    },
    clearCart: () => {
        set({
            cart: [],
        })
    },
    removeFromTheCart: (id: string) => {

        set((state: CartState) => {
            return {
                cart: state.cart.filter((item) => item._id != id)
            }
        });
    },
    incrementQuantity: (id: string) => {

        set((state: CartState) => {
            return {
                cart: state.cart.map((item) => {
                    if (item._id == id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                })
            }
        })
    },
    decrementQuantity: (id: string) => {

        set((state: CartState) => {
            return {
                cart: state.cart.map((item) => {
                    if (item._id == id) {
                        return { ...item, quantity: (item.quantity == 0 ? 0 : item.quantity - 1) };
                    } else {
                        return item;
                    }
                })
            }
        })
    },

}), {
    name: 'cart-name',
    storage: createJSONStorage(() => localStorage)
}))










