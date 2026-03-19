import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Gender, LanguageLevel } from "@/generated/prisma"

// 日本語表示名 → 言語コード
const LANGUAGE_NAME_TO_CODE: Record<string, string> = {
  英語: "en",
  スペイン語: "es",
  韓国語: "ko",
  中国語: "zh",
  フランス語: "fr",
  ドイツ語: "de",
  ポルトガル語: "pt",
  日本語: "ja",
}

// 日本語 → LanguageLevel enum
const LEVEL_NAME_TO_ENUM: Record<string, LanguageLevel> = {
  初級: LanguageLevel.BEGINNER,
  中級: LanguageLevel.INTERMEDIATE,
  上級: LanguageLevel.ADVANCED,
}

// 日本語 → Gender enum
const GENDER_NAME_TO_ENUM: Record<string, Gender> = {
  男性: Gender.MALE,
  女性: Gender.FEMALE,
  その他: Gender.OTHER,
}

// 都道府県名 → code (index + 1)
const PREFECTURES = [
  "北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島",
  "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川",
  "新潟", "富山", "石川", "福井", "山梨", "長野",
  "岐阜", "静岡", "愛知", "三重",
  "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山",
  "鳥取", "島根", "岡山", "広島", "山口",
  "徳島", "香川", "愛媛", "高知",
  "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄",
]

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const languageJa = searchParams.get("language") ?? ""
  const levelJa = searchParams.get("level") ?? ""
  const nativeLanguageJa = searchParams.get("nativeLanguage") ?? ""
  const genderJa = searchParams.get("gender") ?? ""
  const prefectureJa = searchParams.get("prefecture") ?? ""

  const languageCode = LANGUAGE_NAME_TO_CODE[languageJa]
  const levelEnum = LEVEL_NAME_TO_ENUM[levelJa]
  const nativeCode = LANGUAGE_NAME_TO_CODE[nativeLanguageJa]
  const genderEnum = GENDER_NAME_TO_ENUM[genderJa]
  const prefectureCode = prefectureJa
    ? PREFECTURES.indexOf(prefectureJa) + 1
    : undefined

  const users = await prisma.user.findMany({
    where: {
      ...(languageCode || levelEnum
        ? {
            learnLanguage: {
              some: {
                ...(languageCode ? { language: languageCode } : {}),
                ...(levelEnum ? { level: levelEnum } : {}),
              },
            },
          }
        : {}),
      ...(nativeCode ? { nativeLanguage: { has: nativeCode } } : {}),
      ...(genderEnum ? { gender: genderEnum } : {}),
      ...(prefectureCode && prefectureCode > 0
        ? { prefectureCode }
        : {}),
    },
    include: {
      learnLanguage: true,
    },
    orderBy: { createdAt: "asc" },
  })

  return NextResponse.json(users)
}
