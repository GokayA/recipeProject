import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type RecipeCardProps = {
  title: string;
  image: string;
  servingSize: string;
  prepTime: string;
  cookingTime: string;
  description?: string;
  instructions?: string;
  isPublic?: boolean;
  author: string;
  authorId?: number;
  href: string;
};

const RecipeCard = ({
  title,
  image,
  servingSize,
  prepTime,
  cookingTime,
  author,
  href,
}: RecipeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-green-400 border-b  max-w-96 max-h-full flex flex-col">
      <Link href={href} className="flex-grow">
        <div className="max-w-full min-h-60 mb-2">
          <Image
            src={image}
            priority
            width={400}
            height={400}
            alt="foodImage"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2 flex-grow">{title}</h1>
      </Link>
      <div className="flex flex-wrap">
        <p className="text-gray-700 text-lg mb-4">
          {servingSize} servings | {prepTime} min prep | {cookingTime} min cook
        </p>
      </div>
      <hr className="my-4" />
      <p className="text-gray-700 text-lg">By {author}</p>
    </div>
  );
};

export default RecipeCard;
