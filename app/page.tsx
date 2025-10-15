import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full flex-row gap-1 p-0.5">
      <div className="border-diffcolor bg-buttoncolor content-center rounded-md border pr-4 pl-4">
        <Link href={"/dashboard"}>Profil</Link>
      </div>
      <div className="border-diffcolor bg-buttoncolor content-center rounded-md border pr-4 pl-4">
        <Link href={"/login"}>Giriş</Link>
      </div>
    </div>
  );
}
