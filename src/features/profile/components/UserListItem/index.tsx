import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/elements/Badge"
import { UserData } from "@/types/profile"
import {
  LANGUAGE_CODE_TO_NAME,
  LEVEL_TO_JA,
  GENDER_TO_JA,
  getPrefectureName,
  calcAge,
} from "@/lib/constants"

interface UserListItemProps {
  user: UserData
  isEven?: boolean
  onClick?: () => void
}

export const UserListItem = ({
  user,
  isEven = false,
  onClick,
}: UserListItemProps) => {
  const age = calcAge(user.birthday)
  const prefecture = getPrefectureName(user.prefectureCode)
  const gender = user.gender ? GENDER_TO_JA[user.gender] : null

  const cardContent = (
    <div className="flex flex-col gap-3">
      {/* プロフィール情報 */}
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
            {age !== null && <span>{age}歳</span>}
            {gender && <span>{gender}</span>}
            {prefecture && <span>{prefecture}</span>}
          </div>
        </div>
      </div>

      {/* 言語情報 */}
      <div className="border-espresso/15 flex flex-col gap-2 border-t pt-3">
        {/* 学習言語 */}
        {user.learnLanguage.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-espresso/60 text-xs font-medium tracking-wide">
              学習言語
            </p>
            <div className="flex flex-wrap gap-1.5">
              {user.learnLanguage.map((lang) => (
                <div key={lang.id} className="flex items-center gap-1">
                  <Badge variant="green" className="px-2 py-0.5 text-xs">
                    {LANGUAGE_CODE_TO_NAME[lang.language] ?? lang.language}
                  </Badge>
                  <Badge variant="outline" className="px-2 py-0.5 text-xs">
                    {LEVEL_TO_JA[lang.level]}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 母語 */}
        {user.nativeLanguage.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-espresso/60 text-xs font-medium tracking-wide">
              母語
            </p>
            <div className="flex flex-wrap gap-1.5">
              {user.nativeLanguage.map((code) => (
                <Badge key={code} variant="brown" className="px-2 py-0.5 text-xs">
                  {LANGUAGE_CODE_TO_NAME[code] ?? code}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* モバイル: リンクあり */}
      <Link
        href={`/auth/search/${user.id}`}
        className="block w-full max-w-130 md:hidden"
      >
        <div className={`p-4 ${isEven ? "bg-light-green" : ""}`}>
          {cardContent}
        </div>
      </Link>
      {/* デスクトップ: リンクなし */}
      <div className="hidden w-full cursor-pointer md:block" onClick={onClick}>
        <div
          className={`rounded-2xl p-4 ${isEven ? "bg-light-green border-grass-green/15 border" : "border-espresso/15 border"}`}
        >
          {cardContent}
        </div>
      </div>
    </>
  )
}
