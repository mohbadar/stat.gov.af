import { Router } from 'express';
import { DashboardComponent } from '../components';
import * as jwtConfig from '../config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route 
 * @example http://localhost:PORT/api/dashboards/:id
 */
router.get('/one/:id', DashboardComponent.findOne);

/**
 * GET method route
 * @example http://localhost:PORT/api/dashboards
 */
router.get('/all', DashboardComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/api/dashboards
 */
router.post('/create', DashboardComponent.create);

/**
 * DELETE method route
 * @example  http://localhost:PORT/api/dashboards/:id
 */
router.delete('/remove/:id', DashboardComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
