import React, { useState } from 'react';
import axios from 'axios';
import ImageViewer from '../ImageViewer/ImageViewer';
import SearchBar from '../SearchBar/SearchBar';
import MapViewer from '../MapViewer/MapViewer';
import './NasaViewer.scss';

const NasaViewer = ({ requestUrl }) => {
  const [imageSrc, setimageSrc] = useState('');
  const [latitude, setLatitude] = useState(50.29744);
  const [longitude, setLongitude] = useState(18.672413);

  const getNewImage = async (lon, lat) => {
    try {
      const response = await axios.get(`${requestUrl}/api/earth`, {
        responseType: 'arraybuffer',
        params: {
          lon,
          lat,
        },
      });
      let blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      let image = URL.createObjectURL(blob);
      setimageSrc(image);
      setLatitude(lat);
      setLongitude(lon);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="appContainer">
      <SearchBar requestUrl={requestUrl} getNewImage={getNewImage} />
      <MapViewer latitude={latitude} longitude={longitude} />
      <ImageViewer imageSrc={imageSrc} />
    </div>
  );
};

export default NasaViewer;
