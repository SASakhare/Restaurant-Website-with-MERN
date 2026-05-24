import { Minus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import CheckoutConfirmPage from "./CheckoutConfirmPage"

const Cart = () => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10 px-1 md:p-4">
            <div className="flex justify-end">
                <Button className="md:w-1/8 w-25 bg-button hover:bg-hoverButtonColor">Clear All</Button>
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
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                    <MyTableRow />
                </TableBody>
                <TableFooter>
                    <TableCell colSpan={5} className="text-center font-extrabold">Total</TableCell>
                    <TableCell className="font-extrabold">₹ 180</TableCell>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button onClick={() => { setOpen(!open) }} className="bg-button hover:bg-hoverButtonColor md:h-12">Proceed To Checkout</Button>
            </div>
            <CheckoutConfirmPage open={open} setOpen={setOpen} />
        </div>
    )
}

export default Cart

const MyTableRow = () => {
    return <>
        <TableRow>
            <TableCell className="grid place-items-center">
                <Avatar>
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>CA</AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell className="text-center" >Biryani</TableCell>
            <TableCell className="text-center">₹90</TableCell>
            <TableCell className="grid place-items-center">
                <div className="w-fit flex justify-between gap-1 items-center rounded-full border border-gray-100 dark:border-gray-800 ">
                    <Button size={'icon'} className="rounded-full" variant={'outline'}>
                        <Minus className="" />
                    </Button>
                    <Button disabled size={'icon'} className="rounded-full" variant={'outline'}>
                        2
                    </Button>
                    <Button size={'icon'} className="rounded-full" variant={'outline'}>
                        <Plus className="" />
                    </Button>
                </div>
            </TableCell>
            <TableCell className="text-center">₹ 180</TableCell>
            <TableCell className="flex justify-center items-center">
                <div className="bg-button px-2 py-1 md:w-3/4 grid place-items-center rounded-sm">
                    Remove
                </div>
            </TableCell>
        </TableRow>
    </>
}