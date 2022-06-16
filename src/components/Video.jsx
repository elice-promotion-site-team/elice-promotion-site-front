import React from 'react';

const Video = ({ id }) => {
  return (
    <div className="video">
      <iframe
        width="100%"
        height="615"
        src={`https://www.youtube.com/embed/${id}`} //?autoplay=1&mute=1
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;