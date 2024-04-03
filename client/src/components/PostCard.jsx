import { Link } from 'react-router-dom';

export default function PostCard({ post, customize }) {
  return (
    <div
      className={`${customize} w-80 sm:w-[30rem] group mb-2 flex flex-col self-center shadow-md`}
    >
      <Link to={`/post/${post.slug}`}>
        <div className='aspect-[16/9] relative overflow-hidden bg-gray-500 group-hover:opacity-[.85] dark:group-hover:opacity-[.65] transition-all'>
          <img
            src={post.image}
            alt={post.title}
            className='w-full absolute origin-top-left '
            style={post.imageStyle}
          />
        </div>
      </Link>

      <div className='p-3 bg-slate-200 dark:bg-slate-500 text-lg md:text-sm md:h-24 line-clamp-4 dark:text-slate-100'>
        <span className='italic font-bold text-orange-700 dark:text-orange-300'>
          {post.category.toUpperCase()}
          {' / '}
        </span>
        <span className='font-semibold'>{post.title}</span>
      </div>
    </div>
  );
}
