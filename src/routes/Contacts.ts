
import { ContactDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT  } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';
import { IContact } from '@entities';
import { NOTFOUND } from 'dns';
import ContactController from '../controllers/contact.controller'
import { getRandomInt } from '@shared'
import redis from 'redis'

// Init shared
const router = Router();
//const contactDao = new ContactDao();
// create and connect redis client to local instance.
//const client = redis.createClient(6379,'redis');

/* echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});
*/
/******************************************************************************
 *                      Get All Contacts - "GET /api/v1/contacts/"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    try {
        /*const contacts = await contactDao.getAll();*/
        const Contacts = await ContactController.FindContacts();
        return res.status(OK).json(Contacts);
        
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
        /*const contacts = await contactDao.getContact(Number(pk));*/
        const contacts = await ContactController.FindContactByPk(String(pk));
        
        return res.status(OK).json({ contacts });
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
        const contact : IContact = req.body;

        if (!contact) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        /*
        await contactDao.add(contact);
        */

        const newContact = await ContactController.CreateContact({
            pk: getRandomInt(),
            name: contact.name,
            email: contact.email,
            id: contact.id,
            picture: contact.picture,
            nat: contact.nat,
            gen: contact.gen
          });
        
        
          
        return res.status(CREATED).send('Contact created successfully!');
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add a list of contacts - "POST /api/v1/contacts/upload"
 ******************************************************************************/

router.post('/upload', async (req: Request, res: Response) => {
    try {
        const contacts : Array<IContact> = req.body;

        if (!contacts) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        /*
        await contactDao.add(contact);
        */

        contacts.map(async contact => { 
            return ( await ContactController.CreateContact({
                pk: getRandomInt(),
                name: contact.name,
                email: contact.email,
                id: contact.id,
                picture: contact.picture,
                nat: contact.nat,
                gen: contact.gen
              }));
        });
        
        
          
        return res.status(CREATED).send('Contacts uploaded successfully!');;
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
        const contact : IContact = req.body;
        if (!contact) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        /*await contactDao.update(contact);*/
        const updateContact = await ContactController.UpdateContactByPk(contact._id, contact);

        return res.status(NO_CONTENT).json({ updateContact });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                    Delete - "DELETE /api/v1/contacts/delete/:pk"
 ******************************************************************************/

router.delete('/delete/:pk', async (req: Request, res: Response) => {
    try {
        const { pk } = req.params as ParamsDictionary;
        /*await contactDao.delete(Number(pk));*/
        
        await ContactController.DeleteContactByPk(String(pk));
        return res.status(OK).send('Deleted Successfully!');
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
            error: err.message,
        });
    }
});


/******************************************************************************
 *                    Delete - "DELETE /api/v1/contacts/delete/:pk"
 ******************************************************************************/

router.delete('/deleteAll/', async (req: Request, res: Response) => {
    try {
        /*await contactDao.delete(Number(pk));*/
        await ContactController.DeleteAllContacts();
        return res.status(OK).send('All Deleted Successfully!');
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
