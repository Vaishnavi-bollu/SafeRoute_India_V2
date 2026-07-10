function SplashScreen({ onContinue }) {
  return (
    <section className="screen screen--centered">
      <div className="hero-badge">SafeRoute India</div>
      <h1>Navigate the safest way home.</h1>
      <p>
        AI-powered guidance that prioritizes safety, lighting, crowd levels, and real-time alerts.
      </p>
      <button type="button" className="primary-btn" onClick={onContinue}>
        Get Started
      </button>
    </section>
  )
}

export default SplashScreen
