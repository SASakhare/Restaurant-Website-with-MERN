import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "https://restaurant-website-with-mern.onrender.com/api/v1/menu"
axios.defaults.withCredentials = true;

type Menu = {
    name: string,
    description: string,
    price: number,
    image: string,
}

type MenuState = {
    loading: boolean,
    menu: Menu | null,
    createMenu: (formData: FormData) => Promise<void>,
    editMenu: (formData: FormData) => Promise<Menu>,
    deleteMenu: (id: string) => Promise<void>,
}


export const useMenuStore = create<MenuState>()(persist((set) => ({

    loading: false,
    menu: null,
    createMenu: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, menu: response.data.menu })

            }

        } catch (error: any) {
            // //(error);
            toast.error(error.response.data.message)
            set({ loading: false })
        }
    },

    editMenu: async (formData: FormData) => {
        try {

            const id = formData.get("id");
            formData.delete('id');
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, menu: response.data.menu })
            }

            return response.data.menu;

        } catch (error: any) {
            // //(error);
            toast.error(error.response.data.message)
            set({ loading: false })
        }
    },

    deleteMenu: async (id: string) => {
        try {

            set({ loading: true });
            const response = await axios.delete(`${API_END_POINT}/${id}`);
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, menu: response.data.menu })
            }

        } catch (error: any) {
            // //(error);
            toast.error(error.response.data.message)
            set({ loading: false })
        }
    },

}), {
    name: "user-name",
    storage: createJSONStorage(() => localStorage),
}))