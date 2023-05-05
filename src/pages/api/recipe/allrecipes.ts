import { withMethods } from '@/lib/api-middlewares/with-methods';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('start');

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const publicRecipes = await db.recipe.findMany({
      where: { isPublic: true },
    });

    res.status(201).json(publicRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error' });
  }
}

export default withMethods(['GET'], handler);
