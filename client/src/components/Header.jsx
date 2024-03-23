import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../app/theme/themeSlice';
import { signoutSuccess } from '../app/user/userSlice';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

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
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='mx-1 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Kevin's
        </span>
        Blog
      </Link>

      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 inline [&>span]:justify-center'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? (
            <IconContext.Provider value={{ size: '1.1rem' }}>
              <div>
                <FaMoon />
              </div>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ size: '1.1rem' }}>
              <div>
                <FaSun />
              </div>
            </IconContext.Provider>
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            className='font-roboto'
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user-avatar'
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='font-normal block'>@{currentUser.username}</span>
              <span className='font-medium block truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button
              className='font-bold'
              gradientDuoTone='purpleToBlue'
              outline
              pill
            >
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link className='font-bold text-base' to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link className='font-bold text-base' to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link className='font-bold text-base' to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
