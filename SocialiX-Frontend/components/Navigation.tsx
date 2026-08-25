"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  
  Bell,
  BarChart3,
  Plus,
  Search,
  User,
  User2,
  Send,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "./ui/button";

const sidebarItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Users", href: "/user", icon: Compass },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Chat", href: "/chat", icon: Send },
  { label: "Notificaion", href: "/notification", icon: Bell }
];

const bottomItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Users", href: "/user", icon: User2 },
  { label: "Notificaion", href: "/notification", icon:Bell },
  { label: "Post", href: "/post", icon: Plus },
  { label: "Profile", href: "/profile", icon: User },
  
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 z-50 h-screen w-20 lg:w-64 flex-col border-r border-outline-variant bg-surface">

        <div className="px-4 py-6 ">
          <h1 className="md:hidden lg:block text-xl  font-bold tracking-tight text-primary">
          SocialiX
        </h1>

          <div className="flex justify-center lg:hidden">
            <span className="text-3xl font-bold">S</span>
          </div>
        </div>

        <div className="flex-1 space-y-2 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  "flex items-center justify-center gap-4 rounded-xl px-4 py-3 transition lg:justify-start",
                  active
                    ? "bg-primary text-white"
                    : "hover:bg-surface-container-low"
                )}
              >
                <Icon size={22} />

                <span className="hidden lg:block">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="px-4">
          <Link href={"/post"}><Button ><Plus size={20}/></Button></Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 border-t border-outline-variant p-4 lg:justify-start">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />

          <div className="hidden lg:block">
            <p className="font-semibold">Alex Rivera</p>
            <p className="text-xs text-on-surface-variant">
              Admin Access
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-outline-variant bg-surface md:hidden">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center",
                active ? "text-primary" : "text-on-surface-variant"
              )}
            >
              <Icon size={24} />
              <span className="mt-1 text-[10px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}