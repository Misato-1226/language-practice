// import { ProfileProps } from "@/types/profile"
// import Image from "next/image"

// const Profile = ({userId, name, gender, birthDay, prefecture, learnLanguage, nativeLanguage
// }: ProfileProps) => {
//     return (
//         <div>
//             {/** プロフィール画像 */}
//             <div>
//                 <Image src="https://placehold.jp/200x200.png" alt="プロフィール画像" />
//                 <h1>{name}</h1>
//             </div>
//             {/** 基本情報カード */}
//             <div>
//                 <h2>言語情報</h2>
//                 <dl>
//                     <dt>使用言語</dt>
//                     {nativeLanguage.map((la, index) => (
//                         <dd key={String(index)}>{la}</dd>
//                     ))}
//                 </dl>
//                  <dl>
//                     <dt>学習言語</dt>
//                     {learnLanguage.map((la, index) => (
//                         <dd key={String(index)}>{la.language}</dd>
//                     ))}
//                 </dl>
//                   <dl>
//                     <dt>学習レベル</dt>
//                     {learnLanguage.map((la, index) => (
//                         <dd key={String(index)}>{la.level}</dd>
//                     ))}
//                 </dl>

//                   <h2>基本情報</h2>
//                 <dl>
//                     <dt>都道府県</dt>
//                         <dd>{prefecture}</dd>
//                 </dl>
//                  <dl>
//                     <dt>性別</dt>
//                         <dd>{gender}</dd>
//                 </dl>
//                   <dl>
//                     <dt>年齢</dt>
//                         <dd>{birthDay}</dd>
//                 </dl>
//             </div>
//         </div>
//     )
// }

// export default Profile

import { CommentCard } from "@/features/profile/components/CommentCard"
import { DetailCard } from "@/features/profile/components/DetailCard"
import { Badge } from "@/components/elements/Badge"
import Image from "next/image"

const Profile = () => {
  return (
    <div className="py-20">
      {/** プロフィールヒーロー */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src="https://placehold.jp/200x200.png"
          alt="プロフィール画像"
          width={200}
          height={200}
          className="border-grass-green rounded-full border-5"
        />
        <div className="text-center">
          <h1 className="text-2xl font-semibold">ハナコ</h1>
          <p className="text-sm text-gray-500">@a3K9mX2p1gdsDbe3</p>
        </div>

        {/** 言語バッジ */}
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="brown">🗣 母語: 日本語</Badge>
          <Badge variant="green">📚 学習中: 英語</Badge>
        </div>

        {/** 基本情報チップ */}
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="chip">📍 東京</Badge>
          <Badge variant="chip">♀ 女性</Badge>
          <Badge variant="chip">🎂 22歳</Badge>
        </div>
      </div>

      {/** 自己紹介 */}
      <div className="mx-auto max-w-200 px-5 py-10 lg:px-0 lg:py-12">
        <h2 className="mb-6 text-xl font-semibold">自己紹介</h2>
        <p className="text-lg leading-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
          sequi assumenda, corporis eaque quo, esse suscipit neque voluptatum
          quidem animi libero! Dolorem nihil magnam, non alias qui perferendis
          incidunt animi. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Expedita sequi assumenda, corporis eaque quo, esse suscipit
          neque voluptatum quidem animi libero! Dolorem nihil magnam, non alias
          qui perferendis incidunt animi. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Expedita sequi assumenda, corporis eaque
          quo, esse suscipit neque voluptatum quidem animi libero! Dolorem nihil
          magnam, non alias qui perferendis incidunt animi. Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Expedita sequi assumenda,
          corporis eaque quo, esse suscipit neque voluptatum quidem animi
          libero! Dolorem nihil magnam, non alias qui perferendis incidunt
          animi.
        </p>
      </div>
      {/** 興味のあるトピック */}
      <div className="mx-auto flex max-w-200 flex-col gap-10 px-5 py-10 lg:px-0 lg:py-12">
        <div>
          <h2 className="mb-4 text-xl font-semibold">
            話したい・興味のあるトピック
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-semibold">
              読書
            </Badge>
            <Badge variant="outline" className="font-semibold">
              ファンタジー
            </Badge>
            <Badge variant="outline" className="font-semibold">
              カフェ巡り
            </Badge>
            <Badge variant="outline" className="font-semibold">
              映画鑑賞
            </Badge>
            <Badge variant="outline" className="font-semibold">
              スピリチュアル
            </Badge>
          </div>
        </div>
      </div>
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

export default Profile
