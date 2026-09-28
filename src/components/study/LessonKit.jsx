// Small presentational helpers for lesson content, matching the Ledger
// styles used by the original lessons in src/content/study/.

export function Lead({ children }) {
  return <p className="mb-5 text-lg leading-relaxed text-paper">{children}</p>
}

export function P({ children }) {
  return <p className="mb-5 text-paper">{children}</p>
}

export function H2({ children }) {
  return <h2 className="mt-10 mb-4 font-serif text-2xl font-medium">{children}</h2>
}

export function B({ children }) {
  return <strong className="text-gold-400">{children}</strong>
}

export function Callout({ children }) {
  return (
    <p className="my-7 max-w-[58ch] border-l-2 border-gold-500 py-1 pl-5 font-serif text-lg text-paper italic">
      {children}
    </p>
  )
}

export function List({ items }) {
  return (
    <ul className="mb-5 space-y-2 border-l border-line pl-5 text-paper">
      {items.map((item, index) => (
        <li className="relative" key={index}>
          <span className="absolute top-[0.65em] -left-[23px] h-[5px] w-[5px] bg-gold-500" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ExamTip({ children }) {
  return (
    <div className="my-6 border border-gold-500/40 bg-gold-500/5 px-5 py-4">
      <p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        Exam tip
      </p>
      <p className="text-[15px] text-paper">{children}</p>
    </div>
  )
}
