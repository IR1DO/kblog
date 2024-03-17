import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4 text-xl'>
        <div className='w-28 h-28 mb-3 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img
            src={currentUser.profilePicture}
            alt='profile-picture'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          className='[&_input]:text-base'
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          className='[&_input]:text-base'
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          className='[&_input]:text-base'
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          className='[&>span]:font-bold [&>span]:text-base'
        >
          Update
        </Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
