'use client';
import { Recipe, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import RecipeCard from './RecipeCard';

interface RecipeWithAuthor extends Recipe {
  author: User;
}

const RecipePage = () => {
  const { isLoading, data } = useQuery<RecipeWithAuthor[]>(
    ['recipes'],
    async () => {
      const { data } = await axios.get('/api/recipe/allrecipes');
      return data;
    }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-row">
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
          <hr className="flex justify-center border-1 border-gray-800 my-8" />
          {isLoading ? (
            <div> </div>
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

export default RecipePage;
