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
            <div className="flex w-full items-center justify-center">
                <span className="text-xl font-bold underline underline-offset-4">Crypto Calc</span>
            </div>
            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
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
