import { withMethods } from '@/lib/api-middlewares/with-methods';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const {
      title,
      servingSize,
      prepTime,
      cookingTime,
      description,
      image,
      instructions,
      isPublic,
    } = req.body;

    const recipe = await db.recipe.create({
      data: {
        title,
        servingSize,
        prepTime,
        cookingTime,
        description,
        image,
        instructions,
        isPublic,
        author: { connect: { id: session.user.id } },
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
}

export default withMethods(['POST'], handler);
