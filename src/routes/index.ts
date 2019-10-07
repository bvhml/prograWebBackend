import { Router } from 'express';
import ContactRouter from './Contacts';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/v1/contacts', ContactRouter);
// Export the base-router
export default router;
