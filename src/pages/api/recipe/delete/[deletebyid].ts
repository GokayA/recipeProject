import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const recipeId = req.query.recipeid as string;
    console.log('check', recipeId);
    const deletedRecipe = await db.recipe.deleteMany({
      where: {
        AND: [{ id: recipeId }, { authorId: session.user.id }],
      },
    });

    res.status(201).json(deletedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
}
