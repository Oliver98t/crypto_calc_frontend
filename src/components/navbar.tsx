import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import { siteConfig } from "@/config/site";
import {
    GithubIcon,
} from "@/components/icons";

export const Navbar = () => {
    return (
        <HeroUINavbar maxWidth="xl" position="sticky" className="rounded-xl">
            {/* Left-aligned GitHub icon */}
            <NavbarContent className="basis-1/5" justify="start">
                <NavbarItem>
                    <Link isExternal href={siteConfig.links.github} title="GitHub">
                        <GithubIcon className="text-default-500" />
                    </Link>
                </NavbarItem>
            </NavbarContent>
            {/* Centered title */}
            <NavbarContent className="flex-1 justify-center">
                <NavbarItem>
                    <span className="text-xl font-bold underline underline-offset-4">Crypto Calc</span>
                </NavbarItem>
            </NavbarContent>
            {/* Right-aligned content */}
            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    {/* Sign Out Button */}
                    <Button
                        variant="flat"
                        onClick={() => {
                            // TODO: Add sign out logic here
                            alert("Signed out!");
                        }}
                    >
                        Sign Out
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </HeroUINavbar>
    );
};
