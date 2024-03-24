import { Button } from 'flowbite-react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

export default function ImageCropDialog({ image, onComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState({});

  const onCropComplete = (croppedArea) => {
    setArea(croppedArea);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full aspect-[5/2] relative'>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={5 / 2}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <Button
        gradientDuoTone='greenToBlue'
        className='font-bold [&>span]:text-base'
        onClick={() => {
          onComplete(area);
        }}
      >
        Apply
      </Button>
    </div>
  );
}
