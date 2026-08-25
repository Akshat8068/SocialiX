
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-screen w-full flex items-center justify-center p-gutter overflow-hidden"
      style={{
        backgroundImage: "url('/Hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/10" />
      <div className="relative z-10 w-full max-w-120">
        <div className="rounded-xl p-xl bg-white/70 backdrop-blur-xl border border-white/30 shadow flex flex-col items-center" >
          {children}
        </div>
      </div>
    </main>
  )
}