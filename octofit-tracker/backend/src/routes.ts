import { Router, type Request, type Response } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models';

type Model = typeof User;

function collectionRoutes(model: Model): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable' });
    }
  });

  router.post('/', async (request: Request, response: Response) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      response.status(400).json({ error: 'Invalid document' });
    }
  });

  return router;
}

export function createApiRouter(): Router {
  const router = Router();
  router.use('/users', collectionRoutes(User));
  router.use('/teams', collectionRoutes(Team));
  router.use('/activities', collectionRoutes(Activity));
  router.use('/leaderboard', collectionRoutes(Leaderboard));
  router.use('/workouts', collectionRoutes(Workout));
  return router;
}