import { Injectable, inject } from '@angular/core';
import { UserMessage } from '../models/userMessage.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageListService {
  http = inject(HttpClient);

  constructor() { }

  getMessageFromApi(email: string) {
    const params = new URLSearchParams({
      email: email,
    });
    const url = environment.apiBaseURL + "api/user-messages/show?" + params.toString();
    return this.http.get<UserMessage[]>(url);
  }

  sendNewMessage(email: string, message: string) {
    const url = environment.apiBaseURL + "api/user-messages/store";
    const request = this.http.post<UserMessage[]>(url, {
      email: email,
      message: message
    })
    return request;
  }
}
