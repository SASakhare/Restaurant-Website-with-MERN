import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMenuStore } from "@/store/useMenuStore"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { Loader2 } from "lucide-react"
import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { toast } from "sonner"

type MenuItem = {
    id: string,
    url: string,
    itemName: string,
    description: string,
    price: string,
}

type NewMenuItem = {
    id: string,
    file: File | undefined,
    name: string,
    description: string,
    price: string,
}

const EditMenu = ({ selectedItem, setSelectedItem, editOpen, setEditOpen }: { selectedItem: MenuItem, setSelectedItem: Dispatch<SetStateAction<MenuItem>>, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>> }) => {

    const { loading, editMenu } = useMenuStore();
    const { getRestaurant } = useRestaurantStore();


    const [Item, setItem] = useState<NewMenuItem>({
        id: selectedItem.id,
        file: undefined,
        name: selectedItem.itemName,
        description: selectedItem.description,
        price: selectedItem.price,
    });

    const changeHandler = (e: any) => {
        setItem({
            ...Item, [e.target.name]: e.target.type == "number" ? (e.target.value == "" ? "" : Number(e.target.value)) : e.target.value,
        })
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newMenuItem = new FormData();
            newMenuItem.append("id", Item.id);
            newMenuItem.append("name", Item.name);
            newMenuItem.append("description", Item.description);
            newMenuItem.append("price", Item.price.toString());
            if (Item.file) {
                newMenuItem.append("image", Item.file)
            }

            const menu = await editMenu(newMenuItem);
            await getRestaurant();

            const newMenu = {
                url: menu.image || "",
                itemName: menu?.name || "",
                description: menu?.description || "",
                price: menu?.price || "",
            }

            setEditOpen(false);

            setSelectedItem({ ...newMenu as MenuItem })

        } catch (error: any) {

            toast.error(error.response.data.message);
        }
    }


    return (

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
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

export default EditMenu