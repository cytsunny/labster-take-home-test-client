import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title and form`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const page: HTMLElement = fixture.nativeElement;

    const header = page.querySelector('h1')!;
    expect(header).toBeTruthy();
    expect(header.textContent).toEqual('Message System Client');

    const form = page.querySelector('form.email-form')!;
    expect(form).toBeTruthy();

    const emailInput = form.querySelector('input[name="email"]')!;
    expect(emailInput).toBeTruthy();
    expect(emailInput.getAttribute('placeholder')).toEqual('Your email');

    const submitButton = page.querySelector('input[type="submit"]')!;
    expect(submitButton).toBeTruthy();
    const buttonValue = submitButton.getAttribute('value');
    expect(buttonValue).toContain('Login');
  });

  it('should render table after login', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const httpTesting = TestBed.inject(HttpTestingController);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const page: HTMLElement = fixture.nativeElement;
    app.email = 'testing@example.com';
    const submitButton: HTMLElement = page.querySelector('form.email-form input[type="submit"]')!;
    submitButton.click();
    fixture.detectChanges();
    const fakeMessageList = [{
      id: 1,
      email: 'testing@example.com',
      message: 'test message',
      status: 'pending',
      result: null,
      created_at: '2023-08-01T12:34:56',
      updated_at: '2023-08-01T12:34:56'
    }];
    httpTesting.expectOne(environment.apiBaseURL + 'api/user-messages/show?email=testing%40example.com').flush(fakeMessageList);
    fixture.detectChanges();

    const table: HTMLElement | null = page.querySelector('table');
    expect(table).toBeTruthy();
    const rows = page.querySelectorAll('table tbody tr');
    expect(rows.length).toEqual(1);
    expect(rows[0].querySelectorAll('td').length).toEqual(6);
    expect(rows[0].querySelectorAll('td')[0].textContent).toEqual(fakeMessageList[0].id.toString());
    expect(rows[0].querySelectorAll('td')[1].textContent).toEqual(fakeMessageList[0].status);
    expect(rows[0].querySelectorAll('td')[2].textContent).toEqual(fakeMessageList[0].message);
    expect(rows[0].querySelectorAll('td')[3].textContent).toEqual('');
    expect(rows[0].querySelectorAll('td')[4].textContent).toEqual('2023-08-01 12:34:56');
    expect(rows[0].querySelectorAll('td')[5].textContent).toEqual('2023-08-01 12:34:56');
  });

  it('should render table after login', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const httpTesting = TestBed.inject(HttpTestingController);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const page: HTMLElement = fixture.nativeElement;
    app.email = 'testing@example.com';
    const submitButton: HTMLElement = page.querySelector('form.email-form input[type="submit"]')!;
    submitButton.click();
    fixture.detectChanges();

    httpTesting.expectOne(environment.apiBaseURL + 'api/user-messages/show?email=testing%40example.com').flush([]);
    fixture.detectChanges();

    const table: HTMLElement = page.querySelector('table')!;
    expect(table).toBeTruthy();
    let rows = page.querySelectorAll('table tbody tr');
    expect(rows.length).toEqual(0);

    const fakeMessageList = [{
      id: 1,
      email: 'testing@example.com',
      message: 'test message',
      status: 'pending',
      result: null,
      created_at: '2023-08-01T12:34:56',
      updated_at: '2023-08-01T12:34:56'
    }];
    app.newMessage = fakeMessageList[0].email;
    const newMessageButton: HTMLElement = page.querySelector('form.new-message-form button')!;
    newMessageButton.click();
    
    httpTesting.expectOne(environment.apiBaseURL + 'api/user-messages/store').flush(fakeMessageList);
    fixture.detectChanges();

    rows = page.querySelectorAll('table tbody tr');
    expect(rows.length).toEqual(1);
    expect(rows[0].querySelectorAll('td').length).toEqual(6);
    expect(rows[0].querySelectorAll('td')[0].textContent).toEqual(fakeMessageList[0].id.toString());
    expect(rows[0].querySelectorAll('td')[1].textContent).toEqual(fakeMessageList[0].status);
    expect(rows[0].querySelectorAll('td')[2].textContent).toEqual(fakeMessageList[0].message);
    expect(rows[0].querySelectorAll('td')[3].textContent).toEqual('');
    expect(rows[0].querySelectorAll('td')[4].textContent).toEqual('2023-08-01 12:34:56');
    expect(rows[0].querySelectorAll('td')[5].textContent).toEqual('2023-08-01 12:34:56');
  });

});
