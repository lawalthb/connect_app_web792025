import React, { useRef, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import AddImageIcon from '@/Images/Icons/AddImageIcon.svg';

const ImageUpload = ({ handlePreview, name = 'identityMedia' }) => {
  const { control } = useFormContext();
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleMediaChange = (e, onChange) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (isImage) {
      const img = new Image();
      img.src = objectUrl;

      img.onload = () => {
        if (img.width < 280 || img.height < 280) {
          setError('Image must be at least 280x280 pixels');
          setPreview(null);
          return;
        }

        setError(null);
        setMediaType('image');
        setPreview(objectUrl);
        onChange(file);
        handlePreview?.(objectUrl);
      };
    } else if (isVideo) {
      setError(null);
      setMediaType('video');
      setPreview(objectUrl);
      onChange(file);
    } else {
      setError('Only images and videos are allowed');
      setPreview(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full space-y-4">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div className="w-full flex justify-between items-center p-5 rounded-[10px] border border-[#D0D5DD]">
            {/* Preview */}
            <div className="flex gap-3 items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 shadow-md flex items-center justify-center bg-white">
                {preview ? (
                  mediaType === 'image' ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <video
                      src={preview}
                      className="w-full h-full object-cover rounded-full"
                      muted
                      autoPlay
                      loop
                    />
                  )
                ) : (
                  <div className="flex items-center justify-center bg-[rgba(162,0,48,0.29)] w-full h-full rounded-full">
                    <AddImageIcon />
                  </div>
                )}
              </div>
              {/* Text + Upload button column */}
              <div className="flex flex-col gap-y-3 w-[120px] md:w-max">
                <label className="text-base font-normal text-black">
                  Upload a picture or video
                </label>
                <p className="text-sm leading-6 text-[#8F8F8F]">
                  Upload a clear picture or video .
                </p>
              </div>
            </div>
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*,video/*"
              ref={fileInputRef}
              onChange={(e) => handleMediaChange(e, onChange)}
              className="hidden"
            />

            <button
              type="button"
              onClick={handleUploadClick}
              className="text-[#A20030] h-14 bg-white px-6 py-2 rounded-lg shadow-md hover:bg-[#880026] hover:text-white border border-[#A20030] cursor-pointer transition duration-300"
            >
              Upload
            </button>
          </div>
        )}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUpload;
