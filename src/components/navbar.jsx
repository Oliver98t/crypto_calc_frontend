import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "@heroui/link";
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <HeroUINavbar maxWidth="xl" position="sticky" className="rounded-xl">
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
                            navigate("/");
                        }}
                    >
                        Sign Out
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </HeroUINavbar>
    );
};
