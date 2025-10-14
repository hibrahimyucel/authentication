import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="bg-background border-diffcolor flex w-full border pl-1 font-bold">
        Anasayfa
        <Link href={"/dashboard"}>dashboard</Link>
        <Link href={"/login"}>login</Link>
      </h1>
    </div>
  );
}
