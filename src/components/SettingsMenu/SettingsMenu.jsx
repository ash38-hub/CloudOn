import { useState, useEffect } from 'react';
import './SettingsMenu.css';

export default function SettingsMenu({ isOpen, onClose }) {
  const [language, setLanguage] = useState('English (US)');
  const [country, setCountry] = useState('Poland');
  const [city, setCity] = useState('Bydgoszcz');
  const [postIndex, setPostIndex] = useState('00-000');

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div
        className="settings-menu"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        {/* Header */}
        <div className="settings-header">
          <h2 id="settings-title">Settings</h2>
          <button
            className="settings-close"
            onClick={onClose}
            aria-label="Close settings"
          >
            ×
          </button>
        </div>

        <div className="settings-divider" />

        {/* Rows */}
        <div className="settings-body">
          {/* Language */}
          <div className="settings-row">
            <label className="settings-label" htmlFor="settings-language">
              Language
            </label>
            <input
              id="settings-language"
              className="settings-input"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          {/* Country */}
          <div className="settings-row">
            <label className="settings-label" htmlFor="settings-country">
              Location (Country)
            </label>
            <input
              id="settings-country"
              className="settings-input"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          {/* City */}
          <div className="settings-row">
            <label className="settings-label" htmlFor="settings-city">
              Location (City)
            </label>
            <input
              id="settings-city"
              className="settings-input"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Post index */}
          <div className="settings-row">
            <label className="settings-label" htmlFor="settings-post">
              Location (Postcode)
            </label>
            <input
              id="settings-post"
              className="settings-input"
              type="text"
              value={postIndex}
              onChange={(e) => setPostIndex(e.target.value)}
            />
          </div>

          {/* Clothes' styles */}
          <div className="settings-row">
            <span className="settings-label">Clothes&apos; styles</span>
            <button
              className="settings-edit-btn"
              type="button"
              onClick={() => console.log('Edit clothes styles')}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}