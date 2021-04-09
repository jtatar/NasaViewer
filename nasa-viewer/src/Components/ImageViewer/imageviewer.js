import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ImageViewer.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

const ImageViewer = ({ imageSrc, loading }) => {
  return (
    <div className="imageWrapper">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : null}
      <TransformWrapper
        options={{ limitToBounds: false }}
        wheel={{ disabled: false, step: 100 }}
        doubleClick={{ mode: 'reset' }}
      >
        <TransformComponent>
          <img src={imageSrc} alt=""></img>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default ImageViewer;
