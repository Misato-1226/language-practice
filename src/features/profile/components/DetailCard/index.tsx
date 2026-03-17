import { Card } from "@/components/elements/Card"

export const DetailCard = () => {
  return (
    <Card
      content={
        <div className="flex justify-between">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-4 text-xl font-semibold">言語情報</h2>
              <div className="flex gap-5">
                <dl>
                  <dt className="text-lg font-semibold">使用言語</dt>
                  <dd className="text-lg">日本語</dd>
                </dl>
                <dl>
                  <dt className="text-lg font-semibold">学習言語</dt>
                  <dd className="text-lg">英語</dd>
                </dl>
                <dl>
                  <dt className="text-lg font-semibold">学習レベル</dt>
                  <dd className="text-lg">初級</dd>
                </dl>
              </div>
            </div>
            <div className="">
              <h2 className="mb-4 text-xl font-semibold">基本情報</h2>
              <div className="flex gap-5">
                <dl>
                  <dt className="text-lg font-semibold">都道府県</dt>
                  <dd className="text-lg">東京</dd>
                </dl>
                <dl>
                  <dt className="text-lg font-semibold">性別</dt>
                  <dd className="text-lg">女</dd>
                </dl>
                <dl>
                  <dt className="text-lg font-semibold">年齢</dt>
                  <dd className="text-lg">22</dd>
                </dl>
              </div>
            </div>
          </div>

          {/** 興味のあるトピック */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">
              話したい・興味のあるトピック
            </h2>
          </div>
        </div>
      }
    />
  )
}
