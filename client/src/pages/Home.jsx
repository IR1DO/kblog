import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-12 lg:p-24 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to KBlog</h1>
        <p className='text-gray-500 text-base'>
          Thank you for joining us on KBlog, your ultimate destination for all
          things blogging! Whether you're a seasoned blogger or just starting
          out, KBlog offers a vibrant community and a wealth of resources to
          support you on your blogging journey.
        </p>

        <Link
          to='/search'
          className='text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>

      <hr />

      <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className=''>
            <h2 className='text-2xl font-semibold text-center mb-4'>
              Recent Posts
            </h2>

            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              <div className='text-center mt-4'>View all posts</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
