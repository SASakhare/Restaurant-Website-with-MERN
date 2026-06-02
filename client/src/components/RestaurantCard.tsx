import { Card, CardContent, CardFooter } from './ui/card'
import { AspectRatio } from './ui/aspect-ratio'
import { Globe, MapPin } from 'lucide-react'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

import { useRestaurantStore, type Restaurant } from "@/store/useRestaurantStore"


const RestaurantCard = ({ item }: { item: Restaurant }) => {

    const { getSingleRestaurant } = useRestaurantStore();

    const viewMenuHandler = async () => {

        await getSingleRestaurant(item._id);
    }

    return (
        <Card className="w-full max-w-sm dark:bg-gray-800 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
            <div className="relative">

                <AspectRatio ratio={16 / 6}>
                    <img
                        src={item.imageUrl}
                        alt="Card Image"
                        className="w-full h-full object-cover"
                    />
                </AspectRatio>
                <div className="absolute top-2 left-2 bg-white/80  dark:bg-gray-700/80 rounded-sm py-0.5 px-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">Featured</span>
                </div>
                <CardContent className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.restaurantName}</h1>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin
                            size={16}
                        />
                        <p className="text-sm">
                            City:{""}
                            <span className="font-medium">{item.city}</span>
                        </p>
                    </div>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <Globe
                            size={16}
                        />
                        <p className="text-sm">
                            Country:{""}
                            <span className="font-medium">{item.country}</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {
                            item.cuisines.map((cuisine: string, idx: number) => (
                                <div
                                    key={idx}
                                    className="relative inline-flex items-center max-w-full"
                                >
                                    <Badge className=" bg-button text-white hover:bg-hoverButtonColor rounded-md hover:cursor-pointer  text-center " variant={"outline"}>
                                        {
                                            cuisine
                                        }
                                    </Badge>
                                </div>
                            ))
                        }
                    </div>
                </CardContent>
                <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                    <Link to={`/restaurant/${item._id}`}>
                        <Button onClick={viewMenuHandler} className="bg-button hover:bg-hoverButtonColor font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">View Menus</Button>
                    </Link>
                </CardFooter>
            </div>

        </Card>
    )
}

export default RestaurantCard
