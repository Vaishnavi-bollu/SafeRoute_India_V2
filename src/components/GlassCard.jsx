function GlassCard({ children, className = '', title, subtitle }) {
  return (
    <div className={`glass-card ${className}`.trim()}>
      {(title || subtitle) && (
        <div className="glass-card__header">
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export default GlassCard
