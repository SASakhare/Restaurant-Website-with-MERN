import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardFooter } from "./ui/card"

const AvailableMenuSkeleton = () => {
    return (
        <div className="p-2 md:p-4">

            {/* Heading Skeleton */}
            <Skeleton className="h-8 w-56 mb-6 bg-gray-300 dark:bg-gray-700" />

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

                {
                    Array(8).fill(null).map((_, index) => (
                        <FoodCardSkeleton key={index} />
                    ))
                }

            </div>
        </div>
    )
}

export default AvailableMenuSkeleton



const FoodCardSkeleton = () => {
    return (
        <Card className="w-3/4 sm:w-full md:w-full mx-auto shadow-lg rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900 border-0">

            {/* Image Skeleton */}
            <Skeleton className="w-full h-52 rounded-none bg-gray-300 dark:bg-gray-700" />

            <CardContent className="p-4 space-y-4">

                {/* Title */}
                <Skeleton className="h-7 w-44 bg-gray-300 dark:bg-gray-700" />

                {/* Description */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-[90%] bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-[70%] bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Price */}
                <Skeleton className="h-6 w-28 bg-gray-300 dark:bg-gray-700" />

            </CardContent>

            <CardFooter>
                {/* Button Skeleton */}
                <Skeleton className="h-10 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
            </CardFooter>

        </Card>
    )
}