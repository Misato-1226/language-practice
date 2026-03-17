import { Card } from "@/components/elements/Card"
import Image from "next/image"

export const CommentCard = () => {
  return (
    <Card
      content={
        <div>
          <div className="flex items-center gap-8">
            <Image
              src="https://placehold.jp/80x80.png"
              alt="プロフィール画像"
              width={80}
              height={80}
              className="rounded-full"
            />
            <p className="text-md max-w-125">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio placeat illum quibusdam quos rerum porro corrupti quas.
              Dicta tempore at saepe maiores sequi impedit reiciendis. Minus
              sint ipsam vero animi.
            </p>
          </div>
          <p className="text-end text-lg">2026/3/10</p>
        </div>
      }
      className="border-latte-brown w-full p-5 lg:p-4"
    />
  )
}
