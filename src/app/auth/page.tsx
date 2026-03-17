import { auth, signOut } from "@/auth"
import Link from "next/link"
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
    <div className="min-h-screen" style={{ backgroundColor: "#F2EDD7" }}>
      {/* ヘッダー */}
      <header
        className="flex items-center justify-between px-6 py-4 shadow-sm"
        style={{ backgroundColor: "#FFFDF7" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="inline-flex items-center justify-center w-9 h-9 rounded-full"
            style={{ backgroundColor: "#A0714F" }}
          >
            <span className="text-white text-lg font-bold">L</span>
          </div>
          <span className="text-lg font-bold" style={{ color: "#3D2B1F" }}>
            Language Exchange
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "#A0714F" }}>
            {session.user?.name ?? session.user?.email}
          </span>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#C8D8A8", color: "#3D2B1F" }}
            >
              ログアウト
            </button>
          </form>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="rounded-2xl shadow-sm p-8"
          style={{ backgroundColor: "#FFFDF7" }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#3D2B1F" }}>
            ようこそ！
          </h2>
          <p className="text-sm mb-8" style={{ color: "#A0714F" }}>
            カフェや公園で、気軽に言語交換しよう
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl p-6 border"
              style={{ borderColor: "#C8D8A8", backgroundColor: "#F2EDD7" }}
            >
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold mb-1" style={{ color: "#3D2B1F" }}>
                パートナーを探す
              </h3>
              <p className="text-xs" style={{ color: "#A0714F" }}>
                近くの言語交換パートナーを見つけよう
              </p>
            </div>

            <div
              className="rounded-xl p-6 border"
              style={{ borderColor: "#C8D8A8", backgroundColor: "#F2EDD7" }}
            >
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-semibold mb-1" style={{ color: "#3D2B1F" }}>
                セッションを予約
              </h3>
              <p className="text-xs" style={{ color: "#A0714F" }}>
                都合のいい日時でセッションを設定しよう
              </p>
            </div>

            <div
              className="rounded-xl p-6 border"
              style={{ borderColor: "#C8D8A8", backgroundColor: "#F2EDD7" }}
            >
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-semibold mb-1" style={{ color: "#3D2B1F" }}>
                メッセージ
              </h3>
              <p className="text-xs" style={{ color: "#A0714F" }}>
                パートナーとチャットしよう
              </p>
            </div>

            <div
              className="rounded-xl p-6 border"
              style={{ borderColor: "#C8D8A8", backgroundColor: "#F2EDD7" }}
            >
              <div className="text-2xl mb-2">👤</div>
              <Link href={"/auth/profile"} className="font-semibold mb-1" style={{ color: "#3D2B1F" }}>
                プロフィール
              </Link>
              <p className="text-xs" style={{ color: "#A0714F" }}>
                自己紹介と学習言語を設定しよう
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// TODO: プロフィールページを作成して内容を考える
// TODO: ログイン後のページ（このページ）の構成を考える