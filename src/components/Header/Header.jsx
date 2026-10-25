import { useState, useEffect } from 'react';
import './Header.css';

export default function Header({ accountName = '[Account name]' }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Uses the user's system locale & 24-hour format (matches the screenshot)
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime(); // set immediately
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="header">
      <span className="header-greeting">Hello, {accountName}!</span>
      <span className="header-time">{time}</span>
    </header>
  );
}