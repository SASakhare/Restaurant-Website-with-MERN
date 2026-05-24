import { Card, CardContent, CardFooter } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

const RestaurantCardSkeleton = () => {
    return (
        <Card className="w-full max-w-sm bg-gray-200 dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden border-0">

            {/* Image Skeleton */}
            <Skeleton className="w-full h-40 rounded-none bg-gray-300 dark:bg-gray-700" />

            <CardContent className="p-4 space-y-4">

                {/* Title */}
                <Skeleton className="h-7 w-52 bg-gray-300 dark:bg-gray-700" />

                {/* City */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Country */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-36 bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Cuisine Badges */}
                <div className="flex gap-2 flex-wrap pt-1">
                    <Skeleton className="h-6 w-16 rounded-md bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-6 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-6 w-14 rounded-md bg-gray-300 dark:bg-gray-700" />
                </div>
            </CardContent>

            <CardFooter className="p-4 border-t border-gray-300 dark:border-gray-700 flex justify-end">
                <Skeleton className="h-10 w-28 rounded-full bg-gray-300 dark:bg-gray-700" />
            </CardFooter>

        </Card>
    )
}

export default RestaurantCardSkeleton