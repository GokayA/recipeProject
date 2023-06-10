'use client';
import SignInButton from '@/components/SignInButton';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const NewRecipeForm = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedServingSize, setSelectedServingSize] = useState<string>('1-2');
  const [selectedPrepTime, setSelectedPrepTime] = useState<string>('5');
  const [selectedCookTime, setSelectedCookTime] = useState<string>('0');
  const [message, setMessage] = useState<string>('');

  const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleDescriptionChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setDescription(event.currentTarget.value);
  };

  const handleImageChange = (event: FormEvent<HTMLInputElement>) => {
    setImage(event.currentTarget.value);
  };

  const handleInstructionsChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setInstructions(event.currentTarget.value);
  };

  const handleIsPublicChange = (event: FormEvent<HTMLInputElement>) => {
    setIsPublic(event.currentTarget.checked);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/recipe/create', {
        title,
        description,
        image,
        instructions,
        isPublic,
        servingSize: selectedServingSize,
        prepTime: selectedPrepTime,
        cookingTime: selectedCookTime,
      });
      if (response.status === 201) {
        setMessage('Recipe added successfully');
        setErrorMessage('');
        setTitle('');
        setDescription('');
        setImage('');
        setInstructions('');
        setIsPublic(false);
        setSelectedServingSize('1-2');
        setSelectedPrepTime('5');
        setSelectedCookTime('0');
      } else {
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        setErrorMessage('Failed to create Recipe');
      }
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen text-center px-10 py-10 text-red text-bold text-2xl">
        <h1>You must be logged in</h1>
        <SignInButton className="border-transparent rounded-full my-10 bg-slate-800 text-white hover:text-green-300 hover:border-gray-300 inline-flex items-center px-3 py-2 border-b-2 " />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-grow flex flex-col justify-center items-center  ">
        <h1 className="text-3xl py-10">Recipe Information</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-primary font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              required
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="serving-size"
              className="block text-primary font-bold mb-2"
            >
              Serving Size(Choose)
            </label>
            <select
              id="serving-size"
              name="serving-size"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
              value={selectedServingSize}
              onChange={(event) =>
                setSelectedServingSize(event.currentTarget.value)
              }
            >
              <option value="1-2">1-2 people</option>
              <option value="2-4">2-4 people</option>
              <option value="4-6">4-6 people</option>
              <option value="6-8">6-8 people</option>
              <option value="8-10">8-10 people</option>
              <option value="10-12">10-12 people</option>
              <option value="12-14">12-14 people</option>
              <option value="16-18">16-18 people</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="serving-size"
              className="block text-primary font-bold mb-2"
            >
              Preparation Time(Choose)
            </label>
            <select
              id="serving-size"
              name="serving-size"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
              value={selectedPrepTime}
              onChange={(event) =>
                setSelectedPrepTime(event.currentTarget.value)
              }
            >
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
              <option value="15">15 mins</option>
              <option value="30">30 mins</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
              <option value="240">4 hours+</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="serving-size"
              className="block text-primary font-bold mb-2"
            >
              Cooking Time(Choose)
            </label>
            <select
              id="serving-size"
              name="serving-size"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
              value={selectedCookTime}
              onChange={(event) =>
                setSelectedCookTime(event.currentTarget.value)
              }
            >
              <option value="0">0 mins</option>
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
              <option value="15">15 mins</option>
              <option value="30">30 mins</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
              <option value="240">4 hours+</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-primary font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-primary font-bold mb-2"
            >
              Image URL
            </label>
            <input
              required
              type="text"
              id="image"
              value={image}
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="instructions"
              className="block text-primary font-bold mb-2"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={handleInstructionsChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-content leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="isPublic"
              className="block text-primary font-bold mb-2"
            >
              Public?
            </label>
            <input
              required
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={handleIsPublicChange}
              className="mr-2 leading-tight"
            />
            <span className="text-sm">Make this recipe public</span>
          </div>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          {message && <div className=" mb-4">{message}</div>}
          <button
            type="submit"
            className="btn bg-primary text-primary-content font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRecipeForm;
