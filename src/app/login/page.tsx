import { signIn } from "@/auth"
import { BiCoffeeTogo } from "react-icons/bi";

const Login = () => {
    async function handleGoogleSignIn() {
        "use server"
        await signIn("google", { redirectTo: "/auth" })
    }

    async function handleCredentialsSignIn(formData: FormData) {
        "use server"
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/",
        })
    }

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center"
            style={{ backgroundColor: "#F2EDD7" }}
        >
            {/* カード外タイトル */}
            <div className="text-center mb-8">
                <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: "#A0714F" }}
                >
                    <span className="text-white text-3xl font-bold">L</span>
                </div>
                <h1
                    className="text-4xl font-bold"
                    style={{ color: "#3D2B1F" }}
                >
                    Language Exchange
                </h1>
                <p className="text-base mt-2" style={{ color: "#A0714F" }}>
                    カフェや公園で、気軽に言語交換しよう<BiCoffeeTogo className="inline" size={20} />
                </p>
            </div>

            {/* カード */}
            <div
                className="w-full max-w-md rounded-2xl shadow-md p-10"
                style={{ backgroundColor: "#FFFDF7" }}
            >
                {/* メール/パスワードフォーム */}
                <form action={handleCredentialsSignIn} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-1"
                            style={{ color: "#3D2B1F" }}
                        >
                            メールアドレス
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                            className="w-full px-4 py-2.5 rounded-lg border outline-none text-sm transition-colors"
                            style={{
                                borderColor: "#C8D8A8",
                                color: "#3D2B1F",
                                backgroundColor: "#F2EDD7",
                            }}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-1"
                            style={{ color: "#3D2B1F" }}
                        >
                            パスワード
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg border outline-none text-sm transition-colors"
                            style={{
                                borderColor: "#C8D8A8",
                                color: "#3D2B1F",
                                backgroundColor: "#F2EDD7",
                            }}
                        />
                    </div>

                    <div className="text-right">
                        <a
                            href="#"
                            className="text-xs"
                            style={{ color: "#A0714F" }}
                        >
                            パスワードを忘れた方はこちら
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-white font-semibold text-sm tracking-wide transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "#7A9E4E" }}
                    >
                        ログイン
                    </button>
                </form>

                {/* 区切り */}
                <div className="flex items-center my-6 gap-3">
                    <div className="flex-1 h-px" style={{ backgroundColor: "#C8D8A8" }} />
                    <span className="text-xs" style={{ color: "#A0714F" }}>または</span>
                    <div className="flex-1 h-px" style={{ backgroundColor: "#C8D8A8" }} />
                </div>

                {/* Google ログイン */}
                <form action={handleGoogleSignIn}>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg border text-sm font-semibold flex items-center justify-center gap-3 transition-opacity hover:opacity-90"
                        style={{
                            borderColor: "#C8D8A8",
                            color: "#3D2B1F",
                            backgroundColor: "#FFFDF7",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                            <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
                        </svg>
                        Googleでログイン
                    </button>
                </form>

                {/* 新規登録 */}
                <p className="text-center text-sm mt-6" style={{ color: "#3D2B1F" }}>
                    アカウントをお持ちでない方は{" "}
                    <a
                        href="/register"
                        className="font-semibold underline"
                        style={{ color: "#7A9E4E" }}
                    >
                        新規登録
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
