import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { User } from "@/components/base/contact/user-card"

export default async function ContactDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  )

  if (!response.ok) {
    notFound()
  }

  const user: User = await response.json()

  if (!user?.id) {
    notFound()
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <main className="container mx-auto px-4 pb-16 pt-28">
      <div className="mb-6">
        <Link href="/contact">
          <Button type="button" variant="outline">
            Back to contacts
          </Button>
        </Link>
      </div>

      <section className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="border-b border-border bg-muted/40 px-6 py-8 sm:px-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {user.name}
              </h1>
              <p className="mt-1 text-muted-foreground">@{user.username}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {user.company.name}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Email</p>
                <a
                  href={`mailto:${user.email}`}
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {user.email}
                </a>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <a
                  href={`tel:${user.phone}`}
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {user.phone}
                </a>
              </div>
              <div>
                <p className="text-muted-foreground">Website</p>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Address
            </h2>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{user.address.suite}</p>
              <p>{user.address.street}</p>
              <p className="text-muted-foreground">{user.address.city}</p>
            </div>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Company
            </h2>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{user.company.name}</p>
              <p className="italic text-muted-foreground">
                &ldquo;{user.company.catchPhrase}&rdquo;
              </p>
              <p className="text-muted-foreground">{user.company.bs}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
