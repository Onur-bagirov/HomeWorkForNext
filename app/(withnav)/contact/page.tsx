import { UserCard, type User } from "@/components/base/contact/user-card"

export default async function Contact() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
  const users: User[] = await data.json()

  return (
    <main className="container mx-auto px-4 pb-16 pt-28">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our team directory and open a card to see full user details.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  )
}
