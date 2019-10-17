import { Router } from 'express';
import { WidgetComponent } from '../components';
import * as jwtConfig from '../config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route 
 * @example http://localhost:PORT/node-api/queries/:id
 */
router.get('/one/:id', WidgetComponent.findOne);

/**
 * GET method route
 * @example http://localhost:PORT/node-api/queries
 */
router.get('/all', WidgetComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/node-api/queries
 */
router.post('/create', WidgetComponent.create);

/**
 * POST method route
 * @example http://localhost:PORT/node-api/queries
 */
router.post('/bulk-add', WidgetComponent.bulkAdd);

/**
 * POST method route
 * @example http://localhost:PORT/node-api/queries
 */
router.get('/find-by-dashboard/:id', WidgetComponent.findByDashboardId);

/**
 * DELETE method route
 * @example  http://localhost:PORT/node-api/queries/:id
 */
router.delete('/remove/:id', WidgetComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
