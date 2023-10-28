import React, { useRef, useState } from "react";

function Picture({ readablePicture, setPicture, setReadablePicture }) {
  const inputRef = useRef();
  const [error, setError] = useState("");
  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/jpg"
    ) {
      setError(`${pic.name} format is not supported`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, max 5mb allowed`);
      return;
    } else {
      setError("");
      setPicture(pic);
      // reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };

  const handleRemovePic = () => {
    setPicture("");
    setReadablePicture("");
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="profile pic"
            className="w-20 h-20 object-cover rounded-full"
          />
          {/* change pic */}
          <div
            className="w-20 mt-2 py-1 dark:bg-dark_bg_3 rounded-md text-sm font-bold flex items-center justify-center cursor-pointer"
            onClick={() => handleRemovePic()}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg,image/jpg"
        onChange={handlePicture}
      />
      {/* error */}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
}

export default Picture;
