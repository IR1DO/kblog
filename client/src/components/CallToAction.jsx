import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='font-sans p-3 border border-teal-500  rounded-2xl '>
      <div className='font-mono text-sm text-gray-400 mb-4 sm:mb-0'>
        promoted
      </div>

      <div className='flex flex-col sm:flex-row justify-center items-center text-center'>
        <div className='flex-1 justify-center flex flex-col'>
          <h2 className='text-xl '>Want to learn more about JavaScript?</h2>

          <p
            className='text-base text-gray-500 my-2
        '
          >
            Checkout these resources with real world projects!
          </p>

          <Button
            gradientDuoTone='tealToLime'
            className='font-mono [&>span]:text-base [&>span]:text-slate-700'
          >
            <a
              href='https://www.google.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Learn More
            </a>
          </Button>
        </div>

        <div className='p-7 flex-1'>
          <img
            src='https://images.ctfassets.net/yr4qj72ki4ky/legacyBlogPost77Thumbnail/cd4783ad7b35efc4367166a570a9952e/bigstock-Real-Java-Script-Code-Developi-217215433.jpg?q=72'
            alt='promoted'
          />
        </div>
      </div>
    </div>
  );
}
