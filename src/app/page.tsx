import RecipePage from '@/components/RecipePage';

export const metadata = {
  title: 'OnlyGoodRecipes',
  description: 'The website to add recipes created with nextjs',
};

export default async function Home() {
  return (
    <main className="bg-stone-300">
      <RecipePage />
    </main>
  );
}
