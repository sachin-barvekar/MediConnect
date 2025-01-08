import React from 'react';

const GmapComponent = ({ mapContainerRef }) => {
  return (
    <div className="cardinfo relative justify-content-center w-full h-full">
      <div
        ref={mapContainerRef}
        style={{ height: 'calc(95vh - 4rem)', width: '100%' }}
      ></div>
    </div>
  );
};

export default GmapComponent;
