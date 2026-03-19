"use client"

import { Button } from "@/components/elements/Button"
import { PREFECTURES } from "@/lib/constants"

const LANGUAGES = [
  "英語",
  "スペイン語",
  "韓国語",
  "中国語",
  "フランス語",
  "ドイツ語",
  "ポルトガル語",
  "日本語",
]
const LEVELS = ["初級", "中級", "上級"]
const GENDERS = ["男性", "女性", "その他"]

export interface FilterState {
  language: string
  level: string
  nativeLanguage: string
  gender: string
  prefecture: string
}

const FilterSelect = ({
  options,
  value,
  onChange,
  placeholder = "すべて",
  className,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`border-espresso/20 text-espresso focus:border-grass-green focus:ring-grass-green/20 cursor-pointer rounded-full border bg-white px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2${value ? "border-grass-green/50 font-medium" : ""}${className ? ` ${className}` : ""}`}
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
)

interface SearchFilterProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onSearch: () => void
}

export const SearchFilter = ({ filters, onChange, onSearch }: SearchFilterProps) => {
  const set = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const reset = () => {
    onChange({ language: "", level: "", nativeLanguage: "", gender: "", prefecture: "" })
  }

  const hasFilter = Object.values(filters).some((v) => v !== "")

  return (
    <div className="mx-auto px-6 py-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-espresso/50 text-xs font-medium tracking-wide whitespace-nowrap">
          絞り込み
        </span>
        <div className="bg-espresso/15 h-4 w-px" />
        <FilterSelect
          options={LANGUAGES}
          value={filters.language}
          onChange={(v) => set("language", v)}
          placeholder="言語"
        />
        <FilterSelect
          options={LEVELS}
          value={filters.level}
          onChange={(v) => set("level", v)}
          placeholder="レベル"
        />
        <FilterSelect
          options={LANGUAGES}
          value={filters.nativeLanguage}
          onChange={(v) => set("nativeLanguage", v)}
          placeholder="母国語"
        />
        <FilterSelect
          options={GENDERS}
          value={filters.gender}
          onChange={(v) => set("gender", v)}
          placeholder="性別"
        />
        <FilterSelect
          options={PREFECTURES}
          value={filters.prefecture}
          onChange={(v) => set("prefecture", v)}
          placeholder="都道府県"
        />
        <div className="bg-espresso/15 h-4 w-px" />
        <div className="flex items-center gap-2">
          {hasFilter && (
            <button
              type="button"
              onClick={reset}
              className="text-espresso/40 hover:text-espresso cursor-pointer text-xs underline-offset-2 transition-colors hover:underline"
            >
              リセット
            </button>
          )}
          <Button variant="primary" onClick={onSearch}>検索</Button>
        </div>
      </div>
    </div>
  )
}
