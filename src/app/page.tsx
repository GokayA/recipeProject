import RecipePage from '@/components/RecipePage';

export const metadata = {
  title: 'OnlyGoodRecipes',
  description: 'The website to add recipes created with nextjs',
};

export const revalidate = 0;

export default async function Home() {
  return (
    <main className="">
      <RecipePage />
    </main>
  );
}
