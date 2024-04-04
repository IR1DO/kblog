import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex flex-col gap-4 items-center justify-center p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-base text-gray-500'>
        Build fun and engaging projects while learning JavaScript
      </p>
      <CallToAction />
    </div>
  );
}
