import React, { useState } from 'react';

const SearchableVideoList = ({ videos }) => {
  const [searchText, setSearchText] = useState('');

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search... "
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{
          marginBottom: '1rem',
          padding: '0.3rem', // Adjust the padding for a smaller height
          width: '300%',
          height: '30px', // Set a specific height if desired
          fontSize: '14px', // Adjust the font size if necessary
        }}
      />
      {/* Optionally render filtered videos */}
    </>
  );
};

export default SearchableVideoList; // Ensure this is a default export
