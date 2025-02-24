import { Injectable, inject } from '@angular/core';
import { UserMessage } from '../models/userMessage.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageListService {
  http = inject(HttpClient);
  messages: Array<UserMessage> = [];

  constructor() { }

  getMessageFromApi(email: string) {
    const params = new URLSearchParams({
      email: email,
    });
    const url = "http://localhost/api/user-messages/show?" + params.toString();
    return this.http.get<UserMessage[]>(url);
  }
}
