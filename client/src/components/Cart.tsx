import { Minus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { useEffect, useState } from "react"
import CheckoutConfirmPage from "./CheckoutConfirmPage"
import { useCartStore, type CartItem } from "@/store/useCartStore"
import { toast } from "sonner"

const Cart = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0)
    const { cart, clearCart } = useCartStore();
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTotal(0);
        cart.map((item) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setTotal((prev) => {
                return prev + (item.price * item.quantity)
            })

        })
    }, [cart])

    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10 px-1 md:p-4">
            <div className="flex justify-end">
                <Button onClick={() => { clearCart() }} className="md:w-1/8 w-25 bg-button hover:bg-hoverButtonColor">Clear All</Button>
            </div>


            <Table className="mt-6">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Items</TableHead>
                        <TableHead className="text-center">Title</TableHead>
                        <TableHead className="text-center">Price</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cart.map((item) => (

                            <MyTableRow item={item} total={total} />
                        ))
                    }
                </TableBody>
                <TableFooter>
                    <TableCell colSpan={5} className="text-center font-extrabold">Total</TableCell>
                    <TableCell className="font-extrabold">₹
                        {
                            total
                        }
                    </TableCell>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button onClick={() => {
                    if (cart.length == 0) {
                        toast.error("Cart is Empty");
                        return;
                    } else {
                        setOpen(!open)
                        return;
                    }

                }} className="bg-button hover:bg-hoverButtonColor w-full md:h-12">Proceed To Checkout</Button>
            </div>
            <CheckoutConfirmPage open={open} setOpen={setOpen} />
        </div>
    )
}

export default Cart

const MyTableRow = ({ item, total }: { item: CartItem, total: number }) => {

    const { incrementQuantity, decrementQuantity, removeFromTheCart } = useCartStore();

    return <>
        <TableRow>
            <TableCell className="grid place-items-center">
                <Avatar>
                    <AvatarImage src={item.image} alt="" />
                    <AvatarFallback>CA</AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell className="text-center" >{item.name}</TableCell>
            <TableCell className="text-center">₹{item.price}</TableCell>
            <TableCell className="grid place-items-center">
                <div className="w-fit flex justify-between gap-1 items-center rounded-full border border-gray-100 dark:border-gray-800 ">
                    <Button onClick={() => { decrementQuantity(item._id) }} size={'icon'} className="rounded-full" variant={'outline'}>
                        <Minus className="" />
                    </Button>
                    <Button disabled size={'icon'} className="rounded-full" variant={'outline'}>
                        {item.quantity}
                    </Button>
                    <Button onClick={() => { incrementQuantity(item._id) }} size={'icon'} className="rounded-full" variant={'outline'}>
                        <Plus className="" />
                    </Button>
                </div>
            </TableCell>
            <TableCell className="text-center">₹ {total}</TableCell>
            <TableCell className="flex justify-center items-center">
                <Button onClick={() => { removeFromTheCart(item._id) }} className="bg-button hover:bg-hoverButtonColor px-2 py-1 md:w-3/4 grid place-items-center rounded-sm  w-25">
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    </>
}