import { useParams } from "react-router-dom"
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

import { X } from "lucide-react";
import NoResultFound from "./NoResultFound";
import { useRestaurantStore, type Restaurant } from "@/store/useRestaurantStore";


const SearchPage = () => {

    const params = useParams();
    const [searchQuery, setSearchQuery] = useState<string>("");

    const { loading, searchRestaurant, appliedFilter, searchRestaurants, setAppliedFilter } = useRestaurantStore();

    const onSearchHandler = async () => {

        await searchRestaurant(params.text!, searchQuery, []);

    }
    useEffect(() => {
        const fetchRestaurants = async () => {

            await searchRestaurant(params.text!, searchQuery, appliedFilter);
        }
        fetchRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.text, appliedFilter])


    return (
        <div className="max-w-7xl lg:mx-auto my-10  md:mx-6 mx-3">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <FilterPage />
                <div className="flex-1 ">
                    <div className="flex items-center justify-between gap-3">

                        {/* Search Input Field */}
                        <Input
                            className="outline-none focus-visible:ring-0"
                            type="text"
                            name="searchquery"
                            placeholder="Search by restaurant & cuisines"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <Button onClick={onSearchHandler} className="bg-button hover:bg-hoverButtonColor w-[15%]">
                            search
                        </Button>
                    </div>
                    {/* Searched Items display here */}
                    <div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
                            <h1 className="mt-2 font-medium text-lg">({searchRestaurants && searchRestaurants.length}) Search result found</h1>
                            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                {
                                    appliedFilter.map((selectedFilter: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="relative inline-flex items-center max-w-full"
                                        >
                                            <Badge className="text-[#D19254] rounded-md hover:cursor-pointer  text-center pr-6" variant={"outline"}>
                                                {
                                                    selectedFilter
                                                }
                                            </Badge>
                                            <X
                                                onClick={() => (setAppliedFilter(selectedFilter))}
                                                size={16}
                                                className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                                            />
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        {/* Restaurant Cards */}

                        {
                            (!loading && (!searchRestaurants || searchRestaurants.length === 0)) ? (
                                <NoResultFound searchText={`${params.text}`} />
                            ) : (

                                <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                    {
                                        !loading ? (
                                            <>
                                                {
                                                    searchRestaurants && searchRestaurants.map((item: Restaurant) => (

                                                        <RestaurantCard item={item} />
                                                    ))
                                                }
                                            </>

                                        ) : (
                                            <>
                                                <RestaurantCardSkeleton />
                                                <RestaurantCardSkeleton />
                                                <RestaurantCardSkeleton />
                                            </>
                                        )
                                    }
                                </div>

                            )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchPage
