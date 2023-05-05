import React from 'react';
import RecipeCard from './RecipeCard';

const Recipe = () => {
  const recipes = [
    {
      title: 'Spaghetti Carbonara',
      image: 'https://placehold.co/600x400.png',
      servings: 4,
      prepTime: 10,
      cookTime: 20,
      author: 'John Doe',
    },
    {
      title: 'Spaghetti Carbonara',
      image: 'https://placehold.co/600x400.png',
      servings: 5,
      prepTime: 10,
      cookTime: 20,
      author: 'John Woe',
    },
    {
      title: 'Spaghetti Carbonara',
      image: 'https://placehold.co/600x400.png',
      servings: 6,
      prepTime: 10,
      cookTime: 20,
      author: 'John Yoe',
    },
    {
      title: 'Spaghetti Carbonara',
      image: 'https://placehold.co/600x400.png',
      servings: 6,
      prepTime: 10,
      cookTime: 20,
      author: 'John Yoe',
    },
    {
      title: 'Spaghetti Carbonara',
      image: 'https://placehold.co/600x400.png',
      servings: 6,
      prepTime: 10,
      cookTime: 20,
      author: 'John Yoe',
    },
    {
      title: 'Spaghetti Carbonara',
      image: 'https://placehold.co/600x400.png',
      servings: 6,
      prepTime: 10,
      cookTime: 20,
      author: 'John Yoe',
    },
  ];

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 m-20 ">
    <div className="flex justify-center flex-wrap gap-4 m-20 ">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.title}
          title={recipe.title}
          image={recipe.image}
          servings={recipe.servings}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          author={recipe.author}
        />
      ))}
    </div>
  );
};

export default Recipe;
