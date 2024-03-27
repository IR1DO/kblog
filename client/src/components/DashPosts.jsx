import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);

    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        { method: 'DELETE' }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-white scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table
            hoverable
            className='shadow-md text-center font-roboto text-base'
          >
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <div className='w-20 aspect-[16/9] relative overflow-hidden bg-gray-500'>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-full absolute origin-top-left'
                          style={post.imageStyle}
                        />
                      </div>
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      className='text-gray-900 dark:text-white'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>

                  <Table.Cell>{post.category}</Table.Cell>

                  <Table.Cell>
                    <span
                      className='text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {showMore && (
            <button
              className='w-full text-teal-500 self-center text-sm py-7'
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>

            <div className='flex justify-evenly'>
              <Button
                color='failure'
                className='font-medium'
                onClick={handleDeletePost}
              >
                Yes, I'm sure
              </Button>

              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
