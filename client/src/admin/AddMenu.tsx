import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import EditMenu from "./EditMenu";
import { useMenuStore } from "@/store/useMenuStore";
import { toast } from "sonner";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


type MenuItem = {
    id: string,
    url: string,
    itemName: string,
    description: string,
    price: string,
}



const AddMenu = () => {

    const { restaurant } = useRestaurantStore();
    const [open, setOpen] = useState<boolean>(false);


    return (
        <div className="max-w-6xl mx-auto my-10 p-2">
            <div className="flex justify-between">
                <h1 className="font-bold md:font-extrabold text-2xl">Available Menus</h1>
            </div>
            <DialogMenu open={open} setOpen={setOpen} />
            <div className="mt-6 space-y-4">
                {
                    restaurant?.menus.map((item) => (
                        <MenuCard key={item._id} id={item._id} url={item.image} itemName={item.name} description={item.description} price={item.price.toString()} />
                    ))
                }

            </div>

        </div>
    )
}



export default AddMenu;


export const MenuCard = ({ id, url, itemName, description, price }: MenuItem) => {

    const { deleteMenu } = useMenuStore();
    const { getRestaurant } = useRestaurantStore();

    const [item, setItem] = useState<MenuItem>({
        id: id,
        url: url,
        itemName: itemName,
        description: description,
        price: price
    })

    const [editOpen, setEditOpen] = useState<boolean>(false);


    const updateHandler = () => {

        setEditOpen(true);

    }

    const deleteHandler = async () => {
        await deleteMenu(id);
        await getRestaurant();
    }

    return (
        <div className="flex dark:border dark:border-gray-600 flex-col dark:S gap-4 justify-center items-center md:p-4 p-2 shadow-xl hover:shadow-2xl transition-all duration-200 border rounded-2xl">

            <div className="flex w-full gap-2 md:flex-row items-center md:space-x-4 ">
                <img
                    src={item.url}
                    alt="menu item image"
                    className="left-0 md:h-24 md:w-24 h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg dark:border dark:border-gray-600"
                />
                <div className="flex-1 justify-start">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">{item.itemName}</h1>
                    <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                    <h2 className="text-lg font-bold text-button" >Price : ₹<span>{item.price}</span></h2>
                </div>
            </div>
            <div className="w-full gap-4 md:flex md:justify-end">
                <Button onClick={updateHandler} className="w-full bg-button hover:bg-hoverButtonColor md:w-1/3 lg:w-1/3">
                    Edit
                </Button>
                <DeleteMenuDialog onDelete={deleteHandler } />
            </div>
            <EditMenu selectedItem={item} setSelectedItem={setItem} editOpen={editOpen} setEditOpen={setEditOpen} />
        </div>
    )
}

type NewMenuItem = {
    file: File | undefined,
    name: string,
    description: string,
    price: string,
}



export const DialogMenu = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

    const { loading, createMenu } = useMenuStore();
    const { getRestaurant } = useRestaurantStore();
    const [Item, setItem] = useState<NewMenuItem>({

        file: undefined,
        name: "",
        description: "",
        price: "",
    });

    const changeHandler = (e: any) => {
        setItem({
            ...Item, [e.target.name]: e.target.type == "number" ? (e.target.value == "" ? "" : Number(e.target.value)) : e.target.value,
        })
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // * api building for adding new item :

        try {
            const newMenuItem = new FormData();

            newMenuItem.append("name", Item.name);
            newMenuItem.append("description", Item.description);
            newMenuItem.append("price", Item.price.toString());
            if (Item.file) {
                newMenuItem.append("image", Item.file)
            }

            await createMenu(newMenuItem);
            await getRestaurant();

            setOpen(false);

            setItem({
                file: undefined,
                name: "",
                description: "",
                price: ""
            })

        } catch (error: any) {
            toast.error(error.response.data.message)
        }

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


type DeleteMenuDialogProps = {
    onDelete: () => Promise<void>;
};

const DeleteMenuDialog = ({ onDelete }: DeleteMenuDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full bg-button hover:bg-hoverButtonColor md:w-1/3 lg:w-1/3">
                    Delete
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this menu item from your restaurant.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onDelete}
                        className="bg-button! !hover:bg-hoverButtonColor"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
