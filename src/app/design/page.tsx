const colors = [
    {
        name: "Cream",
        hex: "#F2EDD7",
        usage: "ページ背景",
        textColor: "#3D2B1F",
    },
    {
        name: "Off White",
        hex: "#FFFDF7",
        usage: "カード・パネル背景",
        textColor: "#3D2B1F",
    },
    {
        name: "Grass Green",
        hex: "#7A9E4E",
        usage: "ボタン（CTA）・リンク・強調",
        textColor: "#FFFFFF",
    },
    {
        name: "Latte Brown",
        hex: "#A0714F",
        usage: "ロゴ・アイコン・サブテキスト・区切り文字",
        textColor: "#FFFFFF",
    },
    {
        name: "Light Green",
        hex: "#C8D8A8",
        usage: "ボーダー・区切り線・入力フィールド枠",
        textColor: "#3D2B1F",
    },
    {
        name: "Espresso",
        hex: "#3D2B1F",
        usage: "メインテキスト・見出し・ラベル",
        textColor: "#FFFDF7",
    },
]

const DesignPage = () => {
    return (
        <div className="min-h-screen p-10" style={{ backgroundColor: "#F2EDD7" }}>
            <div className="max-w-3xl mx-auto">

                {/* ヘッダー */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: "#3D2B1F" }}>
                        デザインガイド
                    </h1>
                    <p style={{ color: "#A0714F" }}>
                        Language Exchange — カフェ×公園コンセプトの配色ルール
                    </p>
                </div>

                {/* カラーパレット */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-5" style={{ color: "#3D2B1F" }}>
                        カラーパレット
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {colors.map((color) => (
                            <div
                                key={color.hex}
                                className="rounded-2xl overflow-hidden shadow-sm"
                                style={{ backgroundColor: "#FFFDF7" }}
                            >
                                <div
                                    className="h-20 flex items-end px-4 pb-3"
                                    style={{ backgroundColor: color.hex }}
                                >
                                    <span className="text-sm font-mono font-bold" style={{ color: color.textColor }}>
                                        {color.hex}
                                    </span>
                                </div>
                                <div className="px-4 py-3">
                                    <p className="font-semibold text-sm" style={{ color: "#3D2B1F" }}>
                                        {color.name}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: "#A0714F" }}>
                                        {color.usage}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 使用ルール */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-5" style={{ color: "#3D2B1F" }}>
                        使用ルール
                    </h2>
                    <div
                        className="rounded-2xl p-6 space-y-4"
                        style={{ backgroundColor: "#FFFDF7" }}
                    >
                        {[
                            { role: "ページ背景", value: "#F2EDD7  Cream" },
                            { role: "カード・パネル背景", value: "#FFFDF7  Off White" },
                            { role: "メインテキスト", value: "#3D2B1F  Espresso" },
                            { role: "サブテキスト・ラベル", value: "#A0714F  Latte Brown" },
                            { role: "ボタン（CTA）", value: "#7A9E4E  Grass Green" },
                            { role: "ロゴ・アイコン背景", value: "#A0714F  Latte Brown" },
                            { role: "ボーダー・区切り線", value: "#C8D8A8  Light Green" },
                            { role: "入力フィールド背景", value: "#F2EDD7  Cream" },
                            { role: "リンク・強調テキスト", value: "#7A9E4E  Grass Green" },
                        ].map((item) => (
                            <div
                                key={item.role}
                                className="flex justify-between items-center py-2 border-b last:border-b-0"
                                style={{ borderColor: "#C8D8A8" }}
                            >
                                <span className="text-sm" style={{ color: "#3D2B1F" }}>
                                    {item.role}
                                </span>
                                <span className="text-sm font-mono" style={{ color: "#A0714F" }}>
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* UIサンプル */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-5" style={{ color: "#3D2B1F" }}>
                        UIサンプル
                    </h2>
                    <div
                        className="rounded-2xl p-6 space-y-6"
                        style={{ backgroundColor: "#FFFDF7" }}
                    >
                        {/* ボタン */}
                        <div>
                            <p className="text-xs font-semibold mb-3" style={{ color: "#A0714F" }}>
                                ボタン
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                <button
                                    className="px-5 py-2 rounded-lg text-white text-sm font-semibold"
                                    style={{ backgroundColor: "#7A9E4E" }}
                                >
                                    Primary
                                </button>
                                <button
                                    className="px-5 py-2 rounded-lg text-white text-sm font-semibold"
                                    style={{ backgroundColor: "#A0714F" }}
                                >
                                    Secondary
                                </button>
                                <button
                                    className="px-5 py-2 rounded-lg text-sm font-semibold border"
                                    style={{ borderColor: "#C8D8A8", color: "#7A9E4E", backgroundColor: "transparent" }}
                                >
                                    Outline
                                </button>
                            </div>
                        </div>

                        {/* 入力フィールド */}
                        <div>
                            <p className="text-xs font-semibold mb-3" style={{ color: "#A0714F" }}>
                                入力フィールド
                            </p>
                            <div
                                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                                style={{
                                    borderColor: "#C8D8A8",
                                    backgroundColor: "#F2EDD7",
                                    color: "#3D2B1F",
                                }}
                            >
                                テキスト入力例
                            </div>
                        </div>

                        {/* テキスト */}
                        <div>
                            <p className="text-xs font-semibold mb-3" style={{ color: "#A0714F" }}>
                                テキスト
                            </p>
                            <p className="text-xl font-bold mb-1" style={{ color: "#3D2B1F" }}>見出しテキスト</p>
                            <p className="text-sm mb-1" style={{ color: "#3D2B1F" }}>本文テキスト。読みやすさを重視したEspresso色を使用します。</p>
                            <p className="text-sm" style={{ color: "#A0714F" }}>サブテキスト・補足説明にはLatte Brownを使用します。</p>
                            <a className="text-sm underline" style={{ color: "#7A9E4E" }}>リンクテキスト</a>
                        </div>

                        {/* バッジ */}
                        <div>
                            <p className="text-xs font-semibold mb-3" style={{ color: "#A0714F" }}>
                                バッジ・タグ
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                    style={{ backgroundColor: "#7A9E4E" }}
                                >
                                    English
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                    style={{ backgroundColor: "#A0714F" }}
                                >
                                    Japanese
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                                    style={{ borderColor: "#C8D8A8", color: "#7A9E4E" }}
                                >
                                    Spanish
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default DesignPage
