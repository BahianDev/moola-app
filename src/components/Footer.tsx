import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F6F01A] w-full h-20 border-t-4 border-black flex items-center justify-between px-4 flex-col md:flex-row">
      <span className="text-black text-3xl font-medium">
        ©WHERESMOOLA.ALL RIGHTS RESERVED.
      </span>
      <div className="flex gap-4">
        <span className="text-black text-5xl font-medium">
          <RiTwitterXFill />
        </span>
        <span className="text-black text-5xl font-medium">
          <FaInstagram />
        </span>
        <span className="text-black text-5xl font-medium">
          <FaDiscord />
        </span>
      </div>
    </footer>
  );
}
