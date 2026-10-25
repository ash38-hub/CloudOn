import { useState, useRef } from 'react';
import './WardrobeMenu.css';

// Inline SVG icons (exact style from screenshots)
const TshirtIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v1.5a1 1 0 0 1-.4.8l-3.6 2.7V20a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-8.9L4.4 8.3A1 1 0 0 1 4 7.5V6a2 2 0 0 1 2-2h2" />
    <path d="M12 4v3" />
    <path d="M9 4a3 3 0 0 0 6 0" />
  </svg>
);

const PlusTshirtIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v1.5a1 1 0 0 1-.4.8l-3.6 2.7V20a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-8.9L4.4 8.3A1 1 0 0 1 4 7.5V6a2 2 0 0 1 2-2h2" />
    <path d="M12 4v3" />
    <path d="M9 4a3 3 0 0 0 6 0" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);

const TrashIcon = ({ size = 14, color = "#e05c5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default function WardrobeMenu({ isOpen, onClose }) {
  const [items, setItems] = useState([
    // Placeholder items (replace with real photos later)
    { id: 1, src: null },
    { id: 2, src: null },
    { id: 3, src: null },
    { id: 4, src: null },
    { id: 5, src: null },
    { id: 6, src: null },
  ]);

  const [mode, setMode] = useState(null); // null | 'add' | 'delete'
  const [selectedForDelete, setSelectedForDelete] = useState(new Set());
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // ---------- ADD ----------
  const handleAddClick = () => {
    if (mode === 'add') {
      // Already in add mode → open file picker
      fileInputRef.current?.click();
    } else {
      // Enter add mode
      setMode('add');
      setSelectedForDelete(new Set());
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      setMode(null);
      return;
    }

    const newItems = files.map((file, idx) => ({
      id: Date.now() + idx,
      src: URL.createObjectURL(file),
      file,
    }));

    setItems((prev) => [...prev, ...newItems]);
    setMode(null); // button returns to gray
    e.target.value = ''; // reset input
  };

  // ---------- DELETE ----------
  const handleDeleteClick = () => {
    if (mode === 'delete') {
      // Confirm deletion
      if (selectedForDelete.size > 0) {
        setItems((prev) => prev.filter((item) => !selectedForDelete.has(item.id)));
        setSelectedForDelete(new Set());
      }
      setMode(null);
    } else {
      // Enter delete mode
      setMode('delete');
      setSelectedForDelete(new Set());
    }
  };

  const toggleSelectForDelete = (id) => {
    if (mode !== 'delete') return;
    setSelectedForDelete((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ---------- CLOSE ----------
  const handleClose = () => {
    setMode(null);
    setSelectedForDelete(new Set());
    onClose();
  };

  return (
    <div className="wardrobe-overlay" onClick={handleClose}>
      <div className="wardrobe-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wardrobe-header">
          <h2 className="wardrobe-title">Wardrobe showcase</h2>

          <div className="wardrobe-actions">
            {/* ADD button */}
            <button
              className={`wardrobe-btn ${mode === 'add' ? 'add-active' : ''}`}
              onClick={handleAddClick}
            >
              Add <PlusTshirtIcon />
            </button>

            {/* DELETE button */}
            <button
              className={`wardrobe-btn ${mode === 'delete' ? 'delete-active' : ''}`}
              onClick={handleDeleteClick}
            >
              Delete <TshirtIcon size={16} />
            </button>

            {/* Close */}
            <button className="wardrobe-close" onClick={handleClose} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Grid */}
        <div className="wardrobe-grid">
          {items.map((item) => {
            const isSelected = selectedForDelete.has(item.id);
            return (
              <div
                key={item.id}
                className={`wardrobe-item ${mode === 'delete' ? 'deletable' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleSelectForDelete(item.id)}
              >
                {item.src ? (
                  <img src={item.src} alt="clothing" className="item-image" />
                ) : (
                  <TshirtIcon size={32} />
                )}

                {/* Trash icon (only in delete mode) */}
                {mode === 'delete' && (
                  <div className={`trash-badge ${isSelected ? 'selected-trash' : ''}`}>
                    <TrashIcon size={13} color={isSelected ? '#ffffff' : '#e05c5c'} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}