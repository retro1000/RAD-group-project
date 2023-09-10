import React from 'react';

function VideoCard({ videoLink, description, imageUrl }) {
  const handleVideoClick = () => {
    // Open the YouTube video link in a new tab when clicked
    window.open(videoLink, '_blank');
  };

  return (
    <div className="video-card">
      <div className="video-thumbnail" onClick={handleVideoClick}>
        <img src={imageUrl} alt={description} />
      </div>
      <div className="video-description">{description}</div>
    </div>
  );
}

export default VideoCard;
