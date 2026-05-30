import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


const API_END_POINT = "http://localhost:4080/api/v1/restaurant"
axios.defaults.withCredentials = true;


export const useRestaurantStore = create()(persist((set) => ({

    loading: false,
    restaurant: null,
    searchRestaurants: null,
    createRestaurant: async (formData: FormData) => {
        try {
            set({ loading: true });

            const response = await axios.post(`${API_END_POINT}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false })

            }
        } catch (error: any) {

            toast.error(error.response.data.message)
            set({ loading: false })
        }
    }
    ,
    getRestaurant: async () => {

        try {
            const response = await axios.get(`${API_END_POINT}`);
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, restaurant: response.data.restaurant })

            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error(error.response.data.message)
            set({ loading: false, restaurant: null })
        }
    }
    ,

    updateRestaurant: async (formData: FormData) => {

        try {
            set({ loading: true })

            const response = await axios.put(`${API_END_POINT}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, restaurant: response.data.restaurant })

            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error(error.response.data.message)
            set({ loading: false })
        }
    }
    ,
    searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines:any) => {

        try {
            set({ loading: true })

            const params = new URLSearchParams()

            params.set("searchQuery", searchQuery)
            params.set("selectedCuisines", selectedCuisines)

            const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, searchRestaurants: response.data.data })

            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error(error.response.data.message)
            set({ loading: false })
        }
    }





}), {
    name: "restaurant-name",
    storage: createJSONStorage(() => localStorage)
}))











































