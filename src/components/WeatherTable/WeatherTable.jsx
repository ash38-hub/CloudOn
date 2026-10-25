import './WeatherTable.css';

import PartlyCloudy from '../../assets/partly_cloudy_day.svg?react';
import Sunny from '../../assets/sunny.svg?react';
import Bedtime from '../../assets/bedtime.svg?react';

const HOURLY_DATA = [
  { time: 'Now', icon: 'partly', temp: 23 },
  { time: '17',  icon: 'partly', temp: 23 },
  { time: '18',  icon: 'sunny',  temp: 23 },
  { time: '19',  icon: 'sunny',  temp: 22 },
  { time: '20',  icon: 'sunny',  temp: 21 },
  { time: '21',  icon: 'moon',   temp: 19 },
  { time: '22',  icon: 'moon',   temp: 17 },
  { time: '23',  icon: 'moon',   temp: 16 },
  { time: '00',  icon: 'moon',   temp: 15 },
  { time: '01',  icon: 'moon',   temp: 14 },
  { time: '02',  icon: 'moon',   temp: 14 },
  { time: '03',  icon: 'moon',   temp: 13 },
  { time: '04',  icon: 'moon',   temp: 13 },
  { time: '05',  icon: 'moon',   temp: 12 },
  { time: '06',  icon: 'sunny',  temp: 12 },
  { time: '07',  icon: 'sunny',  temp: 14 },
];

function WeatherIcon({ type }) {
  switch (type) {
    case 'partly':
      return <PartlyCloudy className="weather-icon--partly" />;
    case 'sunny':
      return <Sunny className="weather-icon--sunny" />;
    case 'moon':
      return <Bedtime className="weather-icon--moon" />;
    default:
      return null;
  }
}

export default function WeatherTable() {
  return (
    <div className="weather-table">
      {HOURLY_DATA.map((item) => (
        <div key={item.time} className="weather-table__col">
          <span className="weather-table__time">{item.time}</span>
          <WeatherIcon type={item.icon} />
          <span className="weather-table__temp">{item.temp}°</span>
        </div>
      ))}
    </div>
  );
}