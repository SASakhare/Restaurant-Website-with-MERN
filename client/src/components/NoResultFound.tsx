import { Link } from "react-router-dom"
import { Button } from "./ui/button"



const NoResultFound = ({ searchText }: { searchText: string }) => {

    return (
        <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                No result found
            </h1>
            <p>
                We couldn't find any result for "{searchText}" . <br /> Try searching with a different tern.
            </p>
            <Link to='/'>
                <Button className="mt-4 bg-button hover:bg-hoverButtonColor">
                    Go Back to Home
                </Button>
            </Link>
        </div>
    )
}

export default NoResultFound