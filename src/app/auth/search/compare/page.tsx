"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/elements/Badge"
import { Button } from "@/components/elements/Button"
import { Card } from "@/components/elements/Card"
import { MdClose, MdChevronRight, MdPersonSearch } from "react-icons/md"

// ─── Mock data ───────────────────────────────────────────────────────────────

const MOCK_USERS = [
  { id: "1", name: "エミリー", age: 40, gender: "女性", pref: "愛知", isEven: false },
  { id: "2", name: "田中 太郎", age: 28, gender: "男性", pref: "東京", isEven: true },
  { id: "3", name: "さくら", age: 22, gender: "女性", pref: "大阪", isEven: false },
  { id: "4", name: "ジョン", age: 35, gender: "男性", pref: "神奈川", isEven: true },
  { id: "5", name: "マリア", age: 30, gender: "女性", pref: "京都", isEven: false },
]

type MockUser = (typeof MOCK_USERS)[0]

const learningLanguages = [
  { name: "英語", level: "初級" },
  { name: "スペイン語", level: "中級" },
]
const nativeLanguages = ["日本語"]
const topics = ["読書", "映画鑑賞", "カフェ巡り"]

// ─── Shared sub-components ───────────────────────────────────────────────────

const UserCardBody = ({ user }: { user: MockUser }) => (
  <Card
    className={`p-4 ${user.isEven ? "bg-light-green" : ""}`}
    content={
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://placehold.jp/40x40.png"
            alt="プロフィール画像"
            width={40}
            height={40}
            className="border-latte-brown shrink-0 rounded-full border-2"
          />
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-semibold">{user.name}</h2>
            <div className="text-espresso/70 flex flex-wrap gap-x-2 gap-y-0.5 text-xs">
              <span>{user.age}歳</span>
              <span>{user.gender}</span>
              <span>{user.pref}</span>
            </div>
          </div>
        </div>
        <div className="border-espresso/15 flex flex-col gap-2 border-t pt-3">
          <div className="flex flex-col gap-1">
            <p className="text-espresso/60 text-xs font-medium">学習言語</p>
            <div className="flex flex-wrap gap-1.5">
              {learningLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-1">
                  <Badge variant="green" className="px-2 py-0.5 text-xs">
                    {lang.name}
                  </Badge>
                  <Badge variant="outline" className="px-2 py-0.5 text-xs">
                    {lang.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-espresso/60 text-xs font-medium">母語</p>
            <div className="flex flex-wrap gap-1.5">
              {nativeLanguages.map((lang) => (
                <Badge key={lang} variant="brown" className="px-2 py-0.5 text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    }
  />
)

const DetailBody = ({ user }: { user: MockUser }) => (
  <div>
    <div className="mb-5 flex items-center gap-5">
      <Image
        src="https://placehold.jp/100x100.png"
        alt="プロフィール画像"
        width={100}
        height={100}
        className="border-latte-brown shrink-0 rounded-full border-3"
      />
      <h2 className="text-lg font-semibold">
        {user.name}
        <span className="text-espresso/70 block text-xs font-normal">
          @a3K9mX2p1gdsDbe3
        </span>
      </h2>
    </div>
    <div className="mb-6 ml-3 flex flex-col gap-5">
      <div>
        <h3 className="font-semibold">自己紹介</h3>
        <p className="text-sm">
          はじめまして！言語交換のパートナーを探しています。日本語を教えるので、ぜひ一緒に練習しましょう。趣味は読書と映画鑑賞です。
        </p>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">興味のあるトピック</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <Badge key={t} variant="outline" className="font-semibold">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
    <div className="text-end">
      <Button>もっと見る</Button>
    </div>
  </div>
)

// ─── Pattern A: ドロワー ──────────────────────────────────────────────────────

const PatternA = () => {
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null)

  return (
    <div>
      <p className="text-espresso/60 mb-4 text-sm">
        ユーザーをクリックすると右からドロワーが開きます。
      </p>
      <div className="flex max-w-130 flex-col gap-3">
        {MOCK_USERS.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="w-full cursor-pointer text-left"
          >
            <UserCardBody user={user} />
          </button>
        ))}
      </div>

      {/* Overlay */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setSelectedUser(null)}
        />
      )}

      {/* Drawer */}
      <div
        className={`bg-off-white fixed top-0 right-0 z-50 h-full w-full max-w-md overflow-y-auto shadow-xl transition-transform duration-300 ${
          selectedUser ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedUser && (
          <div className="p-8 pt-16">
            <button
              onClick={() => setSelectedUser(null)}
              className="text-espresso/60 hover:text-espresso mb-6 flex cursor-pointer items-center gap-1 text-sm"
            >
              <MdClose size={18} /> 閉じる
            </button>
            <DetailBody user={selectedUser} />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Pattern B: 別ページ遷移スタイル ──────────────────────────────────────────

const PatternB = () => (
  <div>
    <p className="text-espresso/60 mb-4 text-sm">
      フルワイドのリスト。「詳細を見る」ボタンで別ページへ遷移するイメージです。
    </p>
    <div className="flex flex-col gap-3">
      {MOCK_USERS.map((user) => (
        <Card
          key={user.id}
          className={`p-4 ${user.isEven ? "bg-light-green" : ""}`}
          content={
            <div className="flex items-center gap-4">
              <Image
                src="https://placehold.jp/40x40.png"
                alt="プロフィール画像"
                width={40}
                height={40}
                className="border-latte-brown shrink-0 rounded-full border-2"
              />
              <div className="flex-1">
                <h2 className="text-sm font-semibold">{user.name}</h2>
                <div className="text-espresso/70 flex flex-wrap gap-x-2 text-xs">
                  <span>{user.age}歳</span>
                  <span>{user.gender}</span>
                  <span>{user.pref}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {learningLanguages.map((lang) => (
                    <Badge key={lang.name} variant="green" className="px-2 py-0.5 text-xs">
                      {lang.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="shrink-0 flex items-center gap-0.5 text-xs">
                詳細を見る <MdChevronRight size={16} />
              </Button>
            </div>
          }
        />
      ))}
    </div>
  </div>
)

// ─── Pattern C: インライン展開 ───────────────────────────────────────────────

const PatternC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div>
      <p className="text-espresso/60 mb-4 text-sm">
        ユーザーをクリックするとその場で詳細が展開されます。
      </p>
      <div className="flex max-w-130 flex-col gap-3">
        {MOCK_USERS.map((user) => {
          const isExpanded = expandedId === user.id
          return (
            <div key={user.id}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : user.id)}
                className="w-full cursor-pointer text-left"
              >
                <UserCardBody user={user} />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isExpanded ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <Card className="px-8 py-6" content={<DetailBody user={user} />} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Pattern D: 現在のレイアウト（2カラム） ───────────────────────────────────

const PatternD = () => {
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null)

  return (
    <div>
      <p className="text-espresso/60 mb-4 text-sm">
        現在のレイアウト。左リスト＋右固定の詳細カード（デスクトップのみ）。
      </p>
      <div className="flex justify-center gap-5">
        <div className="flex w-full max-w-130 flex-col gap-3 md:w-auto md:max-w-none">
          {MOCK_USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="cursor-pointer text-left"
            >
              <UserCardBody user={user} />
            </button>
          ))}
        </div>
        <div className="hidden md:block">
          {selectedUser ? (
            <div className="sticky top-28">
              <Card
                className="px-8 lg:px-10"
                content={
                  <div className="w-80 lg:w-96">
                    <DetailBody user={selectedUser} />
                  </div>
                }
              />
            </div>
          ) : (
            <div className="sticky top-28">
              <Card
                className="px-8 lg:px-10"
                content={
                  <div className="flex w-80 flex-col items-center justify-center gap-4 py-10 text-center lg:w-96">
                    <MdPersonSearch className="text-espresso/30" size={64} />
                    <div>
                      <p className="font-semibold">練習相手を選択してください</p>
                      <p className="text-espresso/60 mt-1 text-sm">
                        リストからユーザーをクリックすると、
                        <br />
                        プロフィールの詳細がここに表示されます。
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "A", label: "A. ドロワー", desc: "おすすめ" },
  { id: "B", label: "B. 別ページ遷移", desc: "シンプル" },
  { id: "C", label: "C. インライン展開", desc: "その場で" },
  { id: "D", label: "D. 現在のレイアウト", desc: "2カラム" },
] as const

type TabId = (typeof TABS)[number]["id"]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState<TabId>("A")

  return (
    <div className="px-5 py-28 md:px-10 xl:px-20">
      <h1 className="mb-1 text-xl font-semibold">UIパターン比較</h1>
      <p className="text-espresso/60 mb-6 text-sm">
        タブを切り替えて各パターンを操作できます
      </p>

      {/* Tab buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex cursor-pointer flex-col items-start rounded-2xl border px-4 py-2.5 text-left transition-colors ${
              activeTab === tab.id
                ? "bg-espresso border-espresso text-off-white"
                : "border-espresso/20 text-espresso/60 hover:border-espresso/40 hover:text-espresso"
            }`}
          >
            <span className="text-sm font-semibold">{tab.label}</span>
            <span
              className={`text-xs ${activeTab === tab.id ? "text-off-white/70" : "text-espresso/40"}`}
            >
              {tab.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Pattern content */}
      <div className="border-espresso/10 rounded-2xl border p-6">
        {activeTab === "A" && <PatternA />}
        {activeTab === "B" && <PatternB />}
        {activeTab === "C" && <PatternC />}
        {activeTab === "D" && <PatternD />}
      </div>
    </div>
  )
}
