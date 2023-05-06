'use client';
import RecipeCard from '@/components/RecipeCard';
import { Recipe, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface RecipeWithAuthor extends Recipe {
  author: User;
}

const ProfilePage = () => {
  const { data: session } = useSession();
  const { isLoading, data } = useQuery<RecipeWithAuthor[]>(
    ['recipes', session?.user.id],
    async () => {
      const { data } = await axios.get(`/api/recipe/profilerecipe/`);
      return data;
    }
  );

  return (
    <div className="min:h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
              className="mt-7 mr-5"
            >
              <path
                fill="#1F2937"
                d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z"
              />
            </svg>
            <h1 className="py-10 text-2xl font-bold text-gray-800 leading-6">
              Your Recipes
            </h1>
          </div>
          <hr className="border-1 border-gray-800 my-8" />
          {isLoading ? (
            <div>{/* */}</div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {data?.map((recipe: RecipeWithAuthor) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  servingSize={recipe.servingSize}
                  prepTime={recipe.prepTime}
                  cookingTime={recipe.cookingTime}
                  author={recipe.author.name || 'Unknown'}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
