import { TestBed } from '@angular/core/testing';

import { MessageListService } from './message-list.service';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MessageListService', () => {
  let service: MessageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MessageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
