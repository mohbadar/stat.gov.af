import { Router } from 'express';
import { RoleComponent } from '../components';
import * as jwtConfig from '../config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route 
 * @example http://localhost:PORT/api/dashboards/:id
 */
router.get('/one/:id', RoleComponent.findOne);

/**
 * GET method route
 * @example http://localhost:PORT/api/dashboards
 */
router.get('/all', RoleComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/api/dashboards
 */
router.post('/create', RoleComponent.create);

/**
 * DELETE method route
 * @example  http://localhost:PORT/api/dashboards/:id
 */
router.delete('/remove/:id', RoleComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
