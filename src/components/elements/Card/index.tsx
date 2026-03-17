import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface CardProps {
  content: ReactNode
  className?: string
}

export const Card = ({ content, className }: CardProps) => {
  return (
    <div
      className={twMerge(
        "bg-off-white border-espresso shadow-card rounded-[30px] border-5 px-10 py-8",
        className,
      )}
    >
      {content}
    </div>
  )
}
