"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut,  History } from "lucide-react"
import Image from "next/image"
import { Logout } from "@/utils/api/internal/auth"
import { useRouter } from "next/navigation"


interface AvatarDropdownProps {
  account: {
    email: string
    profile: string
  }
}

export function AvatarDropdown({ account }: AvatarDropdownProps) {
  const route = useRouter()

  const handleLogout =  async() => {
    try {
      // Add your logout logic here
      // For example, call your logout API
      // await logoutUser()

      // Clear any local storage or cookies if needed
      const check = await Logout()

      if (check) {
        
        route.push("/") // Redirect to login page
        
        
      }

      // Redirect to login page or home
      

      // Or you can reload the page to clear all state
      // window.location.reload()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-12 h-12 border-1 border-white/20 cursor-pointer hover:border-white/40 transition-colors">
          {account.profile ? (
            <Image
              src={account.profile || "/placeholder.svg"}
              alt={account.email}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <AvatarFallback className="bg-blue-600 text-white">
              {account.email ? account.email.charAt(0).toUpperCase() : "JD"}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 flex flex-col gap-2 p-2" align="end" >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-4">
            <p className="text-sm font-medium leading-none">My Account</p>
            <p className="text-xs leading-none text-muted-foreground">{account.email || "user@example.com"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator  />
        <DropdownMenuItem className="cursor-pointer">
          <History className="mr-2 h-4 w-4" />
          <span>History</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}