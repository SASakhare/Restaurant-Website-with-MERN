import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";



const Success = () => {

    const orders = [1];

    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">Order not found</h1>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0A0A0A] px-4">
            <div className="bg-white dark:bg-[#100f0f] shadow-lg rounded-lg p-6 max-w-lg w-full">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Order Status:{" "}
                        <span className="text-button">{"confirm".toUpperCase()}</span>
                    </h1>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Order Summary</h2>
                    {/* Your Ordered Item Display Here */}

                    <OrderStatusCard />
                    <OrderStatusCard />
                    <OrderStatusCard />
                    <Link to="/">
                        <Button className="bg-button rounded-lg w-full hover:bg-hoverButtonColor">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}



export default Success


const OrderStatusCard = () => {
    return (
        <div className="mb-4 ">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img className="w-17 h-17 rounded-md sm:w-20 sm:h-20 md:w-24 md:h-24" src="https://img.magnific.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium text-xl md:text-2xl">Pasta</h3>
                </div>
                <div className="text-right">
                    <div className="text-gray-800 dark:text-gray-200 flex items-center">
                        <IndianRupee className="text-button" />
                        <span className="text-2xl font-bold text-button">160</span>
                    </div>
                </div>
            </div>
            <Separator className="my-4" />

        </div>
    )
}



