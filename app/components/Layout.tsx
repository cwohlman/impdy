import { Link } from "@remix-run/react";

export default function Layout({ children, title }: JSX.ElementChildrenAttribute & { title?: string }) {
  return <div className="h-screen flex flex-col bg-stone-100 overflow-auto">
    <header className="flex mt-5 ">
      {/* TODO: nav links */}
      <div className="mx-5"><Link to="/">Home</Link></div>
      <h1 className="text-center grow text-2xl font-semibold text-stone-900 font-serif"><Link to="/">{title || "Is My Project Done Yet?"}</Link></h1>
      <div className="mx-5"><Link to="/tada">Tada</Link></div>
    </header>
    <div className="grow sm:p-5">
      <main className="mx-auto max-w-3xl h-full">
      {children}
      </main>
    </div>
    <footer>
      Footer
    </footer>
  </div>
}