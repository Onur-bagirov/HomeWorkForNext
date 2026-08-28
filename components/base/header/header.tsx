"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const { status, data: session } = useSession();

    const isAuthenticated = status === "authenticated";

    const handleLogout = () => {
        router.push("/auth/signin");
        signOut();
    }

    return (
        <header className="absolute top-0 left-0 right-0 z-50 h-20 py-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={60} height={100} />
                    </Link>
                    <div className="flex">
                        <ul className="flex gap-42 font-semibold text-[#635F5F]">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/products">Products</Link>
                            </li>
                            <li>
                                <Link href="/gallery">Gallery</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {isAuthenticated ? (

                        <Popover>
                            <PopoverTrigger render={<div className="rounded-full bg-gray-200 p-2 h-12 w-12 flex items-center justify-center border border-[#E5E5E5]">
                                <h3 className="text-2xl font-bold text-gray-500">{session?.user?.name?.charAt(0).toUpperCase()}</h3>
                            </div>} />
                            <PopoverContent className="w-80">
                                <div className="flex flex-col gap-4">

                                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </Button>

                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Link href="/auth/signin">
                            <Button className="text-md bg-linear-to-r from-[#9AE0D3] to-[#67BE9E] text-white py-6 px-12 rounded-sm outline-none border-none font-bold">
                                Login
                            </Button>
                        </Link>
                    )}


                </div>

            </div>

        </header>
    )
}