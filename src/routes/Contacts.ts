
import { ContactDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK, NOT_FOUND  } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';

// Init shared
const router = Router();
const contactDao = new ContactDao();

/******************************************************************************
 *                      Get All Contacts - "GET /api/v1/contacts/"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    try {
        const contacts = await contactDao.getAll();
        return res.status(OK).json({contacts});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Get Specific Contact - "GET /api/v1/contacts/:pk"
 ******************************************************************************/

router.get('/:pk', async (req: Request, res: Response) => {
    try {
        const { pk } = req.params as ParamsDictionary;
        const contacts = await contactDao.getContact(Number(pk));
        return res.status(OK).json({contacts});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        await contactDao.add(user);
        return res.status(CREATED).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        user.id = Number(user.id);
        await contactDao.update(user);
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:pk"
 ******************************************************************************/

router.delete('/delete/:pk', async (req: Request, res: Response) => {
    try {
        const { pk } = req.params as ParamsDictionary;
        await contactDao.delete(Number(pk));
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
