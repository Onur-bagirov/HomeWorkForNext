"use client"
import { cn } from "@/lib/utils"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SigninFormSchema, signinFormSchema } from "./signin-form.schema"

export function SigninForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormSchema>({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleSigninWithGitHub = async () => {
        try {
            const result = await signIn("github", { redirect: true, callbackUrl: "/" })
            if (result?.error) {
                throw new Error(result.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onSubmit = async (data: SigninFormSchema) => {
        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (result?.error) {
                throw new Error(result.error)
            }

            router.push("/")
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form
            className={cn(
                "flex flex-col gap-2 rounded-[20px] border border-white/40 bg-[rgba(178,235,242,0.35)] p-8 backdrop-blur-sm",
                className
            )}
            {...props}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FieldGroup className="gap-2">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold tracking-wide text-[#1A1A1A]">
                        Login to your account
                    </h1>
                    <p className="text-sm text-[#546E7A]">
                        Enter your email below to login to your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email" className="text-[#546E7A]">Email</FieldLabel>
                    <Input id="email" {...register("email")} type="email" variant="auth" placeholder="m@example.com" required />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    <FieldDescription className="text-[#78909C]">
                        Use the email address associated with your account.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password" className="text-[#546E7A]">Password</FieldLabel>
                    <Input id="password" {...register("password")} type="password" variant="auth" required />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    <FieldDescription className="text-[#78909C]">
                        Enter the password you used when creating your account.
                    </FieldDescription>
                </Field>
                <Field>
                    <Button type="submit" variant="authPrimary" className="w-full">
                        Login
                    </Button>
                </Field>
                <span className="text-sm text-[#546E7A] text-center">Or continue with</span>
                <Field>
                    <Button
                        type="button"
                        variant="authOutline"
                        className="w-full"
                        onClick={handleSigninWithGitHub}
                    >
                        Login with GitHub
                    </Button>
                    <FieldDescription className="px-6 text-center text-[#546E7A]">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="font-medium text-[#1A1A1A] underline-offset-4 hover:underline">
                            Sign up
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
