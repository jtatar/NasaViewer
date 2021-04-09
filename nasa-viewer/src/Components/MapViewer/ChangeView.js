import { useMap } from 'react-leaflet';

function ChangeView({ latitude, longitude, zoom }) {
  const map = useMap();
  map.setView([latitude, longitude], zoom);
  return null;
}

export default ChangeView;
