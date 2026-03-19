import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

const button = tv({
  base: "px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer",
  variants: {
    variant: {
      primary: "bg-grass-green text-white",
      secondary: "bg-latte-brown text-white",
      outline: "border border-light-green bg-transparent text-grass-green",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export const Button = ({
  children,
  variant,
  className,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(button({ variant }), className)}
    >
      {children}
    </button>
  )
}
