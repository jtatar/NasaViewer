import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ImageViewer = ({ imageSrc }) => {
  return (
    <TransformWrapper
      options={{ limitToBounds: false }}
      wheel={{ disabled: true }}
      doubleClick={{ mode: 'reset' }}
    >
      <TransformComponent>
        <img src={imageSrc} alt=""></img>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default ImageViewer;
