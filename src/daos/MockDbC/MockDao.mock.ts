import jsonfile from 'jsonfile';

export class MockDaoMock {

    private readonly dbFilePath = 'src/daos/MockDbC/MockDb.json';

    protected openDb(): Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    }

    protected saveDb(db: any): Promise<any> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}
