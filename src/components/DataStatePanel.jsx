export function DataStatePanel({ title, message }) {
  return (
    <article className="border border-line bg-ink-900 p-6">
      <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        Content status
      </p>
      <h3 className="mb-2 font-serif text-xl font-medium">{title}</h3>
      <p className="text-muted">{message}</p>
    </article>
  )
}
