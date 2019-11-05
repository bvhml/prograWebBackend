export interface IName {
    title: string;
    first: string;
    last: string;
}

export interface IPicture {
    large: string;
    medium: string;
    thumbnail: string;
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
    picture: IPicture;
    nat: string;
    gen: string;
}

export class Contact implements IContact {

    public _id: string;
    public pk?: number;
    public name: IName;
    public email: string;
    public id: IId;
    public nat: string;
    public gen: string;
    public picture: IPicture;
    
    constructor(Contact?: IContact , _id?: string, name?: IName, email?: string, id?:IId, picture?:IPicture, nat?:string, gen?:string) {
        if (typeof Contact === 'object') {
            this._id = Contact._id;
            this.name = Contact.name;
            this.email = Contact.email;
            this.id = Contact.id;
            this.nat = Contact.nat;
            this.gen = Contact.gen;
            this.picture = Contact.picture
        } else {
            this._id = _id || '';
            this.name = name || {'title':'','first':'', 'last':''};
            this.email = email || '';
            this.id = id || {'name':'', 'value': 0};
            this.nat = nat || '';
            this.gen = gen || '';
            this.picture = picture || {'large': '', 'medium':'', 'thumbnail': ''};
        }
    }
    
}
