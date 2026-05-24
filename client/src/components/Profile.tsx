import { Globe, Loader2, Locate, Mail, MapPin, MapPinIcon, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Input } from "./ui/input";
import { email } from "zod";
import { Label } from "./ui/label";
import { Button } from "./ui/button";


// type ProfileDataState={
//     fullname:string,
//     email:string,
//     phone:string,
//     address:string,
//     city:string,
//     country:string,
//     p
// }

const Profile = () => {

    const [profileData, setProfileData] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        profilePicture: ""

    })

    const imagRef = useRef<HTMLInputElement | null>(null);

    const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>("");

    const changeHandler = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {

        setProfileData({ ...profileData, [e.target.name]: e.target.value })

    }
    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const result = reader.result as string;
                setSelectedProfilePicture(result)
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePicture: result,
                }))
            }


            reader.readAsDataURL(file);
        }

    }

    const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(profileData);
        // * api implementation here
    }


    const loading = false;

    return (
        <form onSubmit={updateProfileHandler} className=" max-w-7xl mx-auto my-5">
            <div className="flex items-center justify-center md:justify-start ">

                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <div className="relative group">
                            <Avatar className="md:w-28 md:h-28 w-20 h-20 md:ml-20">
                                <AvatarImage src={selectedProfilePicture} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            {/* Overlay */}
                            <label
                                htmlFor="profilePhoto"
                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            >
                                <Plus className="text-white w-8 h-8" />
                            </label>

                            {/* Hidden File Input */}
                            <input
                                id="profilePhoto"
                                type="file"
                                className="hidden"
                                ref={imagRef}
                                accept="image/*"
                                onChange={fileChangeHandler}
                            />
                        </div>

                        <Input
                            type="text"
                            name="fullname"
                            value={profileData.fullname}
                            onChange={changeHandler}
                            placeholder="Sejal Sakhare"
                            className="font-bold text-4xl outline-none border-none focus-visible:ring-transparent"

                        />

                    </div>
                </div>

            </div>
            <div className="grid place-items-center md:grid-cols-2  md:gap-2 gap-3 my-10 g">
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%] ">
                    <Mail className="text-gray-500" />
                    <div className="w-full">
                        <Label>Email</Label>
                        <input
                            name="email"
                            value={profileData.email}
                            onChange={changeHandler}
                            placeholder="sakharwsejal@gmail.com"
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%]">
                    <Locate className="text-gray-500" />
                    <div className="w-full">
                        <Label>Address</Label>
                        <input
                            name="address"
                            value={profileData.address}
                            onChange={changeHandler}
                            placeholder="Flat No. 203, Sai Residency,Near MGM College Road, Aurangabad, Maharashtra - 431003,"
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%]">
                    <MapPin className="text-gray-500" />
                    <div className="w-full">
                        <Label>City</Label>
                        <input
                            name="city"
                            value={profileData.city}
                            onChange={changeHandler}
                            placeholder="nagpur"
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%]">
                    <Globe className="text-gray-500" />
                    <div className="w-full">
                        <Label>Country</Label>
                        <input
                            name="country"
                            value={profileData.country}
                            onChange={changeHandler}
                            placeholder="India"
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>

            </div>

            <div className="text-center">
                {
                    loading ? (<Button disabled className="bg-button hover:bg-hoverButtonColor md:w-[50%] w-[90%] h-12"><Loader2 className="animate-spin w-22 h-22 text-3xl" /> Please Wait</Button>) :
                        (<Button type="submit" className="bg-button hover:bg-hoverButtonColor md:w-[50%] w-[90%] h-12">Update Profile</Button>)
                }
            </div>

        </form>
    )
}

export default Profile