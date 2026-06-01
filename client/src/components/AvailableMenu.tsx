import { useRestaurantStore, type MenuItem } from "@/store/useRestaurantStore";
import AvailableMenuSkeleton from "./AvailableMenuSkeleton";
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { useCartStore } from "@/store/useCartStore";



const AvailableMenu = () => {

    const { singleRestaurant, getSingleRestaurant, loading } = useRestaurantStore();

    if (loading) {
        return (<>
            <AvailableMenuSkeleton />
        </>)
    }
    return (
        <div className="p-2  md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-4 md:space-y-0 gap-3">
                {
                    singleRestaurant?.menus.map((item) => (
                        // //(item);
                        <FoodCard item={item as MenuItem} />

                    ))
                }
            </div>
        </div>
    )
}

export default AvailableMenu


export const FoodCard = ({ item }: { item: MenuItem }) => {

    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        addToCart(item);
    }

    return (
        <Card className="w-3/4 sm:w-full md:w-full mx-auto shadow-lg rounded-lg overflow-hidden hover:shadow-2xl  transition-all duration-300">
            <img src={item.image}
                alt={item.name}
                className='object-cover w-full h-full rounded-lg'
            />
            <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                    {
                        item.description
                    }
                </p>
                <h3 className="text-xl font-bold mt-3 text-[#D19254]">
                    <span >Price</span> : ₹<span>{item.price}</span>
                </h3>
            </CardContent>
            <CardFooter >
                <Button onClick={handleAddToCart} className="w-full bg-button hover:bg-hoverButtonColor">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}



