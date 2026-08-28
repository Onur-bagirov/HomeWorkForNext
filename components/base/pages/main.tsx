"use client"

import Scooter from "@/components/models/e-scooter";
import Sphere from "@/components/models/sphere";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden">
            <motion.div
                className="pointer-events-none absolute bottom-[15%] left-[36%] z-0"
                initial={{ x: "35vw", rotate: 0 }}
                animate={{ x: 0, rotate: 360 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <Sphere />
            </motion.div>

            <div className="relative z-10 grid min-h-screen grid-cols-2">
                <div className="flex flex-col justify-center pl-12 lg:pl-20">
                    <p className="text-lg font-light tracking-[0.35em] text-neutral-700 uppercase">
                        Let&apos;s ride the
                    </p>
                    <h1 className="text-7xl leading-none font-bold tracking-tight text-black lg:text-8xl xl:text-9xl">
                        FUTURE
                    </h1>
                    <p className="mt-4 max-w-xs text-neutral-600">
                        Simple and sleek design with users in mind.
                    </p>
                    <Button
                        className="mt-10 h-12 w-fit rounded-full bg-linear-to-r from-[#D6F3F8] to-[#8ECFE0] px-10 text-sm font-semibold tracking-[0.2em] text-[#1A1A1A] uppercase hover:opacity-90"
                    >
                        Pre-order
                    </Button>
                </div>

                <div className="flex items-center justify-center">
                    <Scooter />
                </div>
            </div>
        </section>
    );
}
