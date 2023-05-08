import { withMethods } from '@/lib/api-middlewares/with-methods';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('start');
  const session = await getServerSession(req, res, authOptions);
  const deleteId = req.query.deletebyid as string;

  console.log('delete check', deleteId);

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const deletedRecipe = await db.recipe.delete({
      where: {
        id: deleteId,
      },
    });

    console.log('Deleted recipe:', deletedRecipe);

    res.status(201).json(deletedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export default withMethods(['DELETE'], handler);
