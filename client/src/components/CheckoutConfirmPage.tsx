import { useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Globe, LocationEdit, Mail, MapPinIcon, Phone, User } from "lucide-react"
import { Button } from "./ui/button"
import { useUserStore } from "@/store/useUserStore"



const CheckoutConfirmPage = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

    const { user } = useUserStore();
    const [input, setInput] = useState({
        name: user?.fullname || "",
        email: user?.email || "",
        contact: user?.contact || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || ""
    })
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const checkoutHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //(input);

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}  >
            <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                <DialogTitle className="text-center text-xl font-bold ">Review Your Order</DialogTitle>
                <DialogDescription className="text-center text-sm text-button">
                    Double-check your delivery details and ensure everything is in order.
                    When you are ready. hit confirm button to finalize your order.
                </DialogDescription>
                <form onSubmit={checkoutHandler} className="md:grid  grid-cols-1  gap-2 space-y-1 md:space-y-0">
                    <div className="md:grid  grid-cols-2  gap-2 space-y-1 md:space-y-0">

                        <div className="flex flex-col gap-3" >
                            <Label className="text-sm text-gray-700">
                                <User className="text-gray-700 ml-1" />
                                Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 "
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className="text-sm text-gray-700">
                                <Mail className="text-gray-700 ml-1" />
                                Email
                            </Label>
                            <Input
                                disabled
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 "
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className="text-sm text-gray-700">
                                <Phone className="text-gray-700 ml-1" />
                                Contact
                            </Label>
                            <Input
                                type="text"
                                name="contact"
                                value={input.contact}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 "
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className="text-sm text-gray-700">
                                <LocationEdit className="text-gray-700 ml-1" />
                                Address
                            </Label>
                            <Input
                                type="text"
                                name="address"
                                value={input.address}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 "
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className="text-sm text-gray-700">
                                <MapPinIcon className="text-gray-700 ml-1" />
                                City
                            </Label>
                            <Input
                                type="text"
                                name="city"
                                value={input.city}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 "
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className="text-sm text-gray-700">
                                <Globe className="text-gray-700 ml-1" />
                                Country
                            </Label>
                            <Input
                                type="text"
                                name="country"
                                value={input.country}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 "
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-button hover:bg-hoverButtonColor sm:w-70 md:w-70 h-12 ">Continue To Payment</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutConfirmPage