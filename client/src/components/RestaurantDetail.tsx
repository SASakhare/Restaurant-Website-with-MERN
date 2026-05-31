
import { useRestaurantStore } from '@/store/useRestaurantStore'
import AvailableMenu from './AvailableMenu'
import { Badge } from './ui/badge'
import { Timer } from 'lucide-react'





const RestaurantDetail = () => {

    const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="w-full ">
                <div className="relative w-full h-32 md:h-72 ">
                    <img src={singleRestaurant?.imageUrl} alt={singleRestaurant?.restaurantName} className='object-cover w-full h-full rounded-lg' />
                </div>

                <div className='flex items-center flex-col w-full md:flex-row justify-center'>
                    <div className='my-5'>
                        <h1 className='font-medium text-xl md:text-3xl'>{singleRestaurant?.restaurantName}</h1>
                        <div className='flex gap-2 my-2'>
                            {
                                singleRestaurant?.cuisines.map((cuisine: string, idx: number) => (
                                    <Badge key={idx} className='bg-button hover:bg-hoverButtonColor'>
                                        {
                                            cuisine
                                        }
                                    </Badge>
                                ))
                            }
                        </div>
                        <div className='flex md:flex-row flex-col gap-2 my-5'>
                            <div className='flex items-center gap-2'>
                                <Timer
                                    className='w-4 h-5'
                                />
                                <h1 className='flex items-center gap-2 font-medium'>
                                    Delivery Time :{" "}
                                    <span className='text-[#D19254]'>
                                        {singleRestaurant?.deliveryTime} minutes
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <AvailableMenu />
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetail