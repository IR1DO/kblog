import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log('error while rendering comment');
      } else {
        setComment('');
        setCommentError(null);
        console.log(data);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-base font-sans'>
          <p>Signed in as:&nbsp;</p>{' '}
          <img
            className='h-6 w-6 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt='profile-picture'
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-sm text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-base text-gray-500 my-5'>
          You must be signed in to comment.&nbsp;
          <Link to={'/sign-in'} className='text-teal-500 hover:underline'>
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className='border border-teal-500 rounded-md p-3'
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            className='text-base'
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-sm'>
              {200 - comment.length} characters remaining
            </p>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      )}

      {commentError && (
        <Alert color='failure' className='mt-5'>
          {commentError}
        </Alert>
      )}
    </div>
  );
}
