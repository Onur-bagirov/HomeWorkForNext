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
import { signupFormSchema, SignupFormSchema } from "./singup-form.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { api } from "@/shared/api/api-instance"


export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignupFormSchema>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })     

    const handleSignupWithGitHub = async () => {
        try {
            const result = await signIn("github", { redirect: true, callbackUrl: "/" });
            if (result?.error) {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSignupWithGoogle = async () => {
        try {
            const result = await signIn("google", { redirect: true, callbackUrl: "/auth/signin" });
            if (result?.error) {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async (data: SignupFormSchema) => {
        try {
            const response = await api.post("/users", data);

            if (response.status === 409) {
                setError("email", { message: response.data.error });
                return;
            }

            if (response.status !== 201) {
                throw new Error(response.data.error || "Failed to create user");
            }

            router.push("/auth/signin");
            router.refresh();
        } catch (error) {
            console.error(error);
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
                        Create your account
                    </h1>
                    <p className="text-sm text-[#546E7A]">
                        Fill in the form below to create your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="name" className="text-[#546E7A]">Full Name</FieldLabel>
                    <Input id="name" {...register("name")} type="text" variant="auth" placeholder="John Doe" required />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </Field>
                <Field>
                    <FieldLabel htmlFor="email" className="text-[#546E7A]">Email</FieldLabel>
                    <Input id="email" {...register("email")} type="email" variant="auth" placeholder="m@example.com" required />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    <FieldDescription className="text-[#78909C]">
                        We&apos;ll use this to contact you. We will not share your email
                        with anyone else.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password" className="text-[#546E7A]">Password</FieldLabel>
                    <Input id="password" {...register("password")} type="password" variant="auth" required />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    <FieldDescription className="text-[#78909C]">
                        Must be at least 8 characters long.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="confirm-password" className="text-[#546E7A]">Confirm Password</FieldLabel>
                    <Input id="confirm-password" {...register("confirmPassword")} type="password" variant="auth" required />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                    <FieldDescription className="text-[#78909C]">Please confirm your password.</FieldDescription>
                </Field>
                <Field>
                    <Button type="submit" variant="authPrimary" className="w-full">
                        Create Account
                    </Button>
                </Field>
                <span className="text-sm text-[#546E7A] text-center">Or continue with</span>
                <Field>
                    <Button
                        type="button"
                        variant="authOutline"
                        className="w-full"
                        onClick={handleSignupWithGitHub}
                    >
                        Sign up with GitHub
                    </Button>
                    <Button
                        type="button"
                        variant="authOutline"
                        className="w-full"
                        onClick={handleSignupWithGoogle}
                    >
                        Sign up with Google
                    </Button>
                    <FieldDescription className="px-6 text-center text-[#546E7A]">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="font-medium text-[#1A1A1A] underline-offset-4 hover:underline">
                            Sign in
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
