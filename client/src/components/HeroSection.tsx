import { useState } from "react"
import { Input } from "./ui/input"
import { Search } from "lucide-react";
import { Button } from "./ui/button";

import HeroImage from "@/assets/hero.jpg"
import { useNavigate } from "react-router-dom";


const HeroSection = () => {

    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate();


    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-r gap-5 md:gap-25 ">
            <div className="flex flex-col gap-10 md:w-[40%] ">
                <div className="flex flex-col gap-8 items-center justify-center">
                    <h1 className="dark:text-white dark:shadow-xl  font-bold md:font-extrabold md:text-5xl text-4xl text-center">Order Food anytime & anywhere</h1>
                    <p className="text-gray-500 text-xl text-center dark:text-gray-200">
                        Hey! Our Delicious Food is waiting for you ,
                        we are always near to you
                    </p>
                </div>
                <div className="relative flex gap-2 items-center justify-center">
                    <Input
                        type="text"
                        value={searchText}
                        placeholder="Search restaurant by name of city and country"
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-10 border-2 h-10 shadow-lg dark:text-white focus-visible:ring-0 focus-visible:outline-0"
                    />
                    <Search className="text-gray-500 absolute inset-2 left-2.5 " />
                    <Button onClick={() => navigate(`/search/${searchText}`)} className="bg-button hover:bg-hoverButtonColor h-10 w-20">
                        Search
                    </Button>
                </div>


            </div>
            <div>
                <img src={HeroImage}
                    alt="HeroImage"
                    className="object-cover md:w-full h-90 w-120 md:max-h-125 md:max-w[90%] rounded-xl"
                />
            </div>
        </div>
    )
}

export default HeroSection