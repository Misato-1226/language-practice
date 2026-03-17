import { tv } from "tailwind-variants"

const badge = tv({
  base: "rounded-full px-4 py-1.5 text-sm font-medium",
  variants: {
    variant: {
      green: "bg-grass-green text-white",
      brown: "bg-latte-brown text-white",
      outline: "border border-grass-green bg-off-white text-grass-green",
      chip: "border border-espresso/30 bg-transparent px-3 py-1 text-espresso",
    },
  },
  defaultVariants: {
    variant: "green",
  },
})

interface BadgeProps {
  children: string
  variant?: "green" | "brown" | "outline" | "chip"
  className?: string
}

export const Badge = ({ children, variant, className }: BadgeProps) => {
  return (
    <span className={badge({ variant, class: className })}>{children}</span>
  )
}
