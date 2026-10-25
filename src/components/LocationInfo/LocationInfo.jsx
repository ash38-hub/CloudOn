import './LocationInfo.css';

export default function LocationInfo({
  label = 'Your location',
  city,
  temperature,
  condition,
}) {
  return (
    <div className="location-info">
      <p className="location-info__label">{label}</p>
      <h2 className="location-info__city">{city}</h2>
      <p className="location-info__temp">{temperature}°</p>
      <p className="location-info__condition">{condition}</p>
    </div>
  );
}