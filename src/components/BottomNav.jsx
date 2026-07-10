function BottomNav({ active, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'map', label: 'Map', icon: '🗺' },
    { id: 'heatmap', label: 'Heat', icon: '🔥' },
    { id: 'sos', label: 'SOS', icon: '🛟' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
  ]

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`bottom-nav__item ${active === tab.id ? 'active' : ''}`}
          onClick={() => onNavigate(tab.id)}
        >
          <span>{tab.icon}</span>
          <small>{tab.label}</small>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
