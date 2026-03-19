"use client"

import { useState, useEffect } from "react"
import { UserDetail } from "@/features/profile/components/UserDetail"
import { UserListItem } from "@/features/profile/components/UserListItem"
import { SearchFilter, FilterState } from "@/features/search/components/SearchFilter"
import { Card } from "@/components/elements/Card"
import { UserData } from "@/types/profile"

const DEFAULT_FILTERS: FilterState = {
  language: "",
  level: "",
  nativeLanguage: "",
  gender: "",
  prefecture: "",
}

const Search = () => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [pendingFilters, setPendingFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [users, setUsers] = useState<UserData[]>([])
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const params = new URLSearchParams()
    if (filters.language) params.set("language", filters.language)
    if (filters.level) params.set("level", filters.level)
    if (filters.nativeLanguage) params.set("nativeLanguage", filters.nativeLanguage)
    if (filters.gender) params.set("gender", filters.gender)
    if (filters.prefecture) params.set("prefecture", filters.prefecture)

    fetch(`/api/users?${params.toString()}`)
      .then((res) => res.json())
      .then((data: UserData[]) => {
        if (!cancelled) {
          setUsers(data)
          setSelectedUser(null)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [filters])

  const handleSearch = () => {
    setLoading(true)
    setFilters(pendingFilters)
  }

  return (
    <div className="py-14">
      <h1 className="mb-4 text-2xl font-semibold">練習相手を探す</h1>
      <Card
        className="p-5"
        content={
          <>
            <SearchFilter
              filters={pendingFilters}
              onChange={setPendingFilters}
              onSearch={handleSearch}
            />
            <h2 className="m-5 text-xl font-semibold">
              検索結果: {loading ? "..." : `${users.length}件`}
            </h2>
            <div className="border-espresso/15 flex justify-center gap-2 border-t md:justify-between lg:gap-5">
              <div className="mx-auto flex h-194 w-full flex-col items-center gap-3 overflow-y-auto md:w-113.75">
                {loading ? (
                  <p className="text-espresso/50 mt-10 text-sm">読み込み中...</p>
                ) : users.length === 0 ? (
                  <p className="text-espresso/50 mt-10 text-sm">
                    条件に合うユーザーが見つかりませんでした
                  </p>
                ) : (
                  users.map((user, i) => (
                    <UserListItem
                      key={user.id}
                      user={user}
                      isEven={i % 2 === 1}
                      onClick={() => setSelectedUser(user)}
                    />
                  ))
                )}
              </div>
              <div className="hidden h-194 md:block">
                <UserDetail user={selectedUser} />
              </div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default Search
