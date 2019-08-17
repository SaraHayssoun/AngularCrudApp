import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Contact} from './contact';


@Injectable()
export class ContactsService {

    private http: HttpClient;
    // constructor(private http: HttpClient){}

    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>('v1/contacts');
    }

    addContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>('v1/contact', contact);
    }

    deleteContact(id: number): Observable<{}> {
        const url = `v1/contact/${id}`;
        return this.http.delete(url);
    }

    updateContact(contact: Contact): Observable<Contact> {
        return this.http.put<Contact>('v1/contact/${contact.id}', contact);
    }
}
