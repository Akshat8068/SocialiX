"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";




export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center flex-col justify-center ">
      <h1 className="text-center text-xl font-semibold">Socialix</h1>
      <div className="flex items-center justify-center space-x-1.5 my-2" >

        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/home")}>Start</Button>
      </div>
    </main>
  );
}