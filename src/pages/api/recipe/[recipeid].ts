import { withMethods } from '@/lib/api-middlewares/with-methods';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const recipeId = req.query.recipeid as string;
  console.log('check', recipeId);

  try {
    const recipebyId = await db.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        author: true,
      },
    });

    res.status(201).json(recipebyId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
}

export default withMethods(['GET'], handler);
