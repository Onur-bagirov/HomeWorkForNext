import { SignupForm } from "@/components/base/auth/signup/signup-form"
import Image from "next/image"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-wide text-[#1A1A1A]">
            EV-B
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          fill
          src="/placeholder.svg"
          alt="EV-B"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
