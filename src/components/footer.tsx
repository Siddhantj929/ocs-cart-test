import { SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from '@tanstack/react-router';

function Footer() {
    return (
        <div className="px-4 pb-4 pt-16 text-center text-xs lg:text-sm text-muted-foreground flex flex-col lg:flex-row gap-3 lg:gap-0 items-center justify-between xl:px-22">
            <span>Copyright © {new Date().getFullYear()}. OneClick Stays. All Rights Reserved.</span>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-3'>
                <NavigationMenu viewportClassName="left-32 lg:left-52">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/about-us" activeProps={{ className: "bg-muted/80" }}>About Us</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/contact-us" activeProps={{ className: "bg-muted/80" }}>Contact Us</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Legal</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[200px]">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="/terms-and-conditions" activeProps={{ className: "bg-muted/80" }}>Terms and Conditions</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link to="/privacy-policy" activeProps={{ className: "bg-muted/80" }}>Privacy Policy</Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link to="/refund-policy" activeProps={{ className: "bg-muted/80" }}>Refund Policy</Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <div className="flex items-center gap-4 text-foreground">
                                <a href="https://instagram.com" target="_blank"><SiInstagram size={18} /></a>
                                <a href="https://instagram.com" target="_blank"><SiX size={18} /></a>
                                <a href="https://instagram.com" target="_blank"><SiYoutube size={22} /></a>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}

export default Footer