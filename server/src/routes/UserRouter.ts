import { Router } from 'express';
import { UserComponent } from '../components';
import * as jwtConfig from '../config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route 
 * @example http://localhost:PORT/api/users/:id
 */
router.get('/one/:id', UserComponent.findOne);

/**
 * GET method route
 * @example http://localhost:PORT/api/users
 */
router.get('/all', UserComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/api/users
 */
router.post('/create', UserComponent.create);

/**
 * DELETE method route
 * @example  http://localhost:PORT/api/users/:id
 */
router.delete('/remove/:id', UserComponent.remove);

/**
 * DELETE method route
 * @example  http://localhost:PORT/api/users/:id
 */
router.delete('/logout/:token/:id', UserComponent.logout);

/**
 * @export {express.Router}
 */
export default router;
