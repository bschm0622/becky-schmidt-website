import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        github: "border-2 border-[#24292e] text-[#24292e] bg-background hover:bg-[#24292e]/10 hover:text-[#24292e] dark:text-[#d1d5db] dark:border-[#d1d5db] dark:hover:bg-[#d1d5db]/10",
        linkedin: "border-2 border-[#0077b5] text-[#0077b5] bg-background hover:bg-[#0077b5]/10 hover:text-[#0077b5] dark:text-[#60a5fa] dark:border-[#60a5fa] dark:hover:bg-[#60a5fa]/10",
        substack: "border-2 border-[#FF6719] text-[#FF6719] bg-background hover:bg-[#FF6719]/10 hover:text-[#FF6719] dark:text-[#fdba74] dark:border-[#fdba74] dark:hover:bg-[#fdba74]/10",
        email: "border-2 border-[#64748b] text-[#64748b] bg-background hover:bg-[#64748b]/10 hover:text-[#64748b] dark:text-[#cbd5e1] dark:border-[#cbd5e1] dark:hover:bg-[#cbd5e1]/10",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
