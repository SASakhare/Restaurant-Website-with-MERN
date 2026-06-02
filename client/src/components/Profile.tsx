import { Globe, Loader2, Locate, Mail, MapPin, Phone, Plus, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";



const Profile = () => {

    const { user, updateProfile, loading } = useUserStore();
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

    const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(profileData.profilePicture);

    const changeHandler = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {

        setProfileData({ ...profileData, [e.target.name]: e.target.value })
        //(profileData);


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

    const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // * api implementation here
        await updateProfile(profileData);
    }


    // const loading = false;
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProfileData({
            fullname: user?.fullname || "",
            email: user?.email || "",
            phone: user?.contact.toString() || "",
            address: user?.address || "",
            city: user?.city || "",
            country: user?.country || "",
            profilePicture: user?.profilePicture || ""

        })
    }, [user])
    return (
        <form onSubmit={updateProfileHandler} className=" max-w-7xl mx-auto my-5">
            <div className="flex items-center justify-center md:justify-start ">

                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2 bg-transparent">
                        <div className="relative group md:w-28 md:h-28 w-20 h-20 md:ml-20">
                            <Avatar className="md:w-28 md:h-28 w-20 h-20 ">
                                <AvatarImage src={selectedProfilePicture} />
                                <AvatarFallback></AvatarFallback>
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
                        <h3 className=" md:ml-4  font-bold text-xl bg-transparent text-center sm:text-2xl md:text-3xl lg:text-4xl border-none focus-visible:ring-transparent" >
                            {
                                profileData.fullname.toString().toUpperCase()
                            }
                        </h3>

                    </div>
                </div>

            </div>
            <div className="grid place-items-center md:grid-cols-2  md:gap-2 gap-3 my-10 g">
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%] dark:bg-gray-800 ">
                    <User className="text-gray-500" />
                    <div className="w-full">
                        <Label>Name</Label>
                        <input
                            name="name"
                            value={profileData.fullname}
                            onChange={changeHandler}
                            placeholder="sakharwsejal@gmail.com"
                            className="w-full text-gray-600 dark:text-gray-200 bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%]  dark:bg-gray-800 ">
                    <Mail className="text-gray-500" />
                    <div className="w-full">
                        <Label>Email</Label>
                        <input
                            disabled
                            name="email"
                            value={profileData.email}
                            onChange={changeHandler}
                            placeholder="sakharwsejal@gmail.com"
                            className="w-full text-red-400 bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%]  dark:bg-gray-800">
                    <Phone className="text-gray-500" />
                    <div className="w-full">
                        <Label>Call</Label>
                        <input
                            name="contact"
                            value={profileData.phone}
                            onChange={changeHandler}
                            placeholder="sakharwsejal@gmail.com"
                            className="w-full text-gray-600 dark:text-gray-200  bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%]  dark:bg-gray-800">
                    <Locate className="text-gray-500" />
                    <div className="w-full">
                        <Label>Address</Label>
                        <input
                            name="address"
                            value={profileData.address}
                            onChange={changeHandler}
                            placeholder="Flat No. 203, Sai Residency,Near MGM College Road, Aurangabad, Maharashtra - 431003,"
                            className="w-full text-gray-600 dark:text-gray-200  bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%]  dark:bg-gray-800">
                    <MapPin className="text-gray-500" />
                    <div className="w-full">
                        <Label>City</Label>
                        <input
                            name="city"
                            value={profileData.city}
                            onChange={changeHandler}
                            placeholder="nagpur"
                            className="w-full text-gray-600 dark:text-gray-200  bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 w-[90%]  dark:bg-gray-800">
                    <Globe className="text-gray-500" />
                    <div className="w-full">
                        <Label>Country</Label>
                        <input
                            name="country"
                            value={profileData.country}
                            onChange={changeHandler}
                            placeholder="India"
                            className="w-full text-gray-600 dark:text-gray-200  bg-transparent focus-visible:ring-transparent  focus-visible:border-transparent outline-none border-none"
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