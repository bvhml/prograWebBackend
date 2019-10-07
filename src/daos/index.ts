const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
//let userDaoPath = './User/UserDao';
let contactDaoPath = './Contact/ContactDao';
if (usingMockDb === 'true') {
    contactDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { ContactDao } = require(contactDaoPath);
//export const { UserDao } = require(userDaoPath);
