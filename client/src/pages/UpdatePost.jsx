import { Select, TextInput, FileInput, Button, Alert } from 'flowbite-react';
import DashSidebar from '../components/DashSidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [crop, setCrop] = useState(false);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        } else {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

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
            setFormData((prevFormData) => ({
              ...prevFormData,
              image: downloadURL,
              imageStyle: {},
            }));
            setImageFileUploading(false);
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed: ' + error);
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleCropComplete = (croppedArea) => {
    const SCALE = { x: 100 / croppedArea.width, y: 100 / croppedArea.height };

    const imageStyle = {
      left: `${-croppedArea.x * SCALE.x}%`,
      top: `${-croppedArea.y * SCALE.y}%`,

      transform: `scale(${SCALE.x}, ${SCALE.x})`,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageStyle: imageStyle,
    }));

    setCrop(false);
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>

      {/* Update post... */}
      <div className='p-3 w-9/12 mx-auto min-h-screen '>
        <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              id='title'
              type='text'
              placeholder='Title'
              className='[&_input]:text-base flex-1'
              required
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  title: e.target.value,
                }));
              }}
              value={formData.title}
            />

            <Select
              className='[&_select]:text-base'
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  category: e.target.value,
                }));
              }}
              value={formData.category}
            >
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
            <div className='w-full aspect-[16/9] relative overflow-hidden cursor-pointer'>
              <img
                src={formData.image}
                alt='upload'
                className='w-full absolute origin-top-left'
                style={formData.imageStyle}
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
            className='h-72 mb-12 [&_.ql-editor]:font-mono [&_.ql-editor]:text-lg [&_.ql-editor::before]:dark:text-[rgba(255,255,255,0.6)] [&_.ql-picker]:dark:text-white [&_.ql-picker-options]:dark:bg-slate-400 [&_.ql-toolbar]:dark:bg-slate-400 [&_h1]:pb-4 [&_h1]:pt-12 [&_h1]:leading-normal [&_h2]:pb-2 [&_h2]:pt-9 [&_h3]:pb-2 [&_h3]:pt-6'
            required
            onChange={(value) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                content: value,
              }));
            }}
            value={formData.content}
          />

          <Button
            type='submit'
            gradientDuoTone='purpleToPink'
            className='font-bold [&>span]:text-base'
          >
            Update
          </Button>

          {publishError && (
            <Alert className='mt-5' color='failure'>
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
