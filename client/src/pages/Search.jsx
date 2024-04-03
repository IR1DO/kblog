import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: '',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('order');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);

      console.log(searchQuery);

      if (!res.ok) {
        setLoading(false);
        return;
      } else {
        const data = await res.json();
        setLoading(false);
        setPosts(data.posts);

        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        searchTerm: e.target.value,
      }));
    }

    if (e.target.id === 'sort') {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        sort: e.target.value,
      }));
    }

    if (e.target.id === 'category') {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        category: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('order', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async (e) => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);

    if (!res.ok) {
      return;
    } else {
      const data = await res.json();
      setPosts((prevPost) => [...prevPost, ...data.posts]);

      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-4 border-b border-gray-500 md:min-h-screen md:bg-slate-50'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>

          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value=''>All</option>
              <option value='uncategorized'>Uncategorized</option>
              <option value='technology'>Technology</option>
              <option value='programming'>Programming</option>
              <option value='artificial-intelligence'>
                Artificial Intelligence
              </option>
              <option value='web-development'>Web Development</option>
              <option value='mobile-development'>Mobile Development</option>
              <option value='data-science'>Data Science</option>
              <option value='cybersecurity'>Cybersecurity</option>
              <option value='cloud-computing'>Cloud Computing</option>
              <option value='internet-of-things'>
                Internet of Things (IoT)
              </option>
              <option value='robotics'>Robotics</option>
              <option value='virtual-reality'>Virtual Reality (VR)</option>
            </Select>
          </div>

          <Button type='submit' gradientMonochrome='success'>
            Search
          </Button>
        </form>
      </div>

      <div className='w-full text-center'>
        <h1 className='text-3xl font-semibold border-gray-500 p-3 mt-5'>
          Posts results:
        </h1>

        <div className='p-4 flex flex-wrap gap-4 justify-center'>
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}

          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found</p>
          )}

          {!loading &&
            posts &&
            posts.map((post) => (
              <PostCard key={post._id} post={post} customize={'lg:w-[20rem]'} />
            ))}
        </div>
        {showMore && (
          <button
            className='text-teal-500 hover:underline mb-4'
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
