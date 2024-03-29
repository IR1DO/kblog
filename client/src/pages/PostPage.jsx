import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  console.log(error);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-4xl mt-10 p-3 text-center max-w-3xl mx-auto lg:text-5xl lg:max-w-4xl font-serif'>
        {post && post.title}
      </h1>

      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button
          gradientMonochrome='info'
          pill
          size='md'
          className='[&>span]:text-base'
        >
          {post && post.category}
        </Button>
      </Link>

      <div className='w-[90%] aspect-[16/9] relative overflow-hidden bg-gray-500 mt-10 self-center'>
        <img
          src={post && post.image}
          alt={post && post.title}
          className='w-full absolute origin-top-left'
          style={post && post.imageStyle}
        />
      </div>

      <div className='flex justify-between py-3 border-b border-slate-500 mx-auto w-[90%]'>
        <span>
          updated at: {post && new Date(post.updatedAt).toLocaleDateString()}
        </span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        className='py-3 w-[90%] mx-auto post-content'
      ></div>

      <div className='max-w-4xl mx-auto w-[90%]'>
        <CallToAction />
      </div>
    </main>
  );
}
