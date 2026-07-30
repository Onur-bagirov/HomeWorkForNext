import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 h-20 py-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={60} height={100} />
                    </Link>
                    <div className="flex">
                        <ul className="flex gap-8">
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
                    <Link href="/auth/signin">
                        <Button>
                            Login
                        </Button>
                    </Link>
                </div>

            </div>
            
        </header>
    )
}