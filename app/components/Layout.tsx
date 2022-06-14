export default function Layout({ children }: JSX.ElementChildrenAttribute) {
  return <div className="h-screen flex flex-col bg-stone-100 overflow-auto">
    <header>
      <h1 className="text-center text-2xl mt-5 font-semibold text-stone-900 font-serif">Is My Project Done Yet?</h1>
    </header>
    <div className="grow sm:p-5">
      <main className="mx-auto max-w-3xl">
      {children}
      </main>
    </div>
    <footer>
      Footer
    </footer>
  </div>
}