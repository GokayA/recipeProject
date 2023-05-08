'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: any) => {
    event.preventDefault();
    console.log(`navbar Searching for: ${searchQuery}`);
  };

  return (
    <header className="bg-gray-900 border-b border-green-400 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="h-8 w-auto"
              src="https://placehold.co/400.png"
              width={100}
              height={100}
              alt="Logo"
            />
          </Link>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/recipe"
              className="border-transparent text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Add Recipes
            </Link>
            {/* <Link
              className="border-transparent text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              href="/categories"
            >
              Categories
            </Link> */}
            {/* <Link
              href="/videos"
              className="border-transparent text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Videos
            </Link> */}
          </div>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <form onSubmit={handleSearch} className="w-3/4">
            <div className="relative">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Search"
                className="block w-full text-gray-900 font-bold bg-gray-100 border-gray-300 rounded-md py-2 px-4 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="submit"
                  className="bg-white border border-gray-300 rounded-r-md px-4 py-2 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.293 14.293a1 1 0 01-1.414 0l-3.022-3.022A5.986 5.986 0 017 10a6 6 0 1111.265 2.265l3.022 3.022a1 1 0 010 1.414l-.708.708a1 1 0 01-1.414 0l-.708-.708zm-7.207-1.207a4 4 0 100-8 4 4 0 000 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <div className="hidden md:ml-6 sm:flex sm:space-x-8">
            {session ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className=" border-transparent text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Profile
                </Link>
                <SignOutButton className=" border-transparent text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" />
              </>
            ) : (
              <SignInButton
                onClick={() => setIsMenuOpen(false)}
                className="border-transparent text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium "
              />
            )}
          </div>
        </div>

        <div className="-mr-2 flex items-center sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="bg-white p-2 rounded-md inline-flex items-center justify-center text-gray-900 hover:text-green-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/recipe"
            onClick={() => setIsMenuOpen(false)}
            className="border-transparent text-white hover:text-green-300 hover:border-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Add Recipes
          </Link>
          {/* <Link
            href="/categories"
            onClick={() => setIsMenuOpen(false)}
            className="border-transparent text-white hover:text-green-300 hover:border-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Categories
          </Link> */}
          {/* <Link
            href="/videos"
            onClick={() => setIsMenuOpen(false)}
            className="border-transparent text-white hover:text-green-300 hover:border-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Videos
          </Link> */}
          {session ? (
            <>
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="border-transparent text-white hover:text-green-300 hover:border-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
              <SignOutButton className="border-transparent text-white hover:text-green-300 hover:border-gray-300 block px-3 py-2 rounded-md text-base font-medium" />
            </>
          ) : (
            <SignInButton className="border-transparent text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-3 py-2 border-b-2 " />
          )}
        </div>
      </div>
    </header>
  );
}
