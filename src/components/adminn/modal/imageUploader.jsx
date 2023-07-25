
import React, {useState} from "react";

const ImageUploader = ({ onImageChange }) => {
    const [photo, setPhoto] = useState(null);
  
    function handleChange(e) {
      if (e.target.files[0]) {
        setPhoto(e.target.files[0]);
    
        onImageChange(e.target.files[0]);
      }
    }
  
    return (
      <div className="fields">
        <input type="file" onChange={handleChange} />
     
        {photo && (
          <img
            src={URL.createObjectURL(photo)}
            alt="Avatar"
            className="avatar"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        )}
      </div>
    );
  };

  export default ImageUploader;
  