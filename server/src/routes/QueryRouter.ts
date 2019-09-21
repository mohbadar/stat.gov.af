import { Router } from 'express';
import { QueryComponent } from '../components';
import * as jwtConfig from '../config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route 
 * @example http://localhost:PORT/api/queries/:id
 */
router.get('/one/:id', QueryComponent.findOne);

/**
 * GET method route
 * @example http://localhost:PORT/api/queries
 */
router.get('/all', QueryComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/api/queries
 */
router.post('/create', QueryComponent.create);

/**
 * DELETE method route
 * @example  http://localhost:PORT/api/queries/:id
 */
router.delete('/remove/:id', QueryComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
