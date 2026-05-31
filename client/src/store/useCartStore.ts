import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type MenuItem } from "./useRestaurantStore";
import { toast } from "sonner";


export interface CartItem extends MenuItem {
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
                    cart: state.cart.map((cartItem: CartItem) => cartItem._id == item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem),
                }
            } else {
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                }
            }

        });

        toast.success(`${item.name} added in cart successfully`)
    },
    clearCart: () => {
        set({
            cart: [],
        })

        toast.success(`Cart is Clear successfully`)

    },
    removeFromTheCart: (id: string) => {

        set((state: CartState) => {
            return {
                cart: state.cart.filter((item) => item._id != id)
            }
        });
        toast.success(`Item is Removed successfully`)

    },
    incrementQuantity: (id: string) => {

        let itemName = "";
        set((state: CartState) => {
            return {
                cart: state.cart.map((item) => {
                    if (item._id == id) {
                        itemName = item.name;
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                })
            }
        })

        toast.success(`${itemName} quantity is increased successfully`)
    },
    decrementQuantity: (id: string) => {
        let itemName = "";

        set((state: CartState) => {
            return {
                cart: state.cart.map((item) => {
                    if (item._id == id) {
                        itemName = item.name;
                        return { ...item, quantity: (item.quantity == 1 ? 1 : item.quantity - 1) };
                    } else {
                        return item;
                    }
                })
            }
        })

        toast.success(`${itemName} quantity is decreased successfully`)
    },

}), {
    name: 'cart-name',
    storage: createJSONStorage(() => localStorage)
}))










