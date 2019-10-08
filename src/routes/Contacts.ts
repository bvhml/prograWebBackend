
import { ContactDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT  } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';
import { IContact } from '@entities';
import { NOTFOUND } from 'dns';

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
 *                       Add One - "POST /api/v1/contacts/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    try {
        const contact : IContact = req.body.contact;

        if (!contact) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        await contactDao.add(contact);
        return res.status(CREATED).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Update - "PUT /api/v1/contacts/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    try {
        const contact : IContact = req.body.contact;
        if (!contact) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        contact.pk = Number(contact.pk);
        await contactDao.update(contact);
        return res.status(NO_CONTENT).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
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
        return res.status(NO_CONTENT).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
