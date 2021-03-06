import { app } from '@server';
import { logger } from '@shared';
import connect from './connect';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
app.disable('x-powered-by');
// const db = 'mongodb://mongo/contacts';
const db = 'mongodb://localhost:27017/contacts';
connect({ db });
