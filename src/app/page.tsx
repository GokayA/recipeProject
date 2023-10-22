import RecipePage from '@/components/RecipePage';
import { constructMetadata } from '@/lib/utils';

// export const metadata = {
//   title: 'OnlyGoodRecipes',
//   description: 'The website to add recipes created with nextjs',
// };
export const metadata = constructMetadata();
export const revalidate = 0;

export default async function Home() {
  return (
    <main>
      <RecipePage />
    </main>
  );
}
