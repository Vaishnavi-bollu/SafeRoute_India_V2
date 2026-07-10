import GlassCard from './GlassCard'

function SettingsScreen() {
  return (
    <section className="screen">
      <div className="screen__header">
        <div>
          <p className="eyebrow">Preferences</p>
          <h2>Settings</h2>
        </div>
        <div className="avatar-pill">⚙</div>
      </div>

      <GlassCard title="Safety preferences" subtitle="Tailor route suggestions">
        <div className="settings-list">
          <label><input type="checkbox" defaultChecked /> Prefer lit streets</label>
          <label><input type="checkbox" defaultChecked /> Avoid crowded zones</label>
          <label><input type="checkbox" defaultChecked /> Share live location</label>
        </div>
      </GlassCard>

      <GlassCard title="Theme" subtitle="Dark mode is active">
        <div className="tiny-pill safe">Glassy neon aesthetic</div>
      </GlassCard>
    </section>
  )
}

export default SettingsScreen
