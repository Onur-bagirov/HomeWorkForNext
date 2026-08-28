import Image from "next/image";

export default function Sphere() {
    return (
        <Image
            src="/ellipse.png"
            alt=""
            width={1500}
            height={1500}
            className="pointer-events-none size-375 max-w-none mix-blend-screen select-none"
            priority
        />
    );
}
