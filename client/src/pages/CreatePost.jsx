import { Select, TextInput, FileInput, Button } from 'flowbite-react';
import DashSidebar from '../components/DashSidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
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
            <FileInput type='file' accept='image/*' />
            <Button type='button' gradientDuoTone='purpleToBlue' size='sm'>
              {' '}
              Upload image
            </Button>
          </div>

          <ReactQuill
            theme='snow'
            placeholder='Write something...'
            className='h-72 mb-12 [&_.ql-editor]:font-mono [&_.ql-editor]:text-lg'
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
