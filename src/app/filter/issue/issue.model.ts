import { User } from '../user/user.model';

export class Issue {

    constructor(
        public title: string,
        public state: string,
        public html_url: string,
        public locked: boolean,
        public created_at: Date,
        public updated_at: Date,
        public user: User){}
}
