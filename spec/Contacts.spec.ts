import app from '@server';
import supertest from 'supertest';

import { BAD_REQUEST, CREATED, OK, NOT_FOUND } from 'http-status-codes';
import { Response, SuperTest, Test, Request } from 'supertest';
import { IContact, Contact } from '@entities';
import { ContactDao } from '@daos';
import { pErr, paramMissingError } from '@shared';
import connect from '../src/connect'

describe('Contacts Routes', () => {

    const contactsPath = '/api/v1/contacts';
    const getContactsPath = `${contactsPath}/`;
    const addContactsPath = `${contactsPath}/add`;
    const updateContactPath = `${contactsPath}/update`;
    const deleteContactPath = `${contactsPath}/delete/:id`;

    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app.listen(3030));
        const db = 'mongodb://localhost:27017';
        connect({db});
        //console.log(agent.get('/api/v1/contacts/').then());
        setTimeout(done, 10000);
        done();
    });

    describe(`"GET:${getContactsPath}"`, () => {

        
        it(`should return a JSON object with all the users and a status code of "${OK}" if the
            request was successful.`, (done) => {

            const contacts = [
                
                new Contact(undefined,'5dc1f3617ff8d517f6535554',
                {'title': 'mr', 'first': 'John', 'last': 'Smith'},
                'john.smith@gmail.com', 
                { 'name': 'DPI', 'value': 123456789},
                { 'large':'', 'medium': '', 'thumbnail': '' },
                'US',
                'male'),
                new Contact(undefined,'5dc1f3617ff8d517f6535553',
                {'title': 'mr', 'first': 'Sean', 'last': 'Maxwell'},
                'sean.maxwell@gmail.com', 
                { 'name': 'DPI', 'value': 2837123123},
                { 'large':'', 'medium': '', 'thumbnail': '' },
                'US',
                'male'),
                new Contact(undefined,'5dc1f3617ff8d517f6535555',
                {'title': 'mr', 'first': 'Gordan', 'last': 'Freeman'},
                'gordan.freeman@gmail.com', 
                { 'name': 'DPI', 'value': 987654321},
                { 'large':'', 'medium': '', 'thumbnail': '' },
                'US',
                'male'),
            ];

           
            //spyOn(ContactDao.prototype, 'getAll').and.returnValue(Promise.resolve(contacts));

            agent.get(getContactsPath)
                .end(async (err: Error, res: Response) => {
                    pErr(err);
                    expect(res).toBeDefined();
                    expect(res.status).toBe(OK);
                    // Caste instance-objects to 'User' objects
                    const retContacts = res.body.map((contact: IContact) => {
                        return new Contact(contact);
                    });
                    expect(retContacts).toEqual(contacts);
                    expect(res.body.error).toBeUndefined();
                    done();
                });

            });
        });

      

        
        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {

            
            //spyOn(UserDao.prototype, 'getAll').and.throwError(errMsg);

            agent.get('/')
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res).toBeDefined();
                    expect(res.status).toBe(NOT_FOUND);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });
      /* 
    });
  
    
    describe(`"POST:${addUsersPath}"`, () => {

        const callApi = (reqBody: object) => {
            return agent.post(addUsersPath).type('form').send(reqBody);
        };

        const userData = {
            user: new User('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {

            spyOn(UserDao.prototype, 'add').and.returnValue(Promise.resolve());

            agent.post(addUsersPath).type('form').send(userData) // pick up here
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {

            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not add user.';
            spyOn(UserDao.prototype, 'add').and.throwError(errMsg);

            callApi(userData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"PUT:${updateUserPath}"`, () => {

        const callApi = (reqBody: object) => {
            return agent.put(updateUserPath).type('form').send(reqBody);
        };

        const userData = {
            user: new User('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {

            spyOn(UserDao.prototype, 'update').and.returnValue(Promise.resolve());

            callApi(userData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a
            status code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {

            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const updateErrMsg = 'Could not update user.';
            spyOn(UserDao.prototype, 'update').and.throwError(updateErrMsg);

            callApi(userData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(updateErrMsg);
                    done();
                });
        });
    });

    describe(`"DELETE:${deleteUserPath}"`, () => {

        const callApi = (id: number) => {
            return agent.delete(deleteUserPath.replace(':id', id.toString()));
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {

            spyOn(UserDao.prototype, 'delete').and.returnValue(Promise.resolve());

            callApi(5)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const deleteErrMsg = 'Could not delete user.';
            spyOn(UserDao.prototype, 'delete').and.throwError(deleteErrMsg);

            callApi(1)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
                });
        });
    });
    */
});
