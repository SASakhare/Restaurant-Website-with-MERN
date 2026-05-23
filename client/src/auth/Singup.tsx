import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2, Lock, Mail, Phone, User } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router-dom"

type SingupInputState = {
    fullname: string,
    email: string,
    password: string,
    contact: string,
}

const Singup = () => {

    const loading = false;

    const [input, setInput] = useState<SingupInputState>({
        fullname: "",
        email: "",
        password: "",
        contact: ""
    })

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput({
            ...input, [e.target.name]: e.target.value,
        })
    }

    const loginSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);

    }

    return (
        <div className="flex items-center justify-center w-screen h-screen ">
            <form onSubmit={loginSubmitHandler} className="md:border md:p-8 mx-4 md:border-gray-200 w-full max-w-md rounded-lg">
                <div className="mb-6 flex justify-center items-center">
                    <h1 className="text-3xl font-bold ">Royal Masala</h1>
                </div>
                <div className="mb-6 flex  flex-col gap-2 relative">
                    <Label htmlFor="fullname" className="pl-2 font-bold">Full Name</Label>
                    <Input
                        className="pl-10 focus-visible:ring-0"
                        id="fullname"
                        name="fullname"
                        placeholder="Full Name"
                        type="fullname"
                        value={input.fullname}
                        onChange={changeEventHandler}
                    />
                    <User className="absolute top-6.5 left-2 text-2xl text-gray-600 pointer-events-none" />
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
                </div>
                <div className="mb-6 flex  flex-col gap-2 relative">
                    <Label htmlFor="contact" className="pl-2 font-bold">Contact</Label>
                    <Input
                        className="pl-10 focus-visible:ring-0"
                        id="contact"
                        name="contact"
                        placeholder="Contact"
                        type="contact"
                        value={input.contact}
                        onChange={changeEventHandler}
                    />
                    <Phone className="absolute top-6.5 left-2 text-2xl text-gray-600 pointer-events-none" />
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
                </div>

                <div className="mb-6 flex justify-center items-center">
                    {
                        loading ? <Button disabled className="w-full bg-button hover:bg-hoverButtonColor"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button> : (
                            <Button type="submit" className="w-full bg-button hover:bg-hoverButtonColor">Singup</Button>
                        )
                    }
                </div>

                <Separator />

                <p className=" mt-4 flex justify-center items-center">
                    Do you have an account  ? {" "}
                    <Link to="/login" className="text-blue-500 underline ml-2">login</Link>
                </p>

            </form>

        </div>
    )
}

export default Singup