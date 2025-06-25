
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { GetAccount } from "@/utils/api/internal/auth";


export async function ChatNavbar() {


  const account= {
    email: "",
    profile: "",
  }

  const [responseAccount, errAccount] = await GetAccount();
  if (errAccount !== undefined) {
    console.error("Error fetching account:", errAccount.message);
  }
  if (responseAccount !== undefined) {
    account.email = responseAccount.message.email;
    account.profile = responseAccount.message.profile;
  }


  return (
    <div className="relative z-10 flex justify-between p-4  ">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/logo.svg"
          className="max-h-8"
          alt="Shadcn UI Navbar"
          width={32}
          height={32}
        />
        <span className="text-lg font-semibold tracking-tighter">
          Ratcha AI
        </span>
      </Link>


      <Avatar className="w-12 h-12 border-2 border-white/20">
      {account.profile ? (
        <>
        <Image
          src={account.profile}
          alt={account.email}
          width={48}
          height={48}
          className="rounded-full"
        />
        </>
      ) : (
        <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
      )}
    </Avatar>
    </div>
  );
}
