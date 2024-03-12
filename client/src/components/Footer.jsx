import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {
  BsMeta,
  BsInstagram,
  BsTwitterX,
  BsGithub,
  BsApple,
} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 w-full justify-between sm:flex'>
          <div className='mt-5 mr-7'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='mr-1 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Kevin's
              </span>
              Blog
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-8 mt-4  sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Dune
                </Footer.Link>

                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Audiobook
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Github
                </Footer.Link>

                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Policy
                </Footer.Link>

                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Terms
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />

        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Kevin's blog"
            year={new Date().getFullYear()}
          />
          <div className='flex gap-6 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsMeta} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitterX} />
            <Footer.Icon href='#' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsApple} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
