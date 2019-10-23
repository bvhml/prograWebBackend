export interface IName {
    title: string;
    first: string;
    last: string;
}

export interface IId {
    name: string;
    value: Number;
}


export interface IContact {
    _id: string
    pk?: number;
    name: IName;
    email: string;
    id: IId;
    nat: string;
    gender: string;
}

export class Contact implements IContact {

    public _id: string;
    public pk?: number;
    public name: IName;
    public email: string;
    public id: IId;
    public nat: string;
    public gender: string;

    constructor(_id: string, name: IName, email: string, id:IId, nat:string, gender:string) {
        /*if (typeof nameOrUser === 'string') {
            this.title = title;
            this.name = nameOrUser;
            this.last = last;
            this.email = email || '';
            this.id = id;
            this.nat = nat;
            this.gen = gen;
        } else {
            */
            this._id = _id;
            this.name = name;
            this.email = email;
            this.id = id;
            this.nat = nat;
            this.gender = gender;
            
        
    }
}
