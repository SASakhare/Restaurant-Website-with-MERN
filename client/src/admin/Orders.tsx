import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Orders = () => {
    return (
        <div className="max-6xl mx-auto my-10 px-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">Orders Overview</h1>
            <div className="space-y-8 ">
                {/* Restaurant Orders display here */}
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>

            </div>
        </div>
    )
}

export default Orders


const OrderCard = () => {
    return (
        <div className="flex flex-col gap-4 md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border-gray-500 dark:border-gray-700">
            <div className="flex-1 mb-6 sm:mb-0 ">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">lorem</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-bold text-black">Address : </span>
                    Lorem ipsum dolor sit amet  elit. Sed tenetur facere fugit sit asperiores voluptates laudantium velit provident.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-bold text-button">Total Amount : </span>
                    <span className="font-bold text-button">₹ 100</span>
                </p>
            </div>
            <div className="w-full sm:w-1/3 flex flex-col items-start">
                <Label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Order Status
                </Label>
                <Select >
                    <SelectTrigger className="focus-visible:ring-0 w-3/4">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                ["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"].map((option: string, index: number) => (
                                    <SelectItem
                                        value={option}
                                    >
                                        {
                                            option
                                        }
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>

    )
}