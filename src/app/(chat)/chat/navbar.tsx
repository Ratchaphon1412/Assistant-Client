import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

export function ChatNavbar() {
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
        <AvatarImage src="/placeholder.svg?height=48&width=48" />
        <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
      </Avatar>
    </div>
  );
}
