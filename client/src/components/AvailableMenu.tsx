import AvailableMenuSkeleton from "./AvailableMenuSkeleton";
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"



const AvailableMenu = () => {

    const loading = false;

    if (loading) {
        return (<>
            <AvailableMenuSkeleton />
        </>)
    }
    return (
        <div className="p-2  md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-4 md:space-y-0 gap-3">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </div>
        </div>
    )
}

export default AvailableMenu


export const FoodCard = () => {
    return (
        <Card className="w-3/4 sm:w-full md:w-full mx-auto shadow-lg rounded-lg overflow-hidden hover:shadow-2xl  transition-all duration-300">
            <img src={"https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg"}
                alt="food image"
                className='object-cover w-full h-full rounded-lg'
            />
            <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Tandoori Biryani
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates molestias sequi aliquam ullam
                </p>
                <h3 className="text-xl font-bold mt-3 text-[#D19254]">
                    <span >Price</span> : ₹<span>80</span>
                </h3>
            </CardContent>
            <CardFooter >
                <Button className="w-full bg-button hover:bg-hoverButtonColor">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}



