import { Router } from 'express';
import { PermissionComponent } from '../components';
import * as jwtConfig from '../config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route 
 * @example http://localhost:PORT/api/dashboards/:id
 */
router.get('/one/:id', PermissionComponent.findOne);

/**
 * GET method route
 * @example http://localhost:PORT/api/dashboards
 */
router.get('/all', PermissionComponent.findAll);


router.get('/init', PermissionComponent.init);

/**
 * POST method route
 * @example http://localhost:PORT/api/dashboards
 */
router.post('/create', PermissionComponent.create);

/**
 * DELETE method route
 * @example  http://localhost:PORT/api/dashboards/:id
 */
router.delete('/remove/:id', PermissionComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
