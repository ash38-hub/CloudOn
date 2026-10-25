import cloudLogo from '../../assets/cloudon_logo.svg';
import apparelIcon from '../../assets/clothes.svg';
import settingsIcon from '../../assets/settings.svg';
import logoutIcon from '../../assets/logout.svg';
import './Sidebar.css';

export default function Sidebar({ onWardrobeClick, onSettingsClick }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={cloudLogo} alt="Cloud On!" className="logo-icon" />
        <span className="logo-text">CloudOn!</span>
      </div>

      <div className="sidebar-divider" />

      {/* Nav items */}
      <nav className="sidebar-nav">
        <button className="nav-item" onClick={onWardrobeClick}>
          <span>Wardrobe</span>
          <img src={apparelIcon} alt="" className="nav-icon" />
        </button>

        <button className="nav-item" onClick={onSettingsClick}>
          <span>Settings</span>
          <img src={settingsIcon} alt="" className="nav-icon" />
        </button>
      </nav>

      {/* Account / Logout at the bottom */}
      <div className="sidebar-footer">
        <button className="nav-item account-item">
          <span>Account</span>
          <img src={logoutIcon} alt="" className="nav-icon" />
        </button>
      </div>
    </aside>
  );
}