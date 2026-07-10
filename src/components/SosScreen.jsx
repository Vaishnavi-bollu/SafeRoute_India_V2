function SosScreen({ onTrigger }) {
  return (
    <section className="screen">
      <div className="screen__header">
        <div>
          <p className="eyebrow">Emergency</p>
          <h2>SOS</h2>
        </div>
        <div className="avatar-pill danger-pill">🛟</div>
      </div>

      <div className="glass-card sos-card">
        <h3>Need urgent help?</h3>
        <p>Trigger an emergency alert that shares your live location with nearest responders and trusted contacts.</p>
        <button type="button" className="sos-btn" onClick={onTrigger}>
          Trigger SOS
        </button>
      </div>
    </section>
  )
}

export default SosScreen
