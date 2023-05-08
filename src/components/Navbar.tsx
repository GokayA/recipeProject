'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CookSVG from '../../public/cook.svg';
import LogoSVG from '../../public/logo.svg';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-green-400 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex  items-center h-16">
        <div className="flex justify-end items-center">
          <Link href="/">
            <Image
              className="h-8 w-auto"
              src={LogoSVG}
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
              <Image
                className="h-8 w-auto px-2"
                src={CookSVG}
                width={100}
                height={100}
                alt="Logo"
              />
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
        <div className="flex items-center justify-end  flex-grow">
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
