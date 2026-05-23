import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {

    const loading = false;

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<any>([]);
    const navigate = useNavigate();


    const handleChange = (index: number, value: string) => {

        if (/^[a-zA-Z0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
        if (value == "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index > 0) {

                inputRef.current[index - 1].focus();
            }
        }
        // * Move to the next input field id a digit is entered

        if (value != "" && index < 5) {
            inputRef.current[index + 1].focus();
        }
    }
    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <form className="md:border md:p-8 mx-4 md:border-gray-200 w-full max-w-md rounded-lg">
                <div className="mb-6 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold ">Verify Your Email</h1>
                    <p className="mt-2 text-sm text-button">
                        Enter the 6 digit code sent on Email
                    </p>
                </div>

                <div className="flex justify-center items-center gap-3 mb-4">
                    {
                        otp.map((letter: string, idx: number) => (
                            <Input
                                key={idx}
                                ref={(element) => (inputRef.current[idx] = element)}
                                type="text"
                                maxLength={1}
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => { handleChange(idx, e.target.value) }}
                                name={`${idx}`}
                                value={letter}
                                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus-visible:ring-1 focus:ring-indigo-500 text-button"
                            />
                        ))
                    }
                </div>

                <div className="mb-6 flex justify-center items-center">
                    {
                        loading ? <Button disabled className="w-full bg-button hover:bg-hoverButtonColor"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button> : (
                            <Button type="submit" className="w-full bg-button hover:bg-hoverButtonColor">Verify Email</Button>
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

export default VerifyEmail