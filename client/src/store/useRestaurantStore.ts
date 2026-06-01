import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


const API_END_POINT = "http://localhost:4080/api/v1/restaurant"
axios.defaults.withCredentials = true;

export type MenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    menus: MenuItem[];
    imageUrl: string;
}



export type RestaurantState = {
    loading: boolean,
    restaurant: Restaurant | null,
    singleRestaurant: Restaurant | null,
    appliedFilter: string[],
    searchRestaurants: null,
    createRestaurant: (formData: FormData) => Promise<void>,
    getRestaurant: () => Promise<void>,
    updateRestaurant: (formData: FormData) => Promise<void>,
    searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: any) => Promise<void>,
    setAppliedFilter: (value: string) => void,
    getSingleRestaurant: (id: string) => Promise<void>,
    resetAppliedFilter: () => void,
}

export const useRestaurantStore = create<RestaurantState>()(persist((set) => ({

    loading: false,
    restaurant: null,
    searchRestaurants: null,
    appliedFilter: [],
    singleRestaurant: null,
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
            // //(response);

            if (response.data.success) {
                // toast.success(response.data.message)
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
    searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: any) => {

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
    ,
    setAppliedFilter: (value: string) => {

        try {
            set({ loading: true })

            set((state) => {

                const isAlreadyApplied = state.appliedFilter.includes(value);

                const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item != value) : [...state.appliedFilter, value];
                state.appliedFilter = updatedFilter;

                return { appliedFilter: updatedFilter }
            })
            set({ loading: false })

            return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error(error.response.data.message)
            set({ loading: false })


        }
    }
    ,
    resetAppliedFilter: () => {

        try {
            set({ appliedFilter: [] })

            return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error(error.response.data.message)
            set({ loading: false })

        }
    }
    ,
    getSingleRestaurant: async (id: string) => {

        try {

            //(id);

            const response = await axios.get(`${API_END_POINT}/${id}`);

            if (response.data.success) {
                // toast.success(response.data.message)
                set({ loading: false, singleRestaurant: response.data.restaurant })

            }
            // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error(error.response.data.message)
            set({ loading: false, restaurant: null })
        }
    }


}), {
    name: "restaurant-name",
    storage: createJSONStorage(() => localStorage)
}))











































