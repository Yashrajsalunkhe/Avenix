function Section({ id, title, children, intro }) {
  return (
    <section id={id} className="doc-section">
      <h2>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
      {children}
    </section>
  )
}

export default Section
