import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { type RestaurantFormSchema, restaurantFormSchema } from "@/schema/RestaurantsSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { toast } from "sonner";



const Restaurant = () => {


    const [input, setInput] = useState<RestaurantFormSchema>({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: "",
        cuisines: [],
        imageFile: "",

    })

    const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});

    const { loading, restaurant, updateRestaurant, createRestaurant, getRestaurant } = useRestaurantStore();

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setInput({
            ...input, [name]: type == 'number' ? (value == "" ? "" : Number(value)) : value,
        })
    }


    const addRestaurantHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //(input);

        const result = restaurantFormSchema.safeParse(input)

        if (!result.success) {

            const fieldErrors = result.error.flatten().fieldErrors;
            //(fieldErrors.cuisines);

            setErrors({
                restaurantName: fieldErrors.restaurantName?.[0] || "",
                city: fieldErrors.city?.[0] || "",
                country: fieldErrors.country?.[0] || "",
                deliveryTime: fieldErrors.deliveryTime?.[0] || "",
                cuisines: fieldErrors.cuisines?.[0] || "",
                imageFile: fieldErrors.imageFile?.[0] || "",
            } as unknown as Partial<RestaurantFormSchema>)

            // //(errors ? "true" : "false");
            return;
        } else {
            setErrors({});
        }
        try {

            // * add restaurant api implementation

            const formData = new FormData();

            formData.append("restaurantName", input.restaurantName)
            formData.append("city", input.city)
            formData.append("country", input.country)
            formData.append("deliveryTime", input.deliveryTime.toString())
            formData.append("cuisines", JSON.stringify(input.cuisines))

            if (input.imageFile) {
                formData.append("imageFile", input.imageFile)
            }


            if (restaurant) {   //* update
                await updateRestaurant(input);

            } else {
                //* create
                await createRestaurant(input);
            }

            // //(errors);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {

        const fetchRestaurant = async () => {

            await getRestaurant();


            setInput({
                restaurantName: restaurant?.restaurantName || "",
                city: restaurant?.city || "",
                country: restaurant?.country || "",
                deliveryTime: restaurant?.deliveryTime || "",
                cuisines: restaurant?.cuisines ? restaurant.cuisines.map((cuisine: string) => cuisine) : [],
                imageFile: restaurant?.imageFile || "",
            })
        }

        fetchRestaurant();

    }, []);

    return (
        <div className="max-w-6xl mx-auto my-10 p-2">
            <div>
                <div className="mb-6">
                    <img src={restaurant?.imageUrl} alt="Restaurant Banner" className="w-full md:h-70 lg:100 h-30 object-cover  rounded-lg shadow-xl hover:shadow-2xl " />
                </div>
                <div>
                    <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
                    <form action="" onSubmit={addRestaurantHandler} className="flex flex-col gap-10 w-full">
                        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                            {/* Restaurant Name */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-gray-700">Restaurant Name</Label>
                                <Input
                                    type="text"
                                    name="restaurantName"
                                    value={input.restaurantName}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your restaurant name"
                                />
                                {
                                    errors.restaurantName && <span className="text-xs text-red-600 font-medium">{errors.restaurantName} </span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="text-gray-700">City</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    value={input.city}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your City name"
                                />
                                {
                                    errors.city && <span className="text-xs text-red-600 font-medium">{errors.city} </span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="text-gray-700">Country</Label>
                                <Input
                                    type="text"
                                    name="country"
                                    value={input.country}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your country name"
                                />
                                {
                                    errors.country && <span className="text-xs text-red-600 font-medium">{errors.country} </span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="text-gray-700">Delivery Time</Label>
                                <Input
                                    type="number"
                                    name="deliveryTime"
                                    value={input.deliveryTime}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your Delivery Time"
                                />
                                {
                                    errors.deliveryTime && <span className="text-xs text-red-600 font-medium">{errors.deliveryTime} </span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="text-gray-700">Cuisines</Label>
                                <Input
                                    type="text"
                                    name="cuisines"
                                    value={input.cuisines}
                                    onChange={(e) => setInput({ ...input, cuisines: e.target.value.split(',') })}
                                    placeholder="eg. Momos,Biryani .."
                                />
                                {
                                    errors.cuisines && <span className="text-xs text-red-600 font-medium">{"cuisines is required."} </span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="text-gray-700">Upload Restaurant Banner</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    // value={input.imageFile?.}
                                    onChange={(e) => {
                                        setInput({
                                            ...input, [e.target.name]: e.target.files?.[0] || undefined
                                        })
                                    }}
                                    name="imageFile"
                                    placeholder="Upload Restaurant Banner"
                                />
                                {
                                    errors.imageFile && <span className="text-xs text-red-600 font-medium">{errors.imageFile} </span>
                                }
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            {
                                loading ? (
                                    <Button disabled className=" w-full sm:w-1/2  md:w-1/3 bg-button hover:bg-hoverButtonColor"><Loader2 className="animate-spin text-2xl" /> Please Wait</Button>
                                ) : (
                                    <Button type="submit" className=" w-full sm:w-1/2  md:w-1/3 bg-button hover:bg-hoverButtonColor">
                                        {
                                            restaurant ? "Update Your Restaurant" : "Add Restaurant"
                                        }
                                    </Button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Restaurant