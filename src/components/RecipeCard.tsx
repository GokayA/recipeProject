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
    <div className="card max-w-96 glass bg-slate-300">
      <Link href={href} className="flex-grow">
        <figure className="max-w-full min-h-60 mb-2">
          <Image
            src={image}
            priority
            width={400}
            height={400}
            alt="foodImage"
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>

        <div className="card-actions justify-end">
          <div className="badge badge-outline ">{servingSize} servings</div>
          <div className="badge badge-outline">{prepTime} min prep</div>
          <div className="badge badge-outline">{cookingTime} min cook</div>
        </div>
        <p> by {author}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
