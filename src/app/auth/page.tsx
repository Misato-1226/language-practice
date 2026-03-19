import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  async function handleSignOut() {
    "use server"
    await signOut({ redirectTo: "/login" })
  }

  return (
    <div>
      {/* メインコンテンツ */}
      <main className="mx-auto max-w-3xl px-6 py-12"></main>
    </div>
  )
}
