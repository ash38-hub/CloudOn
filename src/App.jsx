import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Header from './components/Header/Header.jsx';
import LocationInfo from './components/LocationInfo/LocationInfo.jsx';
import WeatherTable from './components/WeatherTable/WeatherTable.jsx';
import AI_Button from './components/Button/AI_Button.jsx';
import WardrobeMenu from './components/WardrobeMenu/WardrobeMenu.jsx';
import SettingsMenu from './components/SettingsMenu/SettingsMenu.jsx';

export default function App() {
  const [activeNav, setActiveNav] = useState(null);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className='global_container'>
      <Sidebar 
        onWardrobeClick={() => setIsWardrobeOpen(true)} 
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      <div className='container_workspace-wrapper'>
        <Header accountName="Alex" />
        <div className='workspace'>
          <LocationInfo
            label="Your location"
            city="Bydgoszcz"
            temperature={23}
            condition="Partly cloudy"
          />
          <WeatherTable />
          <AI_Button onClick={() => console.log('Going out clicked')} />
        </div>
      </div>

      {/* Wardrobe modal */}
      <WardrobeMenu
        isOpen={isWardrobeOpen}
        onClose={() => setIsWardrobeOpen(false)}
      />

      {/* Settings modal */}
      <SettingsMenu
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}