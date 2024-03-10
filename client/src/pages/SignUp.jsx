import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='mx-1 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Kevin's
            </span>
            Blog
          </Link>
          <p className='text-md my-5'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque iste
            fugiat aliquid vitae ea minima temporibus harum facere quod,
            nesciunt ut soluta dolore repellat earum hic iure laborum?
            Repellendus, nemo omnis quod ab corrupti odio excepturi, totam id
            sit cumque, modi consectetur facere veritatis. Vel optio culpa a
            aliquid laborum.
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label className='text-lg' value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>

            <div>
              <Label className='text-lg' value='Your email' />
              <TextInput type='text' placeholder='Email' id='email' />
            </div>

            <div>
              <Label className='text-lg' value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' />
            </div>

            <Button
              className='font-semibold'
              gradientDuoTone='purpleToPink'
              type='submit'
            >
              Sign Up
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
