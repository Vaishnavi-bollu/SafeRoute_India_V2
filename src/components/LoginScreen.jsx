function LoginScreen({ onLogin }) {
  return (
    <section className="screen screen--stacked">
      <div className="screen__header">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to SafeRoute</h2>
        </div>
      </div>

      <div className="glass-card auth-card">
        <div className="auth-card__avatar">SR</div>
        <h3>Secure access</h3>
        <p>Sign in to unlock live safety recommendations, emergency help, and trusted routes.</p>

        <label className="input-field">
          <span>Phone number</span>
          <input type="tel" defaultValue="+91 98765 43210" />
        </label>

        <label className="input-field">
          <span>Password</span>
          <input type="password" defaultValue="••••••••" />
        </label>

        <button type="button" className="primary-btn" onClick={onLogin}>
          Continue
        </button>
      </div>
    </section>
  )
}

export default LoginScreen
