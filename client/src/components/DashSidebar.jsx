import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { IoCreate } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../app/user/userSlice';

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === 'profile'}
            icon={HiUser}
            label={'User'}
            labelColor='dark'
            href='/dashboard?tab=profile'
          >
            Profile
          </Sidebar.Item>

          {currentUser.isAdmin && (
            <Sidebar.Item
              // active={tab === 'profile'}
              icon={IoCreate}
              href='/create-post'
            >
              Create Post
            </Sidebar.Item>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
