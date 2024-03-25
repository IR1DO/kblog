import { Select, TextInput, FileInput, Button, Alert } from 'flowbite-react';
import DashSidebar from '../components/DashSidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ImageCropDialog from '../components/ImageCropDialog';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});

  const [crop, setCrop] = useState(false);
  const [imageStyle, setImageStyle] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      // reset image upload state
      setImageFileUploading(true);
      setImageUploadError(null);
      setCrop(false);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed: ' + error);
          setImageUploadProgress(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            setImageFileUploading(false);
            setImageStyle({});
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed: ' + error);
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleCropComplete = (croppedArea) => {
    const SCALE = { x: 100 / croppedArea.width, y: 100 / croppedArea.height };

    const imageStyle = {
      left: `${-croppedArea.x * SCALE.x}%`,
      top: `${-croppedArea.y * SCALE.y}%`,

      transform: `scale(${SCALE.x}, ${SCALE.x})`,
    };
    setImageStyle(imageStyle);

    setCrop(false);
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>

      {/* profile... */}
      <div className='p-3 w-9/12 mx-auto min-h-screen '>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create a post
        </h1>

        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              id='title'
              type='text'
              placeholder='Title'
              className='[&_input]:text-base flex-1'
              required
            />

            <Select className='[&_select]:text-base'>
              <option value='uncategorized'>Select a category</option>
              <option value='technology'>Technology</option>
              <option value='programming'>Programming</option>
              <option value='artificial-intelligence'>
                Artificial Intelligence
              </option>
              <option value='web-development'>Web Development</option>
              <option value='mobile-development'>Mobile Development</option>
              <option value='data-science'>Data Science</option>
              <option value='cybersecurity'>Cybersecurity</option>
              <option value='cloud-computing'>Cloud Computing</option>
              <option value='internet-of-things'>
                Internet of Things (IoT)
              </option>
              <option value='robotics'>Robotics</option>
              <option value='virtual-reality'>Virtual Reality (VR)</option>
            </Select>
          </div>

          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              onClick={handleUploadImage}
              disabled={!file || imageFileUploading}
            >
              {imageFileUploading ? (
                <div className='w-6 h-6'>
                  <CircularProgressbar value={imageUploadProgress || 0} />
                </div>
              ) : (
                'Upload Image'
              )}
            </Button>
          </div>

          {imageUploadError && (
            <Alert color='failure'>{imageUploadError}</Alert>
          )}

          {formData.image && !crop && (
            <div className='w-full aspect-[5/2] relative overflow-hidden'>
              <img
                src={formData.image}
                alt='upload'
                className='w-full absolute origin-top-left'
                style={imageStyle}
                onClick={() => {
                  setCrop(true);
                }}
              />
            </div>
          )}

          {crop && (
            <ImageCropDialog
              image={formData.image}
              onComplete={handleCropComplete}
            />
          )}

          <ReactQuill
            theme='snow'
            placeholder='Write something...'
            className='h-72 mb-12 [&_.ql-editor]:font-mono [&_.ql-editor]:text-lg [&_.ql-editor::before]:dark:text-[rgba(255,255,255,0.6)] [&_.ql-picker]:dark:text-white [&_.ql-picker-options]:dark:bg-slate-400 [&_.ql-toolbar]:dark:bg-slate-400 [&_h1]:mb-2 [&_h1]:mt-12 [&_h2]:mb-2 [&_h2]:mt-9 [&_h3]:mb-2 [&_h3]:mt-6'
            required
          />
          <Button
            type='submit'
            gradientDuoTone='purpleToPink'
            className='font-bold [&>span]:text-base'
          >
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
}
