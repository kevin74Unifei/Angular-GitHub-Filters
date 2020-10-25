import { User } from '../../user-list/user/user.model';

export class Repository{
    constructor(
        public name: string,
        public isPrivate: boolean, 
        public owner: User,
        public html_url: string,
        public type: string,
        public description: string,
        public language: string,
        public default_branch: string,
        public created_at: Date,
        public updated_at: Date,
    ){}
}
