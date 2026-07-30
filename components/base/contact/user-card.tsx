"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const router = useRouter()

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

    const handleUserClick = ()=>{
      router.push(`/contact/${user.id}`)
    }

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold leading-tight">
            {user.name}
          </h2>
          <p className="truncate text-sm text-muted-foreground">
            @{user.username}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 text-sm">
        <p className="truncate text-muted-foreground">{user.email}</p>
        <p className="truncate text-muted-foreground">{user.company.name}</p>
      </div>

     

      <div className="mt-auto pt-5">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleUserClick}
        >
          {"Show User Info"}
        </Button>
      </div>
    </article>
  )
}
