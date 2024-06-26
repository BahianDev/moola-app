import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaDiscord } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F6F01A] w-full h-20 border-t-4 border-black flex items-center justify-between px-4 flex-col md:flex-row z-50">
      <span className="text-black text-3xl font-medium">
        ©WHERESMOOLA.ALL RIGHTS RESERVED.
      </span>
      <div className="flex gap-4">
        <Link
          href={"https://twitter.com/wheresmoola"}
          target="_blank"
          className="text-black text-5xl font-medium"
        >
          <RiTwitterXFill />
        </Link>
        <Link
          href={"https://www.instagram.com/wheresmoola/"}
          target="_blank"
          className="text-black text-5xl font-medium"
        >
          <FaInstagram />
        </Link>
        <Link
          href={"https://discord.gg/wheresmoola"}
          target="_blank"
          className="text-black text-5xl font-medium"
        >
          <FaDiscord />
        </Link>
      </div>
    </footer>
  );
}
