
import Image from "next/image"
import Link from "next/link"
import { GetAccount } from "@/utils/api/internal/auth"
import { AvatarDropdown } from "./_sections/avatar-dropdown"




export async function ChatNavbar() {
  const account = {
    email: "",
    profile: "",
  }

  const [responseAccount, errAccount] = await GetAccount()

  if (errAccount !== undefined) {
    console.error("Error fetching account:", errAccount.message)
  }

  if (responseAccount !== undefined) {
    account.email = responseAccount.email
    account.profile = responseAccount.profile
  }

  return (
    <div className="relative z-10 flex justify-between p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/assets/logo.svg" className="max-h-8" alt="Shadcn UI Navbar" width={32} height={32} />
        <span className="text-lg font-semibold tracking-tighter">Ratcha AI</span>
      </Link>

      <AvatarDropdown account={account} />
    </div>
  )
}
