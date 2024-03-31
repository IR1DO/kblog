import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedComment }),
      });

      if (res.ok) {
        setIsEditing(false);
        onEdit(comment._id, editedComment);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    onDelete(comment._id);
  };

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

        {isEditing ? (
          <>
            <Textarea
              className='p-2 text-gray-700 rounded-md resize-none focus:outline-none focus:bg-gray-100'
              rows='2'
              value={editedComment}
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
            />

            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                size='sm'
                className='mt-2'
                onClick={handleSave}
              >
                Save
              </Button>

              <Button
                color='failure'
                type='button'
                size='sm'
                className='mt-2'
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className='text-gray-700 dark:text-slate-200 pb-2'>
              {comment.content}
            </p>

            <div className='flex justify-between h-4 items-center'>
              <div className='flex gap-2'>
                <button
                  type='button'
                  onClick={() => onLike(comment._id)}
                  className={`text-gray-400 hover:text-blue-500 ${
                    currentUser &&
                    comment.likes.includes(currentUser._id) &&
                    '!text-blue-500'
                  }`}
                >
                  <FaThumbsUp className='text-sm' />
                </button>

                <p className='text-sm text-gray-400'>
                  {comment.numberOfLikes > 0 && comment.numberOfLikes}
                </p>
              </div>

              {currentUser && currentUser._id === comment.userId && (
                <div className='flex gap-2'>
                  <button
                    type='button'
                    onClick={handleEdit}
                    className='text-gray-400 hover:text-blue-500 hover:underline text-sm ml-2'
                  >
                    Edit
                  </button>

                  <button
                    type='button'
                    onClick={handleDelete}
                    className='text-red-400 hover:text-red-500 hover:underline text-sm ml-2'
                  >
                    Delete
                  </button>
                </div>
              )}

              {currentUser &&
                currentUser._id !== comment.userId &&
                currentUser.isAdmin && (
                  <button
                    type='button'
                    onClick={handleDelete}
                    className='text-red-400 hover:text-red-500 hover:underline text-sm ml-2'
                  >
                    Delete
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
