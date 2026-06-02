import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/store/useUserStore'
import { Loader2, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

    const [email, setEmail] = useState<string>("");
    const { loading, forgotPassword } = useUserStore();

    const forgotPasswordHandler = async () => {
        await forgotPassword(email);
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen ">
            <form className="md:border md:p-8 mx-4 md:border-gray-200 w-full max-w-md rounded-lg">
                <div className="mb-6 flex justify-center items-center">
                    <h1 className="text-3xl font-bold ">Forgot Password</h1>
                </div>
                <div className="mb-6 flex  flex-col gap-2 relative">
                    <Label htmlFor="email" className="pl-2 font-bold">Email</Label>
                    <Input
                        className="pl-10 focus-visible:ring-0"
                        id="email"
                        name="email"
                        placeholder="Enter email for password reset"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="absolute top-6.5 left-2 text-2xl text-gray-600 pointer-events-none" />
                </div>


                <div className="mb-6 flex justify-center items-center">
                    {
                        loading ? <Button disabled className="w-full bg-button hover:bg-hoverButtonColor"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button> : (
                            <Button type="submit" onClick={forgotPasswordHandler} className="w-full bg-button hover:bg-hoverButtonColor">Send Reset Link</Button>
                        )
                    }
                </div>

                <Separator />

                <p className=" mt-4 flex justify-center items-center">
                    Back to{" "}
                    <Link to="/login" className="text-blue-500 underline ml-2">login</Link>
                </p>

            </form>
        </div>
    )
}

export default ForgotPassword