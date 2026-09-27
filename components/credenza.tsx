"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface BaseProps {
  children: React.ReactNode
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface CredenzaProps extends BaseProps {
  className?: string
  asChild?: true
}

const CredenzaContext = React.createContext<{ isMobile: boolean }>({
  isMobile: false,
})

const useCredenzaContext = () => {
  const context = React.useContext(CredenzaContext)
  if (!context) {
    throw new Error(
      "Credenza components cannot be rendered outside the Credenza Context"
    )
  }
  return context
}

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isMobile = useIsMobile()
  const Credenza = isMobile ? Drawer : Dialog

  return (
    <CredenzaContext.Provider value={{ isMobile }}>
      {/* No autofocus on phones: the keyboard opening mid-slide resizes the
          viewport and the drawer jumps. People tap the field they want. */}
      <Credenza {...props}>
        {children}
      </Credenza>
    </CredenzaContext.Provider>
  )
}

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const CredenzaTrigger = isMobile ? DrawerTrigger : DialogTrigger

  return (
    <CredenzaTrigger className={className} {...props}>
      {children}
    </CredenzaTrigger>
  )
}

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const CredenzaClose = isMobile ? DrawerClose : DialogClose

  return (
    <CredenzaClose className={className} {...props}>
      {children}
    </CredenzaClose>
  )
}

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const CredenzaContent = isMobile ? DrawerContent : DialogContent

  return (
    <CredenzaContent
      className={cn(
        "bg-black border-white/20 text-white",
        // On phones the drawer is a column: header, scrolling body, and a
        // footer that stays on screen so the action is always reachable.
        isMobile && "max-h-[88dvh]",
        className
      )}
      {...props}
    >
      {children}
    </CredenzaContent>
  )
}

const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const CredenzaDescription = isMobile ? DrawerDescription : DialogDescription

  return (
    <CredenzaDescription className={cn("text-neutral-400", className)} {...props}>
      {children}
    </CredenzaDescription>
  )
}

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const CredenzaHeader = isMobile ? DrawerHeader : DialogHeader

  return (
    <CredenzaHeader className={className} {...props}>
      {children}
    </CredenzaHeader>
  )
}

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const CredenzaTitle = isMobile ? DrawerTitle : DialogTitle

  return (
    <CredenzaTitle className={cn("text-white", className)} {...props}>
      {children}
    </CredenzaTitle>
  )
}

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()

  return (
    <div
      // Lets a touch scroll the form instead of dragging the drawer shut.
      {...(isMobile && { "data-vaul-no-drag": true })}
      className={cn(
        "px-4 md:px-0",
        isMobile && "min-h-0 flex-1 overflow-y-auto overscroll-contain",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const CredenzaFooter = isMobile ? DrawerFooter : DialogFooter

  return (
    <CredenzaFooter
      className={cn(
        isMobile &&
          "border-t border-white/10 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]",
        className
      )}
      {...props}
    >
      {children}
    </CredenzaFooter>
  )
}

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
}
