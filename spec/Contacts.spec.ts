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

            agent.get('/')
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res).toBeDefined();
                    expect(res.status).toBe(NOT_FOUND);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });


        describe(`"POST:${addContactsPath}"`, () => {

            const callApi = (reqBody: IContact) => {
                return agent.post(addContactsPath).type('application/json; charset=utf-8').send(reqBody);
            };
    
            const contactData = {
                contact : new Contact(undefined,'',
                {'title': 'mr', 'first': 'John', 'last': 'Smith'},
                'john.smith@gmail.com', 
                { 'name': 'DPI', 'value': 123456789 },
                { 'large':'', 'medium': '', 'thumbnail': '' },
                'US',
                'male'
            )};
            
            //console.log(contactData);
    
            it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
    
                //spyOn(UserDao.prototype, 'add').and.returnValue(Promise.resolve());
    
                agent.post(addContactsPath).type('application/json; charset=utf-8').send(contactData) // pick up here
                    .end((err: Error, res: Response) => {
                        pErr(err);
                        expect(res.status).toBe(CREATED);
                        expect(res.body.error).toBeUndefined();
                        done();
                    });
            });
        });
});
