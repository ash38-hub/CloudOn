import './AI_Button.css';

export default function AI_Button({ onClick }) {
  return (
    <button className="ai-button" onClick={onClick} type="button">
      <span className="ai-button__text">Going out?</span>
      <span className="ai-button__arrow">↑</span>
    </button>
  );
}