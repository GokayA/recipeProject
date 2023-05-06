import Image from 'next/image';
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
};

const RecipeCard = ({
  title,
  image,
  servingSize,
  prepTime,
  cookingTime,
  author,
}: RecipeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-green-400 border-b">
      <Image src={image} alt="foodImage" width={400} height={400} />
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-700 text-lg mb-4">
        {servingSize} servings | {prepTime} min prep | {cookingTime} min cook
      </p>
      <hr className="my-4" />
      <p className="text-gray-700 text-lg">By {author}</p>
    </div>
  );
};

export default RecipeCard;
