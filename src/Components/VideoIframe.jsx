import React from 'react';
import PropTypes from 'prop-types';

function VideoIframe({ data }) {
  function getVideoUrl() {
    if (data.strYoutube) {
      return data.strYoutube.split('=')[1];
    }
    return '2Z4m4lnjxkY';
  }

  return (
    <iframe
      data-testid="video"
      width="350"
      height="205"
      src={ `https://www.youtube.com/embed/${getVideoUrl()}` }
      title="YouTube recipe video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
      allowFullScreen
    />
  );
}

VideoIframe.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VideoIframe;
