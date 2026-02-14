import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    ItemActions
} from "@/components/ui/item"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card"
import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { BriefcaseBusiness, FileClock, FileText, Heart, Home, Menu, Pencil, Plane, Ship, UserRound, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"
import CurrencySwitch from "./currency-switch"

const Header = () => {
    const { theme } = useTheme()
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark")

    useEffect(() => {
        if (typeof window === "undefined") return

        const getResolvedTheme = (): "light" | "dark" => {
            if (theme === "system") {
                return window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
            }
            return theme
        }

        setResolvedTheme(getResolvedTheme())

        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
            const handleChange = () => setResolvedTheme(getResolvedTheme())
            mediaQuery.addEventListener("change", handleChange)
            return () => mediaQuery.removeEventListener("change", handleChange)
        }
    }, [theme])

    const logoSrc = resolvedTheme === "dark"
        ? "/images/logo-white.svg"
        : "/images/logo-black.svg"

    return (
        <header className="flex justify-between items-center p-4 xl:px-22 relative h-20">
            <Link to="/">
                <img className="h-8 lg:h-9" src={logoSrc} alt="OneClick Stays" />
            </Link>
            <NavigationMenu className="absolute left-1/2 top-1/2 -translate-1/2 hidden xl:flex">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} h-auto rounded-full hover:cursor-pointer [&_svg:not([class*='size-'])]:size-4.5 px-6 py-3`}>
                            <Link to="/stays" className="flex flex-row items-start gap-2" activeProps={{ className: "bg-muted/80" }}>
                                <Home className="mt-0.5" />
                                <div>
                                    <h2 className="text-md">Luxury Stays</h2>
                                    <p className="text-xs text-muted-foreground">Luxury vacation rentals</p>
                                </div>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} h-auto rounded-full hover:cursor-pointer [&_svg:not([class*='size-'])]:size-4.5 px-6 py-3`}>
                            <Link className="flex flex-row items-start gap-2" to="/" disabled activeProps={{ className: "bg-muted/80" }}>
                                <Plane className="mt-0.5" />
                                <div>
                                    <h2 className="text-md">Private Charters</h2>
                                    <p className="text-xs text-muted-foreground">Coming Soon</p>
                                </div>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} h-auto rounded-full hover:cursor-pointer [&_svg:not([class*='size-'])]:size-4.5 px-6 py-3`}>
                            <Link className="flex flex-row items-start gap-2" to="/" disabled activeProps={{ className: "bg-muted/80" }}>
                                <Ship className="mt-0.5" />
                                <div>
                                    <h2 className="text-md">Cruise Ships</h2>
                                    <p className="text-xs text-muted-foreground">Coming Soon</p>
                                </div>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className="hidden md:flex">
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link className="flex flex-row items-center gap-2" to="/become-a-vendor" activeProps={{ className: "bg-muted/80" }}><BriefcaseBusiness /> Become a Host</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} mx-2 hover:cursor-pointer`}>
                            <Button variant='outline' className="px-2.5" asChild>
                                <Link to="/login" activeProps={{ className: "bg-muted/80" }}>
                                    <UserRound data-icon="inline-start" />
                                    Login
                                </Link>
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:flex">
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} px-0 mr-2 hover:cursor-pointer`}>
                            <CurrencySwitch />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:flex">
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} px-0 mx-0 hover:cursor-pointer`}>
                            <ModeToggle />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="flex md:hidden">
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} px-0 mx-0 hover:cursor-pointer`}>
                            <Drawer direction="right">
                                <DrawerTrigger asChild>
                                    <Button variant='outline' size='icon'><Menu /></Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader className="flex-row justify-between items-center">
                                        <DrawerTitle className="flex items-center gap-2">
                                            {/* <Link to="/">
                                                <img className="h-6" src={logoSrc} alt="OneClick Stays" />
                                            </Link> */}
                                            <CurrencySwitch />
                                            <ModeToggle />
                                        </DrawerTitle>

                                        <DrawerClose>
                                            <Button variant='secondary' size='icon' className="p-0 m-0 bg-muted/35"><X /></Button>
                                        </DrawerClose>
                                    </DrawerHeader>
                                    <div className="flex flex-col gap-2 px-4">
                                        <Card className="p-1 mt-1 bg-card">
                                            {/* <CardHeader className="px-2 py-2 mb-0">
                                                <CardTitle className="text-sm">Login to your account</CardTitle>
                                                <CardDescription className="text-xs/normal">
                                                    Enter your email below to login to your account
                                                </CardDescription>
                                            </CardHeader> */}
                                            <CardContent className="p-0 mt-1">
                                                <Item className="py-0 px-1.5 gap-2">
                                                    <ItemMedia>
                                                        <Avatar className="size-10">
                                                            <AvatarImage src="https://github.com/evilrabbit.png" />
                                                            <AvatarFallback>ER</AvatarFallback>
                                                        </Avatar>
                                                    </ItemMedia>
                                                    <ItemContent className="gap-0.5">
                                                        <ItemTitle>Evil Rabbit</ItemTitle>
                                                        <ItemDescription className="text-xs max-w-40 truncate">Last seen 5 months ago hello world</ItemDescription>
                                                    </ItemContent>
                                                    {/* <ItemActions>
                                                        <Button
                                                            size="icon-xs"
                                                            variant="outline"
                                                            className="rounded-full"
                                                            aria-label="Edit Profile"
                                                        >
                                                            <Pencil />
                                                        </Button>
                                                    </ItemActions> */}
                                                </Item>
                                                <Link to="/" className="flex flex-row items-start gap-2 p-2 mt-3 border-t border-muted" activeProps={{ className: "bg-muted mb-1.5 rounded-md" }}>
                                                    <Pencil className="mt-0.5 text-muted-foreground" size={16} strokeWidth={1.25} />
                                                    <div>
                                                        <h2 className="text-md">Edit Profile</h2>
                                                    </div>
                                                </Link>
                                                <Link to="/" className="flex flex-row items-start gap-2 p-2 border-t border-muted" activeProps={{ className: "bg-muted mb-1.5 rounded-md" }}>
                                                    <FileText className="mt-0.5 text-muted-foreground" size={16} strokeWidth={1.25} />
                                                    <div>
                                                        <h2 className="text-md">My Bookings</h2>
                                                    </div>
                                                </Link>
                                                <Link to="/" className="flex flex-row items-start gap-2 p-2 border-t border-muted" activeProps={{ className: "bg-muted mb-1.5 rounded-md" }}>
                                                    <Heart className="mt-0.5 text-muted-foreground" size={16} strokeWidth={1.25} />
                                                    <div>
                                                        <h2 className="text-md">My Favorites</h2>
                                                    </div>
                                                </Link>
                                            </CardContent>
                                            <CardFooter className="flex-col gap-2 p-1 pt-0 -mt-3">
                                                <Button type="submit" variant='outline' className="w-full">
                                                    Logout
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                        <div className="flex flex-col gap-0 mt-3">
                                            <Link to="/about-us" className="flex flex-row items-start gap-2 p-2 rounded-md" activeProps={{ className: "bg-muted/25" }}>
                                                <Home className="mt-0.5 text-muted-foreground" size={16} strokeWidth={1.25} />
                                                <div>
                                                    <h2 className="text-md">Luxury Stays</h2>
                                                    {/* <p className="text-xs text-muted-foreground">Luxury vacation rentals</p> */}
                                                </div>
                                            </Link>
                                            <Link to="/" className="flex flex-row items-start gap-2 p-2 rounded-md" activeProps={{ className: "bg-muted/60" }}>
                                                <Plane className="mt-0.5 text-muted-foreground" size={16} strokeWidth={1.25} />
                                                <div>
                                                    <h2 className="text-md"><span className="opacity-50">Private Charters</span> <span className="text-[0.6rem] uppercase tracking-wider font-medium ml-1">Coming Soon</span></h2>
                                                    {/* <p className="text-xs text-muted-foreground">Coming Soon</p> */}
                                                </div>
                                            </Link>
                                            <Link to="/" className="flex flex-row items-start gap-2 p-2 rounded-md" activeProps={{ className: "bg-muted/60" }}>
                                                <Ship className="mt-0.5 text-muted-foreground" size={16} strokeWidth={1.25} />
                                                <div>
                                                    <h2 className="text-md"><span className="opacity-50">Cruise Ships</span> <span className="text-[0.6rem] uppercase tracking-wider font-medium ml-1">Coming Soon</span></h2>
                                                    {/* <p className="text-xs text-muted-foreground">Coming Soon</p> */}
                                                </div>
                                            </Link>
                                        </div>
                                        <hr />
                                        <div className="flex flex-col gap-2.5 px-2 mt-1.5">
                                            {/* <p className="text-muted-foreground text-xs/normal">Want to promote your stays with us?</p> */}
                                            <Link className="flex flex-row items-center gap-2" to="/become-a-vendor" activeProps={{ className: "bg-muted/80" }}><BriefcaseBusiness className="text-muted-foreground" strokeWidth={1.25} size={16} /> Become a Host</Link>
                                        </div>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}

export default Header