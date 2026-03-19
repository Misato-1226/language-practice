import { Badge } from "@/components/elements/Badge"
import { Button } from "@/components/elements/Button"
import Image from "next/image"
import Link from "next/link"
import { PiPark } from "react-icons/pi"
import { UserData } from "@/types/profile"
import {
  LANGUAGE_CODE_TO_NAME,
  LEVEL_TO_JA,
  GENDER_TO_JA,
  getPrefectureName,
  calcAge,
} from "@/lib/constants"

type Props = {
  user?: UserData | null
}

export const UserDetail = ({ user = null }: Props) => {
  const emptyContent = (
    <div className="flex w-80 flex-col items-center justify-center gap-4 py-10 text-center lg:w-96">
      <PiPark className="text-espresso/30" size={64} />
      <p className="text-espresso/60 mt-1 text-sm">
        気になるユーザーをクリックして
        <br />
        プロフィールの詳細を見てみましょう！
      </p>
    </div>
  )

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center px-5 lg:px-10">
        {emptyContent}
      </div>
    )
  }

  const age = calcAge(user.birthday)
  const prefecture = getPrefectureName(user.prefectureCode)
  const gender = user.gender ? GENDER_TO_JA[user.gender] : null

  const detailContent = (
    <div className="w-80 lg:w-96">
      {/** プロフィール画像・名前 */}
      <div className="mb-5 flex items-center gap-5">
        <Image
          src="https://placehold.jp/100x100.png"
          alt="プロフィール画像"
          width={100}
          height={100}
          className="border-latte-brown w-20 shrink-0 rounded-full border-3 lg:w-25"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <div className="text-espresso/70 flex flex-wrap gap-x-2 text-xs">
            {age !== null && <span>{age}歳</span>}
            {gender && <span>{gender}</span>}
            {prefecture && <span>{prefecture}</span>}
          </div>
          {/* 言語バッジ */}
          <div className="mt-2 flex flex-wrap gap-1">
            {user.nativeLanguage.map((code) => (
              <Badge key={code} variant="brown" className="px-2 py-0.5 text-xs">
                {LANGUAGE_CODE_TO_NAME[code] ?? code}
              </Badge>
            ))}
            {user.learnLanguage.map((lang) => (
              <Badge
                key={lang.id}
                variant="green"
                className="px-2 py-0.5 text-xs"
              >
                {`${LANGUAGE_CODE_TO_NAME[lang.language] ?? lang.language} ${LEVEL_TO_JA[lang.level]}`}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      {/** 自己紹介・興味 */}
      <div className="border-espresso/15 mb-5 flex flex-col gap-4 border-t pt-4">
        {user.introduction && (
          <div>
            <h3 className="mb-1 text-sm font-semibold">自己紹介</h3>
            <p className="text-espresso/80 text-sm leading-relaxed">
              {user.introduction}
            </p>
          </div>
        )}
        {(user.interests?.length ?? 0) > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold">興味のあること</h3>
            <div className="flex flex-wrap gap-1.5">
              {user.interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="px-2 py-0.5 text-xs font-medium"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      {/** ボタン */}
      <div className="text-end">
        <Link href={`/auth/search/${user.id}`}>
          <Button>もっと見る</Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex h-full justify-center px-5 py-8 lg:px-10">
      {detailContent}
    </div>
  )
}
