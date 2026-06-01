import { create } from "zustand"
import { createJSONStorage } from "zustand/middleware"
import { persist } from 'zustand/middleware'
import axios from "axios"
import type { LoginInputState, SingupInputState } from "@/schema/userSchema"
import { toast } from "sonner"

const API_END_POINT = "http://localhost:4080/api/v1/user"
axios.defaults.withCredentials = true;

export type User = {
    fullname: string,
    email: string,
    contact: number,
    address: string,
    city: string,
    country: string,
    profilePicture: string,
    admin: boolean,
    isVerified: boolean,
}

export type UserState = {
    user: User | null,
    isAuthenticated: boolean,
    isCheckingAuth: boolean,
    loading: boolean,
    singup: (input: SingupInputState) => Promise<void>,
    login: (input: LoginInputState) => Promise<void>,
    verifyEmail: (otp: string) => Promise<void>,
    checkAuthentication: () => Promise<void>,
    logout: () => Promise<void>,
    forgotPassword: () => Promise<void>,
    resetPassword: (token: string, newPassword: string) => Promise<void>,
    updateProfile: (input: any) => Promise<void>,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    // * singup api implementation
    singup: async (input: SingupInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/singup`, input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }

        } catch (error) {
            toast.error(error.response.data.message)
            set({ loading: false });
        }

    }
    ,

    login: async (input: LoginInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }

        } catch (error) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },

    verifyEmail: async (otp: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/verify-email`, {
                verificationCode: otp,
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                //(response);

                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }

        } catch (error) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
        return;
    },

    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                if (response.data.message) {
                    toast.success(response.data.message)

                }
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }

        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },

    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/logout`);


            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: null, isAuthenticated: false });
            }

        } catch (error) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },

    forgotPassword: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/forgot-password`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: null, isAuthenticated: false });
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },

    resetPassword: async (token: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/:${token}`,
                {
                    newPassword,
                }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false });
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },


    updateProfile: async (input: any) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/profile/update`, input,
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuthenticated: true, });
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },



}), {
    name: "user-name",
    storage: createJSONStorage(() => localStorage),
}))



























