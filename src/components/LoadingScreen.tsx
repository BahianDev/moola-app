import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw select-none items-center justify-center bg-[#F6F01A]">
      <Image
        src="/logo.png"
        alt="Hotdog"
        width={326 / 6}
        height={503 / 6}
        className="animate-pulse"
      />

      <span className="absolute bottom-4 right-4 text-2xl tracking-widest">Loading...</span>
    </div>
  );
}
