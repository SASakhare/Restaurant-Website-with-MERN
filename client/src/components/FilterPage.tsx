import { useRestaurantStore } from "@/store/useRestaurantStore"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

type FilterOptionsState = {
    id: string,
    label: string,
}


const filterOptions: FilterOptionsState[] = [
    {
        id: "burger",
        label: "burger",
    },
    {
        id: "thali",
        label: "Thali",
    },
    {
        id: "biryani",
        label: "Biryani",
    },
    {
        id: "momos",
        label: "Momos",
    },
]


const FilterPage = () => {


    const {setAppliedFilter, resetAppliedFilter, appliedFilter } = useRestaurantStore();
    const appliedFilterHandler = (e: boolean, label: string) => {
        setAppliedFilter(label);
    }

    const resetHandler = () => {
        resetAppliedFilter();
    }

    return (
        <div className="lg:w-72 mx-4 ml-6">
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-lg">Filter by Cuisines</h1>
                <Button onClick={resetHandler} variant={"link"}>Reset</Button>
            </div>
            {
                filterOptions.map((option: FilterOptionsState) => (
                    <div key={option.id} className="flex items-center space-x-2 my-5">
                        <Checkbox
                            id={option.id}
                            checked={appliedFilter.includes(option.label)}
                            className="
                                    border-button
                                    data-[state=checked]:bg-button
                                    data-[state=checked]:border-button
                                    data-[state=checked]:text-white
                                    "
                            onCheckedChange={(e: boolean) => appliedFilterHandler(e, option.label)}
                        />
                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">{option.label}</Label>
                    </div>
                ))
            }

        </div>
    )
}

export default FilterPage