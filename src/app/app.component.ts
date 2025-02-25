import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageListService } from './services/message-list.service';
import { UserMessage } from './models/userMessage.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  email = '';
  newMessage = '';
  loading = false;
  hidden = signal(true);
  refreshButtonText = signal('Login');
  newMessageButtonText = signal('Submit New Message');
  messageList: Array<UserMessage> = [];
  messageListService = inject(MessageListService);

  formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0') + ' ' 
      + String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');
  }

  getMessages(event: Event) {
    event.preventDefault();
    if ( this.loading ) {
      alert('Processing previous request. Please wait.')
      return;
    }
    this.refreshButtonText.set('Loading...');
    this.hidden.set(true);

    this.messageListService.getMessageFromApi(this.email)
      .pipe(
        catchError(error => {
          alert(error.error.message);
          this.refreshButtonText.set('Login');
          this.hidden.set(true);
          throw error;
        })
      ).subscribe(messages => {
        this.messageList = messages;
        this.hidden.set(false);
        this.refreshButtonText.set('Refresh List');
      })
  }

  addMessage(event: Event) {
    event.preventDefault();
    if ( this.loading ) {
      alert('Processing previous request. Please wait.')
      return;
    }
    this.newMessageButtonText.set('Loading...');
    this.messageListService.sendNewMessage(this.email, this.newMessage)
    .pipe(
      catchError(error => {
        alert(error.error.message);
        this.newMessageButtonText.set('Submit New Message');
        throw error;
      })
    ).subscribe(messages => {
      this.messageList = messages;
      this.newMessage = '';
      this.newMessageButtonText.set('Submit New Message');
    });
  }
}
