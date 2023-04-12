
import * as fs from 'fs';

export class Email {
    address: string;
    title: string;
    body: string;
    birthday: string;
    constructor(
        address: string,
        title: string,
        body: string,
        birthday: string    
    ) {
        this.address = address;
        this.title = title;
        this.body = body;
        this.birthday = birthday;
    }

    send(): void {
        console.log("Sended email OK");
    }

    to_log(): string {
        return `${this.address}|${this.birthday}|${this.title}|${this.body.padEnd(20)}`;
    }
}