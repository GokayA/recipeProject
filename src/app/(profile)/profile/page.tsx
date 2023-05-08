'use client';
import RecipeCard from '@/components/RecipeCard';
import SignInButton from '@/components/SignInButton';
import { Recipe, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface RecipeWithAuthor extends Recipe {
  author: User;
}

const ProfilePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<RecipeWithAuthor[]>([]);

  const { data: session } = useSession();

  const { isLoading, data } = useQuery<RecipeWithAuthor[]>(
    ['recipes', session?.user.id],
    async () => {
      const { data } = await axios.get(`/api/recipe/profilerecipe/`);
      return data;
    }
  );
  useEffect(() => {
    if (data) {
      if (searchQuery === '') {
        setFilteredData(data);
      } else {
        const filteredRecipes = data.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filteredRecipes);
      }
    }
  }, [data, searchQuery]);

  if (!session) {
    return (
      <div className="min-h-screen text-center px-10 py-10 text-red-800 text-bold text-2xl">
        <h1>You must be logged in</h1>
        <SignInButton className="border-transparent rounded-full my-10 bg-slate-800 text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-3 py-2 border-b-2 " />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
                className="mt-5 mr-5"
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
            <div className="flex-grow  text-center">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Search"
                className="text-gray-900 w-3/4 font-bold bg-gray-100 border-gray-300 rounded-md py-2 px-4 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <hr className="border-1 border-gray-800 my-8" />
          {isLoading ? (
            <div>{/* */}</div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {filteredData?.map((recipe: RecipeWithAuthor) => (
                <RecipeCard
                  href={`/recipe/details/${recipe.id}`}
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
