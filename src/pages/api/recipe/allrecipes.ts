import { withMethods } from '@/lib/api-middlewares/with-methods';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const publicRecipes = await db.recipe.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        title: true,
        servingSize: true,
        prepTime: true,
        cookingTime: true,
        description: true,
        image: true,
        instructions: true,
        isPublic: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(201).json(publicRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
}

export default withMethods(['GET'], handler);
