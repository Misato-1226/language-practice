export const LANGUAGE_CODE_TO_NAME: Record<string, string> = {
  ja: "日本語",
  en: "英語",
  es: "スペイン語",
  ko: "韓国語",
  zh: "中国語",
  fr: "フランス語",
  de: "ドイツ語",
  pt: "ポルトガル語",
}

export const LEVEL_TO_JA: Record<string, string> = {
  BEGINNER: "初級",
  INTERMEDIATE: "中級",
  ADVANCED: "上級",
}

export const GENDER_TO_JA: Record<string, string> = {
  MALE: "男性",
  FEMALE: "女性",
  OTHER: "その他",
}

export const PREFECTURES = [
  "北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島",
  "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川",
  "新潟", "富山", "石川", "福井", "山梨", "長野",
  "岐阜", "静岡", "愛知", "三重",
  "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山",
  "鳥取", "島根", "岡山", "広島", "山口",
  "徳島", "香川", "愛媛", "高知",
  "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄",
]

export function getPrefectureName(code: number | null): string {
  if (!code || code < 1 || code > 47) return ""
  return PREFECTURES[code - 1]
}

export function calcAge(birthday: string | null): number | null {
  if (!birthday) return null
  const birth = new Date(birthday)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}
