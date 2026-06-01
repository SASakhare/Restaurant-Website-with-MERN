import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema"
import { useUserStore } from "@/store/useUserStore"
import { Loader2, Lock, Mail } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router-dom"


const Login = () => {

    // const loading = false;

    const { login, loading } = useUserStore();

    const [input, setInput] = useState<LoginInputState>({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState<Partial<LoginInputState>>({})

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput({
            ...input, [e.target.name]: e.target.value,
        })
    }

    const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // * input validation :

        const result = userLoginSchema.safeParse(input)

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || ""
            } as Partial<LoginInputState>)

            return;
        }



        //* api implementation here
        // //(input);
        await login(input)


    }

    return (
        <div className="flex items-center justify-center w-screen h-screen ">
            <form onSubmit={loginSubmitHandler} className="md:border md:p-8 mx-4 md:border-gray-200 w-full max-w-md rounded-lg">
                <div className="mb-6 flex justify-center items-center">
                    <h1 className="text-3xl font-bold ">Royal Masala</h1>
                </div>
                <div className="mb-6 flex  flex-col gap-2 relative">
                    <Label htmlFor="email" className="pl-2 font-bold">Email</Label>
                    <Input
                        className="pl-10 focus-visible:ring-0"
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={input.email}
                        onChange={changeEventHandler}
                    />
                    <Mail className="absolute top-6.5 left-2 text-2xl text-gray-600 pointer-events-none" />
                    {
                        errors && <span className="text-sm text-red-600">{errors.email}</span>
                    }
                </div>
                <div className="mb-6 flex  flex-col gap-2 relative">
                    <Label htmlFor="password" className="pl-2 font-bold">Password</Label>
                    <Input
                        value={input.password}
                        name="password"
                        className="pl-10 focus-visible:ring-0"
                        id="password"
                        placeholder="Password"
                        type="password"
                        onChange={changeEventHandler}
                    />
                    <Lock className="absolute top-6.5 left-2 text-2xl text-gray-600 pointer-events-none" />
                    {
                        errors && <span className="text-sm text-red-600">{errors.password}</span>
                    }
                </div>

                <div className="mb-6 flex justify-center items-center">
                    {
                        loading ? <Button disabled className="w-full bg-button hover:bg-hoverButtonColor"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button> : (
                            <Button type="submit" className="w-full bg-button hover:bg-hoverButtonColor">Login</Button>
                        )
                    }
                </div>

                <Separator />

                <p className=" mt-1 flex justify-center items-center">
                    Forgot Password  ? {" "}
                    <Link to="/forgot-password" className="text-blue-500 underline ml-2">forgot password</Link>
                </p>
                <p className=" mt-1 flex justify-center items-center">
                    want to Reset Password  ? {" "}
                    <Link to="/reset-password" className="text-blue-500 underline ml-2">reset password</Link>
                </p>
                <p className=" mt-1 flex justify-center items-center">
                    Don't have an account  ? {" "}
                    <Link to="/singup" className="text-blue-500 underline ml-2">Singup</Link>
                </p>

            </form>

        </div>
    )
}

export default Login