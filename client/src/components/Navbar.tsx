import { Link, useNavigate } from "react-router-dom"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider"
import { Button } from "./ui/button";
import { HandPlatter, Home, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, Utensils } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";

const Navbar = () => {

    const { setTheme } = useTheme();
    const navigate = useNavigate();
    const { user, loading, logout } = useUserStore();
    const { cart } = useCartStore();
    const handleLogout = async () => {

        try {
            await logout();
            navigate('/login')

        } catch (error) {
            //(error);

        }
    }
    return (
        <div className='max-w-7xl mx-auto p-7'>
            <div className='flex items-center justify-between h-14'>
                <Link to={'/'}>
                    <h1 className="font-bold md:font-extrabold text-2xl">Royal Masala</h1>
                </Link>
                <div className="hidden md:flex items-center gap-10">
                    <div className="hidden md:flex items-center gap-6">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/profile'}>Profile</Link>
                        <Link to={'/order/status'}>Orders</Link>
                        {user?.admin &&
                            (
                                <Menubar>
                                    <MenubarMenu>
                                        <MenubarTrigger>
                                            Dashboard
                                        </MenubarTrigger>
                                        <MenubarContent>
                                            <MenubarItem>
                                                <Link to={'/admin/restaurant'}>
                                                    Restaurant
                                                </Link>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <Link to={'/admin/menu'}>
                                                    Menu
                                                </Link>
                                            </MenubarItem>
                                            <MenubarItem>
                                                <Link to={'/admin/orders'}>
                                                    Orders
                                                </Link>
                                            </MenubarItem>
                                        </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>
                            )
                        }

                    </div>
                    <div className="flex gap-5">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="focus-visible:outline-0 focus-visible:ring-0">
                                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div>
                            <Link to={'/cart'} className="relative cursor-pointer">
                                <ShoppingCart />
                                <Button size={"icon"} className="absolute -inset-3 left-3 w-4 h-4 rounded-full text-center bg-red-500" >{cart.length}</Button>
                            </Link>
                        </div>

                        <div>
                            <Avatar onClick={() => { navigate('/profile') }} className="hover:cursor-pointer">
                                <AvatarImage src={user?.profilePicture} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>

                        <div>
                            {
                                loading ? (
                                    <Button disabled className="bg-button hover:bg-hoverButtonColor">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button onClick={handleLogout} className="bg-button hover:bg-hoverButtonColor">
                                        Log out
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="md:hidden lg:hidden">
                    {/*  Mobile Response design */}
                    <MobileNavBar />
                </div>

            </div>
        </div>
    )
}

export default Navbar


const MobileNavBar = () => {


    const navigate = useNavigate();
    const { user, logout, loading } = useUserStore();
    const { cart } = useCartStore();
    const handleLogout = async () => {

        try {
            await logout();
            navigate('/login')

        } catch (error) {
            //(error);

        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={'icon'} className="rounded-full bg-gray-200 text-black hover:bg-gray-400" variant="outline">
                    <Menu size={'18'} />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col p-4">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle className="font-bold text-2xl">Royal Masala</SheetTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SheetHeader>
                <Separator className="my-2" />
                <SheetDescription className="flex-1 ">
                    <Link to={'/'} className="flex mt-1 mb-2 bg-gray-100 items-center gap-8  px-3 py-2 cursor-pointer hover:bg-gray-200 rounded-xl text-black">
                        <Home />
                        <span>
                            Home
                        </span>
                    </Link>
                    <Link to={'/profile'} className="flex mt-1 mb-2 bg-gray-100 items-center gap-8  px-3 py-2 cursor-pointer hover:bg-gray-200 rounded-xl text-black">
                        <User />
                        <span>
                            Profile
                        </span>
                    </Link>
                    <Link to={'/order'} className="flex mt-1 mb-2 bg-gray-100 items-center gap-8  px-3 py-2 cursor-pointer hover:bg-gray-200 rounded-xl text-black">
                        <HandPlatter />
                        <span>
                            Order
                        </span>
                    </Link>
                    <Link to={'/cart'} className="flex mt-1 mb-2 bg-gray-100 items-center gap-8  px-3 py-2 cursor-pointer hover:bg-gray-200 rounded-xl text-black">
                        <ShoppingCart />
                        <span>
                            Cart {cart.length}
                        </span>
                    </Link>
                    {
                        user?.admin && (<>

                            <Link to={'/admin/menu'} className="flex mt-1 mb-2 bg-gray-100 items-center gap-8  px-3 py-2 cursor-pointer hover:bg-gray-200 rounded-xl text-black">
                                <SquareMenu />
                                <span>
                                    Menu
                                </span>
                            </Link>
                            <Link to={'/admin/restaurant'} className="flex mt-1 mb-2 bg-gray-100 items-center gap-8  px-3 py-2 cursor-pointer hover:bg-gray-200 rounded-xl text-black">
                                <Utensils />
                                <span>
                                    Restaurant
                                </span>
                            </Link>
                            <Link to={'/admin/orders'} className="flex mt-1 mb-2 bg-gray-100 items-center gap-8  px-3 py-2 cursor-pointer hover:bg-gray-200 rounded-xl text-black">
                                <PackageCheck />
                                <span>
                                    Restaurants Orders
                                </span>
                            </Link>
                        </>
                        )}
                </SheetDescription>
                <SheetFooter>
                    {
                        (
                            <div className="flex flex-row items-center gap-6 bg-gray-100 mb-2 p-1 mx-auto w-full hover:bg-gray-200 rounded-xl font-black text-" >
                                <Avatar>
                                    <AvatarImage />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h1>Sejal Sakhare</h1>
                            </div>

                        )
                    }
                    <SheetClose asChild>
                        <>
                            {
                                loading ? (
                                    <Button disabled className="bg-button hover:bg-hoverButtonColor">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button onClick={handleLogout} className="bg-button hover:bg-hoverButtonColor">
                                        Log out
                                    </Button>
                                )
                            }
                        </>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}