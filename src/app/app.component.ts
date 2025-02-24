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
  email='';
  buttonText = signal('Login');
  messageList: Array<UserMessage> = [];
  messageListService = inject(MessageListService);

  formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  getMessages(event: Event) {
    event.preventDefault();
    this.buttonText.set('Loading...');

    this.messageListService.getMessageFromApi(this.email)
      .pipe(
        catchError(error => {
          alert(error.error.message);
          throw error;
        })
      ).subscribe(messages => {
        this.messageList = messages;
        this.buttonText.set('Refresh List');
      })
  }
}
