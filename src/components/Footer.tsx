import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SignInButton from './SignInButton';
import facebookSVG from '/public/facebook.svg';
import instagramSVG from '/public/instagram.svg';
import twitterSVG from '/public/twitter.svg';
import youtubeSVG from '/public/youtube.svg';

const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="container mx-auto flex flex-wrap justify-between ">
        {!session ? (
          <div className="flex items-center ">
            <h1 className="text-2xl font-bold mr-4 ">Join us</h1>
            <p className="text-lg">To share recipes</p>
          </div>
        ) : (
          ''
        )}
        {!session ? (
          <div className="bg-white text-gray-900 px-4 py-2 rounded-full">
            <SignInButton />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="container mx-auto flex flex-wrap justify-between mt-4">
        <div className="text-lg">
          <a href="/about">About</a>
        </div>
        <div className="flex items-center">
          <Link href="https://instagram.com">
            <Image
              src={instagramSVG}
              alt="instagram svg"
              className="h-6 w-6 mr-4 text-gray-400 hover:text-gray-100"
            />
          </Link>
          <Link href="https://twitter.com">
            <Image
              src={twitterSVG}
              alt="twitter svg"
              className="h-6 w-6 mr-4 text-gray-400 hover:text-gray-100"
            />
          </Link>
          <Link href="https://youtube.com">
            <Image
              src={youtubeSVG}
              alt="youtube svg"
              className="h-6 w-6 mr-4 text-gray-400 hover:text-gray-100"
            />
          </Link>
          <Link href="https://facebook.com">
            <Image
              src={facebookSVG}
              alt="facebook svg"
              className="h-6 w-6 mr-4 text-gray-400 hover:text-gray-100"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
