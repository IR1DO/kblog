import { useEffect, useState } from 'react';
import moment from 'moment';

export default function Comment({ comment }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [comment]);

  return (
    <div className='flex p-2 border-b dark:border-gray-600'>
      <div className='felx-shrink-0 mr-3'>
        <img
          src={
            user
              ? user.profilePicture
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350'
          }
          className='w-10 h-10 rounded-full subpixel-antialiased'
          alt='user-profile-picture'
        />
      </div>

      <div className='flex-1'>
        <div className='flex items-center mb-1 gap-2'>
          <span className='font-sans font-bold mr-1 text-sm truncate'>
            {user ? `@${user.username}` : 'deleted account'}
          </span>

          <span className='text-gray-500 text-sm'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        <p className='text-gray-700 dark:text-slate-200 pb-2'>
          {comment.content}
        </p>
      </div>
    </div>
  );
}
