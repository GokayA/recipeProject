'use client';
import DeleteButton from '@/components/DeleteButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

function RecipeDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { isLoading, data } = useQuery<{
    recipe: Recipe;
    newInstructions: string[];
  }>({
    queryKey: ['Recipe', params.id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/recipe/${params.id}/`);
      const newInstructions = await data.instructions.split('\n');

      return { recipe: data as Recipe, newInstructions };
    },
  });

  //########################### Check author section ###########################/

  const isAuthor = session?.user.id === data?.recipe.authorId;

  //########################### Delete section ###########################/
  const deleteRecipe = useMutation({
    mutationKey: ['deleteRecipe', params.id],
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/delete/${params.id}`);
      return data;
    },
    onSuccess: () => {
      router.push('/profile');
    },
    onError: (error) => {
      console.error('An error occurred while deleting the recipe:', error);
    },
  });

  const deleteHandler = async () => {
    try {
      await deleteRecipe.mutateAsync();
    } catch (error) {
      console.error('An error occurred while deleting the recipe:', error);
    }
  };

  //############### Check loading or is data exist section ###############/

  if (isLoading) {
    return <div className="min-h-screen "></div>;
  }

  if (!data) {
    return <div>No recipe found</div>;
  }

  const { recipe, newInstructions } = data;

  //########################### filter data for search  ###########################/

  const filteredInstructions = newInstructions.filter(
    (instruction: string) => instruction !== ''
  );

  return (
    <div className=" min-h-screen max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="py-12">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
          {isAuthor ? (
            <DeleteButton
              onClick={deleteHandler}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-black"
            />
          ) : (
            ''
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="ml-1 text-sm text-gray-600 pr-5">
              {recipe.servingSize}
            </span>

            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8v8c0 2.21 1.79 4 4 4h8M12 6v.01"
              />
            </svg>
            <span className="ml-1 text-sm text-gray-600">
              {recipe.prepTime} Prep / {recipe.cookingTime} Cook
            </span>
          </div>
        </div>
        <div className="mt-8">
          <div className=" prose max-w-none">
            <div className="relative h-80 w-80">
              <Image
                priority
                sizes="384px,384px"
                src={recipe.image}
                alt={`Image for ${recipe.title}`}
                fill
                className="mb-4"
              />
            </div>
            <h1 className="mt-4 font-bold text-lg text-gray-900">
              Description
            </h1>
            <p className="text-gray-500">{recipe.description}</p>

            <h2 className="mt-4 font-bold text-lg text-gray-900">
              Instructions
            </h2>
            <div className="mt-12">
              <ul className="list-disc pl-8">
                {filteredInstructions.map((instruction, index) => (
                  <li key={`${instruction}-${index}`} className="mb-2">
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
