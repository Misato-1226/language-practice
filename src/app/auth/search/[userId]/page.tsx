import { CommentCard } from "@/features/profile/components/CommentCard"
import { Badge } from "@/components/elements/Badge"
import Image from "next/image"
import { notFound } from "next/navigation"
import { UserData } from "@/types/profile"
import {
  LANGUAGE_CODE_TO_NAME,
  LEVEL_TO_JA,
  GENDER_TO_JA,
  getPrefectureName,
  calcAge,
} from "@/lib/constants"

async function getUser(userId: string): Promise<UserData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/users/${userId}`,
    { cache: "no-store" }
  )
  if (!res.ok) return null
  return res.json()
}

const UserDetail = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params
  const user = await getUser(userId)

  if (!user) notFound()

  const age = calcAge(user.birthday)
  const prefecture = getPrefectureName(user.prefectureCode)
  const gender = user.gender ? GENDER_TO_JA[user.gender] : null

  return (
    <div className="py-20">
      {/** プロフィールヒーロー */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src="https://placehold.jp/200x200.png"
          alt="プロフィール画像"
          width={200}
          height={200}
          className="border-grass-green w-40 rounded-full border-5 lg:w-50"
        />
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-espresso/70 text-sm">@{user.id}</p>
        </div>

        {/** 言語バッジ */}
        <div className="flex flex-wrap justify-center gap-3">
          {user.nativeLanguage.map((code) => (
            <Badge key={code} variant="brown">{`🗣 母語: ${LANGUAGE_CODE_TO_NAME[code] ?? code}`}</Badge>
          ))}
          {user.learnLanguage.map((lang) => (
            <Badge key={lang.id} variant="green">{`📚 学習中: ${LANGUAGE_CODE_TO_NAME[lang.language] ?? lang.language} (${LEVEL_TO_JA[lang.level]})`}</Badge>
          ))}
        </div>

        {/** 基本情報チップ */}
        <div className="flex flex-wrap justify-center gap-2">
          {prefecture && <Badge variant="chip">{`📍 ${prefecture}`}</Badge>}
          {gender && <Badge variant="chip">{gender}</Badge>}
          {age !== null && <Badge variant="chip">{`🎂 ${age}歳`}</Badge>}
        </div>
      </div>

      {/** 自己紹介 */}
      {user.introduction && (
        <div className="mx-auto max-w-200 px-5 py-10 lg:px-0 lg:py-12">
          <h2 className="mb-6 text-xl font-semibold">自己紹介</h2>
          <p className="text-lg leading-6">{user.introduction}</p>
        </div>
      )}

      {/** 興味のあるトピック */}
      {user.interests.length > 0 && (
        <div className="mx-auto flex max-w-200 flex-col gap-10 px-5 py-10 lg:px-0 lg:py-12">
          <div>
            <h2 className="mb-4 text-xl font-semibold">
              話したい・興味のあるトピック
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {user.interests.map((interest) => (
                <Badge key={interest} variant="outline" className="font-semibold">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/** コメントカード */}
      <div className="mx-auto max-w-200 px-5 py-10 lg:px-0 lg:py-12">
        <h2 className="mb-6 text-xl font-semibold">コメント（１０件）</h2>
        <div className="flex w-full flex-col items-center gap-3">
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </div>
  )
}

export default UserDetail
