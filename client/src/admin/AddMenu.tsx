import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Menu, Plus } from "lucide-react";
import { useState, type ChangeEventHandler, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { file } from "zod";

type MenuItem = {
    url: string,
    itemName: string,
    description: string,
    price: string,
}

const Menuitems = [
    {
        url: "https://dfordelhi.in/wp-content/uploads/2016/10/Indian-Food-Samosa-Dish-HD-Wallpapers.jpg",
        itemName: "Samosa",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates.",
        price: "50"
    },
    {
        url: "https://dfordelhi.in/wp-content/uploads/2016/10/Indian-Food-Samosa-Dish-HD-Wallpapers.jpg",
        itemName: "Samosa",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates.",
        price: "50"
    },
    {
        url: "https://dfordelhi.in/wp-content/uploads/2016/10/Indian-Food-Samosa-Dish-HD-Wallpapers.jpg",
        itemName: "Samosa",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates.",
        price: "50"
    },
    {
        url: "https://dfordelhi.in/wp-content/uploads/2016/10/Indian-Food-Samosa-Dish-HD-Wallpapers.jpg",
        itemName: "Samosa",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates.",
        price: "50"
    },
]


const AddMenu = () => {

    const [menuItems, setMenuItems] = useState<MenuItem[]>(Menuitems)

    const [open, setOpen] = useState<boolean>(false);

    const loading = false;

    return (
        <div className="max-w-6xl mx-auto my-10 p-2">
            <div className="flex justify-between">
                <h1 className="font-bold md:font-extrabold text-2xl">Available Menus</h1>
            </div>
            <DialogMenu setMenuItems={setMenuItems} loading={loading} open={open} setOpen={setOpen} />
            <div className="mt-6 space-y-4">
                {
                    menuItems.map((item, idx) => (
                        <MenuCard key={idx} url={item.url} itemName={item.itemName} description={item.description} price={item.price} />
                    ))
                }

            </div>

        </div>
    )
}



export default AddMenu


export const MenuCard = ({ url, itemName, description, price }: MenuItem) => {

    const [item, setItem] = useState<MenuItem>({
        url: url,
        itemName: itemName,
        description: description,
        price: price
    })

    
    return (
        <div className="flex flex-col gap-4 justify-center items-center md:p-4 p-2 shadow-xl hover:shadow-2xl transition-all duration-200 border rounded-2xl">

            <div className="flex w-full gap-2 md:flex-row items-center md:space-x-4 ">
                <img
                    src={item.url}
                    alt="menu item image"
                    className="left-0 md:h-24 md:w-24 h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg"
                />
                <div className="flex-1 justify-start">
                    <h1 className="text-xl font-bold text-gray-800">{item.itemName}</h1>
                    <p className="text-gray-700">{item.description}</p>
                    <h2 className="text-lg font-bold text-button" >Price : ₹<span>{item.price}</span></h2>
                </div>
            </div>
            <div className="w-full md:flex md:justify-end">
                <Button className="w-full bg-button hover:bg-hoverButtonColor md:w-1/3 lg:w-1/3">
                    Edit
                </Button>
            </div>
        </div>
    )
}

type NewMenuItem = {
    file: File | undefined,
    name: string,
    description: string,
    price: string,
}

export const DialogMenu = ({ setMenuItems, loading, open, setOpen }: { setMenuItems: Dispatch<SetStateAction<MenuItem[]>>, loading: boolean, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

    const [Item, setItem] = useState<NewMenuItem>({

        file: undefined,
        name: "",
        description: "",
        price: "",
    });

    const changeHandler = (e) => {
        setItem({
            ...Item, [e.target.name]: e.target.type == "number" ? (e.target.value == "" ? "" : Number(e.target.value)) : e.target.value,
        })
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(Item);

        const newMenu = {
            url: Item.file ? URL.createObjectURL(Item.file) : "",
            itemName: Item.name,
            description: Item.description,
            price: Item.price,
        }

        setMenuItems((prev) => [...prev, newMenu])

        setOpen(false);

        setItem({
            file: undefined,
            name: "",
            description: "",
            price: ""
        })

    }

    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <div className="w-full flex justify-end">
                    <Button className="bg-button font-bold hover:bg-hoverButtonColor w-1/3">
                        <Plus className="mr-1" />
                        Add Menu
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="w-[95vw] sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-center font-bold text-xl">Add a New Menu</DialogTitle>
                    <DialogDescription className="text-center text-button">
                        Create a menu that will make your  <br />restaurant stand out.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler} action="" className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label className="text-gray-600">Name</Label>
                        <Input

                            type="text"
                            name="name"
                            value={Item.name}
                            placeholder="Enter menu name"
                            className="focus-visible:ring-0"
                            onChange={changeHandler}

                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-gray-600">Description</Label>
                        <Input
                            onChange={changeHandler}
                            type="text"
                            value={Item.description}
                            name="description"
                            className="focus-visible:ring-0"
                            placeholder="Enter Description of menu item"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-gray-600">Price in (Rupees)</Label>
                        <Input
                            onChange={changeHandler}
                            type="number"
                            value={Item.price}
                            name="price"
                            className="focus-visible:ring-0"
                            placeholder="Enter Price in Rupees"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-gray-600">Upload Menu Image</Label>
                        <Input
                            onChange={(e) => setItem({ ...Item, file: e.target.files?.[0] || undefined })}
                            type="file"
                            accept="image/*"
                            name="file"
                            placeholder="Enter menu name"
                            className="focus-visible:ring-0 text-gray-600"
                        />
                    </div>

                    <DialogFooter >
                        {
                            loading ? (
                                <Button disabled className="w-full bg-button hover:bg-hoverButtonColor">
                                    <Loader2 className="animate-spin" />
                                    Please Wait
                                </Button>

                            ) : (
                                <Button type="submit" className="w-full bg-button hover:bg-hoverButtonColor">
                                    Add Menu Item
                                </Button>
                            )
                        }
                    </DialogFooter>
                </form>

            </DialogContent>

        </Dialog>
    )
}