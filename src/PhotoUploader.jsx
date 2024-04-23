import React, { useState } from "react";

function PhotoUploader(props) {
  let photo = props.photo;

  // Function to handle file input change

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
    </div>
  );
}

export default PhotoUploader;
