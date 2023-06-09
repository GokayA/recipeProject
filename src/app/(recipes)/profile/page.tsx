'use client';
import Loading from '@/components/Loading';
import RecipeCard from '@/components/RecipeCard';
import SignInButton from '@/components/SignInButton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export const revalidate = 0;

interface Recipe {
  id: string;
  title: string;
  servingSize: string;
  prepTime: string;
  cookingTime: string;
  description: string;
  image: string;
  instructions: string;
  isPublic: boolean;
  authorId: string;
  createdAt: Date;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}
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
        const filteredRecipes = data.filter((recipe: Recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filteredRecipes);
      }
    }
  }, [data, searchQuery]);

  if (!session) {
    return (
      <div className="min-h-screen w-full text-center items-center justify-center px-10 py-10 text-bold text-2xl">
        <h1>You must be logged in</h1>
        <SignInButton className="border-transparent rounded-full my-10 bg-slate-800 text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-3 py-2 border-b-2 " />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow ">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
                className="mt-5 mr-5 "
              >
                <path
                  fill="#1F2937"
                  d="m165 936-42-42 420-420q-22-48-10-99.5t57-96.5q45-44 109-56.5T804 250q42 42 28.5 105T772 466q-41 42-91.5 55t-94.5-6l-67 67 312 312-42 42-312-312-312 312Zm125-351L171 466q-51-51-53-121t46-124l245 245-119 119Z"
                />
              </svg>
              <h1 className="py-10 text-2xl font-bold text-gray-800 leading-6">
                All Food Recipes
              </h1>
            </div>
            <div className="flex-grow  text-center">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                required
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
          <hr className="flex justify-center border-1 border-gray-800 my-8" />
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredData.map((recipe: RecipeWithAuthor) => (
                <React.Fragment key={recipe.id}>
                  <RecipeCard
                    href={`/recipe/details/${recipe.id}`}
                    title={recipe.title}
                    image={recipe.image}
                    servingSize={recipe.servingSize}
                    prepTime={recipe.prepTime}
                    cookingTime={recipe.cookingTime}
                    author={recipe.author.name || 'Unknown'}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
