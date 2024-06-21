import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BalanceViewComponent } from './balance-view.component';
import { Balance, BalanceService } from '../../services/balance.service';
import { Router, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

describe('BalanceViewComponent', () => {
  let component: BalanceViewComponent;
  let fixture: ComponentFixture<BalanceViewComponent>;
  let balanceService: jasmine.SpyObj<BalanceService>;
  let router: Router;

  beforeEach(async () => {
    balanceService = jasmine.createSpyObj('BalanceService', ['getBalances']);

    await TestBed.configureTestingModule({
      imports: [BalanceViewComponent],
      providers: [
        { provide: BalanceService, useValue: balanceService },
        provideRouter([{ path: '**', component: BalanceViewComponent }]),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceViewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert and show invalid date when date query parameter is invalid', fakeAsync(async () => {
    await router.navigate(['balances'], {
      queryParams: { date: 'invalid-date' },
    });
    fixture.detectChanges();
    tick();

    expect(component.isDateValid()).toBeFalse();
    const invalidDate = fixture.debugElement.query(
      By.css('.noBalances h1')
    ).nativeElement;
    expect(invalidDate.textContent).toContain('Invalid date!');
  }));

  it('should load balances when date query parameter is valid', fakeAsync(async () => {
    const mockBalances = [
      {
        accountName: 'Account 1',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
      {
        accountName: 'Account 2',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
      {
        accountName: 'Account 3',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
      {
        accountName: 'Account 4',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
      {
        accountName: 'Account 5',
        balance: 1000,
        balanceDate: new Date('2024-03-31T00:00:00'),
        id: 347,
      } as Balance,
    ];

    await router.navigate(['balances'], {
      queryParams: { date: '2020-03-01' },
    });
    fixture.detectChanges();
    tick();

    expect(component.isDateValid()).toBeTrue();

    component.balances = mockBalances;
    fixture.detectChanges();
    tick();

    expect(component.balances.length).toEqual(5);
    expect(component.loading).toBeFalse();
    expect(fixture.debugElement.query(By.css('app-card'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('td')).length).toBe(5);
  }));

  it('should show no balances message when there are no balances', fakeAsync(async () => {
    await router.navigate(['balances'], {
      queryParams: { date: '2020-03-01' },
    });
    fixture.detectChanges();
    tick();

    component.balances = [];
    fixture.detectChanges();
    tick();

    expect(component.isDateValid()).toBeTrue();
    expect(component.balances).toEqual([]);
    expect(component.loading).toBeFalse();

    const noBalances = fixture.debugElement.query(
      By.css('.noBalances h1')
    ).nativeElement;
    expect(noBalances.textContent).toContain(
      'No account balances found for Mar 1, 2020'
    );
  }));
});
