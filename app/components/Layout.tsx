export default function Layout({ children }: JSX.ElementChildrenAttribute) {
  return <div className="h-screen flex flex-col bg-stone-100 overflow-auto">
    <h1 className="text-center text-2xl mt-5 font-semibold text-stone-900 font-serif">Is My Project Done Yet?</h1>
    <div className="grow p-2 sm:p-5">
      <div className="mx-auto max-w-3xl">
      {children}
      </div>
    </div>
    <div>
      Footer
    </div>
  </div>
}